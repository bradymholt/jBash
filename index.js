// jbash - v1.41.0

options = { errexit: false, xtrace: false };
set = opt => {
  if (!opt.match(/^(-|\+)/)) throw new Error("Invalid set value");
  let val = opt[0] == "-";
  switch (opt[1]) {
    case "x":
      options.xtrace = val;
    case "e":
      options.errexit = val;
  }
};

// Aliases
args = process.argv.slice(global.shebangInvoked ? 3 : 2);
// Current filename aliased as $0
global[`$0`] = process.argv[1];
// Arguments aliased as $1, $2, etc.
// $1 through $10, at a minimum, will be declared and have argument value or be set to undefined if not specified
for (let i = 1; i <= Math.max(10, args.length); i++) {
  if (args.length >= i) {
    global[`$${i}`] = args[i - 1];
  } else {
    global[`$${i}`] = undefined;
  }
}
cd = process.chdir;
echo = console.log;
exit = process.exit;
env = process.env;
// Environmental variables prefixed with $
for (let p in env) {
  global[`$${p}`] = env[p];
}

// File access
let fs = require("fs");
readFile = (path, encoding = "utf-8") => {
  return fs.readFileSync(path, { encoding });
};
writeFile = (path, contents, encoding = "utf-8") => {
  fs.writeFileSync(path, contents, { encoding });
};

// Command execution
$ = (cmd, stream) => {
  if (options.xtrace) {
    echo(cmd);
  }

  let result = require("child_process").spawnSync(cmd, [], {
    stdio: [0, stream ? "inherit" : "pipe", stream ? "inherit" : "pipe"],
    shell: true
  });

  if (result.status != 0) {
    let stderr = result.stderr
      ? result.stderr.toString().replace("/bin/sh: ", "")
      : null;
    let msg = stderr || `Error running: ${cmd}`;

    echo(msg);

    if (options.errexit) {
      err = new Error(msg);
      err.status = result.status;
      err.stderr = stderr;
      err.output = result.output;
      throw err;
    }

    return !stream ? msg : null;
  }
  return !!result.stdout
    ? result.stdout.toString().replace(/^\n|\n$/g, "")
    : null;
};
eval = cmd => {
  return $(cmd, true);
};
exec = eval;

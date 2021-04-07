// jbash - v1.52.0
// https://github.com/bradyholt/jbash#readme

global.options = { errexit: false, xtrace: false };
global.set = opt => {
  if (!opt.match(/^(-|\+)/)) {
    throw new Error("Invalid set value");
  }
  let val = opt[0] == "-";
  switch (opt[1]) {
    case "x":
      global.options.xtrace = val;
    case "e":
      global.options.errexit = val;
  }
};

// Aliases
global.args = process.argv.slice(global.shebangInvoked ? 3 : 2);
// Current filename aliased as $0
const path = require("path");
if (global.scriptName){
  // global.scriptName is set by ./bin scripts and used when jBash is used via npx
  global[`$0`] = lobal.scriptName;
} else if (!!module.parent) {
  global[`$0`] = path.basename(module.parent.filename);
} else {
  global[`$0`] = path.basename(process.argv[0]);
}

// Arguments aliased as $1, $2, etc.
// $1 through $10, at a minimum, will be declared and have argument value or be set to undefined if not specified
for (let i = 1; i <= Math.max(10, args.length); i++) {
  if (args.length >= i) {
    global[`$${i}`] = args[i - 1];
  } else {
    global[`$${i}`] = undefined;
  }
}
global.cd = process.chdir;
global.exit = process.exit;
global.env = process.env;
// Environmental variables prefixed with $
for (let p in env) {
  global[`$${p}`] = env[p];
}

// File access
const fs = require("fs");
global.readFile = (path, encoding = "utf-8") => {
  return fs.readFileSync(path, { encoding });
};
global.writeFile = (path, contents, encoding = "utf-8") => {
  fs.writeFileSync(path, contents, { encoding });
};
global.cat = global.readFile;
global.printf = contents => {
  process.stdout.write(contents);
};
global.echo = (contents, outPath, encoding) => {
  if (outPath === undefined) {
    global.printf(contents + "\n");
  } else {
    global.writeFile(outPath, contents, encoding);
  }
};
global.dirExists = path => {
  return fs.existsSync(path) && fs.statSync(path).isDirectory();
};
global.mkdir = path => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};
global.rmdir = path => {
  if (fs.existsSync(path)) {
    fs.rmdirSync(path);
  }
};

// Command execution
global["$"] = (cmd, stream) => {
  if (global["options"].xtrace) {
    global.echo(cmd);
  }

  let result = require("child_process").spawnSync(cmd, [], {
    stdio: [0, stream ? "inherit" : "pipe", stream ? "inherit" : "pipe"],
    shell: "/bin/bash"
  });

  if (result.status != 0) {
    let stderr = result.stderr
      ? result.stderr.toString().replace("/bin/sh: ", "")
      : null;
    let msg = stderr || `Error running: ${cmd}`;    

    if (global.options.errexit) {
      err = new Error(msg);
      err.status = result.status;
      err.stderr = stderr;
      err.output = result.output;
      throw err;
    } else {
      global.echo(msg);
    }

    return !stream ? msg : null;
  }
  return !!result.stdout
    ? result.stdout.toString().replace(/^\n|\n$/g, "")
    : null;
};
global.eval = cmd => {
  return $(cmd, true);
};
global.exec = eval;

// Error handling
const handleUnhandledError = err => {
  if (global.options.errexit) {
    // Since errexit is on, error message was not printed when error was thrown.
    // But, now we know the error was not handled so print the error before we exit.
    global.echo(err.message);
    exit(err.status || 1);
  } else {
    throw err;
  }
};
process.on("unhandledRejection", handleUnhandledError);
process.on("uncaughtException", handleUnhandledError);

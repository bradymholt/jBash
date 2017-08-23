// jbash

// Aliases
args = process.argv.slice(global.shebangInvoked ? 3 : 2);
cd = process.chdir;
echo = console.log;
exit = process.exit;
env = process.env;

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
  let result = require("child_process").spawnSync(cmd, [], {
    stdio: [0, stream ? "inherit" : "pipe", "pipe"],
    shell: true
  });
  if (result.status != 0) {
    let stderr = result.stderr ? result.stderr.toString() : null;
    err = new Error(stderr || `Error running: ${cmd}`);
    err.detail = {
      status: result.status,
      stderr: stderr,
      output: result.output
    };
    throw err;
  }
  return !!result.stdout ? result.stdout.toString().replace(/^\n$/, "") : null;
};
eval = cmd => {
  return $(cmd, true);
};

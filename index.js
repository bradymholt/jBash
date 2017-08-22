
// jbash
args = process.argv.slice(4); cd = process.chdir; exit = process.exit; env = process.env; echo = console.log;
encoding_default = "utf-8"; _fs = require("fs"); readFile = (path, encoding = encoding_default) => { return _fs.readFileSync(path, { encoding }) }; writeFile = (path, contents, encoding = encoding_default) => { _fs.writeFileSync(path, contents, { encoding }) };
$ = (cmd, stream) => { r = (require("child_process").execSync(cmd, { stdio: stream ? "inherit" : "pipe" }) ); return !!r ? r.toString().replace(/^\n$/, "") : null; };
eval = cmd => { return $(cmd, true); };

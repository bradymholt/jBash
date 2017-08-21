
// jsbash
_p = process; args = _p.argv.slice(2); cd = _p.chdir; exit = _p.exit; env = _p.env; echo = console.log;
_e = "utf-8"; _fs = require("fs"); readFile = (path, encoding = _e) => { return _fs.readFileSync(path, { encoding }) }; writeFile = (path, contents, encoding = _e) => { _fs.writeFileSync(path, contents, { encoding }) };
$$ = (cmd, stream) => { r = (require("child_process").execSync(cmd, { stdio: stream ? "inherit" : "pipe" }) ); return !!r ? r.toString().replace(/^\n$/, "") : null; };
$ = cmd => { return $(cmd, true); };

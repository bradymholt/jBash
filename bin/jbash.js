#!/usr/bin/env node
const path = require("path");
let scriptPath = path.join(process.argv[2]);

if (!process.argv[2].startsWith("/")) {
  // Relative path so join with current working directory
  scriptPath = path.join(process.cwd(), process.argv[2]);
}

global.shebangInvoked = true;
global.scriptName = path.basename(scriptPath);

require('jbash');
require(scriptPath);

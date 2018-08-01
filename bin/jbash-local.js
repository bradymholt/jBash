#!/usr/bin/env node
const path = require("path");
const scriptPath = `${process.cwd()}/${process.argv[2]}`;

global.shebangInvoked = true;
global.scriptName = path.basename(scriptPath);

require('../index.js');
require(scriptPath);
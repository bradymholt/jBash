#!/usr/bin/env node
const path = require("path");
let script = path.join(process.argv[2]);

if (!process.argv[2].startsWith("/")) {
  // Relative path so join with current working directory
  script = path.join(process.cwd(), process.argv[2]);
}

global.shebangInvoked = true;

require('jbash');
require(script);

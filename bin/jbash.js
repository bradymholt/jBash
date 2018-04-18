#!/usr/bin/env node
const path = require("path");
const script = path.join(process.cwd(), process.argv[2]);

global.shebangInvoked = true;

require('jbash');
require(script);

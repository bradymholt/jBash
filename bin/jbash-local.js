#!/usr/bin/env node
global.shebangInvoked = true;
require('../index.js');
require(`${process.cwd()}/${process.argv[2]}`);
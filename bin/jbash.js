#!/usr/bin/env node
global.shebangInvoked = true;
require('jbash');
require(`${process.cwd()}/${process.argv[2]}`);
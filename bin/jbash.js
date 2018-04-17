#!/usr/bin/env node
global.shebangInvoked = true;
require('jbash');
require(`${process.argv[2]}`);
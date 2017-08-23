#!/usr/bin/env node
require('../index.js');

// echo(`Hello`)
// let f = $(`ping -t 1 www.google.com`);
// echo(f)
// echo(args)

try {
$(`cat invalid.txt`)
} catch (e) {
    console.log(e.data.status);
    console.log(e.data.output);
    console.log(e.data.stderr);
}
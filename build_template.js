#!/usr/bin/env node
require("./index.js");

let jsBash = readFile("./index.min.js");
writeFile("template.js",
`#!/usr/bin/env node
${jsBash}

`);

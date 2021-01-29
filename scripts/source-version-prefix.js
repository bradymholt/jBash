#!bin/jbash-local.js

// This script prefixes the source file ./index.js with the version.  This helps identify which version is
// being used when users pull down the source script manually and use it.

set("-e");

cd(`${__dirname}/../`);

// Prefix source with jbash - v0.0.0
let package = require("../package.json");
let sourceFile = "index.js";
let sourceContent = readFile(sourceFile);
// Remove first line from source
sourceContent = sourceContent.split("\n").slice(1).join("\n");
// Prefix it
echo(`\
// ${package.name} - v${package.version}
// ${package.homepage}
${sourceContent}\
`,
 sourceFile
);
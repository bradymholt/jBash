#!bin/jbash-local.js

set("-e")

cd(`${__dirname}/../`)

// Bump version
eval(`npm version --no-git-tag-version minor`)

// Prefix source with jbash - v0.0.0
let package = require("../package.json")
let sourceFile = "index.js";
let sourceContent = readFile(sourceFile);
// Remove first line from source
sourceContent = sourceContent.split("\n").slice(1).join("\n");
// Prefix it
writeFile(sourceFile, `// ${package.name} - v${package.version}\n${sourceContent}`)

// Git commit/tag
eval(`git commit -a -m "New version: ${package.version}"`)
eval(`git tag ${package.version}`)
eval(`git push --tags`)

// Publish
eval(`npm publish`)
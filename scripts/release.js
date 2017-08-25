#!bin/jbash-local.js

set("-e")

cd(`${__dirname}/../`)

// Bump version
eval(`npm version --no-git-tag-version minor`)

let package = require("../package.json")
let sourceFile = "index.js";
let minifiedFileName = "index.min.js";

// Minify
eval(`npx uglifyjs --mangle --compress --verbose ${sourceFile} -o ${minifiedFileName}`)
// Prefix with jbash - v0.0.0
writeFile(minifiedFileName, `// ${package.name} - v${package.version}\n${readFile(minifiedFileName)}`)

// Git commit/tag
eval(`git commit -a -m "New version: ${package.version}"`)
eval(`git tag ${package.version}`)
eval(`git push --tags`)

// Publish
eval(`npm publish`)
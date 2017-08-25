#!bin/jbash-local.js

let sourceFile = "index.js";
let minifiedFileName = "index.min.js";
let package = require("../package.json")

cd(`${__dirname}/../`)

// Minify
eval(`npx uglifyjs --mangle --compress --verbose ${sourceFile} -o ${minifiedFileName}`)
// Prefix with jbash - v0.0.0
writeFile(minifiedFileName, `// ${package.name} - v${package.version}\n${readFile(minifiedFileName)}`)
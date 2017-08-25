#!bin/jbash-local.js

cd(`${__dirname}/../`)

// Bump version
eval(`npm version --no-git-tag-version minor`)

// Build/minify
eval(`./bin/jbash-local.js /scripts/build.js`)

let package = require("../package.json")

// Git commit/tag
eval(`git commit -a -m "New version: ${package.version}"`)
eval(`git tag ${package.version}`)
eval(`git push --tags`)

// Publish
eval(`npm publish`)
#!bin/jbash-local.js

let package = require("../package.json")

cd(`${__dirname}/../`)

// Bump version
eval(`npm --no-git-tag-version minor`)

// Build/minify
eval(`./scripts/build.js`)

// Git commit/tag
eval(`git commit -a -m "New version: ${package.version}"`)
eval(`git tag ${package.version}`)
eval(`git push --tags`)

// Publish
eval(`npm publish`)
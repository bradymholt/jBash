# jbash

Helpers for bash like shell scripting in JavaScript

[![NPM Package](https://img.shields.io/npm/v/jbash.svg)](https://www.npmjs.com/package/jbash)

Bash scripting is great for system administration, web application deployment, data crunching, automated backups, etc. and has the advantage that it automates the exact commands you would be running in a shell terminal.  Because of this, I think of bash as bare metal scripting.  It's available on macOS and Linux platforms without an additonal installation as well.   But, if you are doing anything beyond trival tasks, bash syntax will become baffling quickly.  Single quotes, argument handling, sanitizing parameters, if/else logical statements, etc, error handling, etc. get complex ~~sometimes~~ a lot of the time.

jbash is a simple, small (less than 500B) JavaScript library that defines some variables and functions so you can use Node.js/JavaScript for scripting but have simple and familiar bash like commands.

## Quick Start

```
npm i -g jbash
touch myscript.js && chmod +x myscript.js
```

Then, in `myscript.js`:

```
#!/usr/local/bin/jbash
echo(`Hello world`)
```

When you run `./myscript.js`, it will output `Hello World`.

## Helpers

```
// Print text to terminal
echo(`Hello world`)
> "Hello World"

// Arguments (for ./script.js debug fast)
args
> ["debug", "fast]

// Environment variables
env
> { HOME_DIR: '/Users/bholt',
    NODE_DIR: '/usr/local/lib/node_modules'' }

// Change current directory
cd(`test/`)

// Exit with code
exit(1)

// Read text file
let content = readFile("hello.txt")

// Write text file
writeFile("hello.txt", "Hello world")

// Execute comand and assign stdout to variable
let result = $(`echo "Hello world"`);
> "Hello world"

// Execute command stream output to console
$$(`ping -t 10 www.google.com`);
```

## Executing commands

- If output is a single newline, it will be stripped so that the output will be an empty string

## Installation

### Copy/paste

If you don't want to fuss with downloading anything or referencing external dependencies, you can simply copy/paste jbash at the top of your script.  To grab jbash into your clipboard you can run:

```
curl https://raw.githubusercontent.com/bradyholt/jbash/master/index.min.js | pbcopy
```

```
#!/usr/bin/env node
<paste here>
...

echo(`Hello world`);
```

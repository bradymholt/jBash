# jsbash

Helpers for bash like shell scripting in JavaScript

[![NPM Package](https://img.shields.io/npm/v/jsbash.svg)](https://www.npmjs.com/package/jsbash)

Bash scripting is great for system administration, web application deployment, data crunching, automated backups, etc. and has the advantage that it automates the exact commands you would be running in a shell terminal.  Because of this, I think of bash as bare metal scripting.  It's available on macOS and Linux platforms without an additonal installation as well.   But, if you are doing anything beyond trival tasks, bash syntax will become baffling quickly.  Single quotes, argument handling, sanitizing parameters, if/else logical statements, etc, error handling, etc. get complex ~~sometimes~~ a lot of the time.

jsbash is a simple, small (less than 500B) JavaScript library that defines some variables and functions so you can use Node.js/JavaScript for scripting but have simple and familiar bash like commands.

## Quick Start

```
npm i -g jsbash
touch myscript.js && chmod +x myscript.js
```

Then, in `myscript.js`:

```
#!/usr/bin/env node
require('jsbash');

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

### Global

To install jsbash globally and use it from multipate scripts, first install the package globally:
```
npm i -g jsbash
```

Then, require it with `require('jsbash');`:

```
#!/usr/bin/env node
require('jsbash');

echo(`Hello world`);
```

### Local

If you do not want to install globally, you can download jsbash manually and include it directly.  This is a good option for scripts being run on a remote machine where you may not have the option to install npm packages globally.  First, grab the jsbash library:

```
wget https://raw.githubusercontent.com/bradyholt/jsbash/master/index.min.js jsbash.js
```

Then, just reference the file with a relative path:

```
#!/usr/bin/env node
require('./jsbash.js');

echo(`Hello world`);
```

### Copy/paste

If you don't want to fuss with downloading anything or referencing external dependencies, you can simply copy/paste jsbash at the top of your script.  To grab jsbash into your clipboard you can run:

```
curl https://raw.githubusercontent.com/bradyholt/jsbash/master/index.min.js | pbcopy
```

```
#!/usr/bin/env node
// jsbash
<paste> _p = process; args = _p.argv.slice(2); cd = _p.chdir; exit = _p.exit; env = _p.env; echo = console.log;
...

echo(`Hello world`);
```

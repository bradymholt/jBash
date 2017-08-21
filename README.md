# jsbash

Helpers for bash like shell scripting in JavaScript

## Examples

```
// Print text to terminal
echo(`Hello world`)

// Arguments (for ./script.js debug fast)
args
> ["debug", "fast]

// Environment variables
env
> { HOME_DIR: '/Users/bholt',
    NODE_DIR: '/usr/local/lib/node_modules'' }

// Change directory
cd(`test/`)

// Exit with code
exit(1)

// Read file
let content = readFile("hello.txt")

// Write file
writeFile("hello.txt", "Hello world")

// Execute comand and assign stdout to variable
let result = $(`echo "Hello world"`);
> "Hellow world"

// Execute command stream output to console
$$(`ping -t 10 www.google.com`);
```

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
wget <url> jsbash.js
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
curl <url> | pbcopy
```

```
#!/usr/bin/env node
// jsbash
<paste> _p = process; args = _p.argv.slice(2); cd = _p.chdir; exit = _p.exit; env = _p.env; echo = console.log;
...

echo(`Hello world`);
```

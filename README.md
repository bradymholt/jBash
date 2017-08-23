# jBash

Helpers for Bash like shell scripting in JavaScript

[![NPM Package](https://img.shields.io/npm/v/jbash.svg)](https://www.npmjs.com/package/jbash)

Write your shell scripts using jBash and you get the best of both worlds: JavaScript and Bash.  jBash is a small JavaScript library that provides aliases and helper functions that are similar to Bash syntax, allowing you to write shell scripts in JavaScript that are simple and familiar.

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

| Bash                      | jBash                            | notes                                   |
|---------------------------|----------------------------------|-----------------------------------------|
| ``echo "Hello"``              | ``echo(`Hello`)``                   | print text to console |
| ``$1, $2, ...``               | ``args``                             | args is an array of arguments passed in |
| ``$HOME``                     | ``env.HOME``                         | environment variables |
| ``cd "/usr/bin"``             | ``cd(`/usr/bin`)``                   | change current working directory |
| ``exit 1``                    | ``exit(1) ``                         | exit with code |
| ``config=$(cat config.txt)``  | ``config=$(`cat config.txt`)``       | read text from file |
|                           | ``config=readFile(`config.txt`)``    | alternative: readFile helper |
|                           |                                  |                                         |
| ``echo $config > config.txt`` | ``$(`echo ${config} > config.txt`)`` | save text to file |
|                           | ``writeFile(`config.txt` config)``   | alternative: writeFile helper |
| ``result=$(command.sh)``      | ``result=$(`command.sh`)``          | $(...) buffers output as return value |
| ``eval ping www.google.com``  | ``eval(`ping www.google.com`)``      | eval() streams output (no return value) |

## Command Execution

To run commands in jBash you can use either the **$()** or **eval()** helper, depending upon whether you need to capture the output of the commands.  **Both command helpers will throw an exception if the command returns an exit code <> 0**;  The error will have a `data` property with the detail (`{ status, stderr}`).

Examples:

```
// Will wait for cat to read file and not print to console but assign output result to `contents` variable
let contents = $(`cat foo.txt`)

// Will print ping output immediately as it happens
eval(`ping -t 1 www.google.com`)

try {
  $(`invalidCommand.sh`)
} catch (err) {
  console.log(err.data.status) // 1
  console.log(err.stderr) // "cat: invalid.txt: No such file or directory"
}
```

### $()

When you want to run a command and buffer the output (stdout) of that command as a return vlaue, you'll want to use **$()**.  As the command is running, stdout will _not_ be printed to the console but will instead be captured and returned as the result.  This helper is intended for short running commands that do not produce a large amount of output.  Example: To grab the output of `git status --porcelain` and store in variable named `result`:

```
result=$(`git status --porcelain`);
```

### eval()

**eval()** should be used for running commands where the output does not need to be captured, but only printed to the console.  This helper is intended for long running commands or those where output does not need to be captured.  Exmaple: To run `npm install`:

```
eval(`npm install`)
```

## Installation

### Global

First, install jBash globally with npm:

```
npm i -g jbash
```

Once it is installed globally, you can write your script with a jbash [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)) which will allow your script to be executed directly, with jBash loaded at runtime.

```
#!/usr/local/bin/jbash

echo(`Hello World`)
```

### require

Rather than installing jBash globally, you can simply download it to a local folder and reference it directly from your script using a `require` statement.  This is a good option for scripts running on a remote system where you may not be able to install npm packages globally.  Node.js will still need to be available, though.

First, download the minified version of jBash:

```
wget https://raw.githubusercontent.com/bradyholt/jbash/master/index.min.js jbash.js
```

Then, in your script:

```
#!/usr/bin/env node
require('./jbash.js)

echo(`Hello World`)
```

## Examples

Looking at real-world scripts is a good way to get a feel for the library.

- [release.js](https://github.com/bradyholt/cron-expression-descriptor/blob/master/scripts/release.js) - Cron Expression Descriptor release script

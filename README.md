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
| ``$1, $2, ...``               | ``$1; $2; ...``                     | $1, $2, etc. variables contain args passed in |
|                               | ``args``                     | an array of all arguments passed in |
| ``$0``                        | ``$0``                     | file path of current script |
| ``$HOME``                     | ``$HOME``                         | environment variables |
|                               | ``env.HOME``                         | all env variables are mapped on env var  |
| ``cd "/usr/bin"``             | ``cd(`/usr/bin`)``                   | change current working directory |
| ``exit 1``                    | ``exit(1) ``                         | exit with code |
| ``config=$(cat cnf.txt)``  | ``config=$(`cat cnf.txt`)``       | read text from file |
|                           | ``config=readFile(`cnf.txt`)``    | readFile helper (defaults to UTF-8 but can pass encoding as 2nd parameter) |
|                           |                                  |                                         |
| ``echo $cnf > cnf.txt`` | ``$(`echo ${cnf} > cnf.txt`)`` | save text to file |
|                           | ``writeFile(`cnf.txt` config)``   | writeFile helper (defaults to UTF-8 but can pass encoding as 2nd parameter) |
| ``result=$(cmd.sh)``      | ``result=$(`cmd.sh`)``          | $(...) buffers output as return value |
| ``eval ping g.cn``  | ``eval(`ping g.cn`)``      | eval() streams output to console (no return value) |

## Command Execution

To run commands in jBash you can use either the **$()** or **eval()** helper, depending upon whether you need to capture the output of the commands.  Both of these commands are synchronous and will block execution until completion.

### $()

When you want to run a command and buffer the output (stdout) of that command as a return vlaue, you'll want to use **$()**.  As the command is running, stdout will _not_ be printed to the console but will instead be captured and returned as the result.  This helper is intended for short running commands that do not produce a large amount of output.  Example: To grab the output of `git status --porcelain` and store in variable named `result`:

```
// Will wait for `git status` to complete and assign
// output to result variable.  Nothing will be
// printed to the console.

let result=$(`git status --porcelain`);
```

### eval()

**eval()** should be used for running commands where the output does not need to be captured, but only printed to the console.  This helper is intended for long running commands or those where output does not need to be captured.  Example: To run `npm install`:

```
// Will print `npm install` output immediately as it happens
// eval() will return null

eval(`npm install`)
```

### Error Handling

 **Both command helpers will throw an error if the command returns an exit code <> 0**.  This is consistent with using `set -e` in Bash.  The error will have a `detail` property as `{ status, stderr }`.

Example:

```
try {
  $(`cat invalid.txt`)
} catch (err) {
  console.log(err.detail.status) // 1
  console.log(err.detail.stderr) // "cat: invalid.txt: No such file or directory"
}

try {
  eval(`cat invalid.txt`)
} catch (err) {
  console.log(err.detail.status) // 1
  console.log(err.detail.stderr) // "nonExistingCommand.sh: command not found"
}
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

## It's Still JavaScript

When you write your shell scripts in jBash, you get to use a simple Bash like syntax but remember, it's still JavaScript!  This means you can install npm packages and use them to your heart's content.

Example:

```
npm install uuid
```

```
#!/usr/local/bin/jbash
require('uuid/v4')

echo(uuidv4()) // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
```

## Examples

Looking at real-world scripts is a good way to get a feel for the library.

- [release.js](https://github.com/bradyholt/cron-expression-descriptor/blob/master/scripts/release.js) - Cron Expression Descriptor release script

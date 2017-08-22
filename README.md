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
#!/usr/local/bin/jsbash

echo(`Hello world`)
```

When you run `./myscript.js`, it will output `Hello World`.

## Helpers

| bash                      | jBash                            | notes                                   |
|---------------------------|----------------------------------|-----------------------------------------|
| ``echo "Hello"``              | ``echo(`Hello`)``                   |                                         |
| ``$1, $2, ...``               | ``args``                             | args is an array of arguments passed in |
| ``$HOME``                     | ``env.HOME``                         |                                         |
| ``cd "/usr/bin"``             | ``cd(`/usr/bin`)``                   |                                         |
| ``exit 1``                    | ``exit(1) ``                         |                                         |
| ``config=$(cat config.txt)``  | ``config=$(`cat config.txt`)``       |                                         |
|                           | ``config=readFile(`config.txt`)``    | alternative: readFile helper            |
|                           |                                  |                                         |
| ``echo $config > config.txt`` | ``$(`echo ${config} > config.txt`)`` |                                         |
|                           | ``writeFile(`config.txt` config)``   | alternative: writeFile helper           |
| ``result=$(command.sh)``      | ``result=$(`command.sh`)``          | $(...) buffers output                   |
| ``eval ping www.google.com``  | ``eval(`ping www.google.com`)``      | eval() streams output                   |

## Installation

### Global

First, install jBash globally with npm:

```
npm i -g jbash
```

Once it is installed globally, you can write your script with a jbash [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)) which will allow your script to be executed directly, with jBash loaded at runtime.

```
#!/usr/local/bin/jsbash

echo (`Hello World`)
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

echo (`Hello World`)
```

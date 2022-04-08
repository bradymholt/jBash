var assert = require("assert");
var fs = require("fs");
require("../index.js");

describe("echo", function () {
  it("should print text to stdout", function () {
    let originalPrintf = global.printf;
    let loggedMessage = null;

    // Override printf so we can capture invocations
    global.printf = (message) => {
      loggedMessage = message;
    };

    const echoMessage = "Test 1, 2, 3";
    echo(echoMessage);

    // Restore original printf function before asserting
    global.printf = originalPrintf;

    assert.equal(loggedMessage, echoMessage + "\n");
  });

  it("should write text to a file when given a second argument", function () {
    const [file, text] = ["/tmp/writeFile.txt", "hello there"];
    echo(text, file);
    assert.equal(text, fs.readFileSync(file));
  });
});

describe("$ENVVAR", function () {
  it("should return environment variable value", function () {
    assert.equal(process.env.HOME, $HOME);
  });
});

describe("arguments", function () {
  it("$0 should return the file name of the current script", function () {
    assert.equal(require("path").basename(__filename), $0);
  });

  it("$1 through $10 should be declared but undefined", function () {
    for (let i = 1; i <= 10; i++) {
      assert.equal(global[`$${i}`], undefined);
    }
  });

  it("$11 should be undeclared", function () {
    try {
      console.log($11);
    } catch (e) {
      assert.equal(e.message, "$11 is not defined");
    }
  });
});

describe("$()", function () {
  it("should return the output of a command", function () {
    const [file, text] = ["/tmp/temp.txt", "hello there"];
    writeFile(file, text);
    assert.equal(text, $(`cat ${file}`));
  });

  it("should trim leading and trailing newline characters", function () {
    let currentDirectory = $(`pwd`);
    assert.equal(null, $(`pwd`).match(/\n$/));
  });
});

describe("eval", function () {
  it("should run a command and stream output", function () {
    const [file, text] = ["/tmp/evalTest.txt", "hello there"];
    assert.equal(null, eval(`echo '${text}' > ${file}`));
    assert.equal(true, readFile(file).startsWith(text));
  });
});

describe("cat", function () {
  it("should read text from a file", function () {
    const [file, text] = ["/tmp/readFile.txt", "hello there"];
    fs.writeFileSync(file, text);
    assert.equal(text, cat(file));
  });
});

describe("dirExists", function () {
  it("should return true when directory exists", function () {
    const path = "/tmp/newDir/";
    fs.mkdirSync(path);
    assert.equal(dirExists(path), true);
    fs.rmdirSync(path);
  });

  it("should return false when directory does not exist", function () {
    const path = "/tmp/newDir/";
    assert.equal(dirExists(path), false);
  });
});

describe("mkdir", function () {
  it("should create a directory", function () {
    const path = "/tmp/newDir/";
    mkdir(path);
    assert.equal(fs.existsSync(path), true);
    fs.rmdirSync(path);
  });
});

describe("errorexit", function () {
  it("should print message and return failed command status code with errorexit on", function () {
    let result = require("child_process").spawnSync(
      "test/fixtures/error-script-with-errexit-on.js"
    );
    
    assert.equal(result.status, 127);
      assert.equal(result.stderr.toString(), "/bin/bash: script-does-not-exist.sh: command not found\nError running: script-does-not-exist.sh\n");

  });

  it("should return 0 status code with errorexit off", function () {
    let result = require("child_process").spawnSync(
      "test/fixtures/error-script-with-errexit-off.js"
    );
    assert.equal(result.status, 0);
  });
});

describe("reloading jBash", function(){
  // These tests ensure that if jBash is reloaded (can happen if loaded from npm and locally) that any options will not be overwritten.

  it("should not reset errexit setting", function(){
    set("-e")
    assert.equal(global.options.errexit, true);

    // Delete jBash from module cache and load it again
    delete require.cache[require.resolve('../index.js')]; // delete from cash
    require("../index.js");

    // Esnure `errexit` is still true.  If jBash was reinitialized `errexit` would be set back to the default of `false`.
    assert.equal(global.options.errexit, true);
  });

  it("should not reset xtrace setting", function(){
    set("-x")
    assert.equal(global.options.xtrace, true);

    // Delete jBash from module cache and load it again
    delete require.cache[require.resolve('../index.js')]; // delete from cash
    require("../index.js");

    // Esnure `errexit` is still true.  If jBash was reinitialized `errexit` would be set back to the default of `false`.
    assert.equal(global.options.xtrace, true);
  });
});

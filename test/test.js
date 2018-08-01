var assert = require("assert");
var fs = require("fs");
require("../index.js");

describe("echo", function() {
  it("should print text to stdout", function() {
    let originalLog = console.log;
    let loggedMessage = null;

    // Override console.log so we can capture invocations
    global.console.log = message => {
      loggedMessage = message;
    };

    const echoMessage = "Test 1, 2, 3";
    echo(echoMessage);

    // Restore original console.log function before asserting
    global.console.log = originalLog;
    
    assert.equal(loggedMessage, echoMessage);
  });

  it("should write text to a file when given a second argument", function() {
    const [file, text] = ["/tmp/writeFile.txt", "hello there"];
    echo(text, file);
    assert.equal(text, fs.readFileSync(file));
  });
});

describe("$ENVVAR", function() {
  it("should return environment variable value", function() {
    assert.equal(process.env.HOME, $HOME);
  });
});

describe("arguments", function() {
  it("$0 should return the file nmae of the current script", function() {
    assert.equal(require("path").basename(__filename), $0);
  });

  it("$1 through $10 should be declared but undefined", function() {
    for (let i = 1; i <= 10; i++) {
      assert.equal(global[`$${i}`], undefined);
    }
  });

  it("$11 should be undeclared", function() {
    try {
      console.log($11);
    } catch (e) {
      assert.equal(e.message, "$11 is not defined");
    }
  });
});

describe("$()", function() {
  it("should return the output of a command", function() {
    const [file, text] = ["/tmp/temp.txt", "hello there"];
    writeFile(file, text);
    assert.equal(text, $(`cat ${file}`));
  });

  it("should trim leading and trailing newline characters", function() {
    let currentDirectory = $(`pwd`);
    assert.equal(null, $(`pwd`).match(/\n$/));
  });
});

describe("eval", function() {
  it("should run a command and stream output", function() {
    const [file, text] = ["/tmp/evalTest.txt", "hello there"];
    assert.equal(null, eval(`echo '${text}' > ${file}`));
    assert.equal(true, readFile(file).startsWith(text));
  });
});

describe("cat", function() {
  it("should read text from a file", function() {
    const [file, text] = ["/tmp/readFile.txt", "hello there"];
    fs.writeFileSync(file, text);
    assert.equal(text, cat(file));
  });
});

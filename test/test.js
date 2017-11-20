var assert = require("assert");
var fs = require("fs");
require('../index.js');

describe("$ENVVAR", function() {
  it("should return environment variable value", function() {
    assert.equal(process.env.HOME, $HOME);
  });
});

describe("$0", function() {
  it("should return the file path of the current script", function() {
    assert.equal(process.argv[1], $0);
  });
});

describe("$()", function() {
  it("should return the output of a command", function() {
    const [file, text] = ["/tmp/temp.txt", "hello there"];
    writeFile(file, text)
    assert.equal(text, $(`cat ${file}`));
  });

  it("should trim leading and trailing newline characters", function() {
    let currentDirectory = $(`pwd`);
    assert.equal(null, $(`pwd`).match(/\n$/));
  });
});

describe("eval", function() {
  it ("should run a command and stream output", function(){
    const [file, text] = ["/tmp/evalTest.txt", "hello there"];
    assert.equal(null,eval(`echo '${text}' > ${file}`))
    assert.equal(true, readFile(file).startsWith(text));
  });
});

describe("writeFile", function() {
  it ("should write text to a file", function(){
    const [file, text] = ["/tmp/writeFile.txt", "hello there"];
    writeFile(file, text);
    assert.equal(text, fs.readFileSync(file));
  });
});

describe("readFile", function() {
  it ("should read text from a file", function(){
    const [file, text] = ["/tmp/readFile.txt", "hello there"];
    fs.writeFileSync(file, text);
    assert.equal(text, readFile(file));
  });
});

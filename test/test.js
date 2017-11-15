require('../index.js');

var assert = require("assert");
describe("$()", function() {
  it("should trim leading and trailing newline characters", function() {
    let currentDirectory = $(`pwd`);
    assert.equal(null, $(`pwd`).match(/\n$/));
  });
});

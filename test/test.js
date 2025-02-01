const assert = require("assert");

describe("hello world", function () {
    it("verifies that true is not equal to false", function () {
        assert.notEqual(true, false);
    });
});
const assert = require("assert");
const isPositiveNumber = require("../src/utilitiesLib").isPositiveNumber;
const getSplitedParameters = require("../src/utilitiesLib")
  .getSplitedParameters;

describe("isPositiveNumber", function() {
  it("Should return true for integer numbers", function() {
    assert.ok(isPositiveNumber("3"));
    assert.ok(isPositiveNumber("23"));
  });
  it("Should return false for non integere numbers", function() {
    assert.ok(!isPositiveNumber("r"));
    assert.ok(!isPositiveNumber("34r"));
    assert.ok(!isPositiveNumber("-2"));
    assert.ok(!isPositiveNumber("0"));
  });
});

describe("getSplitedParameters", function() {
  it("Should return empty object when no parameters are passed", function() {
    let actualValue = getSplitedParameters({}, []);
    assert.deepStrictEqual(actualValue, {});
  });
  it("Should return splited object for one pair", function() {
    let actualValue = getSplitedParameters({}, ["--beverage", "orange"]);
    let expectedValue = { "--beverage": "orange" };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("Should return splited object for more than one pair", function() {
    let args = ["--beverage", "orange", "--quantity", "1"];
    let actualValue = getSplitedParameters({}, args);
    let expectedValue = { "--beverage": "orange", "--quantity": "1" };
    assert.deepStrictEqual(actualValue, expectedValue);

    args = ["--beverage", "orange", "--quantity", "1", "--empId", "1123"];
    actualValue = getSplitedParameters({}, args);
    expectedValue = {
      "--beverage": "orange",
      "--quantity": "1",
      "--empId": "1123"
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

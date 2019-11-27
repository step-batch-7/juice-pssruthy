const assert = require("assert");
const {
  isPositiveNumber,
  isValidLength,
  getSplitedParameters,
  isValidDate
} = require("../src/utilitiesLib.js");

/*------------------------------isPositiveNumber------------------------------*/
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

/*------------------------------isValidLength------------------------------*/

describe("isValidLength", function() {
  it("Should return true for valid length", function() {
    assert.ok(isValidLength(4, 4));
  });
});

/*------------------------------isValidDate------------------------------*/

describe("isValidDate", function() {
  it("Should return true for valid date", function() {
    assert.ok(isValidDate("2019-10-10"));
    assert.ok(isValidDate("2018-12-31"));
    assert.ok(isValidDate("2000-02-29"));
  });
  it("Should return false for invalid date", function() {
    assert.ok(!isValidDate("2019-14-12"));
    assert.ok(!isValidDate("0-12-12"));
    assert.ok(!isValidDate("2000-2-30"));
    assert.ok(!isValidDate("2100-02-29"));
  });
});

/*------------------------------getSplitedParameters------------------------------*/
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
    let args = ["--beverage", "orange", "--qty", "1"];
    let actualValue = getSplitedParameters({}, args);
    let expectedValue = { "--beverage": "orange", "--qty": "1" };
    assert.deepStrictEqual(actualValue, expectedValue);

    args = ["--beverage", "orange", "--qty", "1", "--empId", "1123"];
    actualValue = getSplitedParameters({}, args);
    expectedValue = {
      "--beverage": "orange",
      "--qty": "1",
      "--empId": "1123"
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

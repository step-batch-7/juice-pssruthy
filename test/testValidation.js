const assert = require("assert");
const isFeatureOptionValid = require("../src/validationLib.js")
  .isFeatureOptionValid;
const areSaveFeatureDetailsValid = require("../src/validationLib")
  .areSaveFeatureDetailsValid;
const isBeverageValid = require("../src/validationLib").isBeverageValid;
const areArgsValid = require("../src/validationLib").areArgsValid;

describe("areArgsValid", function() {
  it("Should return true for save feature", function() {
    let args = [
      "--save",
      "--beverage",
      "orange",
      "--quantity",
      "1",
      "--empId",
      "1121"
    ];
    assert.ok(areArgsValid(args));
    args = [
      "--save",
      "--beverage",
      "watermelon",
      "--quantity",
      "2",
      "--empId",
      "1234"
    ];
    assert.ok(areArgsValid(args));
  });
});

describe("areSaveFeatureDetailsValid", function() {
  it("Should return true when details are valid", function() {
    let args = ["--beverage", "orange", "--quantity", "1", "--empId", "11111"];
    assert.ok(areSaveFeatureDetailsValid(args));

    args = ["--beverage", "watermelon", "--quantity", "1", "--empId", "11345"];
    assert.ok(areSaveFeatureDetailsValid(args));
  });

  it("Should return false when details are not valid", function() {
    let args = ["--beverage", "tomato", "--quantity", "2"];
    assert.ok(!areSaveFeatureDetailsValid(args));

    args = ["--juice", "orange", "--quantity", "e", "empId", "1234"];
    assert.ok(!areSaveFeatureDetailsValid(args));

    args = ["--beverage", "orange", "--quantity", "3", "empId", "1d34"];
    assert.ok(!areSaveFeatureDetailsValid(args));
  });
});

describe("isBeverageValid", function() {
  it("Should return true when beverage is available", function() {
    assert.ok(isBeverageValid("orange"));
    assert.ok(isBeverageValid("watermelon"));
  });
  it("Should return false when beverage is not available", function() {
    assert.ok(!isBeverageValid("leaf"));
    assert.ok(!isBeverageValid("potato"));
  });
});
describe("isFeatureOptionValid", function() {
  it("Should give true when option is valid", function() {
    assert.ok(isFeatureOptionValid("--save"));
    assert.ok(isFeatureOptionValid("--query"));
  });
  it("Should return false when option is not valid", function() {
    assert.ok(!isFeatureOptionValid("--record"));
  });
});

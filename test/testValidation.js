const assert = require("assert");
const isFeatureOptionValid = require("../src/validationLib.js")
  .isFeatureOptionValid;
const areSaveFeatureDetailsValid = require("../src/validationLib")
  .areSaveFeatureDetailsValid;
const isBeverageValid = require("../src/validationLib").isBeverageValid;
const areArgsValid = require("../src/validationLib").areArgsValid;
const areQueryDetailsValid = require("../src/validationLib")
  .areQueryDetailsValid;

/*------------------------------areArgsValid------------------------------*/
describe("areArgsValid", function() {
  it("Should return true for save feature", function() {
    let args = [
      "--save",
      "--quantity",
      "1",
      "--beverage",
      "orange",
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
  it("Should return false for save feature", function() {
    let args = ["--save", "--beverage", "orange"];
    assert.ok(!areArgsValid(args));

    args = ["--save", "--beverage", "watermelon", "--quantity", "1e"];
    assert.ok(!areArgsValid(args));

    args = [
      "--save",
      "--beverage",
      "watermelon",
      "--quantity",
      "1",
      "--empId",
      "12346",
      "122"
    ];
    assert.ok(!areArgsValid(args));
  });
  it("Should return true for query feature", function() {
    assert.ok(["--query", "--empId", "1234"]);
    assert.ok(["--query", "--empId", "1234"]);
  });
  it("Sholud return false for query invalid inputs", function() {
    assert.ok(["--query", "--empId", "123e"]);
    assert.ok(["--query", "--emp", "123e"]);
    assert.ok(["--query", "--empId", "123e", "123"]);
  });
  it("Should return false for invalid feature", function() {
    assert.ok(!areArgsValid(["--record", "--beverage", "orange"]));
  });
});

/*------------------------------areQueryFeatureDetailsValid------------------------------*/
describe("areQueryFeatureDetailsValid", function() {
  it("Should return true for valid arguments", function() {
    let args = ["--empId", "12345"];
    assert.ok(areQueryDetailsValid(args));
  });
  it("Should return false for invalid arguments", function() {
    assert.ok(!areQueryDetailsValid(["1234"]));
    assert.ok(!areQueryDetailsValid(["--empId", "123e"]));
    assert.ok(!areQueryDetailsValid(["--id", "12345"]));
  });
});

/*------------------------------areSaveFeatureDetailsValid------------------------------*/
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

/*------------------------------isBeverageValid------------------------------*/
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

/*------------------------------isFeatureOptionValid------------------------------*/
describe("isFeatureOptionValid", function() {
  it("Should give true when option is valid", function() {
    assert.ok(isFeatureOptionValid("--save"));
    assert.ok(isFeatureOptionValid("--query"));
  });
  it("Should return false when option is not valid", function() {
    assert.ok(!isFeatureOptionValid("--record"));
  });
});

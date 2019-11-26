const assert = require("assert");
const saveRecord = require("../src/beverageLib").saveRecord;
const queryRecords = require("../src/beverageLib").queryRecords;
const getTransactionRecord = require("../src/beverageLib").getTransactionRecord;
const operateJuiceRecords = require("../src/beverageLib").operateJuiceRecords;

/*------------------------------operateJuiceRecords------------------------------*/

describe("operateJuiceRecords", function() {
  it("Should return empty when feature is invalid", function() {
    assert.strictEqual(operateJuiceRecords([""]), "");
  });

  it("Should return empty when options are invalid", function() {
    assert.strictEqual(
      operateJuiceRecords(["--save", "--juice", "orange"]),
      ""
    );
  });
  it("Should return empty when option count is invalid", function() {
    const args = [
      "--save",
      "--beverage",
      "orange",
      "--quantity",
      "--empId",
      "1234"
    ];
    assert.strictEqual(operateJuiceRecords(args), "");
  });

  it("Should return transaction details of save feature", function() {
    const args = [
      "--save",
      "--beverage",
      "orange",
      "--quantity",
      "1",
      "--empId",
      "1111"
    ];

    const readFunc = function(path) {
      assert.strictEqual(path, "./path");
      return "";
    };

    const getDate = function() {
      return "2019-11-20T05:50:28.267Z";
    };

    const writeRecord = function(path, record) {
      assert.strictEqual(path, "./path");
    };

    const path = "./path";
    const actualValue = operateJuiceRecords(
      args,
      readFunc,
      writeRecord,
      getDate,
      path
    );
    const expectedValue =
      "Employee ID,Beverage,Quantity,Date\n1111,orange,1,2019-11-20T05:50:28.267Z";
    assert.strictEqual(actualValue, expectedValue);
  });
});

/*------------------------------saveRecord------------------------------*/
describe("saveRecord", function() {
  it("Should record the beverage transactions record when the record is empty", function() {
    let getDate = function() {
      return "2019-11-20T05:50:28.267Z";
    };

    const writeRecord = function(path, record) {
      assert.strictEqual(path, "./juiceTransactionRecords.json");
    };

    let expectedValue =
      "Employee ID,Beverage,Quantity,Date\n1111,Orange,1,2019-11-20T05:50:28.267Z";

    assert.strictEqual(
      saveRecord(
        "",
        { "--beverage": "Orange", "--quantity": "1", "--empId": "1111" },
        writeRecord,
        "./juiceTransactionRecords.json",
        getDate
      ),
      expectedValue
    );
  });

  it("Should update the beverage transactions record of an present employee", function() {
    let getDate = function() {
      return "2019-11-20T05:50:28.267Z";
    };

    const writeRecord = function(path, record) {
      assert.strictEqual(path, "./juiceTransactionRecords.json");
    };

    let actualValue = saveRecord(
      '{"1111": [{ "beverage": "Watermelon", "quantity": "2", "date": "2019-11-20T05:50:28.267Z" }] }',
      { "--empId": "1111", "--beverage": "Orange", "--quantity": "1" },
      writeRecord,
      "./juiceTransactionRecords.json",
      getDate
    );

    let expectedValue =
      "Employee ID,Beverage,Quantity,Date" +
      "\n1111,Orange,1,2019-11-20T05:50:28.267Z";

    assert.strictEqual(actualValue, expectedValue);
  });
});

/*------------------------------queryRecord------------------------------*/
describe("queryRecords", function() {
  it("Should give all beverage transactions of a employee", function() {
    let date = "2019-11-20T05:50:28.267Z";
    let actualValue = queryRecords(
      '{ "1111": [{ "beverage": "Orange", "quantity": "1", "date": "2019-11-20T05:50:28.267Z" }] }',
      { "--empId": "1111" }
    );

    let expectedValue =
      "Transaction completed\nEmployee ID,Beverage,Quantity,Date\n1111,Orange,1," +
      date +
      "\nTotal:1 juices";
    assert.strictEqual(actualValue, expectedValue);
  });

  it("Should give 'Employee ID does not exist' when record of an employee is not present", function() {
    let actualValue = queryRecords("{}", { "-empId": "1111" });
    let expectedValue = "Employee ID does not exist";

    assert.strictEqual(actualValue, expectedValue);

    let date = new Date();
    actualValue = queryRecords(
      '{ "1111": [{ "beverage": "orange", "quantity": "1", "date": "2019-11-20T05:50:28.267Z" }] }',
      { "--empId": "1234" }
    );
    assert.strictEqual(actualValue, expectedValue);
  });
});

/*------------------------------getTransactionRecord------------------------------*/
describe("getTransactionRecord", function() {
  it("Should return an record object", function() {
    const getDate = function() {
      return "2019-11-20T05:50:28.267Z";
    };

    let parameters = {
      "--beverage": "orange",
      "--quantity": "1",
      "--empId": "1235"
    };

    let actualValue = getTransactionRecord(parameters, getDate);
    let expectedValue = {
      beverage: "orange",
      quantity: 1,
      date: "2019-11-20T05:50:28.267Z"
    };

    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

const assert = require("assert");
const saveRecord = require("../src/beverageLib").saveRecord;
const queryRecords = require("../src/beverageLib").queryRecords;

// describe("saveJuiceTransactionRecord", function() {
//   it("Should return the data to be record when it contains no records ", function() {
//     assert.strictEqual(
//       saveJuiceTransactionRecord({}, 1111, "orange", 1, "2019-11-22"),
//       {
//         "1111": [{ beverage: "orange", quantity: 1, date: "2019-11-22" }]
//       }
//     );
//   });
// });
describe("saveRecord", function() {
  it("Should record the beverage transactions record when the record is empty", function() {
    let date = new Date();
    let expectedValue =
      "Employee ID,Beverage,Quantity,Date\n1111,Orange,1," + date;
    assert.strictEqual(
      saveRecord(
        {},
        "1111",
        "Orange",
        1,
        date,
        "./juiceTransactionRecords.json"
      ),
      expectedValue
    );
  });
  it("Should update the beverage transactions record of an present employee", function() {
    let date = new Date();
    let actualValue = saveRecord(
      { "1111": [{ beverage: "Watermelon", quantity: "2", date: date }] },
      "1111",
      "Orange",
      1,
      date,
      "./juiceTransactionRecords.json"
    );
    let expectedValue =
      "Employee ID,Beverage,Quantity,Date" + "\n1111,Orange,1," + date;
    assert.strictEqual(actualValue, expectedValue);
  });
});

describe("queryRecords", function() {
  it("Should give all beverage transactions of a employee", function() {
    let date = new Date();
    let actualValue = queryRecords(
      { "1111": [{ beverage: "Orange", quantity: "1", date: date }] },
      "1111"
    );
    let expectedValue =
      "Employee ID,Beverage,Quantity,Date\n1111,Orange,1," + date + "\nTotal:1";
    assert.strictEqual(actualValue, expectedValue);
  });

  it("Should give 'Employee ID does not exist' when record of an employee is not present", function() {
    let actualValue = queryRecords({}, "1111");
    let expectedValue = "Employee ID does not exist";
    assert.strictEqual(actualValue, expectedValue);

    let date = new Date();
    actualValue = queryRecords(
      { "1111": [{ beverage: "orange", quantity: 1, date: date }] },
      "1234"
    );
    assert.strictEqual(actualValue, expectedValue);
  });
});

// describe("isArgsValid", function() {
//   it("Should return true when args valid", function() {
//     assert.ok(isArgsValid(["--query", "1111"]));
//   });
// });

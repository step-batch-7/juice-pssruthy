const assert = require("assert");
const {
  formatOneRecord,
  formatSaveRecord,
  formateQueryRecord,
  giveHeadings
} = require("../src/formatRecord");

/*------------------------------formatOneRecord------------------------------*/

describe("formatOneRecord", function() {
  it("Should return formatted one transaction", function() {
    const actualValue = formatOneRecord({
      empId: "1234",
      beverage: "orange",
      qty: "1",
      date: "2019-11-20T05:50:28.267Z"
    });

    const expectedValue = "1234,orange,1,2019-11-20T05:50:28.267Z";
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

/*------------------------------formatSaveRecord------------------------------*/

describe("formatSaveRecord", function() {
  it("Should return formatted details of one save feature", function() {
    const record = {
      date: "2019-11-20T05:50:28.267Z",
      beverage: "orange",
      qty: "2",
      empId: "1234"
    };
    const actualValue = formatSaveRecord(record);
    const expectedValue =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n1234,orange,2,2019-11-20T05:50:28.267Z";

    assert.strictEqual(actualValue, expectedValue);
  });
});

/*------------------------------giveHeadings------------------------------*/

describe("giveHeadings", function() {
  it("Should return headings", function() {
    assert.strictEqual(giveHeadings(), "Employee ID,Beverage,Quantity,Date");
  });
});

/*------------------------------formateQueryRecord------------------------------*/

describe("formateQueryRecord", function() {
  it("Should return formatted records", function() {
    const records = [
      {
        empId: "123",
        beverage: "orange",
        qty: "1",
        date: "2019-11-20T05:50:28.267Z"
      }
    ];
    const actualValue = formateQueryRecord(records);
    const expectedValue =
      "Employee ID,Beverage,Quantity,Date\n123,orange,1,2019-11-20T05:50:28.267Z\nTotal:1 Juices";
    assert.strictEqual(actualValue, expectedValue);
  });
});

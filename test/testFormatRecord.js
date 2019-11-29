const chai = require('chai');
const assert = chai.assert;
const {
  formatOneRecord,
  formatSaveRecord,
  formateQueryRecord,
  giveHeadings
} = require('../src/formatRecord');

/*------------------------------formatOneRecord------------------------------*/

describe('formatOneRecord', function() {
  it('Should return formatted one transaction', function() {
    // const date = new Date();
    const actualValue = formatOneRecord({
      empId: '1234',
      beverage: 'Orange',
      qty: '1',
      date: '2019-11-20T05:50:28.267Z'
    });

    const expectedValue = '1234,Orange,1,2019-11-20T05:50:28.267Z';
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

/*------------------------------formatSaveRecord------------------------------*/

describe('formatSaveRecord', function() {
  it('Should return formatted details of one save feature', function() {
    // const date = new Date(2019 - 11 - 20);
    const record = {
      date: '2019-11-20T05:50:28.267Z',
      beverage: 'Orange',
      qty: '2',
      empId: '1234'
    };
    const actualValue = formatSaveRecord(record);
    const expectedValue =
      'Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n1234,Orange,2,2019-11-20T05:50:28.267Z';

    assert.strictEqual(actualValue, expectedValue);
  });
});

/*------------------------------giveHeadings------------------------------*/

describe('giveHeadings', function() {
  it('Should return headings', function() {
    assert.strictEqual(giveHeadings(), 'Employee ID,Beverage,Quantity,Date');
  });
});

/*------------------------------formateQueryRecord------------------------------*/

describe('formateQueryRecord', function() {
  it('Should return formatted records', function() {
    //const date = new Date(2019 - 11 - 20);
    const records = [
      {
        empId: '123',
        beverage: 'Orange',
        qty: '1',
        date: '2019-11-20T05:50:28.267Z'
      }
    ];
    const actualValue = formateQueryRecord(records);
    const expectedValue =
      'Employee ID,Beverage,Quantity,Date\n123,Orange,1,2019-11-20T05:50:28.267Z\nTotal:1 Juices';
    assert.strictEqual(actualValue, expectedValue);
  });
});

const chai = require('chai');
const assert = chai.assert;
const {
  saveRecord,
  queryRecords,
  getTransactionRecord,
  operateJuiceRecords,
  filterQueryRecord
} = require('../src/beverageLib');

/*------------------------------operateJuiceRecords------------------------------*/

describe('operateJuiceRecords', function() {
  it('Should give empty when feature is invalid', function() {
    assert.strictEqual(operateJuiceRecords(['']), '');
  });

  it('Should give empty when options are invalid', function() {
    assert.strictEqual(
      operateJuiceRecords(['--save', '--juice', 'Orange']),
      ''
    );
  });
  it('Should give empty when option count is invalid', function() {
    const args = ['--save', '--beverage', 'Orange', '--qty', '--empId', '1234'];
    assert.strictEqual(operateJuiceRecords(args), '');
  });

  it('Should give transaction details of save feature', function() {
    const args = [
      '--save',
      '--beverage',
      'Orange',
      '--qty',
      '1',
      '--empId',
      '1111'
    ];

    const readFunc = function(path) {
      assert.strictEqual(path, './path');
      return '';
    };

    const date = new Date().toJSON();

    const getDate = function() {
      return date;
    };

    const writeRecord = function(path, record) {
      assert.strictEqual(path, './path');
    };

    const path = './path';
    const actualValue = operateJuiceRecords(
      args,
      readFunc,
      writeRecord,
      getDate,
      path
    );
    const expectedValue =
      'Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n1111,Orange,1,' +
      date;
    assert.strictEqual(actualValue, expectedValue);
  });
});

/*------------------------------saveRecord------------------------------*/

describe('saveRecord', function() {
  it('Should record the beverage transactions record when the record is empty', function() {
    const date = new Date();
    let getDate = function() {
      return date;
    };

    const writeRecord = function(path, record) {
      assert.strictEqual(path, './juiceTransactionRecords.json');
    };

    let expectedValue = {
      empId: '1111',
      beverage: 'Orange',
      qty: 1,
      date: date
    };

    assert.deepStrictEqual(
      saveRecord(
        '',
        { '--beverage': 'Orange', '--qty': '1', '--empId': '1111' },
        writeRecord,
        './juiceTransactionRecords.json',
        getDate
      ),
      expectedValue
    );
  });

  it('Should update the beverage transactions record of an present employee', function() {
    let getDate = function() {
      return '2019-11-20T05:50:28.267Z';
    };

    const writeRecord = function(path, record) {
      assert.strictEqual(path, './juiceTransactionRecords.json');
    };

    let actualValue = saveRecord(
      '[{ "beverage": "Watermelon", "qty": "2", "date": "2019-11-20T05:50:28.267Z" }]',
      { '--empId': '1111', '--beverage': 'Orange', '--qty': '1' },
      writeRecord,
      './juiceTransactionRecords.json',
      getDate
    );

    let expectedValue = {
      empId: '1111',
      beverage: 'Orange',
      qty: 1,
      date: '2019-11-20T05:50:28.267Z'
    };

    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

/*------------------------------queryRecord------------------------------*/

describe('queryRecords', function() {
  it('Should give all beverage transactions of a employee', function() {
    let actualValue = queryRecords(
      '[{ "empId":"1111","beverage": "Orange", "qty": "1", "date": "2019-11-20T05:50:28.267Z" }]',
      { '--empId': '1111' }
    );

    let expectedValue = [
      {
        empId: '1111',
        beverage: 'Orange',
        qty: '1',
        date: '2019-11-20T05:50:28.267Z'
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it.skip("Should give 'Employee ID does not exist' when record of an employee is not present", function() {
    let actualValue = queryRecords('{}', { '-empId': '1111' });
    let expectedValue = 'Employee ID does not exist';

    assert.strictEqual(actualValue, expectedValue);

    actualValue = queryRecords(
      '{ "1111": [{ "empId":"1111","beverage": "Orange", "qty": "1", "date": "2019-11-20T05:50:28.267Z" }] }',
      { '--empId': '1234' }
    );
    assert.strictEqual(actualValue, expectedValue);
  });
});

/*------------------------------getTransactionRecord------------------------------*/

describe('getTransactionRecord', function() {
  it('Should give an record object', function() {
    const date = '2019-11-28T16:38:33.540Z';

    const getDate = function() {
      return date;
    };

    let parameters = {
      '--beverage': 'Orange',
      '--qty': '1',
      '--empId': '1235'
    };

    let actualValue = getTransactionRecord(parameters, getDate);
    let expectedValue = {
      empId: '1235',
      beverage: 'Orange',
      qty: 1,
      date: date
    };

    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

/*------------------------------filterQueryRecord------------------------------*/

describe('filterQueryRecord', function() {
  it('Should give true when the empId is same', function() {
    let record = {
      empId: '1234',
      date: '2019-11-20T05:50:28.267Z',
      qty: '1',
      beverage: 'Orange'
    };
    assert.ok(filterQueryRecord({ '--empId': '1234' }, record));
  });
  it('Should give false when the empId is different', function() {
    let record = {
      empId: '123',
      date: '2019-11-20T05:50:28.267Z',
      qty: '1',
      beverage: 'Orange'
    };
    assert.notOk(filterQueryRecord({ '--empId': '1234' }, record));
  });
  it('Should give true when the date is same', function() {
    let record = {
      empId: '1234',
      date: '2019-11-20T05:50:28.267Z',
      qty: '1',
      beverage: 'Orange'
    };
    assert.ok(filterQueryRecord({ '--date': '2019-11-20' }, record));
  });
  it('Should give false when the date is different', function() {
    let record = {
      empId: '1234',
      date: '2019-11-20T05:50:28.267Z',
      qty: '1',
      beverage: 'Orange'
    };
    assert.notOk(filterQueryRecord({ '--date': '2019-11-21' }, record));
  });
  it('Should give true when the date and empId are same', function() {
    const parameters = {
      '--date': '2019-11-20',
      '--empId': '1234'
    };
    let record = {
      empId: '1234',
      date: '2019-11-20T05:50:28.267Z',
      qty: '1',
      beverage: 'Orange'
    };
    assert.ok(filterQueryRecord(parameters, record));
  });
  it('Should give false when the date and empId are different', function() {
    const parameters = {
      '--date': '2019-11-20',
      '--empId': '1234'
    };
    const record = {
      empId: '1234',
      date: '2019-10-20T05:50:28.267Z',
      qty: '1',
      beverage: 'Orange'
    };
    assert.notOk(filterQueryRecord(parameters, record));
  });
});

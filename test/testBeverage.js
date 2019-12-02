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

describe('operateJuiceRecords', () => {
  it('Should give empty when feature is invalid', () => {
    assert.strictEqual(operateJuiceRecords(['']), '');
  });

  it('Should give empty when options are invalid', () => {
    assert.strictEqual(
      operateJuiceRecords(['--save', '--juice', 'Orange']),
      ''
    );
  });
  it('Should give empty when option count is invalid', () => {
    const args = ['--save', '--beverage', 'Orange', '--qty', '--empId', '1234'];
    assert.strictEqual(operateJuiceRecords(args), '');
  });

  it('Should give transaction details of save feature', () => {
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

    const getDate = () => {
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

describe('saveRecord', () => {
  it('Should record the beverage transactions record when the record is empty', () => {
    const date = new Date();
    let getDate = () => {
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

  it('Should update the beverage transactions record of an present employee', () => {
    let getDate = () => '2019-11-20T05:50:28.267Z';

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

describe('queryRecords', () => {
  it('Should give all beverage transactions of a employee', () => {
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

  it.skip("Should give 'Employee ID does not exist' when record of an employee is not present", () => {
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

describe('getTransactionRecord', () => {
  it('Should give an record object', () => {
    const date = '2019-11-28T16:38:33.540Z';

    const getDate = () => {
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

describe('filterQueryRecord', () => {
  it('Should give true when the empId is same', () => {
    let record = {
      empId: '1234',
      date: '2019-11-20T05:50:28.267Z',
      qty: '1',
      beverage: 'Orange'
    };
    assert.ok(filterQueryRecord({ '--empId': '1234' }, record));
  });
  it('Should give false when the empId is different', () => {
    let record = {
      empId: '123',
      date: '2019-11-20T05:50:28.267Z',
      qty: '1',
      beverage: 'Orange'
    };
    assert.notOk(filterQueryRecord({ '--empId': '1234' }, record));
  });
  it('Should give true when the date is same', () => {
    let record = {
      empId: '1234',
      date: '2019-11-20T05:50:28.267Z',
      qty: '1',
      beverage: 'Orange'
    };
    assert.ok(filterQueryRecord({ '--date': '2019-11-20' }, record));
  });
  it('Should give false when the date is different', () => {
    let record = {
      empId: '1234',
      date: '2019-11-20T05:50:28.267Z',
      qty: '1',
      beverage: 'Orange'
    };
    assert.notOk(filterQueryRecord({ '--date': '2019-11-21' }, record));
  });
  it('Should give true when the date and empId are same', () => {
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
  it('Should give false when the date and empId are different', () => {
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

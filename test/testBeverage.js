const chai = require('chai');
const assert = chai.assert;
const {
  saveRecord,
  queryRecords,
  getTransactionRecord,
  operateJuiceRecords,
  filterQueryRecord
} = require('../src/beverageLib');

describe('beverageLib.js', () => {
  /*------------------------------operateJuiceRecords------------------------------*/

  describe('operateJuiceRecords', () => {
    it('Should give empty string when feature is invalid', () => {
      assert.strictEqual(operateJuiceRecords(['']), '');
    });

    it('Should give empty string when options are invalid', () => {
      assert.strictEqual(
        operateJuiceRecords(['--save', '--juice', 'Orange']),
        ''
      );
    });
    it('Should give empty string when option count is invalid', () => {
      const args = [
        '--save',
        '--beverage',
        'Orange',
        '--qty',
        '--empId',
        '1234'
      ];
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
      const isExist = () => true;

      const readFile = function(path, encoding) {
        assert.strictEqual(encoding, 'utf8');
        assert.strictEqual(path, './path');
        return '';
      };

      const date = new Date('2019-11-28T16:38:33.540Z');

      const getDate = () => {
        return date;
      };

      const writeFile = function(path, record, encoding) {
        assert.strictEqual(encoding, 'utf8');
        assert.strictEqual(path, './path');
      };

      const path = './path';
      const fileOperations = {
        write: writeFile,
        read: readFile,
        fileExist: isExist
      };
      const actualValue = operateJuiceRecords(
        args,
        fileOperations,
        path,
        getDate,
        'utf8'
      );
      const expectedValue =
        'Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n1111,Orange,1,' +
        date.toJSON();
      assert.strictEqual(actualValue, expectedValue);
    });

    it('Should give transaction details of save feature', () => {
      const args = [
        '--save',
        '--beverage',
        'Orange',
        '--qty',
        '2',
        '--empId',
        '1123'
      ];
      const isExist = () => false;

      const readFile = function(path, encoding) {
        assert.strictEqual(encoding, 'utf8');
        assert.strictEqual(path, './path');
        return '';
      };

      const date = new Date('2019-11-28T16:38:33.540Z');

      const getDate = () => {
        return date;
      };

      const writeFile = function(path, record, encoding) {
        assert.strictEqual(encoding, 'utf8');
        assert.strictEqual(path, './path');
      };

      const path = './path';
      const fileOperations = {
        write: writeFile,
        read: readFile,
        fileExist: isExist
      };
      const actualValue = operateJuiceRecords(
        args,
        fileOperations,
        path,
        getDate,
        'utf8'
      );
      const expectedValue =
        'Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n1123,Orange,2,' +
        date.toJSON();
      assert.strictEqual(actualValue, expectedValue);
    });

    it('Should give query details of query feature', () => {
      const args = ['--query', '--beverage', 'Orange', '--empId', '1111'];
      const isExist = () => true;

      const readFile = function(path, encoding) {
        assert.strictEqual(encoding, 'utf8');
        assert.strictEqual(path, './path');
        return '[{"empId": "1111","beverage": "Orange","qty": "1","date": "2019-11-28T16:38:33.540Z"}]';
      };

      const getDate = () => {
        return new Date('2019-11-28T16:38:33.540Z');
      };

      const writeFile = function(path, record, encoding) {
        assert.strictEqual(encoding, 'utf8');
        assert.strictEqual(path, './path');
      };

      const path = './path';
      const fileOperations = {
        write: writeFile,
        read: readFile,
        fileExist: isExist
      };
      const actualValue = operateJuiceRecords(
        args,
        fileOperations,
        path,
        getDate,
        'utf8'
      );
      const expectedValue =
        'Employee ID,Beverage,Quantity,Date\n1111,Orange,1,2019-11-28T16:38:33.540Z\nTotal: 1 Juice';
      assert.strictEqual(actualValue, expectedValue);
    });
  });

  /*------------------------------saveRecord------------------------------*/

  describe('saveRecord', () => {
    it('Should update the beverage transactions when the record is empty', () => {
      const date = new Date('2019-11-28T16:38:33.540Z');
      let getDate = () => {
        return date;
      };

      const writeFile = function(path, record, encoding) {
        assert.strictEqual(encoding, 'utf8');
        assert.strictEqual(path, './juiceTransactionRecords.json');
      };
      const fileOperations = { write: writeFile, date: getDate };

      let expectedValue = {
        empId: '1111',
        beverage: 'Orange',
        qty: 1,
        date: '2019-11-28T16:38:33.540Z'
      };
      const parameters = {
        '--beverage': 'Orange',
        '--qty': '1',
        '--empId': '1111'
      };
      assert.deepStrictEqual(
        saveRecord(
          '',
          parameters,
          writeFile,
          './juiceTransactionRecords.json',
          getDate,
          'utf8'
        ),
        expectedValue
      );
    });

    it('Should update the beverage transactions record of an present employee', () => {
      let getDate = () => new Date('2019-11-20T05:50:28.267Z');

      const writeFile = function(path, record, encoding) {
        assert.strictEqual(path, './juiceTransactionRecords.json');
      };

      const currentRecords =
        '[{ "beverage": "Watermelon", "qty": "2", "date": "2019-11-20T05:50:28.267Z" }]';
      const parameters = {
        '--empId': '1111',
        '--beverage': 'Orange',
        '--qty': '1'
      };
      const fileOperations = { write: writeFile };

      let actualValue = saveRecord(
        currentRecords,
        parameters,
        writeFile,
        './juiceTransactionRecords.json',
        getDate,
        'utf8'
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
  });

  /*------------------------------getTransactionRecord------------------------------*/

  describe('getTransactionRecord', () => {
    it('Should give an record object', () => {
      const date = new Date('2019-11-28T16:38:33.540Z');

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
        date: date.toJSON()
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
      let parameters = {
        '--date': '2019-11-20',
        '--empId': '1234'
      };
      const record = {
        empId: '1234',
        date: '2019-11-20T05:50:28.267Z',
        qty: '1',
        beverage: 'Orange'
      };
      assert.ok(filterQueryRecord(parameters, record));
      parameters = {
        '--date': '2019-11-20',
        '--beverage': 'Orange'
      };
      assert.ok(filterQueryRecord(parameters, record));

      parameters = {
        '--empId': '1234',
        '--beverage': 'Orange'
      };
      assert.ok(filterQueryRecord(parameters, record));

      parameters = {
        '--empId': '1234',
        '--beverage': 'Orange',
        '--date': '2019-11-20'
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
});

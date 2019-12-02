const chai = require('chai');
const assert = chai.assert;
const {
  isFeatureOptionValid,
  areSaveFeatureDetailsValid,
  isBeverageValid,
  areArgsValid,
  areQueryDetailsValid,
  isValidEmpIdForQuery,
  areQueryOptionsValid,
  isValidBeverageForQuery
} = require('../src/validationLib');

/*------------------------------areArgsValid------------------------------*/

describe('areArgsValid', () => {
  it('Should give true for save feature', () => {
    let args = [
      '--save',
      '--qty',
      '1',
      '--beverage',
      'Orange',
      '--empId',
      '1121'
    ];
    assert.ok(areArgsValid(args));
    args = [
      '--save',
      '--beverage',
      'Watermelon',
      '--qty',
      '2',
      '--empId',
      '1234'
    ];
    assert.ok(areArgsValid(args));
  });
  it('Should give false for save feature', () => {
    let args = ['--save', '--beverage', 'Orange'];
    assert.notOk(areArgsValid(args));

    args = ['--save', '--beverage', 'Watermelon', '--qty', '1e'];
    assert.notOk(areArgsValid(args));

    args = [
      '--save',
      '--beverage',
      'Watermelon',
      '--qty',
      '1',
      '--empId',
      '12346',
      '122'
    ];
    assert.notOk(areArgsValid(args));
  });
  it('Should give true for query feature', () => {
    assert.ok(['--query', '--empId', '1234']);
    assert.ok(['--query', '--empId', '1234']);
  });
  it('Sholud give false for query invalid inputs', () => {
    assert.ok(['--query', '--empId', '123e']);
    assert.ok(['--query', '--emp', '123e']);
    assert.ok(['--query', '--empId', '123e', '123']);
  });
  it('Should give false for invalid feature', () => {
    assert.notOk(areArgsValid(['--record', '--beverage', 'Orange']));
  });
});

/*------------------------------areQueryFeatureDetailsValid------------------------------*/

describe('areQueryFeatureDetailsValid', () => {
  it('Should give true when only one option of valid arguments', () => {
    assert.ok(areQueryDetailsValid(['--empId', '12345']));
    assert.ok(areQueryDetailsValid(['--date', '2019-10-12']));
    assert.ok(areQueryDetailsValid(['--date', '2000-2-29']));
    assert.ok(areQueryDetailsValid(['--date', '2019-12-31']));
  });
  it('Should give true when combination of options of valid arguments', () => {
    assert.ok(
      areQueryDetailsValid(['--empId', '1234', '--date', '2019-10-10'])
    );
    assert.ok(
      areQueryDetailsValid(['--empId', '1234', '--date', '2019-10-10'])
    );
  });
  it('Should give false when only one option of invalid arguments', () => {
    assert.notOk(areQueryDetailsValid(['1234']));
    assert.notOk(areQueryDetailsValid(['--empId', '123e']));
    assert.notOk(areQueryDetailsValid(['--id', '12345']));
    assert.notOk(areQueryDetailsValid(['--data', '2019-15-10']));
    assert.notOk(areQueryDetailsValid(['--dates', '2019-12-12']));
  });
});

/*------------------------------areSaveFeatureDetailsValid------------------------------*/

describe('areSaveFeatureDetailsValid', () => {
  it('Should give true when details are valid', () => {
    let args = ['--beverage', 'Orange', '--qty', '1', '--empId', '11111'];
    assert.ok(areSaveFeatureDetailsValid(args));

    args = ['--beverage', 'Watermelon', '--qty', '1', '--empId', '11345'];
    assert.ok(areSaveFeatureDetailsValid(args));
  });

  it('Should give false when details are not valid', () => {
    let args = ['--beverage', 'tomato', '--qty', '2'];
    assert.notOk(areSaveFeatureDetailsValid(args));

    args = ['--juice', 'Orange', '--qty', 'e', 'empId', '1234'];
    assert.notOk(areSaveFeatureDetailsValid(args));

    args = ['--beverage', 'Orange', '--qty', '3', 'empId', '1d34'];
    assert.notOk(areSaveFeatureDetailsValid(args));
  });
});

/*------------------------------isBeverageValid------------------------------*/
describe('isBeverageValid', () => {
  it('Should give true when beverage is available', () => {
    assert.ok(isBeverageValid('Orange'));
    assert.ok(isBeverageValid('Watermelon'));
  });
  it('Should give false when beverage is not available', () => {
    assert.notOk(isBeverageValid('leaf'));
    assert.notOk(isBeverageValid('potato'));
  });
});

/*------------------------------isFeatureOptionValid------------------------------*/

describe('isFeatureOptionValid', () => {
  it('Should give true when option is valid', () => {
    assert.ok(isFeatureOptionValid('--save'));
    assert.ok(isFeatureOptionValid('--query'));
  });
  it('Should give false when option is not valid', () => {
    assert.notOk(isFeatureOptionValid('--record'));
  });
});

/*------------------------------isValidEmpIdForQuery------------------------------*/

describe('isValidEmpIdForQuery', () => {
  it('Should give true when empId is not present', () => {
    assert.ok(isValidEmpIdForQuery({}));
    assert.ok(isValidEmpIdForQuery({ '--date': '2019-11-20' }));
  });
  it('Should give true when empId is valid', () => {
    assert.ok(isValidEmpIdForQuery({ '--empId': '1123' }));
    assert.ok(
      isValidEmpIdForQuery({ '--empId': '1123', '--date': '2019-11-21' })
    );
  });
  it('Should give false when empId is not valid', () => {
    assert.notOk(isValidEmpIdForQuery({ '--empId': '112r' }));
    assert.notOk(isValidEmpIdForQuery({ '--empId': 'wee' }));
  });
});

/*------------------------------areQueryOptionsValid------------------------------*/

describe('areQueryOptionsValid', () => {
  it('Should give true for valid options', () => {
    assert.ok(areQueryOptionsValid(['--empId', '--date']));
    assert.ok(areQueryOptionsValid(['--date']));
    assert.ok(areQueryOptionsValid(['--empId']));
  });
  it('Should give false for invalid options', () => {
    assert.notOk(areQueryOptionsValid(['--id']));
    assert.notOk(areQueryOptionsValid([, '--empId', '--id']));
    assert.notOk(areQueryOptionsValid([, '--emp', '--date']));
  });
});

/*------------------------------isValidBeverageForQuery------------------------------*/

describe('isValidBeverageForQuery', function() {
  it('Should give true when date option is present and valid', function() {
    assert.ok(isValidBeverageForQuery({ '--date': '2019-10-10' }));
    let parameters = {
      '--date': '2019-10-10',
      '--beverage': 'Orange'
    };
    assert.ok(isValidBeverageForQuery(parameters));
    parameters = {
      '--date': '2019-10-10',
      '--beverage': 'Orange',
      '--empId': '1234'
    };
    assert.ok(isValidBeverageForQuery(parameters));
  });
});

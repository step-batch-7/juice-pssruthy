const chai = require('chai');
const assert = chai.assert;
const {
  isPositiveNumber,
  isValidLength,
  getSplitedParameters,
  isValidDate
} = require('../src/utilitiesLib.js');

/*------------------------------isPositiveNumber------------------------------*/
describe('isPositiveNumber', () => {
  it('Should give true for integer numbers', () => {
    assert.ok(isPositiveNumber('3'));
    assert.ok(isPositiveNumber('23'));
  });
  it('Should give false for non integere numbers', () => {
    assert.notOk(isPositiveNumber('r'));
    assert.notOk(isPositiveNumber('34r'));
    assert.notOk(isPositiveNumber('-2'));
    assert.notOk(isPositiveNumber('0'));
  });
});

/*------------------------------isValidLength------------------------------*/

describe('isValidLength', () => {
  it('Should give true for valid length', () => {
    assert.ok(isValidLength(4, 4));
  });
  it('Should give false for invalid length', () => {
    assert.notOk(isValidLength(5, 4));
  });
});

/*------------------------------isValidDate------------------------------*/

describe('isValidDate', () => {
  it('Should give true for valid date', () => {
    assert.ok(isValidDate('2019-10-10'));
    assert.ok(isValidDate('2018-12-31'));
    assert.ok(isValidDate('2000-02-29'));
  });
  it('Should give false for invalid date', () => {
    assert.notOk(isValidDate('2019-14-12'));
    assert.notOk(isValidDate('0-12-12'));
    assert.notOk(isValidDate('2000-2-30'));
    assert.notOk(isValidDate('2100-02-29'));
  });
});

/*------------------------------getSplitedParameters------------------------------*/

describe('getSplitedParameters', () => {
  it('Should give empty object when no parameters are passed', () => {
    let actualValue = getSplitedParameters({}, []);
    assert.deepStrictEqual(actualValue, {});
  });
  it('Should give splited object for one pair', () => {
    let actualValue = getSplitedParameters({}, ['--beverage', 'Orange']);
    let expectedValue = { '--beverage': 'Orange' };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it('Should give splited object for more than one pair', () => {
    let args = ['--beverage', 'Orange', '--qty', '1'];
    let actualValue = getSplitedParameters({}, args);
    let expectedValue = { '--beverage': 'Orange', '--qty': '1' };
    assert.deepStrictEqual(actualValue, expectedValue);

    args = ['--beverage', 'Orange', '--qty', '1', '--empId', '1123'];
    actualValue = getSplitedParameters({}, args);
    expectedValue = {
      '--beverage': 'Orange',
      '--qty': '1',
      '--empId': '1123'
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

const { existsSync, readFileSync, writeFileSync } = require('fs');

const readTransactionRecords = function(path) {
  if (existsSync(path)) {
    return readFileSync(path, 'utf8');
  }
  return '[]';
};

const writeTransactionRecords = function(paths, records) {
  writeFileSync(paths, records, 'utf8');
};

const getDate = () => {
  return process.env.NOW || new Date().toJSON();
};

const isPositiveNumber = function(number) {
  return +number > 0 && Number.isInteger(+number);
};

const getSplitedParameters = function(splittedParameters, parameters) {
  if (parameters.length == 0) {
    return splittedParameters;
  }
  splittedParameters[parameters[0]] = parameters[1];
  return getSplitedParameters(splittedParameters, parameters.slice(2));
};

const isValidDate = function isValidDate(date) {
  let dateArray = date.split('-');
  let newDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
  return newDate.getMonth() + 1 == dateArray[1] && +dateArray[0] > 0;
};

const isValidLength = function(length, limit) {
  return length <= limit && length % 2 == 0;
};

module.exports = {
  writeTransactionRecords,
  readTransactionRecords,
  isPositiveNumber,
  getSplitedParameters,
  getDate,
  isValidDate,
  isValidLength
};

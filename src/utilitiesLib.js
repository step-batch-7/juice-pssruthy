const { existsSync, readFileSync, writeFileSync } = require('fs');

const readTransactionRecords = function(readFile, path, isExist, encoding) {
  if (isExist(path)) {
    return readFile(path, encoding);
  }
  return '[]';
};

////////////////////////////////////////////////////////////

const writeTransactionRecords = function(writeRecord, paths, records) {
  writeRecord(paths, records, 'utf8');
};

////////////////////////////////////////////////////////////

const isPositiveNumber = function(number) {
  return +number > 0 && Number.isInteger(+number);
};

////////////////////////////////////////////////////////////

const getSplitedParameters = function(splittedParameters, parameters) {
  if (parameters.length == 0) {
    return splittedParameters;
  }
  splittedParameters[parameters[0]] = parameters[1];
  return getSplitedParameters(splittedParameters, parameters.slice(2));
};

////////////////////////////////////////////////////////////

const isValidDate = function isValidDate(date) {
  const dateArray = date.split('-');
  const newDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
  const dateFlag = newDate.getDate() == dateArray[2];
  const monthFlag = newDate.getMonth() + 1 == dateArray[1];
  const yearFlag = newDate.getFullYear() == dateArray[0];

  return dateFlag && monthFlag && yearFlag;
};

////////////////////////////////////////////////////////////

const isValidLength = function(length, limit) {
  return length <= limit && length % 2 == 0;
};

module.exports = {
  writeTransactionRecords,
  readTransactionRecords,
  isPositiveNumber,
  getSplitedParameters,
  isValidDate,
  isValidLength
};

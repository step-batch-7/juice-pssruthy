const fs = require("fs");

const readTransactionRecords = function(path) {
  return fs.readFileSync(path, "utf8");
};

const writeTransactionRecords = function(paths, records) {
  fs.writeFileSync(paths, records, "utf8");
};

const getDate = function() {
  return new Date().toJSON();
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

exports.writeTransactionRecords = writeTransactionRecords;
exports.readTransactionRecords = readTransactionRecords;
exports.isPositiveNumber = isPositiveNumber;
exports.getSplitedParameters = getSplitedParameters;
exports.getDate = getDate;

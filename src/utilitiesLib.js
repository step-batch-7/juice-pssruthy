const fs = require("fs");

const readTransactionRecords = function(path) {
  const records = fs.readFileSync(path, "utf8");
  return JSON.parse(records);
};

const writeTransactionRecords = function(paths, records) {
  fs.writeFileSync(paths, JSON.stringify(records), "utf8");
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

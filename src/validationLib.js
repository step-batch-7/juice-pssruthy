const {
  isPositiveNumber,
  getSplitedParameters,
  isValidLength
} = require("./utilitiesLib");

const areArgsValid = function(cmdLineArgs) {
  const feature = cmdLineArgs[0];

  if (isFeatureOptionValid(feature)) {
    const featureFuncs = {};
    featureFuncs["--save"] = areSaveFeatureDetailsValid;
    featureFuncs["--query"] = areQueryDetailsValid;
    isFeatureDetailsValid = featureFuncs[feature];

    return isFeatureDetailsValid(cmdLineArgs.slice(1));
  }
  return false;
};

const areSaveFeatureDetailsValid = function(details) {
  const lengthFlag = isValidLength(details.length, 6);
  const parameters = getSplitedParameters({}, details);
  const beverageFlag = isBeverageValid(parameters["--beverage"]);
  const qtyFlag = isPositiveNumber(parameters["--qty"]);
  const empIdFlag = isPositiveNumber(parameters["--empId"]);

  return lengthFlag && beverageFlag && qtyFlag && empIdFlag;
};

const areQueryDetailsValid = function(details) {
  const lengthFlag = isValidLength(details.length, 6);
  const parameters = getSplitedParameters({}, details);
  const optionsFlag = areQueryOptionsValid(Object.keys(parameters));
  const empIdFlag = isValidEmpIdForQuery(parameters);
  return lengthFlag && optionsFlag && empIdFlag;
};

const isFeatureOptionValid = function(option) {
  const validOptions = ["--save", "--query"];
  return validOptions.includes(option);
};

const isBeverageValid = function(beverage) {
  const beverages = ["Orange", "Watermelon"];

  return beverages.includes(beverage);
};

const isValidEmpIdForQuery = function(parameters) {
  const empIdPresentFlag =
    parameters.hasOwnProperty("--empId") &&
    isPositiveNumber(parameters["--empId"]);
  const empIdAbsentFlag = !parameters.hasOwnProperty("--empId");
  return empIdAbsentFlag || empIdPresentFlag;
};

const areQueryOptionsValid = function(options) {
  let optionFlag = true;
  const queryOptions = ["--empId", "--date", "--beverage"];
  for (const option of options) {
    optionFlag = optionFlag && queryOptions.includes(option);
  }
  return optionFlag;
};

exports.areArgsValid = areArgsValid;
exports.areSaveFeatureDetailsValid = areSaveFeatureDetailsValid;
exports.areQueryDetailsValid = areQueryDetailsValid;
exports.isFeatureOptionValid = isFeatureOptionValid;
exports.isBeverageValid = isBeverageValid;
exports.isValidEmpIdForQuery = isValidEmpIdForQuery;
exports.areQueryOptionsValid = areQueryOptionsValid;

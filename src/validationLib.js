const isPositiveNumber = require("./utilitiesLib").isPositiveNumber;
const getSplitedParameters = require("./utilitiesLib").getSplitedParameters;

const areArgsValid = function(cmdLineArgs) {
  const feature = cmdLineArgs[0];

  if (isFeatureOptionValid(feature)) {
    const featureFuncs = {};
    featureFuncs["--save"] = areSaveFeatureDetailsValid;
    featureFuncs["--query"] = areQueryFeatureDetailsValid;
    isFeatureDetailsValid = featureFuncs[feature];

    return isFeatureDetailsValid(cmdLineArgs.slice(1));
  }
  return false;
};

const areSaveFeatureDetailsValid = function(details) {
  if (details.length != 6) {
    return false;
  }
  const parameters = getSplitedParameters({}, details);
  const beverageFlag = isBeverageValid(parameters["--beverage"]);
  const quantityFlag = isPositiveNumber(parameters["--quantity"]);
  const empIdFlag = isPositiveNumber(parameters["--empId"]);

  return beverageFlag && quantityFlag && empIdFlag;
};

const areQueryFeatureDetailsValid = function(details) {
  return true;
};
const isFeatureOptionValid = function(option) {
  const validOptions = ["--save", "--query"];
  return validOptions.includes(option);
};

const isBeverageValid = function(beverage) {
  const beverages = ["orange", "watermelon"];

  return beverages.includes(beverage);
};

exports.areArgsValid = areArgsValid;
exports.areSaveFeatureDetailsValid = areSaveFeatureDetailsValid;
exports.isFeatureOptionValid = isFeatureOptionValid;
exports.isBeverageValid = isBeverageValid;

const {
  isPositiveNumber,
  getSplitedParameters,
  isValidLength,
  isValidDate
} = require('./utilitiesLib');

//////////////////////////////////////////////////

const areArgsValid = function(cmdLineArgs) {
  const feature = cmdLineArgs[0];

  if (isFeatureOptionValid(feature)) {
    const featureFuncs = {};
    featureFuncs['--save'] = areSaveFeatureDetailsValid;
    featureFuncs['--query'] = areQueryDetailsValid;
    isFeatureDetailsValid = featureFuncs[feature];

    return isFeatureDetailsValid(cmdLineArgs.slice(1));
  }
  return false;
};

//////////////////////////////////////////////////

const areSaveFeatureDetailsValid = function(details) {
  const lengthFlag = isValidLength(details.length, 6);
  const parameters = getSplitedParameters({}, details);
  const beverageFlag = isBeverageValid(parameters['--beverage']);
  const qtyFlag = isPositiveNumber(parameters['--qty']);
  const empIdFlag = isPositiveNumber(parameters['--empId']);

  return lengthFlag && beverageFlag && qtyFlag && empIdFlag;
};

//////////////////////////////////////////////////

const areQueryDetailsValid = function(details) {
  const lengthFlag = isValidLength(details.length, 6);
  const parameters = getSplitedParameters({}, details);
  const optionsFlag = areQueryOptionsValid(Object.keys(parameters));
  const empIdFlag = isValidEmpIdForQuery(parameters);
  const beverageFlag = isValidBeverageForQuery(parameters);
  const dateFlag = isValidDateForQuery(parameters);

  return lengthFlag && optionsFlag && empIdFlag && beverageFlag && dateFlag;
};

//////////////////////////////////////////////////

const isFeatureOptionValid = function(option) {
  const validOptions = ['--save', '--query'];
  return validOptions.includes(option);
};

//////////////////////////////////////////////////

const isBeverageValid = function(beverage) {
  const beverages = ['Orange', 'Watermelon'];

  return beverages.includes(beverage);
};

//////////////////////////////////////////////////

const isValidEmpIdForQuery = function(parameters) {
  const empIdPresentFlag =
    parameters.hasOwnProperty('--empId') &&
    isPositiveNumber(parameters['--empId']);
  const empIdAbsentFlag = !parameters.hasOwnProperty('--empId');
  return empIdAbsentFlag || empIdPresentFlag;
};
//////////////////////////////////////////////////

const isValidDateForQuery = function(parameters) {
  const option = '--date';
  const datePresentFlag =
    parameters.hasOwnProperty(option) && isValidDate(parameters[option]);
  const dateAbsentFlag = !parameters.hasOwnProperty(option);
  return dateAbsentFlag || datePresentFlag;
};

//////////////////////////////////////////////////

const isValidBeverageForQuery = function(parameters) {
  const option = '--beverage';
  const beveragePresentFlag =
    parameters.hasOwnProperty(option) && isBeverageValid(parameters[option]);
  const beverageAbsentFlag = !parameters.hasOwnProperty(option);
  return beverageAbsentFlag || beveragePresentFlag;
};

//////////////////////////////////////////////////

const areQueryOptionsValid = function(options) {
  let optionFlag = true;
  const queryOptions = ['--empId', '--date', '--beverage'];
  for (const option of options) {
    optionFlag = optionFlag && queryOptions.includes(option);
  }
  return optionFlag;
};

module.exports = {
  areArgsValid,
  areSaveFeatureDetailsValid,
  areQueryDetailsValid,
  isFeatureOptionValid,
  isBeverageValid,
  isValidEmpIdForQuery,
  areQueryOptionsValid,
  isValidBeverageForQuery
};

const writeTransactionRecords = require("./utilitiesLib")
  .writeTransactionRecords;
const areArgsValid = require("./validationLib").areArgsValid;
const getSplitedParameters = require("./utilitiesLib").getSplitedParameters;
const { formatSaveRecord, formateQueryRecord } = require("./formatRecord");

const operateJuiceRecords = function(
  cmdLineArgs,
  readFunc,
  writeFunc,
  getDate,
  path
) {
  if (!areArgsValid(cmdLineArgs)) {
    return "";
  }

  const transactionRecords = readFunc(path, "utf8");
  const featureFuncRefs = { "--save": saveRecord, "--query": queryRecords };
  const feature = cmdLineArgs[0];
  const featureFunc = featureFuncRefs[feature];
  const parameters = getSplitedParameters({}, cmdLineArgs.slice(1));

  const recordDetails = featureFunc(
    transactionRecords,
    parameters,
    writeFunc,
    path,
    getDate
  );
  const formatFuncRefs = {
    "--save": formatSaveRecord,
    "--query": formateQueryRecord
  };
  return formatFuncRefs[feature](recordDetails);
};

const saveRecord = function(
  prevTransactionRcds,
  parameters,
  writeFunc,
  path,
  getDate
) {
  let transactionRecords = [];

  if (prevTransactionRcds != "") {
    transactionRecords = JSON.parse(prevTransactionRcds);
  }

  const empId = parameters["--empId"];

  const newRecord = getTransactionRecord(parameters, getDate);
  transactionRecords.push(newRecord);
  writeFunc(path, JSON.stringify(transactionRecords));
  return newRecord;
};

const queryRecords = function(transactionRcds, parameters) {
  // const empId = parameters["--empId"];
  const transactionRecords = JSON.parse(transactionRcds);

  // if (!transactionRecords.hasOwnProperty(empId)) {
  //   return "Employee ID does not exist";
  // }
  const filteredRecords = transactionRecords.filter(
    filterQueryRecord.bind(null, parameters)
  );
  return filteredRecords;
};

const getTransactionRecord = function(parameters, getDate) {
  const newRecord = {
    empId: parameters["--empId"],
    beverage: parameters["--beverage"],
    qty: +parameters["--qty"],
    date: getDate()
  };
  return newRecord;
};

const filterQueryRecord = function(parameters, record) {
  const options = {
    "--empId": "empId",
    "--date": "date"
  };
  let flag = true;
  let optionValue = "";
  for (const option in parameters) {
    optionValue = record[options[option]];
    if (option === "--date") {
      optionValue = optionValue.slice(0, 10);
    }
    flag = flag && parameters[option] === optionValue;
  }
  return flag;
};

exports.saveRecord = saveRecord;
exports.queryRecords = queryRecords;
exports.getTransactionRecord = getTransactionRecord;
exports.operateJuiceRecords = operateJuiceRecords;
exports.filterQueryRecord = filterQueryRecord;

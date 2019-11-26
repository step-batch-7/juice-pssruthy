const writeTransactionRecords = require("./utilitiesLib")
  .writeTransactionRecords;
const areArgsValid = require("./validationLib").areArgsValid;
const getSplitedParameters = require("./utilitiesLib").getSplitedParameters;

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
  const featureFunc = featureFuncRefs[cmdLineArgs[0]];
  const parameters = getSplitedParameters({}, cmdLineArgs.slice(1));

  return featureFunc(transactionRecords, parameters, writeFunc, path, getDate);
};

const saveRecord = function(
  prevTransactionRcds,
  parameters,
  writeFunc,
  path,
  getDate
) {
  let transactionRecords = {};

  if (prevTransactionRcds != "") {
    transactionRecords = JSON.parse(prevTransactionRcds);
  }

  const empId = parameters["--empId"];

  if (!transactionRecords.hasOwnProperty(empId)) {
    transactionRecords[empId] = [];
  }

  const newRecord = getTransactionRecord(parameters, getDate);
  transactionRecords[empId].push(newRecord);
  writeFunc(path, JSON.stringify(transactionRecords));

  let recordedTransaction = "Employee ID,Beverage,Quantity,Date\n";
  recordedTransaction =
    recordedTransaction +
    empId +
    "," +
    newRecord["beverage"] +
    "," +
    newRecord["quantity"] +
    "," +
    newRecord["date"];
  return recordedTransaction;
};

const queryRecords = function(transactionRcds, parameters) {
  const empId = parameters["--empId"];
  const transactionRecords = JSON.parse(transactionRcds);

  if (!transactionRecords.hasOwnProperty(empId)) {
    return "Employee ID does not exist";
  }
  let empRecords = "Transaction completed\nEmployee ID,Beverage,Quantity,Date";
  let totalBeverage = 0;
  for (let transaction of transactionRecords[empId]) {
    empRecords =
      empRecords +
      "\n" +
      empId +
      "," +
      transaction["beverage"] +
      "," +
      transaction["quantity"] +
      "," +
      transaction["date"];
    totalBeverage += +transaction["quantity"];
  }
  empRecords = empRecords + "\n" + "Total:" + totalBeverage + " juices";
  return empRecords;
};

const getTransactionRecord = function(parameters, getDate) {
  const newRecord = {
    beverage: parameters["--beverage"],
    quantity: +parameters["--quantity"],
    date: getDate()
  };
  return newRecord;
};

exports.saveRecord = saveRecord;
exports.queryRecords = queryRecords;
exports.getTransactionRecord = getTransactionRecord;
exports.operateJuiceRecords = operateJuiceRecords;

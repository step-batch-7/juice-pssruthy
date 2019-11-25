const writeTransactionRecords = require("./utilitiesLib.js")
  .writeTransactionRecords;

// const operateJuiceRecords = function(transactionRecords, cmdLineArgs, path) {
//   if (!areArgsValid(cmdLineArgs)) {
//     return "";
//   }
//   return getFeature(cmdLineArgs, path, transactionRecords);
// };

const saveRecord = function(
  transactionRecords,
  empId,
  beverage,
  quantity,
  date,
  paths
) {
  if (!Object.keys(transactionRecords).includes(empId)) {
    transactionRecords[empId] = [];
  }
  transactionRecords[empId].push({
    beverage: beverage,
    quantity: quantity,
    date: date
  });
  writeTransactionRecords(paths, transactionRecords);
  let recordedTransaction = "Employee ID,Beverage,Quantity,Date\n";
  recordedTransaction =
    recordedTransaction + empId + "," + beverage + "," + quantity + "," + date;
  return recordedTransaction;
};

const queryRecords = function(transactionRecords, empId) {
  if (!transactionRecords.hasOwnProperty(empId)) {
    return "Employee ID does not exist";
  }
  let empRecords = "Employee ID,Beverage,Quantity,Date";
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
  empRecords = empRecords + "\n" + "Total:" + totalBeverage;
  return empRecords;
};

exports.saveRecord = saveRecord;
exports.queryRecords = queryRecords;

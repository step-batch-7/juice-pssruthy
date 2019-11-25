console.log("Anna Juice Ltd");
const readTransactionRecords = require("src/utilitiesLib.js")
  .readTransactionRecords;

const main = function(cmdLinArgs) {
  const path = "../juiceTransactionRecords.json";
  const transactionRecords = readTransactionRecords(path);
  console.log(operateJuiceRecords(transactionRecords, cmdLinArgs, path));
};

main(process.argv.slice(2));

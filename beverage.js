console.log("Anna Juice Ltd");
const operateJuiceRecords = require("./src/beverageLib").operateJuiceRecords;
const readTransactionRecords = require("./src/utilitiesLib")
  .readTransactionRecords;
const writeTransactionRecords = require("./src/utilitiesLib")
  .writeTransactionRecords;
const getDate = require("./src/utilitiesLib").getDate;

const main = function(cmdLinArgs) {
  const path = "./juiceTransactionRecords.json";
  console.log(
    operateJuiceRecords(
      cmdLinArgs,
      readTransactionRecords,
      writeTransactionRecords,
      getDate,
      path
    )
  );
};

main(process.argv.slice(2));

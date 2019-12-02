const operateJuiceRecords = require('./src/beverageLib').operateJuiceRecords;
const {
  readTransactionRecords,
  writeTransactionRecords,
  getDate
} = require('./src/utilitiesLib');
const { getDataStorePath } = require('./src/config');

const main = function(cmdLinArgs) {
  const path = getDataStorePath(process.env);
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

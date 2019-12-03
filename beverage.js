const { readFileSync, writeFileSync, existsSync } = require('fs');
const { operateJuiceRecords } = require('./src/beverageLib');
const { getDataStorePath, timeStamp } = require('./src/config');

const main = function(cmdLinArgs) {
  const path = getDataStorePath(process.env);
  const readFile = readFileSync;
  const writeFille = writeFileSync;
  const isFileExist = existsSync;
  const getDate = timeStamp.bind(null, process.env);
  const encoding = 'utf8';

  const fileOperations = {
    write: writeFille,
    read: readFile,
    fileExist: isFileExist
  };
  console.log(
    operateJuiceRecords(cmdLinArgs, fileOperations, path, getDate, encoding)
  );
};

main(process.argv.slice(2));

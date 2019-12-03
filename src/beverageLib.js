const { areArgsValid } = require('./validationLib');
const {
  getSplitedParameters,
  readTransactionRecords,
  writeTransactionRecords
} = require('./utilitiesLib');
const { formatSaveRecord, formateQueryRecord } = require('./formatRecord');

////////////////////////////////////////////////////////////

const operateJuiceRecords = function(
  cmdLineArgs,
  fileOperations,
  path,
  getDate,
  encoding
) {
  if (!areArgsValid(cmdLineArgs)) {
    return '';
  }

  const transactionRecords = readTransactionRecords(
    fileOperations.read,
    path,
    fileOperations.fileExist,
    'utf8'
  );
  const featureOperations = { '--save': saveRecord, '--query': queryRecords };
  const feature = cmdLineArgs[0];
  const featureFunc = featureOperations[feature];
  const parameters = getSplitedParameters({}, cmdLineArgs.slice(1));

  const recordDetails = featureFunc(
    transactionRecords,
    parameters,
    fileOperations.write,
    path,
    getDate,
    encoding
  );
  const formatOperation = {
    '--save': formatSaveRecord,
    '--query': formateQueryRecord
  };

  return formatOperation[feature](recordDetails);
};

////////////////////////////////////////////////////////////

const saveRecord = function(
  prevTransactionRcds,
  parameters,
  writeRecord,
  path,
  getDate,
  encoding
) {
  let transactionRecords = [];

  if (prevTransactionRcds != '') {
    transactionRecords = JSON.parse(prevTransactionRcds);
  }

  const newRecord = getTransactionRecord(parameters, getDate);
  transactionRecords.push(newRecord);
  writeTransactionRecords(
    writeRecord,
    path,
    JSON.stringify(transactionRecords),
    encoding
  );
  return newRecord;
};

////////////////////////////////////////////////////////////

const queryRecords = function(transactionRcds, parameters) {
  const transactionRecords = JSON.parse(transactionRcds);

  const filteredRecords = transactionRecords.filter(
    filterQueryRecord.bind(null, parameters)
  );
  return filteredRecords;
};

////////////////////////////////////////////////////////////

const getTransactionRecord = function(parameters, getDate) {
  const date = getDate();
  const newRecord = {
    empId: parameters['--empId'],
    beverage: parameters['--beverage'],
    qty: +parameters['--qty'],
    date: date.toJSON()
  };
  return newRecord;
};

////////////////////////////////////////////////////////////

const filterQueryRecord = function(parameters, record) {
  const options = {
    '--empId': 'empId',
    '--date': 'date',
    '--beverage': 'beverage'
  };
  let flag = true;
  let optionValue = '';
  for (const option in parameters) {
    optionValue = record[options[option]];
    if (option === '--date') {
      flag = flag && isDatesEqual(parameters[option], optionValue);
    } else flag = flag && parameters[option] === optionValue;
  }
  return flag;
};

const isDatesEqual = function(date1, date2) {
  const newDate1 = new Date(date1);
  const newDate2 = new Date(date2);
  const dateFlag = newDate1.getDate() == newDate2.getDate();
  const monthFlag = newDate1.getMonth() == newDate2.getMonth();
  const yearFlag = newDate1.getFullYear() == newDate2.getFullYear();

  return dateFlag && monthFlag && yearFlag;
};

module.exports = {
  saveRecord,
  queryRecords,
  getTransactionRecord,
  operateJuiceRecords,
  filterQueryRecord,
  isDatesEqual
};

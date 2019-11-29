const formatSaveRecord = function(record) {
  let formatedRecord = 'Transaction Recorded:';
  formatedRecord = `${formatedRecord}\n${giveHeadings()}\n${formatOneRecord(
    record
  )}`;
  return formatedRecord;
};

const formateQueryRecord = function(records) {
  let formatedRecords = giveHeadings();
  let totalBeverages = 0;
  for (const record of records) {
    formatedRecords = `${formatedRecords}\n${formatOneRecord(record)}`;
    totalBeverages = totalBeverages + +record['qty'];
  }
  formatedRecords = `${formatedRecords}\nTotal:${totalBeverages} Juices`;
  return formatedRecords;
};

const formatOneRecord = function(record) {
  const formatedRecord = `${record['empId']},${record['beverage']},${record['qty']},${record['date']}`;
  return formatedRecord;
};

const giveHeadings = function() {
  return 'Employee ID,Beverage,Quantity,Date';
};

exports.formatOneRecord = formatOneRecord;
exports.formatSaveRecord = formatSaveRecord;
exports.giveHeadings = giveHeadings;
exports.formateQueryRecord = formateQueryRecord;

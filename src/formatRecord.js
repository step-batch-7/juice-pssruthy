const formatSaveRecord = function(record) {
  let formatedRecord = 'Transaction Recorded:';
  formatedRecord = `${formatedRecord}\n${giveHeading()}\n${formatOneRecord(
    record
  )}`;
  return formatedRecord;
};

const formateQueryRecord = function(records) {
  let formatedRecords = giveHeading();
  let totalBeverages = 0;
  for (const record of records) {
    formatedRecords = `${formatedRecords}\n${formatOneRecord(record)}`;
    totalBeverages = totalBeverages + +record['qty'];
  }
  let juiceNoun = 'Juice';
  totalBeverages > 1 ? (juiceNoun = 'Juices') : (juiceNoun = 'Juice');
  formatedRecords = `${formatedRecords}\nTotal: ${totalBeverages} ${juiceNoun}`;
  return formatedRecords;
};

const formatOneRecord = function(record) {
  const formatedRecord = `${record.empId},${record.beverage},${record.qty},${record.date}`;
  return formatedRecord;
};

const giveHeading = () => {
  return ['Employee ID', 'Beverage', 'Quantity', 'Date'].join(',');
};

module.exports = {
  formatOneRecord,
  formatSaveRecord,
  giveHeading,
  formateQueryRecord
};

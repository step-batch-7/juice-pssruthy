const getDataStorePath = env =>
  env.JUICE_TRANSACTIONS_STORE_PATH || './data/juiceTransactionRecords.json';

const timeStamp = env => {
  const stubbedDate = new Date(env.NOW);
  const hasValidStubbedDate = !isNaN(stubbedDate.getTime());
  return hasValidStubbedDate ? stubbedDate : new Date();
};

module.exports = { getDataStorePath, timeStamp };

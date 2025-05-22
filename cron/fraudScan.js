const cron = require('node-cron');
const User = require('../models/User');

const dailyFraudScan = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running daily fraud scan...');

    const users = await User.find();
    users.forEach(user => {
      const flagged = user.transactions.filter(tx => tx.isFlagged);
      if (flagged.length > 0) {
        console.log(`User: ${user.email}`);
        flagged.forEach(tx => {
          console.log(`  Flagged transaction: ${tx.type} of ${tx.amount} - ${tx.fraudNote}`);
        });
      }
    });

    console.log('Fraud scan complete.');
  });
};

module.exports = dailyFraudScan;
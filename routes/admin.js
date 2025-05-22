const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get all flagged transactions
router.get('/flagged', async (req, res) => {
  const users = await User.find();
  const flagged = [];

  users.forEach(user => {
    const flaggedTx = user.transactions.filter(tx => tx.isFlagged);
    flagged.push(...flaggedTx);
  });

  res.json(flagged);
});

// Get top 5 users by balance
router.get('/top-users', async (req, res) => {
  const users = await User.find().sort({ balance: -1 }).limit(5);
  res.json(users.map(u => ({
    email: u.email,
    balance: u.balance
  })));
});

// Get total balance in system
router.get('/total-balance', async (req, res) => {
  const users = await User.find();
  const total = users.reduce((sum, user) => sum + user.balance, 0);
  res.json({ totalBalance: total });
});

module.exports = router;
const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Deposit
router.post('/deposit', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  const { amount } = req.body;

  if (amount <= 0) return res.status(400).send('Invalid amount');

  user.balance += amount;
  user.transactions.push({ type: 'deposit', amount });
  await user.save();

  res.send('Deposit successful');
});

// Withdraw
router.post('/withdraw', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  const { amount } = req.body;

  if (amount <= 0 || amount > user.balance) {
    return res.status(400).send('Invalid amount or insufficient funds');
  }

  const isFlagged = amount > 5000;

  user.balance -= amount;
  user.transactions.push({
    type: 'withdraw',
    amount,
    isFlagged,
    fraudNote: isFlagged ? 'Large withdrawal' : null
  });

  await user.save();

  res.send('Withdrawal successful');
});

// Transfer
router.post('/transfer', auth, async (req, res) => {
  const { toEmail, amount } = req.body;
  const sender = await User.findById(req.user.id);
  const receiver = await User.findOne({ email: toEmail });

  if (!receiver || amount <= 0 || sender.balance < amount || toEmail === sender.email) {
    return res.status(400).send('Invalid transfer');
  }

  const now = new Date();
  const recentTransfers = sender.transactions.filter(
    t => t.type === 'transfer' && now - new Date(t.timestamp) < 60000
  );
  const isFlagged = recentTransfers.length >= 3;

  sender.balance -= amount;
  receiver.balance += amount;

  sender.transactions.push({
    type: 'transfer',
    amount,
    to: toEmail,
    isFlagged,
    fraudNote: isFlagged ? 'Multiple rapid transfers' : null
  });

  receiver.transactions.push({
    type: 'received',
    amount,
    to: sender.email
  });

  await sender.save();
  await receiver.save();

  res.send('Transfer successful');
});

// View Balance
router.get('/balance', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ balance: user.balance });
});

// View Transactions
router.get('/transactions', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.transactions);
});

module.exports = router;
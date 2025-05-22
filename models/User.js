const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: String, // deposit, withdraw, transfer
  amount: Number,
  to: String, // for transfers
  isFlagged: Boolean,
  fraudNote: String,
  timestamp: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  balance: { type: Number, default: 0 },
  transactions: [transactionSchema]
});

module.exports = mongoose.model('User', userSchema);
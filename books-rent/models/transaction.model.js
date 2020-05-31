const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    isCompleted: Boolean
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
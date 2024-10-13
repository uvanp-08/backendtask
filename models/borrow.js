const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  dueAmount: { type: Number, default: 0 },
});

const Borrow = mongoose.model('Borrow', borrowSchema);
module.exports = Borrow;

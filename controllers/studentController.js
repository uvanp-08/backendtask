const Book = require('../models/book');
const Borrow = require('../models/borrow');

const getAvailableBooks = async (req, res) => {
  const books = await Book.find({ available: true });
  res.send(books);
};

const getBorrowedBooks = async (req, res) => {
  const borrowed = await Borrow.find({ student: req.user._id }).populate('book');
  res.send(borrowed);
};

module.exports = { getAvailableBooks, getBorrowedBooks };

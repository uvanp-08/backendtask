const Book = require('../models/book');
const Borrow = require('../models/borrow');

const addBook = async (req, res) => {
  const { title, author } = req.body;
  const book = new Book({ title, author });
  await book.save();
  res.status(201).send(book);
};

const getAllBorrowedBooks = async (req, res) => {
  const borrowed = await Borrow.find().populate('student book');
  res.send(borrowed);
};

module.exports = { addBook, getAllBorrowedBooks };

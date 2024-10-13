const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getAvailableBooks, getBorrowedBooks } = require('../controllers/studentController');

const router = express.Router();

router.get('/books/available', authMiddleware, getAvailableBooks);
router.get('/books/borrowed', authMiddleware, getBorrowedBooks);

module.exports = router;

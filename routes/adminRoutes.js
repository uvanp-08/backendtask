const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { addBook, getAllBorrowedBooks } = require('../controllers/adminController');

const router = express.Router();

router.post('/books', authMiddleware, isAdmin, addBook);
router.get('/borrowed', authMiddleware, isAdmin, getAllBorrowedBooks);

module.exports = router;

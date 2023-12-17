const express = require('express');
const { getAllExpenses, getExpenseById, updateExpense, createExpense, deleteExpense } = require('../controllers/expenseController');
const { AuthenticatorJWT } = require('../middlewares/authenticator');

const router = express.Router();

router.get('/', AuthenticatorJWT, getAllExpenses);
router.get('/get/:id', AuthenticatorJWT, getExpenseById);
router.post('/update/:id', AuthenticatorJWT, updateExpense);
router.post('/create', AuthenticatorJWT, createExpense);
router.delete('/delete/:id', AuthenticatorJWT, deleteExpense);

module.exports = router;
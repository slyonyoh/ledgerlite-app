const express = require('express');
const { authenticate } = require('../../../middleware/auth');
const validate = require('../../../middleware/validate');
const { createExpense } = require('../controllers/expense.controller');
const { createExpenseSchema } = require('../validators/expense.validator');

const router = express.Router();
router.post('/', authenticate, validate(createExpenseSchema), createExpense);

module.exports = router;

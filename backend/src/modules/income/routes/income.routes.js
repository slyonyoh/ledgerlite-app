const express = require('express');
const { authenticate } = require('../../../middleware/auth');
const validate = require('../../../middleware/validate');
const { createIncome, listIncome } = require('../controllers/income.controller');
const { createIncomeSchema } = require('../validators/income.validator');

const router = express.Router();
router.post('/', authenticate, validate(createIncomeSchema), createIncome);
router.get('/', authenticate, listIncome);

module.exports = router;

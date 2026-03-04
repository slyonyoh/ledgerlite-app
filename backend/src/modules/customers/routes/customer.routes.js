const express = require('express');
const { authenticate } = require('../../../middleware/auth');
const validate = require('../../../middleware/validate');
const c = require('../controllers/customer.controller');
const v = require('../validators/customer.validator');

const router = express.Router();
router.post('/', authenticate, validate(v.customerSchema), c.addCustomer);
router.post('/:id/credit', authenticate, validate(v.creditSchema), c.addCredit);
router.post('/:id/payment', authenticate, validate(v.paymentSchema), c.addPayment);
router.get('/outstanding', authenticate, c.outstanding);
router.post('/:id/reminder', authenticate, c.sendReminder);

module.exports = router;

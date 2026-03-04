const express = require('express');
const { authenticate } = require('../../../middleware/auth');
const validate = require('../../../middleware/validate');
const c = require('../controllers/supplier.controller');
const v = require('../validators/supplier.validator');

const router = express.Router();
router.post('/', authenticate, validate(v.supplierSchema), c.addSupplier);
router.post('/:id/payable', authenticate, validate(v.payableSchema), c.recordPayable);
router.post('/:id/payment', authenticate, validate(v.payableSchema), c.recordPayment);

module.exports = router;

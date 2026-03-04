const express = require('express');
const { authenticate } = require('../../../middleware/auth');
const validate = require('../../../middleware/validate');
const controller = require('../controllers/business.controller');
const { businessSchema } = require('../validators/business.validator');

const router = express.Router();
router.post('/profile', authenticate, validate(businessSchema), controller.upsertProfile);

module.exports = router;

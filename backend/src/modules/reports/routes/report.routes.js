const express = require('express');
const { authenticate } = require('../../../middleware/auth');
const { monthlyReport } = require('../controllers/report.controller');

const router = express.Router();
router.get('/monthly', authenticate, monthlyReport);

module.exports = router;

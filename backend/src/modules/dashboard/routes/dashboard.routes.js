const express = require('express');
const { authenticate } = require('../../../middleware/auth');
const { summary } = require('../controllers/dashboard.controller');

const router = express.Router();
router.get('/summary', authenticate, summary);

module.exports = router;

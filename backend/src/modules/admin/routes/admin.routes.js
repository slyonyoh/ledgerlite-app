const express = require('express');
const { authenticate, authorize } = require('../../../middleware/auth');
const validate = require('../../../middleware/validate');
const c = require('../controllers/admin.controller');
const { flagSchema } = require('../validators/admin.validator');

const router = express.Router();
router.get('/stats', authenticate, authorize('ADMIN'), c.stats);
router.post('/flags', authenticate, authorize('ADMIN'), validate(flagSchema), c.flagSuspicious);
router.patch('/users/:id/suspend', authenticate, authorize('ADMIN'), c.suspend);

module.exports = router;

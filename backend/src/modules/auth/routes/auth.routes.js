const express = require('express');
const controller = require('../controllers/auth.controller');
const validate = require('../../../middleware/validate');
const { loginSchema } = require('../validators/auth.validator');

const router = express.Router();
router.post('/login', validate(loginSchema), controller.login);

module.exports = router;

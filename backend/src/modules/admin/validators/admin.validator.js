const Joi = require('joi');

const flagSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  reason: Joi.string().min(6).required()
});

module.exports = { flagSchema };

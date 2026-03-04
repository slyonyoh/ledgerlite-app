const Joi = require('joi');

const loginSchema = Joi.object({
  firebaseToken: Joi.string().required(),
  phoneNumber: Joi.string().required()
});

module.exports = { loginSchema };

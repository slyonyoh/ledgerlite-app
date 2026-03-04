const Joi = require('joi');

const businessSchema = Joi.object({
  name: Joi.string().min(2).max(150).required(),
  category: Joi.string().required(),
  location: Joi.string().required()
});

module.exports = { businessSchema };

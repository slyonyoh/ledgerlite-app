const Joi = require('joi');

const createIncomeSchema = Joi.object({
  amount: Joi.number().positive().required(),
  description: Joi.string().allow('').optional(),
  category: Joi.string().required(),
  paymentMethod: Joi.string().valid('cash', 'transfer', 'pos').required(),
  entryDate: Joi.date().required()
});

module.exports = { createIncomeSchema };

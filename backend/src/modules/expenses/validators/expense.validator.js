const Joi = require('joi');

const createExpenseSchema = Joi.object({
  amount: Joi.number().positive().required(),
  category: Joi.string().required(),
  vendorName: Joi.string().required(),
  entryDate: Joi.date().required(),
  recurringRule: Joi.string().allow(null, '').optional()
});

module.exports = { createExpenseSchema };

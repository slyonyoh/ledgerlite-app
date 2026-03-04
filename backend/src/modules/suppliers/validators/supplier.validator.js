const Joi = require('joi');

const supplierSchema = Joi.object({ name: Joi.string().required(), phone: Joi.string().allow('').optional() });
const payableSchema = Joi.object({ amount: Joi.number().positive().required(), transactionDate: Joi.date().required() });

module.exports = { supplierSchema, payableSchema };

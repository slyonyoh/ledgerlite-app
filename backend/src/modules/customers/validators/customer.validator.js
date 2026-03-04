const Joi = require('joi');

const customerSchema = Joi.object({ name: Joi.string().required(), phone: Joi.string().required() });
const creditSchema = Joi.object({ amount: Joi.number().positive().required(), note: Joi.string().allow('').optional(), transactionDate: Joi.date().required() });
const paymentSchema = Joi.object({ amount: Joi.number().positive().required(), transactionDate: Joi.date().required() });

module.exports = { customerSchema, creditSchema, paymentSchema };

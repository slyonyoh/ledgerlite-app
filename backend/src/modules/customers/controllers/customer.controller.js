const db = require('../../../config/db');

const axios = require('axios');
const env = require('../../../config/env');

async function addCustomer(req, res, next) {
  try {
    const result = await db.query(
      'INSERT INTO customers (business_id, name, phone) VALUES ($1, $2, $3) RETURNING *',
      [req.user.businessId, req.body.name, req.body.phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) { next(error); }
}

async function addCredit(req, res, next) {
  try {
    const result = await db.query(
      `INSERT INTO customer_transactions (business_id, customer_id, transaction_type, amount, note, transaction_date)
       VALUES ($1, $2, 'CREDIT_SALE', $3, $4, $5) RETURNING *`,
      [req.user.businessId, req.params.id, req.body.amount, req.body.note, req.body.transactionDate]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) { next(error); }
}

async function addPayment(req, res, next) {
  try {
    const result = await db.query(
      `INSERT INTO customer_transactions (business_id, customer_id, transaction_type, amount, transaction_date)
       VALUES ($1, $2, 'REPAYMENT', $3, $4) RETURNING *`,
      [req.user.businessId, req.params.id, req.body.amount, req.body.transactionDate]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) { next(error); }
}

async function outstanding(req, res, next) {
  try {
    const result = await db.query(
      `SELECT c.id, c.name,
      COALESCE(SUM(CASE WHEN ct.transaction_type='CREDIT_SALE' THEN ct.amount ELSE 0 END),0) -
      COALESCE(SUM(CASE WHEN ct.transaction_type='REPAYMENT' THEN ct.amount ELSE 0 END),0) AS outstanding_balance
      FROM customers c
      LEFT JOIN customer_transactions ct ON ct.customer_id = c.id AND ct.deleted_at IS NULL
      WHERE c.business_id = $1 AND c.deleted_at IS NULL
      GROUP BY c.id
      ORDER BY outstanding_balance DESC`, [req.user.businessId]
    );
    res.status(200).json(result.rows);
  } catch (error) { next(error); }
}


async function sendReminder(req, res, next) {
  try {
    const customer = await db.query('SELECT phone, name FROM customers WHERE id = $1 AND business_id = $2', [req.params.id, req.user.businessId]);
    if (!customer.rows[0]) return res.status(404).json({ message: 'Customer not found' });

    await axios.post(env.smsProviderUrl, {
      to: customer.rows[0].phone,
      message: `Dear ${customer.rows[0].name}, kindly settle your outstanding debt with LedgerLite merchant.`
    });

    res.status(200).json({ message: 'Reminder sent' });
  } catch (error) {
    next(error);
  }
}

module.exports = { addCustomer, addCredit, addPayment, outstanding, sendReminder };

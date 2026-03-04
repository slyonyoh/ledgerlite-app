const db = require('../../../config/db');

async function addSupplier(req, res, next) {
  try {
    const result = await db.query('INSERT INTO suppliers (business_id, name, phone) VALUES ($1, $2, $3) RETURNING *', [req.user.businessId, req.body.name, req.body.phone]);
    res.status(201).json(result.rows[0]);
  } catch (e) { next(e); }
}

async function recordPayable(req, res, next) {
  try {
    const result = await db.query(
      `INSERT INTO supplier_transactions (business_id, supplier_id, transaction_type, amount, transaction_date)
      VALUES ($1, $2, 'PAYABLE', $3, $4) RETURNING *`, [req.user.businessId, req.params.id, req.body.amount, req.body.transactionDate]
    );
    res.status(201).json(result.rows[0]);
  } catch (e) { next(e); }
}

async function recordPayment(req, res, next) {
  try {
    const result = await db.query(
      `INSERT INTO supplier_transactions (business_id, supplier_id, transaction_type, amount, transaction_date)
      VALUES ($1, $2, 'PAYMENT', $3, $4) RETURNING *`, [req.user.businessId, req.params.id, req.body.amount, req.body.transactionDate]
    );
    res.status(201).json(result.rows[0]);
  } catch (e) { next(e); }
}

module.exports = { addSupplier, recordPayable, recordPayment };

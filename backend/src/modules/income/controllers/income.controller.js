const db = require('../../../config/db');

async function createIncome(req, res, next) {
  try {
    const { sub, businessId } = req.user;
    const result = await db.query(
      `INSERT INTO income_entries (business_id, user_id, amount, description, category, payment_method, entry_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [businessId, sub, req.body.amount, req.body.description, req.body.category, req.body.paymentMethod, req.body.entryDate]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

async function listIncome(req, res, next) {
  try {
    const filter = req.query.filter || 'monthly';
    const windows = { daily: "NOW() - INTERVAL '1 day'", weekly: "NOW() - INTERVAL '7 day'", monthly: "NOW() - INTERVAL '30 day'" };
    const sqlWindow = windows[filter] || windows.monthly;
    const result = await db.query(
      `SELECT * FROM income_entries
       WHERE business_id = $1 AND deleted_at IS NULL AND entry_date >= ${sqlWindow}
       ORDER BY entry_date DESC`,
      [req.user.businessId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

module.exports = { createIncome, listIncome };

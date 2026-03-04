const db = require('../../../config/db');

async function createExpense(req, res, next) {
  try {
    const { sub, businessId } = req.user;
    const result = await db.query(
      `INSERT INTO expense_entries (business_id, user_id, amount, category, vendor_name, entry_date, recurring_rule)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [businessId, sub, req.body.amount, req.body.category, req.body.vendorName, req.body.entryDate, req.body.recurringRule]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = { createExpense };

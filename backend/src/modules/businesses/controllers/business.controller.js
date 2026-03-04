const db = require('../../../config/db');

async function upsertProfile(req, res, next) {
  try {
    const { sub } = req.user;
    const { name, category, location } = req.body;

    const business = await db.query(
      `INSERT INTO businesses (name, category, location)
       VALUES ($1, $2, $3)
       RETURNING id, name, category, location`,
      [name, category, location]
    );

    await db.query('UPDATE users SET business_id = $1, updated_at = NOW() WHERE id = $2', [business.rows[0].id, sub]);

    res.status(201).json(business.rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = { upsertProfile };

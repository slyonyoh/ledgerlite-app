const db = require('../../../config/db');

async function stats(req, res, next) {
  try {
    const [users, volume] = await Promise.all([
      db.query("SELECT COUNT(*)::int AS total_users FROM users WHERE deleted_at IS NULL"),
      db.query("SELECT COALESCE(SUM(amount),0) AS volume FROM (SELECT amount FROM income_entries UNION ALL SELECT amount FROM expense_entries) x")
    ]);

    res.status(200).json({ totalUsers: users.rows[0].total_users, transactionVolume: Number(volume.rows[0].volume) });
  } catch (e) { next(e); }
}

async function flagSuspicious(req, res, next) {
  try {
    const { userId, reason } = req.body;
    await db.query('INSERT INTO audit_logs (business_id, actor_user_id, action, metadata) VALUES (NULL, $1, $2, $3)', [req.user.sub, 'FLAG_SUSPICIOUS', { userId, reason }]);
    res.status(201).json({ message: 'Flag recorded' });
  } catch (e) { next(e); }
}

async function suspend(req, res, next) {
  try {
    await db.query('UPDATE users SET is_suspended = true, updated_at = NOW() WHERE id = $1', [req.params.id]);
    res.status(200).json({ message: 'Account suspended' });
  } catch (e) { next(e); }
}

module.exports = { stats, flagSuspicious, suspend };

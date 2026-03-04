const db = require('../../../config/db');

async function logEvent({ businessId, actorUserId, action, metadata }) {
  await db.query(
    'INSERT INTO audit_logs (business_id, actor_user_id, action, metadata) VALUES ($1, $2, $3, $4)',
    [businessId, actorUserId, action, metadata]
  );
}

module.exports = { logEvent };

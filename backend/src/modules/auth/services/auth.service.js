const admin = require('../../../config/firebase');
const db = require('../../../config/db');
const { signToken } = require('../../../utils/jwt');

async function loginWithFirebase({ firebaseToken, phoneNumber }) {
  let decoded = { uid: phoneNumber, phone_number: phoneNumber };
  if (admin.apps.length) {
    decoded = await admin.auth().verifyIdToken(firebaseToken);
  }

  const existing = await db.query(
    'SELECT id, role, business_id FROM users WHERE firebase_uid = $1 AND deleted_at IS NULL',
    [decoded.uid]
  );

  let user = existing.rows[0];
  if (!user) {
    const created = await db.query(
      `INSERT INTO users (firebase_uid, phone_number, role)
       VALUES ($1, $2, 'BUSINESS_OWNER')
       RETURNING id, role, business_id`,
      [decoded.uid, phoneNumber]
    );
    user = created.rows[0];
  }

  const accessToken = signToken({ sub: user.id, role: user.role, businessId: user.business_id });
  return { accessToken, user };
}

module.exports = { loginWithFirebase };

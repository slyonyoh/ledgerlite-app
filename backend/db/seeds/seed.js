const db = require('../../src/config/db');

async function seed() {
  const business = await db.query(
    `INSERT INTO businesses (name, category, location) VALUES ('Mama T Store', 'Retail', 'Lagos') RETURNING id`
  );

  const user = await db.query(
    `INSERT INTO users (business_id, firebase_uid, phone_number, role) VALUES ($1, 'seed-firebase-uid', '+2348000000000', 'ADMIN') RETURNING id`,
    [business.rows[0].id]
  );

  await db.query(
    `INSERT INTO income_entries (business_id, user_id, amount, description, category, payment_method, entry_date)
     VALUES ($1,$2,25000,'Morning sales','General','cash', CURRENT_DATE)`,
    [business.rows[0].id, user.rows[0].id]
  );

  await db.query(
    `INSERT INTO expense_entries (business_id, user_id, amount, category, vendor_name, entry_date)
     VALUES ($1,$2,7000,'Inventory','Big Supply', CURRENT_DATE)`,
    [business.rows[0].id, user.rows[0].id]
  );

  // eslint-disable-next-line no-console
  console.log('Seed complete');
  process.exit(0);
}

seed().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});

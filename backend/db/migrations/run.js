const fs = require('fs');
const path = require('path');
const db = require('../../src/config/db');

async function run() {
  const migration = fs.readFileSync(path.join(__dirname, '001_init.sql'), 'utf8');
  await db.query(migration);
  // eslint-disable-next-line no-console
  console.log('Migration complete');
  process.exit(0);
}

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

const db = require('../../../config/db');

async function refreshScoringMetrics(businessId) {
  await db.query('REFRESH MATERIALIZED VIEW CONCURRENTLY business_scoring_metrics');
  await db.query('UPDATE businesses SET updated_at = NOW() WHERE id = $1', [businessId]);
}

module.exports = { refreshScoringMetrics };

const db = require('../../../config/db');

async function monthlyReport(req, res, next) {
  try {
    const { month } = req.query;
    const report = await db.query(
      `SELECT date_trunc('month', entry_date) AS report_month,
        COALESCE((SELECT SUM(amount) FROM income_entries WHERE business_id=$1 AND to_char(entry_date,'YYYY-MM')=$2 AND deleted_at IS NULL),0) AS revenue,
        COALESCE((SELECT SUM(amount) FROM expense_entries WHERE business_id=$1 AND to_char(entry_date,'YYYY-MM')=$2 AND deleted_at IS NULL),0) AS expenses`,
      [req.user.businessId, month]
    );

    const payload = report.rows[0];
    res.status(200).json({
      month,
      revenue: Number(payload.revenue),
      expenses: Number(payload.expenses),
      netProfit: Number(payload.revenue) - Number(payload.expenses),
      pdfUrl: `/reports/${month}.pdf`,
      shareByEmail: true
    });
  } catch (e) { next(e); }
}

module.exports = { monthlyReport };

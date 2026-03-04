const db = require('../../../config/db');

async function summary(req, res, next) {
  try {
    const businessId = req.user.businessId;
    const result = await db.query(
      `SELECT
        (SELECT COALESCE(SUM(amount),0) FROM income_entries WHERE business_id=$1 AND entry_date >= NOW()-INTERVAL '30 day' AND deleted_at IS NULL) AS monthly_revenue,
        (SELECT COALESCE(SUM(amount),0) FROM expense_entries WHERE business_id=$1 AND entry_date >= NOW()-INTERVAL '30 day' AND deleted_at IS NULL) AS monthly_expenses,
        (SELECT COALESCE(SUM(CASE WHEN ct.transaction_type='CREDIT_SALE' THEN ct.amount WHEN ct.transaction_type='REPAYMENT' THEN -ct.amount ELSE 0 END),0) FROM customer_transactions ct WHERE ct.business_id=$1 AND ct.deleted_at IS NULL) AS receivables,
        (SELECT COALESCE(SUM(CASE WHEN st.transaction_type='PAYABLE' THEN st.amount WHEN st.transaction_type='PAYMENT' THEN -st.amount ELSE 0 END),0) FROM supplier_transactions st WHERE st.business_id=$1 AND st.deleted_at IS NULL) AS payables`,
      [businessId]
    );

    const row = result.rows[0];
    res.status(200).json({
      totalRevenue: Number(row.monthly_revenue),
      totalExpenses: Number(row.monthly_expenses),
      netProfit: Number(row.monthly_revenue) - Number(row.monthly_expenses),
      outstandingReceivables: Number(row.receivables),
      outstandingPayables: Number(row.payables)
    });
  } catch (e) { next(e); }
}

module.exports = { summary };

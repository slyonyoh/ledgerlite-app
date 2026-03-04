# PostgreSQL schema notes

Core tables: `users`, `businesses`, `income_entries`, `expense_entries`, `customers`, `customer_transactions`, `suppliers`, `supplier_transactions`, `summaries_cache`, `audit_logs`.

## Design details
- UUID primary keys.
- Soft delete with `deleted_at` on mutable entities.
- Append-only transaction rows for customer/supplier ledgers.
- Composite indexes for `(business_id, date)` patterns.
- Materialized view `business_scoring_metrics` for future credit scoring analytics.

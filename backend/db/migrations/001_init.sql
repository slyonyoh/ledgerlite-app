CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(150) NOT NULL,
  category VARCHAR(80) NOT NULL,
  location VARCHAR(150) NOT NULL,
  daily_revenue_average NUMERIC(14,2) DEFAULT 0,
  revenue_consistency_score NUMERIC(5,2) DEFAULT 0,
  expense_ratio NUMERIC(5,2) DEFAULT 0,
  debt_repayment_rate NUMERIC(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id),
  firebase_uid VARCHAR(128) UNIQUE NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  role VARCHAR(32) NOT NULL DEFAULT 'BUSINESS_OWNER',
  is_suspended BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS income_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id),
  user_id UUID NOT NULL REFERENCES users(id),
  amount NUMERIC(14,2) NOT NULL,
  description TEXT,
  category VARCHAR(80) NOT NULL,
  payment_method VARCHAR(20) NOT NULL,
  entry_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS expense_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id),
  user_id UUID NOT NULL REFERENCES users(id),
  amount NUMERIC(14,2) NOT NULL,
  category VARCHAR(80) NOT NULL,
  vendor_name VARCHAR(120) NOT NULL,
  entry_date DATE NOT NULL,
  recurring_rule VARCHAR(120),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id),
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS customer_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id),
  customer_id UUID NOT NULL REFERENCES customers(id),
  transaction_type VARCHAR(40) NOT NULL,
  amount NUMERIC(14,2) NOT NULL,
  note TEXT,
  transaction_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS suppliers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id),
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS supplier_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id),
  supplier_id UUID NOT NULL REFERENCES suppliers(id),
  transaction_type VARCHAR(40) NOT NULL,
  amount NUMERIC(14,2) NOT NULL,
  transaction_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS summaries_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id),
  period VARCHAR(20) NOT NULL,
  period_start DATE NOT NULL,
  payload JSONB NOT NULL,
  refreshed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id),
  actor_user_id UUID REFERENCES users(id),
  action VARCHAR(80) NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_income_business_date ON income_entries (business_id, entry_date DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_expense_business_date ON expense_entries (business_id, entry_date DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_customer_tx_business ON customer_transactions (business_id, transaction_date DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_supplier_tx_business ON supplier_transactions (business_id, transaction_date DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_business ON users (business_id) WHERE deleted_at IS NULL;

CREATE MATERIALIZED VIEW IF NOT EXISTS business_scoring_metrics AS
SELECT
  b.id AS business_id,
  COALESCE(AVG(i.amount), 0) AS daily_revenue_average,
  COALESCE(STDDEV_POP(i.amount), 0) AS revenue_consistency,
  COALESCE((SELECT SUM(e.amount) FROM expense_entries e WHERE e.business_id = b.id AND e.deleted_at IS NULL),0) / NULLIF(COALESCE((SELECT SUM(i2.amount) FROM income_entries i2 WHERE i2.business_id = b.id AND i2.deleted_at IS NULL),0),0) AS expense_ratio,
  COALESCE((SELECT SUM(CASE WHEN ct.transaction_type = 'REPAYMENT' THEN amount ELSE 0 END) FROM customer_transactions ct WHERE ct.business_id = b.id AND ct.deleted_at IS NULL),0) /
  NULLIF(COALESCE((SELECT SUM(CASE WHEN ct2.transaction_type = 'CREDIT_SALE' THEN amount ELSE 0 END) FROM customer_transactions ct2 WHERE ct2.business_id = b.id AND ct2.deleted_at IS NULL),0),0) AS debt_repayment_rate
FROM businesses b
LEFT JOIN income_entries i ON i.business_id = b.id AND i.deleted_at IS NULL
GROUP BY b.id;

# LedgerLite MVP

LedgerLite is a mobile-first bookkeeping product for Nigerian micro-businesses. This MVP ships with a Flutter app, a Node.js + PostgreSQL API, and a lightweight admin web panel. The architecture follows modular clean boundaries so it can evolve toward wallets, payments, POS rails, and credit underwriting.

## 1) Monorepo structure

```text
ledgerlite-app/
├── backend/                     # Express API + PostgreSQL migrations
│   ├── src/
│   │   ├── config/              # env, db, firebase setup
│   │   ├── middleware/          # auth, validation, errors
│   │   ├── modules/             # domain modules (auth, income, expenses, etc.)
│   │   └── utils/
│   ├── db/
│   │   ├── migrations/          # SQL schema and migration runner
│   │   └── seeds/               # seed script
│   ├── docs/
│   │   └── API.md
│   └── Dockerfile
├── frontend/                    # Flutter mobile app
│   └── lib/
│       ├── core/                # API client, offline queue, theme
│       └── features/            # feature modules
├── admin-web/                   # basic web admin dashboard
├── docker-compose.yml
├── DEPLOYMENT.md
└── ROADMAP.md
```

## 2) Backend highlights

- **Auth**: Firebase OTP token verification + JWT issuance.
- **Security**: Helmet, CORS, rate limiting, JWT auth middleware, RBAC (`BUSINESS_OWNER`, `ADMIN`).
- **Finance integrity**: transactions stored append-only in ledger-style tables (`customer_transactions`, `supplier_transactions`) and immutable timestamps.
- **Scalability prep**:
  - scoring signals in `businesses` (`daily_revenue_average`, `revenue_consistency_score`, `expense_ratio`, `debt_repayment_rate`)
  - `audit_logs` for permanent event history
  - modular service structure for microservice extraction later

## 3) Running locally

```bash
docker compose up --build
```

Then:

```bash
# in another terminal
cd backend
npm install
npm run migrate
npm run seed
npm run dev
```

## 4) API docs

See `backend/docs/API.md`.

## 5) Deployment docs

See `DEPLOYMENT.md`.

## 6) Product roadmap

See `ROADMAP.md`.

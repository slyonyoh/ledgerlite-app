# LedgerLite Future Roadmap

## Phase 2: Embedded payments
- Wallet ledger per business
- Virtual accounts/payment links
- POS settlement ingestion

## Phase 3: Credit layer
- Behavioral scoring service using hidden metrics
- Loan eligibility API + limits engine
- Repayment autoplan + reminders

## Phase 4: Banking infrastructure
- Savings vaults
- Insurance/merchant protection add-ons
- Multi-tenant partner APIs for embedded finance

## Architecture migration path
- Split monolith modules into microservices by bounded context:
  - Auth/Profile
  - Ledger/Transactions
  - Risk/Scoring
  - Collections
- Introduce event bus for async projections and risk features.

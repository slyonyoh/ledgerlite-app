# LedgerLite API (MVP)

## Auth
- `POST /auth/login` -> login with Firebase OTP id token.

## Business profile
- `POST /business/profile` -> setup business name, category, location.

## Income
- `POST /income`
- `GET /income?filter=daily|weekly|monthly`

## Expenses
- `POST /expenses`

## Customer debt ledger
- `POST /customers`
- `POST /customers/:id/credit`
- `POST /customers/:id/payment`
- `GET /customers/outstanding`

## Supplier ledger
- `POST /suppliers`
- `POST /suppliers/:id/payable`
- `POST /suppliers/:id/payment`

## Dashboard
- `GET /dashboard/summary`

## Reports
- `GET /reports/monthly?month=YYYY-MM`

## Admin (RBAC: ADMIN)
- `GET /admin/stats`
- `POST /admin/flags`
- `PATCH /admin/users/:id/suspend`

## Error model
```json
{ "message": "Validation failed", "details": ["..."], "stack": "dev only" }
```

## Common status codes
- `200` success
- `201` resource created
- `400` validation failure
- `401` unauthenticated
- `403` forbidden
- `404` not found
- `429` rate-limited
- `500` server error

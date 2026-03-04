# Deployment Guide (AWS)

## Infrastructure
- **EC2**: Run API container behind Nginx (HTTPS enforced with ACM/ALB).
- **RDS PostgreSQL**: primary data store.
- **S3**: report PDFs.

## Steps
1. Build and push backend image to ECR.
2. Provision RDS PostgreSQL and update `DATABASE_URL`.
3. Create `.env` from `backend/.env.example` with production values.
4. Run migration job: `npm run migrate`.
5. Run seed optionally for staging: `npm run seed`.
6. Deploy API container on EC2 (or ECS migration-ready).
7. Configure ALB + ACM certificate and force HTTPS redirect.
8. Restrict RDS security groups to API subnet only.

## Containerization
- Backend Dockerfile: `backend/Dockerfile`.
- Local orchestrator: `docker-compose.yml`.

## Environment variables
- `DATABASE_URL`
- `JWT_SECRET`
- `FIREBASE_*`
- `S3_BUCKET`
- `AWS_REGION`
- `SMS_PROVIDER_URL`, `EMAIL_PROVIDER_URL`

# Minimalist Creator Ops Starter

A Vite + React + Clerk + Paystack + Resend starter optimized for Vercel. This codebase is intentionally minimal, direct, and easy to extend.

## What is included

- Vite React frontend
- Clerk-ready authentication shell
- Paystack initialize, verify, and webhook endpoints
- Resend email endpoint
- Minimal order dashboard and admin surface
- Generic partner adapter layer for external service providers
- SQL schema for a production database

## What is intentionally not included

- Direct implementation of risky third-party rental or SMM resale flows
- Background jobs that bypass platform policies
- Persistent production database wiring in code

Use the adapter interface in `api/_lib/providers.ts` only after legal, compliance, and policy review for each external service.

## Run locally

```bash
cp .env.example .env
npm install
npm run dev
```

## Deploy to Vercel

1. Import the repo into Vercel.
2. Set every variable from `.env.example`.
3. Add your custom domain.
4. Configure Paystack webhook to `https://yourdomain.com/api/paystack/webhook`.
5. Verify your sending domain in Resend.

## Suggested production stack

- Frontend + API: Vercel
- Database: Neon Postgres or Supabase Postgres
- ORM: Drizzle or Prisma
- Analytics: PostHog or Plausible
- Storage: Vercel Blob
- Scheduling: Vercel Cron

## Important note

The included provider layer is a safe abstraction only. Replace it with compliant first-party integrations and approved vendor workflows.

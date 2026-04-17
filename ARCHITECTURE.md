# Architecture

## Principles

- Thin frontend, thin API, strict secrets handling
- Payment verification before fulfillment
- Human review before deep automation
- Replace in-memory store with Postgres before production traffic

## Runtime layout

- `src/`: Vite frontend
- `api/`: Vercel serverless functions
- `api/_lib/`: shared server utilities
- `db/schema.sql`: starting relational schema

## Recommended next engineering steps

1. Replace the in-memory store with Neon + Drizzle.
2. Add Clerk middleware and role-based admin routes.
3. Add idempotency keys for payment webhook processing.
4. Add audit logs and admin activity tracking.
5. Add feature flags for provider adapters.

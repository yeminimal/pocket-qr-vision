# Seeqr Premium Platform — Stage 1: Accounts & Data Foundation

Your document describes a 7-stage build. It is explicitly ordered: each stage needs the one
before it. So this plan covers Stage 1 only, and we move on once it is confirmed.

## What Stage 1 delivers

Turning on Lovable Cloud (built-in database, logins, server code, file storage) and creating
the full data foundation the premium platform needs. No new screens yet — nothing visible
changes in the app.

Records created:

- People and plans: profiles, subscriptions, plan limits per tier (free / developer /
  business / custom), sales leads
- Scanning history: scans, per-photo results, detailed threat reports, user feedback on
  reports
- Developer access: API keys (stored hashed) and per-call usage logs

Plan limits are seeded exactly as your document specifies, so later stages read limits from
the database instead of numbers baked into the code.

## Security

Every table gets row-level access rules: people can only read their own profile, plan,
scans and reports. Plan limits are readable by everyone. Only server-side code can change
subscriptions. Full API key values are never readable by the browser — only the short prefix.

## What comes next (not in this stage)

Stage 2 sign-up + Stripe checkout and Contact Sales, Stage 3 limit enforcement, Stage 4
scan speed work, Stage 5 full report modal, Stage 6 public API + SDK, Stage 7 use cases.
Stripe will need your keys before Stage 2 billing can go live.

## Technical notes

- Tables per Stage 1 spec, plus `sales_leads` (pulled forward from Stage 2 since it is
  schema).
- Enums `subscription_tier`, `subscription_status`.
- Each `CREATE TABLE` followed by explicit GRANTs, then RLS enable, then policies.
- Anonymous scan rows are scoped by `session_fingerprint`; a role table is not needed yet.
- Server logic in this project uses TanStack server functions, not Supabase Edge Functions;
  later stages implement the document's "Edge Function" items that way, with public API
  endpoints under `src/routes/api/public/*`.

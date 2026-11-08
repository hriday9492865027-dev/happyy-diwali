# DEEPAVALI Implementation Plan

Use this as the recommended order. Do not skip foundational work.

## Phase 0 — Repository audit and planning
- Inspect existing code, dependencies, routes, and deployment state.
- Read PRD and all rules.
- Identify gaps and propose a phased plan.
- Do not overwrite existing work without explaining why.

## Phase 1 — Foundation
- Establish Next.js + React + TypeScript conventions.
- Create responsive app shell and design tokens.
- Add lint, type-check, test, and build scripts.
- Add environment variable validation and `.env.example`.

## Phase 2 — Data and server foundation
- Configure Neon and Drizzle.
- Define migrations and typed data-access functions.
- Add authentication/session strategy after confirming access requirements.
- Keep all privileged code server-only.

## Phase 3 — Visitor experience
- Landing and skippable intro.
- Greeting setup and upload UI.
- Progress, preview, retry, no-photo fallback.

## Phase 4 — Private photo processing
- Server-side upload validation.
- Private Vercel Blob storage.
- Background-removal provider adapter.
- Human-only transparent output, preview, quality checks, deletion.

## Phase 5 — Signature scene
- Festive background and depth layers.
- Ghost portrait and golden reveal.
- Cracker burst particle system.
- Greeting finale, replay, reduced-motion and low-effects modes.

## Phase 6 — Admin and governance
- Protected admin access.
- Greeting content and feature settings.
- Audit logs, retention, deletion workflow.

## Phase 7 — Quality and launch
- Mobile device QA, accessibility, performance and security testing.
- Verify all P0 acceptance criteria.
- Production deployment and monitoring.

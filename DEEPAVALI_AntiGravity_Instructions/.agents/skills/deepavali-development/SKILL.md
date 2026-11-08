---
name: deepavali-development
description: Use when planning, implementing, reviewing, or testing DEEPAVALI website features. Covers the product workflow, signature visual scene, private portrait pipeline, responsive quality, and release checks.
---

# DEEPAVALI Development Skill

## Before implementation
1. Read root `AGENTS.md`, the complete PRD in `docs/`, and relevant `.agents/rules/`.
2. Inspect the repository and identify existing routes, components, data models, scripts, and conventions.
3. Write a brief implementation plan with affected files, dependencies, risks, and test plan.
4. Confirm any unresolved product decision rather than inventing a consequential behavior.

## Build sequence
1. Foundation: app shell, theme tokens, responsive layout, lint/type-check/test setup.
2. Data foundation: Neon connection, Drizzle schema and migrations, server-only database module.
3. Visitor flow: landing, optional intro, greeting setup, upload UI, progress, preview and fallback.
4. Media pipeline: validation, private storage, provider adapter, human-only transparent cutout, preview and deletion.
5. Signature scene: ghost portrait, gradual golden reveal, ambient scene, cracker particle bursts, greeting finale.
6. Admin: secure authentication/authorization, content settings, feature toggles and audit log.
7. Hardening: privacy, retention, accessibility, reduced motion, performance, cross-device QA.

## Image pipeline contract
The UI must not assume a raw upload is ready for composition. It should receive a typed processed asset only after server validation and successful subject extraction. Model statuses explicitly, for example: `uploaded`, `processing`, `ready`, `failed`, `expired`, `deleted`. A failed extraction must not fall back to showing the full original photo over the scene.

## Scene contract
The scene receives a processed transparent cutout, greeting content, theme settings, and animation preferences. Keep portrait rendering separate from particle simulation. Provide an adaptive low-effects mode and reduced-motion behavior.

## Review checklist
- Does the change satisfy the PRD?
- Is the human-only extraction requirement preserved?
- Does it work on phones and desktop?
- Are privacy and authorization enforced server-side?
- Are loading, error, retry, and fallback states covered?
- Are animations face-safe, non-strobing, and reduced-motion aware?
- Did lint, type-check, tests, and build pass?
- Are docs and tests updated?

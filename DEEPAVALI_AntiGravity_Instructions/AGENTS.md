# DEEPAVALI — Root Agent Instructions

## Mission
Build DEEPAVALI as a polished, personalized, cinematic Deepavali website. The complete product specification is `docs/DEEPAVALI_Complete_Product_Requirements_Document.pdf`. Read it before implementation and treat it as the primary product source of truth.

## Mandatory workflow
1. Inspect the existing repository before changing anything. Preserve working code and existing conventions unless they conflict with the PRD.
2. Read the complete PRD and all applicable rules in `.agents/rules/`.
3. Before major implementation, summarize the intended plan, impacted files, dependencies, risks, and acceptance checks.
4. Work in small, verifiable phases. Do not generate the entire application in one unreviewable change.
5. After each phase, run the available lint, type-check, tests, and build commands. Fix failures before proceeding.
6. Never claim a feature is complete unless it is implemented and tested.
7. Keep documentation synchronized with actual implementation.

## Approved technology decisions
- Next.js + React + TypeScript.
- Deploy on Vercel.
- Neon Serverless PostgreSQL provisioned through Vercel Marketplace.
- Drizzle ORM for schema, migrations, and typed database access.
- Vercel Blob for private original and processed visitor media.
- Vercel Functions / Next.js server routes for server-side operations.
- CSS and Canvas/requestAnimationFrame for visual effects; use a motion library only when it materially helps.
- Do not introduce Supabase or replace the approved stack without explicit project-owner approval.

## Product invariants
- The signature visual direction is **Ghost Portrait + Gradual Golden Reveal**.
- The uploaded source image must be separated into a human-only transparent cutout. Do not retain the original scenery in the final scene.
- Do not use facial recognition or reconstruct a face from sparkles.
- The original person must remain recognizably the same person. Do not invent or regenerate their identity.
- The same processed cutout must power the ghost layer and the main portrait so both align.
- Cracker bursts must emit visible sparks that travel outward, drift, glow, and fade. Static dots alone do not satisfy this requirement.
- The website's own designed scene supplies the festive background: diyas, fireworks, bokeh, decorative elements, and lighting.
- Mobile responsiveness is a P0 launch requirement, not a later enhancement.
- The experience must have a no-photo fallback and graceful processing-failure states.
- Never use the random online sample photo from the conversation as a project asset, fixture, or user identity.

## Engineering standards
- Use strict TypeScript. Avoid `any`; explain unavoidable exceptions.
- Build reusable, accessible components with clear responsibilities.
- Keep business logic, data access, UI, and provider integrations separated.
- Validate all untrusted input on the server. Client validation is for usability, not security.
- Keep secrets server-side and out of source control.
- Use environment variables and provide `.env.example` with names and descriptions only; never put real secrets in it.
- Use Drizzle migrations; do not make undocumented production schema changes.
- Store private media with opaque keys and protected access. Never make visitor photos public by default.
- Handle loading, empty, error, success, and retry states.
- Do not add dependencies without explaining why they are needed and checking whether the existing stack already provides the capability.

## Visual quality bar
- Dark cinematic base with warm gold/amber light and restrained maroon accents.
- Elegant, readable greeting typography.
- Preserve portrait proportions; never stretch a person to fill a container.
- Keep effects behind or around the subject without persistently obscuring the face or greeting.
- Avoid generic template appearance, excessive glow, clutter, and gratuitous animation.
- Use responsive layouts and test real narrow viewport widths.

## Definition of done
A task is done only when:
- It matches the PRD and applicable rules.
- It works on mobile and desktop at the relevant breakpoints.
- It has accessible controls and reduced-motion behavior where relevant.
- It has appropriate loading/error/fallback states.
- Type-check, lint, tests, and production build pass (or any existing blocker is clearly reported).
- No secrets, public personal media, or unrelated sample photos are committed.

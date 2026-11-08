---
trigger: always_on
---

# Architecture Rules

- Follow the approved stack in root `AGENTS.md` and the PRD.
- Keep Next.js route handlers/server actions, domain logic, database access, and UI components separated.
- Use server-only modules for database connections, storage credentials, provider API keys, and privileged operations.
- Use Drizzle ORM for all application database access. Keep schema definitions and migrations checked into the repository.
- Use Neon PostgreSQL; do not add Supabase.
- Use Vercel Blob for private visitor media. Confirm the current Vercel Blob access-control capabilities and implement private access with authenticated routes or short-lived authorized URLs as appropriate.
- Abstract background-removal behind a provider interface. Do not couple UI components directly to a vendor SDK.
- Keep animation rendering independent of media processing. The scene should consume a processed transparent image URL/reference and a typed scene configuration.
- Define typed contracts for API request/response payloads and validate at runtime.
- Avoid circular dependencies and oversized all-in-one components.
- Add or update architecture documentation when a structural decision changes.

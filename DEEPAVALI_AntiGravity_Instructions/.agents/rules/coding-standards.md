---
trigger: always_on
---

# Coding Standards

- Use strict TypeScript and explicit types for public interfaces.
- Avoid `any`, unsafe casts, and non-null assertions unless justified in a comment.
- Keep components focused; extract reusable logic into hooks, services, and domain modules.
- Use consistent naming and formatting already established in the repository.
- Handle errors explicitly; never swallow exceptions silently.
- Validate external data at runtime.
- Keep secrets and server-only dependencies out of client bundles.
- Add tests for meaningful business logic and regressions.
- Add comments for non-obvious decisions, not for self-explanatory code.
- Remove dead code, debug logs, unused dependencies, and temporary mock behavior before completion.
- Update README, `.env.example`, and technical docs when setup or behavior changes.
- Never claim tests were run unless they were actually run; report commands and outcomes accurately.

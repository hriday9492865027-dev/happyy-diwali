---
trigger: always_on
---

# Database, Media, Privacy and Security Rules

- Use Neon PostgreSQL through the approved Vercel Marketplace setup and Drizzle ORM.
- Keep credentials in server-only environment variables. Never expose secrets to client components or public runtime config.
- Use Drizzle schema and migrations; do not silently mutate production schema.
- Store originals and processed cutouts in private Vercel Blob storage with opaque object keys.
- Never expose private visitor media through public static paths or guessable identifiers.
- Enforce ownership / session authorization on every media read, update, delete, and export.
- Use short-lived signed access or authenticated server routes based on the current storage API's supported private-access model.
- Validate upload file signature, MIME type, size, dimensions, and decoded image integrity on the server.
- Add rate limits and abuse controls to upload and processing endpoints.
- Do not log raw images, private URLs, access tokens, or unnecessary personal data.
- Record sensitive admin actions in an audit log.
- Implement deletion for both database metadata and original/derived blob objects.
- Make retention configurable and disclose it to visitors before upload.
- Review any image-processing vendor's privacy, retention, training, region, cost, and commercial terms before production use.
- Use consented or synthetic test assets only.

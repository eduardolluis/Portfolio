# Eduardo De La Cruz — Portfolio

Vite + React + TypeScript portfolio with bilingual content, real project screenshots, responsive project galleries, accessible interactions, a lightweight Three.js background and a contact form with a safe email-draft fallback.

## Run locally

```bash
npm install
npm run dev
```

## Production check

```bash
npm run check
```

This runs the content tests, ESLint and the production Vite build.

## Main projects

- GIO Workspace — client business management platform
- Melodix — Flutter + FastAPI music application
- Whatzapp — real-time Flutter messaging project
- Discord Clone — Next.js real-time community platform

## Contact form

On Vercel, the form posts to `/api/contact` and sends through Resend when `RESEND_API_KEY` is configured. If the serverless endpoint is unavailable or email delivery is not configured, the UI falls back to a pre-filled email draft instead of claiming a message was sent.

Copy `.env.example` into your deployment environment and set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` for direct delivery.

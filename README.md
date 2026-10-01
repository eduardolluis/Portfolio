# Eduardo De La Cruz — Portfolio

Personal portfolio for Eduardo De La Cruz, Software Engineering student and full-stack/mobile developer based in Santo Domingo, Dominican Republic.

## Featured work

- **GIO Workspace** — client management platform for scheduling, patients, staff, services, finances, reports, inventory and role-based access.
- **Melodix** — Flutter music streaming app with a FastAPI/PostgreSQL backend.
- **Whatzapp** — cross-platform real-time messaging app with calls, media sharing and live location.
- **Multi Store** — Flutter multi-vendor commerce project with customer and supplier flows.

Multi Store images in the portfolio are presentation previews reconstructed from the project's actual Flutter UI code and bundled assets because the repository does not include finished screenshots. The portfolio labels them accordingly.

## Stack

React, TypeScript, Vite, Three.js and CSS.

## Local development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm test
npm run lint
npm run build
```

## Contact form

The portfolio works without a mail provider: if server-side sending is unavailable, the contact flow falls back to a prefilled email to `eduardodelacruzg5@gmail.com`.

When a custom domain is available, server-side delivery can be enabled with a verified sender domain and these Vercel environment variables:

```text
RESEND_API_KEY=...
CONTACT_TO_EMAIL=eduardodelacruzg5@gmail.com
CONTACT_FROM_EMAIL=Portfolio <portfolio@your-verified-domain.com>
```

Do not commit API keys or secrets.

## Deployment

Current canonical URL:

`https://eduardo-portfolio-neon-two.vercel.app/`

When moving to a custom domain, update the canonical URL, Open Graph URL, sitemap and robots file together.

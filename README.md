# marcelinusdino.vercel.app

Portfolio of Marcelinus Dinoglide Yoga Prakoso, styled as a nautical chart ("Working Chart", see `fe/DESIGN.md`).

- `fe/`: Next.js 16 (App Router) built as a static export to `fe/out`. Motion and Lenis for animation, Tailwind CSS v4.
- `api/contact/`: Go serverless function on Vercel behind the contact form (`POST /api/contact`).
- `be/`: the older standalone Go server, kept for reference; not deployed.

## Develop

```bash
cd fe
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in fe/out
npm run lint
```

The contact form posts to `/api`, so locally it only works under `vercel dev` (run from the repo root), or with `NEXT_PUBLIC_API_URL` pointing at a running API.

## Environment variables (Vercel)

| Name | Used by | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_LASTFM_API_KEY`, `NEXT_PUBLIC_LASTFM_USERNAME` | Now playing widget | Public by design; never put a secret in a `NEXT_PUBLIC_` variable |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL` | Contact form | Emails each message to you through [Resend](https://resend.com) |
| `CONTACT_FROM_EMAIL` | Contact form | Optional sender on your own verified domain; defaults to `onboarding@resend.dev`, which only delivers to your Resend account's address |
| `MONGODB_URI`, `MONGODB_DB_NAME`, `MONGODB_COLLECTION` | Contact form | Optional: also save messages to MongoDB |
| `GITHUB_TOKEN` | Projects page Logbook | Optional: raises the GitHub API rate limit at build time |

The contact form needs at least one delivery method (Resend or MongoDB). A message succeeds if any configured method works.

## Deploy

Vercel builds from the repo root using `vercel.json` (`cd fe && npm install && npm run build`, output `fe/out`). Pushing to `main` deploys production; other branches get preview deployments.

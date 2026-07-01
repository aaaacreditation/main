# AAA — American Accreditation Association website

Next.js 16 (App Router) site with a built-in CMS ("Content Studio"):
PostgreSQL + Prisma for content, NextAuth v5 for staff sign-in, and a branded
admin at `/admin` for managing news articles, custom pages, and application
leads.

## Stack

- **Frontend** — Next.js 16, React 19, Tailwind CSS v4 (design system lives in
  `app/globals.css`, brand rules in `CLAUDE.md`)
- **Database** — PostgreSQL 16 (Docker) + Prisma 6 (`prisma/schema.prisma`)
- **Auth** — NextAuth v5 (credentials + JWT sessions), bcrypt password hashes
- **Editor** — TipTap 3 rich text with image upload to `public/uploads/`

## Local development

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Configure environment (copy the example and fill in secrets)
cp .env.example .env
# - AUTH_SECRET:      openssl rand -base64 32
# - ADMIN_PASSWORD:   initial admin password used by the seed

# 3. Start Postgres (host port 5435)
npm run db:up

# 4. Create tables and seed content
npm run db:migrate      # prisma migrate dev
npm run db:seed         # admin user + 299 migrated WordPress articles

# 5. Run the site
npm run dev             # http://localhost:3000
```

Sign in to the admin at **http://localhost:3000/admin** with `ADMIN_EMAIL` /
`ADMIN_PASSWORD` from `.env`.

## Content model

| Model  | Where it appears | Notes |
| ------ | ---------------- | ----- |
| `Post` | `/news`, `/news/[slug]` | Blog/news. Legacy WordPress posts are stored as markdown-ish text and converted to rich text on edit; new posts are HTML. |
| `Page` | `/[slug]` | Free-form CMS pages. Built-in app routes always take priority over CMS slugs. |
| `Lead` | Admin → Applications | Captured by the home-page "Start your application" form via `POST /api/leads` (honeypot-protected). |
| `User` | Admin sign-in | `ADMIN` / `EDITOR` roles. |

Public pages read through `lib/content.ts`, which **falls back to the bundled
`app/news/posts-data.json` snapshot when the database is unreachable** — so the
marketing site keeps working even without a DB (e.g. preview builds).

News/CMS pages use ISR (`revalidate = 300`), and admin saves call
`revalidatePath`, so published changes appear immediately.

## Deploying

- Set `DATABASE_URL` to a hosted Postgres (Neon, Supabase, RDS…), plus
  `AUTH_SECRET` and `AUTH_TRUST_HOST=true`.
- Run `npx prisma migrate deploy` against the production database, then seed
  once with `npm run db:seed`.
- `next.config.ts` keeps the local build dir at `.next.nosync` (iCloud
  workaround) and the default `.next` on Vercel — do not change this.
- Media uploads write to `public/uploads/` on the server's filesystem. On
  serverless hosts (Vercel) prefer pasting image URLs or add object storage
  later; on a VPS/Docker deploy it works as-is.

## Useful scripts

```bash
npm run db:studio   # Prisma Studio GUI on the database
npm run db:seed     # idempotent — safe to re-run
npm run build       # production build
```

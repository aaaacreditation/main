# Deploying the AAA website + admin portal

The site is one Next.js 16 app (public pages + the `/admin` portal) backed by
one PostgreSQL database. Everything the CMS owns — posts, pages, leads, case
studies, the accredited register, users, audit log **and uploaded images**
(the `Media` table) — lives in that database, so one `pg_dump` captures it all.

Today the app runs on **Vercel**. It is moving to a **Hetzner VPS**. This guide
covers both, the data move between them, and day-2 operations.

| File | Purpose |
|---|---|
| `Dockerfile` | Production image: standalone Next.js server + Prisma tooling, runs as `node` |
| `docker-compose.prod.yml` | `app` + `db` (Postgres 16) + `backup` (nightly pg_dump), optional `caddy` |
| `deploy/.env.production.example` | Every variable the app reads — copy to `deploy/.env.production` |
| `deploy/entrypoint.sh` | `migrate deploy` → optional seed → `node server.js`; also `migrate`, `seed`, `create-user` |
| `deploy/create-user.mjs` | Create a staff user / reset a password from the command line |
| `deploy/backup.sh` | pg_dump with 14-day retention (used by the `backup` service) |
| `deploy/nginx/aaa-accreditation.org.conf` (+ `ssl-params.conf`) | Host-nginx site (the existing box's convention) |
| `deploy/Caddyfile` | Alternative for a fresh box: automatic HTTPS |
| `deploy/wp-uploads-manifest.sh` | Lists the legacy `/wp-content/uploads/` files the site still links to |
| `docker-compose.yml` | **Local dev database only** (port 5435). Not for servers. |

Public pages never need the database to *render*: every public getter falls
back to the bundled snapshots (`app/news/posts-data.json`, `app/_data/*`). The
admin, lead capture and `/media/...` do need it.

---

## (a) Now: Vercel

### Environment variables (Project → Settings → Environment Variables)

| Variable | Production | Preview | Notes |
|---|---|---|---|
| `DATABASE_URL` | required | see below | Postgres connection string Prisma uses. On serverless, use the provider's **pooled** URL (e.g. `?pgbouncer=true&connection_limit=1` for PgBouncer-style poolers). |
| `AUTH_SECRET` | required | required | `openssl rand -base64 32`. Different value per environment is fine. |
| `AUTH_TRUST_HOST` | `true` | `true` | |
| `AUTH_URL` | optional | leave unset | Vercel's host detection works; set it only to pin the production origin. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | for lead emails | optional | Without them leads are still stored, just not emailed. |
| `SMTP_FROM`, `LEADS_EMAIL_TO` | optional | optional | Defaults: `"AAA Website" <SMTP_USER>` / `info@aaa-accreditation.org`. |
| `NOINDEX` | unset | `true` | `true` makes robots.txt disallow everything. |
| `SEO_AUDIT_BASE_URL` | optional | optional | Where the admin SEO audit crawls. Unset = the origin of the admin request (right for Vercel). |

`ADMIN_EMAIL` / `ADMIN_PASSWORD` are read **only by the seed**, which you run
from a laptop (below) — they do not belong in Vercel.

**Preview deployments share the Production database** unless Preview gets its
own `DATABASE_URL`. Either give Preview a separate (throwaway) database, or
leave Preview's `DATABASE_URL` unset — previews then show the bundled content
and the admin simply does not work there.

**Install command.** `package.json` now has `"postinstall": "prisma generate"`
(Vercel caches `node_modules`; without it a stale Prisma client can ship). The
dependency tree needs `--legacy-peer-deps`, so the Install Command must be
`npm ci --legacy-peer-deps` (or `npm install --legacy-peer-deps`). If Vercel
builds already succeed, this override is already in place.

### A database Vercel can reach

Vercel functions need a Postgres reachable over the internet. Any provider
works through `DATABASE_URL`; the schema needs nothing provider-specific.

| Option | For | Against |
|---|---|---|
| **Managed Postgres** (Neon, Supabase, AWS RDS, Vercel Marketplace…) | Built-in pooling for serverless, TLS, point-in-time backups, can sit in the same region as the functions | Another vendor/bill; the data has to be moved again when the site goes to Hetzner (a `pg_dump`/`pg_restore`, minutes — section (c)) |
| **The future Hetzner Postgres, exposed now** (TLS + IP allow-list) | One database from day one; no second data move | Postgres must listen publicly with TLS you manage; Vercel's egress IPs are not fixed on standard plans, so a real IP allow-list needs Vercel's paid static-IP option (otherwise the allow-list is effectively "everyone" and only the password protects it); serverless connection storms need a pooler (PgBouncer) in front; Vercel's default region (iad1) to Falkenstein adds ~90 ms per query unless functions are pinned to `fra1`; the Hetzner box becomes a production dependency before it is ready |

Pick one deliberately; both are workable.

### Migrations

> **Before the first Vercel deploy of the Oct 27 2026 admin portal: run
> `prisma migrate deploy` against the production database.** The new code writes
> columns that only exist after the `portal_cms` migration (e.g. `Lead.kind`). If
> the code ships first, `/api/leads` fails for the advisor, quote and membership
> forms (visitors see an error; apply/contact still email but the lead row is
> lost), and the new admin sections error. Migrate first, then deploy.

Migrations live in `prisma/migrations`. Apply them with
`prisma migrate deploy` (never `migrate dev` against production):

- **From a laptop** (explicit, recommended while there is one production DB):
  ```bash
  DATABASE_URL='postgresql://…direct, non-pooled URL…' npm run db:deploy
  ```
  Use the provider's **direct** URL — `migrate deploy` does not work through a
  transaction-mode pooler.
- **In the Vercel build** (automatic): Build Command
  `prisma migrate deploy && next build`. Every build then migrates the database
  its `DATABASE_URL` points at — including Preview builds if Preview shares the
  Production database. Only do this with separate Preview databases, and only
  if the build-time `DATABASE_URL` is a direct connection.

### Seeding and the first admin

Run once, from the repo on a laptop (Node 24 — the seed imports `.ts` data
files via Node's built-in type stripping):

```bash
export DATABASE_URL='postgresql://…direct URL…'
export ADMIN_EMAIL='admin@aaa-accreditation.org'
export ADMIN_PASSWORD='<a long password>'
npm run db:seed
```

The seed is idempotent: it upserts the admin (never resets an existing user's
password), imports any snapshot post whose slug is missing, and seeds case
studies and the accredited register only when those tables are empty.

Further users: **Admin → Users**. From the command line (also for a locked-out
admin — it resets the password and re-activates the user):

```bash
DATABASE_URL='…' node deploy/create-user.mjs --email jane@aaa-accreditation.org --name "Jane Doe" --role EDITOR
```

Roles: `ADMIN`, `EDITOR`, `SALES`. Without `NEW_USER_PASSWORD` in the
environment a random password is generated and printed once.

---

## (b) Later: Hetzner

### Decide the layout first

| | Same box as the landing pages (2.28.26.33) | A fresh VPS |
|---|---|---|
| TLS / proxy | The box already runs **host nginx** on 80/443 (`campaigns.aaa-accreditation.org` → 127.0.0.1:3000). Add `deploy/nginx/aaa-accreditation.org.conf` + certbot. | Use the bundled **Caddy** (`--profile caddy`); it gets certificates itself. |
| App port | `127.0.0.1:3100` (3000 is the landing pages) | same (unused by Caddy, handy for SSH-tunnel checks) |
| Capacity | 4 GB RAM shared with the landing pages and their Postgres. `next build` peaks at ~2–3 GB — add swap (below) or build elsewhere. | Size it for build + run: 4 GB minimum, 8 GB comfortable. |

The compose file supports both unchanged. Folder layout follows the existing
box (`/opt/<app>/app`):

```
/opt/aaa-web/
  app/                    git checkout of this repo (aaaacreditation/main)
  adcp/                   ADCP certificate SPA (static) — served at /adcp/
  wp-content/uploads/     legacy WordPress files still linked from pages
  backups/                nightly pg_dump files
```

### 1. Server prep (Ubuntu)

```bash
# Docker Engine + compose plugin (official repository; see docs.docker.com/engine/install/ubuntu)
curl -fsSL https://get.docker.com | sh
docker compose version

# Firewall: SSH, HTTP, HTTPS only (443/udp only if Caddy serves HTTP/3)
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp && ufw allow 80/tcp && ufw allow 443/tcp
ufw enable
```

Docker writes its own iptables rules and **bypasses ufw for published ports**.
The stack publishes only `127.0.0.1:3100` (app) and, with Caddy, 80/443 — the
database is never published. A Hetzner Cloud Firewall (22/80/443 inbound)
sits outside the VM and is not bypassed; use it in addition.

Swap, if building on a 4 GB box:

```bash
fallocate -l 4G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

### 2. Clone and configure

The image is built from the git checkout, so **everything the site needs must
be committed** — as of Oct 27 2026 several `public/**` assets (logos, case
study images, news covers) are still untracked in the working copy.

```bash
mkdir -p /opt/aaa-web/{adcp,wp-content/uploads,backups}
git clone https://github.com/aaaacreditation/main.git /opt/aaa-web/app   # private repo: use a read-only deploy key
cd /opt/aaa-web/app
cp deploy/.env.production.example deploy/.env.production
chmod 600 deploy/.env.production
```

Fill in `deploy/.env.production` — at minimum `POSTGRES_PASSWORD`
(`openssl rand -hex 24`), `AUTH_SECRET` (`openssl rand -base64 32`),
`ADMIN_EMAIL`, `ADMIN_PASSWORD`, and the `SMTP_*` values. Leave
`DATABASE_URL` empty: the entrypoint builds it from `POSTGRES_*`. Never commit
this file (it is gitignored) or paste it anywhere.

### 3. First boot

```bash
cd /opt/aaa-web/app
# first boot only: set RUN_SEED=1 in deploy/.env.production
docker compose -f docker-compose.prod.yml up -d --build            # host-nginx layout
# docker compose -f docker-compose.prod.yml --profile caddy up -d --build   # fresh-box layout

docker compose -f docker-compose.prod.yml logs -f app   # "All migrations have been successfully applied", seed counts, "Ready"
docker compose -f docker-compose.prod.yml ps            # app should become "healthy"
```

Then set `RUN_SEED=0` again and apply it with
`docker compose -f docker-compose.prod.yml up -d` — the seed re-imports any
snapshot post that is missing, so leaving it on would resurrect articles
deleted in the admin on every restart. (If you are restoring an existing
database instead — section (c) — skip the seed entirely.)

One-off commands go through the entrypoint (so `DATABASE_URL` is set) with
`run --rm`:

```bash
docker compose -f docker-compose.prod.yml run --rm app migrate
docker compose -f docker-compose.prod.yml run --rm app seed
docker compose -f docker-compose.prod.yml run --rm app create-user --email jane@aaa-accreditation.org --name "Jane Doe" --role ADMIN
docker compose -f docker-compose.prod.yml run --rm -e NEW_USER_PASSWORD="$NEW_USER_PASSWORD" app create-user --email jane@aaa-accreditation.org   # reset to a password you export first
```

Check the app before any DNS change through an SSH tunnel:
`ssh -L 3100:127.0.0.1:3100 root@<server>` and open `http://localhost:3100`.
To sign in to the admin over the tunnel, set `AUTH_URL=http://localhost:3100`
temporarily (then back to `https://aaa-accreditation.org`).

### 4. ADCP certificate portal — `/adcp/` (must not break)

Printed certificates carry QR codes for
`https://aaa-accreditation.org/adcp/CertificateDetails/<id>`. `/adcp/` is a
static React SPA (its data is in Firebase), today mirrored into the WordPress
docroot on the Cloudways server (178.62.66.12). Both proxy configs serve
`/opt/aaa-web/adcp` at `/adcp/` with an SPA fallback to `/adcp/index.html` —
no redirect, the URL stays on the domain.

Copy it before the cut-over, from a machine with SSH access to the Cloudways
server (the app's docroot is usually `~/applications/<app>/public_html`):

```bash
rsync -az --delete-after --delay-updates \
  <cloudways-user>@178.62.66.12:applications/<app>/public_html/adcp/ /opt/aaa-web/adcp/
ls /opt/aaa-web/adcp/index.html
```

`--delay-updates` swaps the new files in at the end, so a half-copied build is
never served (an `index.html` pointing at not-yet-copied hashed assets would
break the SPA). Re-run the same command whenever the ADCP team ships a new
build; after the cut-over the old `~/adcp-sync.sh` on the WordPress server no
longer affects the live site.

### 5. Legacy WordPress uploads — `/wp-content/uploads/`

Pages (`/documents`, the scheme pages, the healthcare cluster, school
accreditation) and migrated posts link to ~150 files at
`https://aaa-accreditation.org/wp-content/uploads/…` (application forms as
`.doc`/`.docx`/`.pdf`, post images). They 404 the moment WordPress stops
serving the domain unless they are copied. Both proxy configs serve
`/opt/aaa-web/wp-content/uploads/` for documents and images only.

Copy **only the referenced files** — the WordPress site was compromised (SEO
spam, June 2026), so its uploads folder is untrusted:

```bash
sh deploy/wp-uploads-manifest.sh > /tmp/wp-uploads.txt     # in the repo
rsync -av --files-from=/tmp/wp-uploads.txt \
  <cloudways-user>@178.62.66.12:applications/<app>/public_html/wp-content/uploads/ \
  /opt/aaa-web/wp-content/uploads/
# report anything missing, and confirm types match extensions
while read -r f; do [ -f "/opt/aaa-web/wp-content/uploads/$f" ] || echo "MISSING $f"; done < /tmp/wp-uploads.txt
find /opt/aaa-web/wp-content/uploads -type f -exec file --mime-type {} + | grep -vE 'pdf|msword|officedocument|image/'
```

Longer term, move these files into `public/documents/` and update the links;
then this folder can go.

### 6. TLS and the reverse proxy

**Host nginx (same box).** Certificates can only be issued once DNS points at
the box, so this happens during the cut-over (step 7):

```bash
certbot certonly --nginx -d aaa-accreditation.org -d www.aaa-accreditation.org
ln -s /opt/aaa-web/app/deploy/nginx/aaa-accreditation.org.conf /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

The config proxies to `127.0.0.1:3100` and forwards `Host`,
`X-Forwarded-Proto/-Host/-For` — `proxy.ts` gates `sme.aaa-accreditation.org`
on the Host header and NextAuth/Server Actions need the original host and
scheme. Renewals run from certbot's timer through the nginx authenticator.

**Caddy (fresh box).** Nothing to do: on the first HTTPS request after the DNS
switch Caddy obtains certificates for `aaa-accreditation.org` and
`www.aaa-accreditation.org` (www redirects to the apex). Optional shell
variables: `ACME_EMAIL`, `SITE_DOMAIN`.

`sme.aaa-accreditation.org` is served by the same app. A commented block for
it exists in both configs — enable it only if that subdomain moves too.

### 7. DNS cut-over checklist

Before (T-48 h → T-1 h)
- [ ] Lower the TTL of the apex and `www` records to 300 s. Touch **only**
      A/AAAA/CNAME for `@` and `www` — leave MX/TXT (email, SPF/DKIM,
      Search Console verification) and `campaigns.` alone.
- [ ] All site assets committed and pushed; server checkout on the release commit.
- [ ] Stack healthy on the new box; spot-checked over the SSH tunnel.
- [ ] `/opt/aaa-web/adcp/` copied (step 4); `/opt/aaa-web/wp-content/uploads/` copied, no MISSING lines (step 5).
- [ ] Data in place (section (c)), `RUN_SEED=0`, `NOINDEX` unset/false, `AUTH_URL=https://aaa-accreditation.org`.
- [ ] Content freeze announced for the admin (and on the old CMS).
- [ ] Note a real certificate ID for the QR test.

Switch
- [ ] Final data sync if the source database is still taking writes (section (c)).
- [ ] Point `@` and `www` at the new IP. Remove/update any AAAA record that still points at the old server.
- [ ] Host nginx: issue the certificate and enable the site (step 6). Caddy: request `https://aaa-accreditation.org/` once.

Verify (from outside, with `-H 'Cache-Control: no-cache'`)
- [ ] `curl -sI https://aaa-accreditation.org/` → 200; `https://www.aaa-accreditation.org/x` → 301 to the apex; `http://` → 301 to https.
- [ ] `/adcp/` and `/adcp/CertificateDetails/<real id>` → 200, and in a browser the certificate data loads; scan a printed QR code with a phone.
- [ ] A legacy redirect from `next.config.ts` still applies, e.g. `/about-aaa` → `/about`, `/contact-us` → `/contact`, an old post slug → `/news/<slug>`. (They are compiled into the image; nothing to configure on the server.)
- [ ] A spam URL returns 410, e.g. `/czy-unibet-casino-ma-najlepsze-gry-na-rynku`.
- [ ] A `/wp-content/uploads/…` link from `/documents` downloads.
- [ ] `/robots.txt` allows crawling and lists the sitemap; `/sitemap.xml` → 200.
- [ ] `/admin/login` → sign in, open Leads; submit a test enquiry on `/contact` → it appears in the admin and the notification email arrives.
- [ ] An image uploaded in the admin renders on its public page (`/media/…`).

After
- [ ] Search Console: resubmit `sitemap.xml`; inspect a few key URLs; watch Pages/404 reports for a couple of weeks. (A domain property is unaffected by the host change.)
- [ ] Keep the old WordPress server running, unchanged, for at least two weeks as a fallback; do not delete the ADCP origin server.
- [ ] Copy any leads the old system captured during the DNS propagation window.
- [ ] Raise the TTL back (e.g. 3600 s).
- [ ] If the domain was attached to the Vercel project, remove it there once traffic has moved.

---

## (c) Moving the data

The source is whichever database holds the content the client has curated —
the Vercel-era managed Postgres, or the local dev database (`aaa-postgres`,
port 5435) if that is where the CMS work was done. Media (uploaded images)
are rows in the `Media` table, so they move with the dump.

```bash
# 1. Dump (pg_dump must be at least the source server's major version)
pg_dump -Fc --no-owner --no-acl "$SOURCE_DATABASE_URL" -f aaa-$(date +%F).dump
#    from the local dev DB instead:
docker exec aaa-postgres pg_dump -Fc --no-owner --no-acl -U aaa aaa_cms > aaa-$(date +%F).dump

# 2. Copy to the server
scp aaa-*.dump root@<server>:/opt/aaa-web/backups/

# 3. Restore into the compose database, app stopped (RUN_SEED=0)
cd /opt/aaa-web/app
docker compose -f docker-compose.prod.yml up -d db
docker compose -f docker-compose.prod.yml stop app
docker compose -f docker-compose.prod.yml exec -T db \
  sh -c 'pg_restore --no-owner --no-acl --clean --if-exists -U "$POSTGRES_USER" -d "$POSTGRES_DB"' \
  < /opt/aaa-web/backups/aaa-YYYY-MM-DD.dump
docker compose -f docker-compose.prod.yml up -d app    # migrate deploy applies anything newer

# 4. Sanity check
docker compose -f docker-compose.prod.yml exec db sh -c \
  'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "select (select count(*) from \"Post\") posts, (select count(*) from \"Lead\") leads, (select count(*) from \"Media\") media, (select count(*) from \"User\") users"'
```

- The restored `User` table brings its logins with it — sign in with the
  source's credentials (or `create-user` to reset one).
- If the source runs a newer Postgres major than 16 (e.g. a managed provider
  on 17), set the `db` **and** `backup` images to that major before the first
  boot instead of restoring across versions.
- Do the dump/restore twice: a rehearsal days ahead, and a final one during
  the content freeze right before the DNS switch. Leads that still arrive on
  the old side during DNS propagation can be listed with
  `select * from "Lead" where "createdAt" > '<final dump time>'` and re-entered.
- Legacy admin uploads in `public/uploads/` (before Oct 27 2026): as of that
  date no content references them and the folder does not exist, so there is
  nothing to copy. If a source database ever does reference `/uploads/…`
  (`select count(*) from "Post" where "coverImage" like '/uploads/%' or content like '%"/uploads/%'`),
  copy the folder to the server and enable the commented `volumes:` entry of
  the `app` service.

---

## (d) Operations

### Backups and the restore drill

The `backup` service dumps the database daily at `BACKUP_AT` (UTC, default
02:30) to `/opt/aaa-web/backups/aaa_cms-YYYYMMDD-HHMMSS.dump` and deletes
dumps older than `BACKUP_RETENTION_DAYS` (14).

```bash
docker compose -f docker-compose.prod.yml exec backup sh /usr/local/bin/aaa-backup once   # on demand (e.g. before an update)
docker compose -f docker-compose.prod.yml logs backup
ls -lh /opt/aaa-web/backups/
```

A backup on the same disk is not a backup: copy `/opt/aaa-web/backups/` off
the box (a Hetzner Storage Box via `rsync`/`borg`, or enable Hetzner server
backups — the dumps inside those images are consistent even though a disk
image of a running Postgres is not).

**Restore drill** (monthly, takes a minute, touches nothing live):

```bash
F=$(ls -t /opt/aaa-web/backups/aaa_cms-*.dump | head -1)
db() { docker compose -f docker-compose.prod.yml exec -T db sh -c "$1"; }
db 'createdb -U "$POSTGRES_USER" aaa_restore_test'
db 'pg_restore --no-owner --no-acl -U "$POSTGRES_USER" -d aaa_restore_test' < "$F"
db 'psql -U "$POSTGRES_USER" -d aaa_restore_test -tAc "select count(*) from \"Post\"; select count(*) from \"Lead\""'
db 'dropdb -U "$POSTGRES_USER" aaa_restore_test'
```

**Real restore**: same as section (c) step 3 with the chosen dump.

### Updates

```bash
cd /opt/aaa-web/app
git fetch origin && git log --oneline HEAD..origin/main          # what is about to ship
git diff --stat HEAD..origin/main -- prisma/migrations           # schema changes? take a backup first
docker compose -f docker-compose.prod.yml exec backup sh /usr/local/bin/aaa-backup once
docker tag aaa-web:current aaa-web:previous                      # keep the running image for rollback
git pull --ff-only
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml ps                     # app "healthy"
```

The new image builds while the old container keeps serving; the swap costs a
few seconds (migrations + server start). Migrations run automatically on
container start.

### Logs

```bash
docker compose -f docker-compose.prod.yml logs -f --tail=200 app
docker compose -f docker-compose.prod.yml logs --since 1h db
docker inspect --format '{{.State.Health.Status}}' aaa-web-app-1
tail -f /var/log/nginx/access.log /var/log/nginx/error.log     # host-nginx layout
docker compose -f docker-compose.prod.yml logs -f caddy        # Caddy layout
```

Container logs rotate at 10 MB × 5 files per service.

### Rollback

```bash
cd /opt/aaa-web/app
AAA_WEB_TAG=previous docker compose -f docker-compose.prod.yml up -d --no-build app
git checkout <last-good-sha>     # keep the checkout in step with what runs
```

Prisma migrations are forward-only. Rolling back across an additive migration
(new table/column) is safe; across a destructive one, restore the dump taken
before the update.

### Troubleshooting

| Symptom | Cause / fix |
|---|---|
| Build killed with no error | Out of memory during `next build` — add swap, or build on a bigger machine: `docker buildx build --platform linux/amd64 -t aaa-web:current .` then `docker save aaa-web:current \| ssh root@<server> docker load` and `up -d --no-build`. (An Apple-silicon laptop builds arm64 by default; the server is amd64.) |
| `app` restarts in a loop | `docker compose … logs app`: usually `prisma migrate deploy` failing (database credentials, or a migration error) or `RUN_SEED=1` without `ADMIN_PASSWORD`. |
| Admin login loops back to the login page | `AUTH_URL` not matching the address used, `AUTH_TRUST_HOST` not `true`, or the proxy not forwarding `X-Forwarded-Proto`. |
| Every page on `sme.` redirects to the SME page | Intended — `proxy.ts` gates that host until the full launch. |
| `/adcp/...` 404 | `/opt/aaa-web/adcp/index.html` missing, or (Caddy) the folder was replaced after the container started — `docker compose … restart caddy`. |
| Admin upload fails | Over the 4 MB cap in `lib/media.ts`; nginx allows 10 MB. |

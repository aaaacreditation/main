#!/bin/sh
# Container entrypoint for the AAA website image (see Dockerfile).
#
#   serve (default)       prisma migrate deploy → seed if RUN_SEED=1 → node server.js
#   migrate               prisma migrate deploy, then exit
#   seed [--reset-directory]
#                         run prisma/seed.mjs once, then exit
#   create-user --email … create an ADMIN/EDITOR/SALES user or reset a password
#   <anything else>       exec'd as-is (e.g. `sh`)
#
# Run the one-off commands through this entrypoint so DATABASE_URL is set:
#   docker compose -f docker-compose.prod.yml run --rm app migrate
#   docker compose -f docker-compose.prod.yml run --rm app seed
#   docker compose -f docker-compose.prod.yml run --rm app create-user --email x@y --role ADMIN
set -eu

PRISMA="node /tools/node_modules/prisma/build/index.js"
SCHEMA=/tools/prisma/schema.prisma

# With the bundled `db` service, DATABASE_URL may be left empty and is built
# from the POSTGRES_* values in deploy/.env.production (password URL-encoded).
if [ -z "${DATABASE_URL:-}" ] && [ -n "${POSTGRES_PASSWORD:-}" ]; then
  PW=$(node -e 'process.stdout.write(encodeURIComponent(process.env.POSTGRES_PASSWORD))')
  DATABASE_URL="postgresql://${POSTGRES_USER:-aaa}:${PW}@${POSTGRES_HOST:-db}:${POSTGRES_PORT:-5432}/${POSTGRES_DB:-aaa_cms}?schema=public"
  export DATABASE_URL
  unset PW
fi

need_db() {
  if [ -z "${DATABASE_URL:-}" ]; then
    echo "[entrypoint] DATABASE_URL is not set (and no POSTGRES_PASSWORD to build it from)." >&2
    exit 1
  fi
}

migrate() {
  need_db
  attempt=1
  # Retries cover a database that is still starting (external DBs, first boot).
  until $PRISMA migrate deploy --schema "$SCHEMA"; do
    if [ "$attempt" -ge 5 ]; then
      echo "[entrypoint] prisma migrate deploy failed after $attempt attempts." >&2
      exit 1
    fi
    echo "[entrypoint] migrate deploy failed (attempt $attempt) — retrying in 5s" >&2
    attempt=$((attempt + 1))
    sleep 5
  done
}

seed() {
  need_db
  # Without ADMIN_PASSWORD the seed would create the admin with its built-in
  # default password. Refuse instead.
  if [ -z "${ADMIN_PASSWORD:-}" ]; then
    echo "[entrypoint] Seeding needs ADMIN_PASSWORD (and ADMIN_EMAIL) set in deploy/.env.production." >&2
    exit 1
  fi
  node /tools/prisma/seed.mjs "$@"
}

cmd="${1:-serve}"
[ "$#" -gt 0 ] && shift

case "$cmd" in
  serve)
    if [ "${SKIP_MIGRATIONS:-0}" = "1" ]; then
      echo "[entrypoint] SKIP_MIGRATIONS=1 — not running prisma migrate deploy"
    else
      migrate
    fi
    if [ "${RUN_SEED:-0}" = "1" ]; then
      echo "[entrypoint] RUN_SEED=1 — seeding (set it back to 0 after the first boot)"
      seed
    fi
    cd /app
    exec node server.js
    ;;
  migrate)
    migrate
    ;;
  seed)
    seed "$@"
    ;;
  create-user)
    need_db
    exec node /tools/create-user.mjs "$@"
    ;;
  *)
    exec "$cmd" "$@"
    ;;
esac

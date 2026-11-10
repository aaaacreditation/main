#!/bin/sh
# Ship the CURRENT WORKING COPY (committed or not) to the preview server and
# rebuild it there:  preview.aaa-accreditation.org on the Contabo VPS (Nov 2026).
#
#   sh deploy/preview-deploy.sh
#
# What it does, in order:
#   1. rsync the repo to /opt/aaa-web/app — never node_modules, build output,
#      .git, agent state or any .env file (the server keeps its own
#      deploy/.env.production and .env, which --delete leaves alone because
#      they are excluded).
#   2. on the server: a pg_dump backup, keep the running image as
#      aaa-web:previous (rollback), build, restart the app (migrations run on
#      start), wait for "healthy", reload Caddy if it is running.
#
# Rollback:  ssh … 'cd /opt/aaa-web/app && AAA_WEB_TAG=previous docker compose -f docker-compose.prod.yml up -d --no-build app'
set -eu

HOST="${PREVIEW_HOST:-root@94.72.110.40}"
KEY="${PREVIEW_KEY:-$HOME/.ssh/aaa}"
SSH="ssh -i $KEY -o IdentitiesOnly=yes -o BatchMode=yes"

cd "$(dirname "$0")/.."

echo "==> Syncing the working copy to $HOST"
rsync -az --delete \
  --exclude='/node_modules' --exclude='/.next' --exclude='/.next.nosync' --exclude='/.next 2' \
  --exclude='/.git' --exclude='/.claude' --exclude='/.vercel' \
  --exclude='.env' --exclude='.env.*' --exclude='/deploy/.env.production' \
  --exclude='/AAA Final website content.html' --exclude='/aaa_homepage_final_refinements.html' \
  --exclude='.DS_Store' --exclude='*.tsbuildinfo' --exclude='/public/uploads' --exclude='/backups' \
  -e "$SSH" ./ "$HOST:/opt/aaa-web/app/"

echo "==> Building and restarting on the server"
$SSH "$HOST" 'set -eu
cd /opt/aaa-web/app
C="docker compose -f docker-compose.prod.yml"
$C exec -T backup sh /usr/local/bin/aaa-backup once || echo "(backup skipped)"
docker image inspect aaa-web:current >/dev/null 2>&1 && docker tag aaa-web:current aaa-web:previous
$C build app > /opt/aaa-web/build.log 2>&1 || { tail -40 /opt/aaa-web/build.log; exit 1; }
$C up -d --no-build app
i=0
until [ "$(docker inspect --format "{{.State.Health.Status}}" aaa-web-app-1)" = healthy ]; do
  i=$((i + 1)); [ "$i" -gt 60 ] && { $C logs --tail=60 app; echo "app not healthy"; exit 1; }
  sleep 3
done
if [ -n "$($C --profile caddy ps -q caddy 2>/dev/null)" ]; then
  $C --profile caddy exec -T caddy caddy reload --config /etc/caddy/Caddyfile
fi
$C --profile caddy ps --format "table {{.Service}}\t{{.Status}}"'

echo "==> Done: https://preview.aaa-accreditation.org"

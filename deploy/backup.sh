#!/bin/sh
# Nightly pg_dump for the AAA website database, with retention.
#
# Runs inside the `backup` service of docker-compose.prod.yml (postgres:16-alpine,
# so pg_dump matches the server's major version):
#
#   loop   (service default) sleep until BACKUP_AT (UTC) every day, then `once`
#   once   dump now + prune old dumps; also handy by hand:
#            docker compose -f docker-compose.prod.yml exec backup sh /usr/local/bin/aaa-backup once
#
# Dumps are custom-format (-Fc) files in /backups (bind-mounted from
# AAA_BACKUP_DIR on the host, default /opt/aaa-web/backups). Restore with
# pg_restore — see docs/DEPLOYMENT.md "Backups & restore drill".
#
# Media uploads live in the Media table, so this one file is the whole CMS:
# posts, pages, leads, case studies, the directory, users and images.
set -eu

: "${POSTGRES_PASSWORD:?POSTGRES_PASSWORD must be set (deploy/.env.production)}"
export PGHOST="${PGHOST:-db}"
export PGPORT="${PGPORT:-5432}"
export PGUSER="${POSTGRES_USER:-aaa}"
export PGPASSWORD="$POSTGRES_PASSWORD"
export PGDATABASE="${POSTGRES_DB:-aaa_cms}"

DIR="${BACKUP_DIR:-/backups}"
KEEP_DAYS="${BACKUP_RETENTION_DAYS:-14}"
AT="${BACKUP_AT:-02:30}"

log() { echo "[backup $(date -u +%Y-%m-%dT%H:%M:%SZ)] $*"; }

once() {
  mkdir -p "$DIR"
  stamp=$(date -u +%Y%m%d-%H%M%S)
  file="$DIR/${PGDATABASE}-${stamp}.dump"
  # Write to a temp name first so a failed dump never looks like a good one.
  if pg_dump -Fc --no-owner --no-acl -f "$file.partial"; then
    mv "$file.partial" "$file"
    log "wrote $file ($(du -h "$file" | cut -f1))"
  else
    rm -f "$file.partial"
    log "pg_dump FAILED"
    return 1
  fi
  # Retention: delete dumps older than KEEP_DAYS days (never the one just written).
  find "$DIR" -maxdepth 1 -type f -name "${PGDATABASE}-*.dump" -mtime +"$((KEEP_DAYS - 1))" \
    ! -name "$(basename "$file")" -print -delete | sed 's/^/[backup] pruned /'
}

seconds_until() {
  # Seconds from now until the next HH:MM (UTC). Pure shell arithmetic, so it
  # works with busybox date.
  h=${1%%:*}; m=${1##*:}
  now=$(( $(date -u +%H | sed 's/^0//') * 3600 + $(date -u +%M | sed 's/^0//') * 60 + $(date -u +%S | sed 's/^0//') ))
  target=$(( $(echo "$h" | sed 's/^0//') * 3600 + $(echo "$m" | sed 's/^0//') * 60 ))
  wait=$(( target - now ))
  [ "$wait" -le 0 ] && wait=$(( wait + 86400 ))
  echo "$wait"
}

case "${1:-loop}" in
  once)
    once
    ;;
  loop)
    log "scheduler started — daily at $AT UTC, keeping ${KEEP_DAYS} days in $DIR"
    while :; do
      s=$(seconds_until "$AT")
      log "next backup in ${s}s"
      sleep "$s"
      once || log "will retry at the next scheduled time"
      sleep 60
    done
    ;;
  *)
    echo "usage: $0 [once|loop]" >&2
    exit 2
    ;;
esac

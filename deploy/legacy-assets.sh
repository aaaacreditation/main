#!/bin/sh
# Copy the two parts of aaa-accreditation.org that are NOT the Next.js app onto
# the server, where Caddy serves them (deploy/Caddyfile, Caddyfile.preview):
#
#   /adcp/                 the ADCP certificate-verification SPA. Printed QR codes
#                          point at /adcp/CertificateDetails/<id>, so it must
#                          exist before the main domain moves. Its data is live
#                          from Firebase; the build is static.
#   /wp-content/uploads/   the ~150 legacy WordPress files (application forms,
#                          PDFs, post images) the pages still link to.
#
#   sh deploy/legacy-assets.sh
#
# Idempotent: uploads already on the server are skipped; the ADCP build is
# re-mirrored every time (re-run it whenever the ADCP team ships a new build).
# Read-only towards both sources. Only the files listed by
# deploy/wp-uploads-manifest.sh are fetched, never the whole uploads folder (the
# old WordPress site was compromised in June 2026), and anything whose content
# is not a document or image is rejected.
set -eu

HOST="${PREVIEW_HOST:-root@94.72.110.40}"
KEY="${PREVIEW_KEY:-$HOME/.ssh/aaa}"
SSH="ssh -i $KEY -o IdentitiesOnly=yes -o BatchMode=yes"
# The ADCP team's own deployment (Cloudways). Not aaa-accreditation.org/adcp:
# after the DNS cut-over that URL is served by this server itself.
ADCP_ORIGIN="${ADCP_ORIGIN:-https://wordpress-1540360-5951805.cloudwaysapps.com/adcp}"
# Legacy uploads come from the old WordPress site while it still answers.
WP_ORIGIN="${WP_ORIGIN:-https://aaa-accreditation.org/wp-content/uploads}"

cd "$(dirname "$0")/.."
sh deploy/wp-uploads-manifest.sh | $SSH "$HOST" 'cat > /opt/aaa-web/wp-uploads.txt'

$SSH "$HOST" "ADCP_ORIGIN='$ADCP_ORIGIN' WP_ORIGIN='$WP_ORIGIN' sh -s" <<'REMOTE'
set -eu
enc() { python3 -c 'import sys, urllib.parse; print(urllib.parse.quote(sys.argv[1]))' "$1"; }

echo "==> Legacy WordPress uploads"
U=/opt/aaa-web/wp-content/uploads
got=0; have=0; miss=0; bad=0
while IFS= read -r f; do
  [ -n "$f" ] || continue
  if [ -s "$U/$f" ]; then have=$((have + 1)); continue; fi
  mkdir -p "$U/$(dirname "$f")"
  if curl -fsS --max-time 90 --retry 2 -o "$U/$f.part" "$WP_ORIGIN/$(enc "$f")" </dev/null 2>/dev/null; then
    mime=$(file -b --mime-type "$U/$f.part")
    case "$mime" in
      application/pdf|application/msword|application/CDFV2|application/vnd.*|application/zip|application/x-ole-storage|image/*)
        mv "$U/$f.part" "$U/$f"; got=$((got + 1)) ;;
      *)
        echo "    REJECTED $f ($mime)"; rm -f "$U/$f.part"; bad=$((bad + 1)) ;;
    esac
  else
    echo "    MISSING  $f"; rm -f "$U/$f.part"; miss=$((miss + 1))
  fi
done < /opt/aaa-web/wp-uploads.txt
chmod -R a+rX /opt/aaa-web/wp-content
echo "    $got downloaded, $have already there, $miss missing at the source, $bad rejected"

echo "==> ADCP certificate portal from $ADCP_ORIGIN"
A=/opt/aaa-web/adcp
T=$(mktemp -d /opt/aaa-web/.adcp-XXXXXX)
trap 'rm -rf "$T"' EXIT
get() { mkdir -p "$T/$(dirname "$1")"; curl -fsS --max-time 90 --retry 2 -o "$T/$1" "$ADCP_ORIGIN/$1" </dev/null; }
for p in index.html asset-manifest.json manifest.json favicon.ico; do get "$p"; done
# Every file of the build (CRA asset manifest), then anything the bundles and
# stylesheets reference under static/ that the manifest does not list. Source
# maps (*.map) are skipped: the origin refuses them (403) and the app does not
# need them.
for p in $(grep -oE '"/adcp/[^"]+"' "$T/asset-manifest.json" | tr -d '"' | sed 's#^/adcp/##' | grep -v '\.map$' | sort -u); do
  [ -f "$T/$p" ] || get "$p"
done
for p in $(cat "$T"/index.html "$T"/static/js/*.js "$T"/static/css/*.css | grep -oE 'static/(media|js|css)/[A-Za-z0-9._-]+' | sort -u); do
  [ -f "$T/$p" ] || get "$p"
done
grep -q 'id="root"' "$T/index.html" || { echo "    index.html is not the ADCP app — not replacing"; exit 1; }
# rsync INTO the existing folder (never mv it): Caddy bind-mounts this exact
# directory, and a replaced folder would leave it serving the old one.
# --delay-updates swaps the new files in at the end, so a half-copied build
# (index.html pointing at assets not there yet) is never served.
mkdir -p "$A"
rsync -a --delete-after --delay-updates "$T/" "$A/"
chmod -R a+rX "$A"
echo "    $(find "$A" -type f | wc -l) files, $(du -sh "$A" | cut -f1) — build $(grep -oE 'main\.[a-z0-9]+\.chunk\.js' "$A/index.html" | head -1)"
REMOTE

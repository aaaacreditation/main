#!/bin/sh
# Turn on the Meta Conversions API on the live server: every website form is
# then also reported to Meta from the server (lib/meta-capi.ts), next to the
# browser Pixel — so ad blockers no longer hide conversions.
#
# Run it yourself, in the Terminal app (the token is typed hidden and goes
# straight to the server — never paste it into a chat):
#
#   cd ~/projects/Clients/AAA/newwebsiteaaa && sh deploy/set-meta-capi.sh
#
# Token: Meta Events Manager → the AAA dataset (pixel 1127877600087566) →
# Settings → Conversions API → "Generate access token".
# Test code (optional): Events Manager → Test events → the TEST… code. While it
# is set, the server's events show up under Test events instead of counting;
# run this again and leave it empty to go live.
#
# It writes META_CAPI_TOKEN and META_TEST_EVENT_CODE into the server's
# deploy/.env.production (other lines untouched, file stays 600), restarts the
# app and sends Meta one test event (never counted) to check the token.
set -eu

HOST="${PREVIEW_HOST:-root@94.72.110.40}"
KEY="${PREVIEW_KEY:-$HOME/.ssh/aaa}"
SSH="ssh -i $KEY -o IdentitiesOnly=yes -o BatchMode=yes"

printf 'Conversions API access token (typing is hidden): ' >&2
stty -echo 2>/dev/null || true
IFS= read -r token
stty echo 2>/dev/null || true
printf '\n' >&2
printf 'Test event code (Enter = none, events count for real): ' >&2
IFS= read -r test_code

[ -n "$token" ] || { echo "The token is required." >&2; exit 1; }

# The values travel on stdin (never on a command line); this program, sent
# base64-encoded as an argument, writes them into the env file.
PROG=$(base64 <<'PY' | tr -d '\n'
import os, sys
path = sys.argv[1]
keys = ["META_CAPI_TOKEN", "META_TEST_EVENT_CODE"]
vals = [sys.stdin.readline().strip() for _ in keys]
for k, v in zip(keys, vals):
    if "'" in v or "\n" in v:
        sys.exit(f"{k} contains a character this settings file cannot store.")
new = {k: f"{k}='{v}'" for k, v in zip(keys, vals)}
out, seen = [], set()
for line in open(path).read().splitlines():
    k = line.split("=", 1)[0]
    if k in new:
        out.append(new[k])
        seen.add(k)
    else:
        out.append(line)
out += [new[k] for k in keys if k not in seen]
tmp = path + ".tmp"
fd = os.open(tmp, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
with os.fdopen(fd, "w") as f:
    f.write("\n".join(out) + "\n")
os.replace(tmp, path)
print("    settings saved")
PY
)

echo "==> Saving the settings on the server"
printf '%s\n%s\n' "$token" "$test_code" |
  $SSH "$HOST" "cd /opt/aaa-web/app && echo $PROG | base64 -d > /root/.aaa-set-meta.py && python3 /root/.aaa-set-meta.py deploy/.env.production; s=\$?; rm -f /root/.aaa-set-meta.py; exit \$s"
unset token

echo "==> Restarting the app and checking the token with Meta"
$SSH "$HOST" sh -s <<'REMOTE'
set -eu
cd /opt/aaa-web/app
C="docker compose -f docker-compose.prod.yml"
$C up -d --no-build app >/dev/null 2>&1
i=0
until [ "$(docker inspect --format '{{.State.Health.Status}}' aaa-web-app-1)" = healthy ]; do
  i=$((i + 1)); [ "$i" -gt 60 ] && { echo "app not healthy"; $C logs --tail=40 app; exit 1; }
  sleep 3
done
echo "    app restarted"

# Inside the app container, with the token from its environment (never printed).
$C exec -T app node -e '
const token = process.env.META_CAPI_TOKEN, test = process.env.META_TEST_EVENT_CODE;
const pixel = "1127877600087566", graph = "https://graph.facebook.com/v25.0";
// Check by sending one Lead marked as a test event (it never counts as real):
// Conversions API tokens may send events without being allowed to read the
// pixel itself, so reading the pixel (GET ?fields=name) is NOT a valid check —
// it answers "(#100) Missing Permission" for a token that works (Nov 26 2026).
(async () => {
  const e = await fetch(`${graph}/${pixel}/events`, {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ access_token: token, test_event_code: test || "TEST29861", data: [{
      event_name: "Lead", event_time: Math.floor(Date.now() / 1000), action_source: "website",
      event_source_url: "https://aaa-accreditation.org/contact-us/",
      user_data: { client_user_agent: "aaa-website-setup-check", client_ip_address: "127.0.0.1" },
      custom_data: { content_name: "Setup check" } }] }),
  });
  const ej = await e.json().catch(() => ({}));
  if (!e.ok) { console.log(`==> Meta did NOT accept the token: ${ej.error?.message ?? e.status}`); process.exit(1); }
  console.log(`==> OK: Meta accepted a test event for pixel ${pixel} (events_received: ${ej.events_received}).`);
  console.log(test ? `    Test mode: the server's events show under Test events (${test}) and do not count.`
                   : "    Live mode: form submissions now count in Events Manager.");
})().catch((err) => { console.log(`==> Could not reach Meta: ${err.message}`); process.exit(1); });
'
REMOTE

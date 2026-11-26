#!/bin/sh
# Turn on the OpenAI Ads Conversions API on the live server: every website
# form is then also reported to OpenAI Ads from the server
# (lib/openai-capi.ts), next to the browser Measurement Pixel.
#
# Run it yourself, in the Terminal app (the key is typed hidden and goes
# straight to the server — never paste it into a chat):
#
#   cd ~/projects/Clients/AAA/newwebsiteaaa && sh deploy/set-openai-ads.sh
#
# Key: the OpenAI Ads Conversions API key for pixel 6NRM8WHoC284zxFVq4ab6g.
#
# It writes OPENAI_ADS_CONVERSIONS_API_KEY into the server's
# deploy/.env.production (other lines untouched, file stays 600), restarts the
# app and sends OpenAI one validate-only test event (checked, not recorded).
set -eu

HOST="${PREVIEW_HOST:-root@94.72.110.40}"
KEY="${PREVIEW_KEY:-$HOME/.ssh/aaa}"
SSH="ssh -i $KEY -o IdentitiesOnly=yes -o BatchMode=yes"

printf 'OpenAI Ads Conversions API key (typing is hidden): ' >&2
stty -echo 2>/dev/null || true
IFS= read -r api_key
stty echo 2>/dev/null || true
printf '\n' >&2

[ -n "$api_key" ] || { echo "The key is required." >&2; exit 1; }

# The value travels on stdin (never on a command line); this program, sent
# base64-encoded as an argument, writes it into the env file.
PROG=$(base64 <<'PY' | tr -d '\n'
import os, sys
path = sys.argv[1]
keys = ["OPENAI_ADS_CONVERSIONS_API_KEY"]
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

echo "==> Saving the key on the server"
printf '%s\n' "$api_key" |
  $SSH "$HOST" "cd /opt/aaa-web/app && echo $PROG | base64 -d > /root/.aaa-set-oai.py && python3 /root/.aaa-set-oai.py deploy/.env.production; s=\$?; rm -f /root/.aaa-set-oai.py; exit \$s"
unset api_key

echo "==> Restarting the app and checking the key with OpenAI"
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

# Inside the app container, with the key from its environment (never printed).
$C exec -T app node -e '
const key = process.env.OPENAI_ADS_CONVERSIONS_API_KEY;
(async () => {
  const r = await fetch("https://bzr.openai.com/v1/events?pid=6NRM8WHoC284zxFVq4ab6g", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
    body: JSON.stringify({ validate_only: true, events: [{
      id: `setup-check-${Date.now()}`, type: "lead_created", timestamp_ms: Date.now(),
      source_url: "https://aaa-accreditation.org/contact-us/", action_source: "web",
      user: { user_agent: "aaa-website-setup-check" }, data: { type: "customer_action" } }] }),
  });
  const text = await r.text();
  if (r.ok) console.log("==> OK: OpenAI accepted the key and a test event (validate only, nothing recorded).");
  else { console.log(`==> OpenAI did NOT accept it: HTTP ${r.status} ${text.slice(0, 300)}`); process.exit(1); }
})().catch((err) => { console.log(`==> Could not reach OpenAI: ${err.message}`); process.exit(1); });
'
REMOTE

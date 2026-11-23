#!/bin/sh
# Turn on the lead notification emails on the live server: every website form
# is saved in Admin → Leads AND emailed to the enquiries mailbox.
#
# Run it yourself, in the Terminal app (the password is typed hidden and goes
# straight to the server — never paste it into a chat):
#
#   cd ~/projects/Clients/AAA/newwebsiteaaa && sh deploy/set-smtp.sh
#
# It asks for the sending mailbox (defaults = Rackspace, which hosts
# @aaa-accreditation.org email), writes the SMTP_* and LEADS_EMAIL_TO lines of
# the server's deploy/.env.production (other lines untouched, file stays 600),
# restarts the app, then submits one test enquiry through the real form
# endpoint: it should arrive at the notification address. The test lead is
# deleted from the admin afterwards.
set -eu

HOST="${PREVIEW_HOST:-root@94.72.110.40}"
KEY="${PREVIEW_KEY:-$HOME/.ssh/aaa}"
SSH="ssh -i $KEY -o IdentitiesOnly=yes -o BatchMode=yes"

ask() { printf '%s' "$1" >&2; IFS= read -r v; printf '%s' "${v:-$2}"; }

smtp_host=$(ask "SMTP server [secure.emailsrvr.com]: " "secure.emailsrvr.com")
smtp_port=$(ask "Port [465]: " "465")
smtp_user=$(ask "Mailbox that sends the emails (full address, e.g. info@aaa-accreditation.org): " "")
printf 'Password of that mailbox (typing is hidden): ' >&2
stty -echo 2>/dev/null || true
IFS= read -r smtp_pass
stty echo 2>/dev/null || true
printf '\n' >&2
leads_to=$(ask "Send the form notifications to [info@aaa-accreditation.org]: " "info@aaa-accreditation.org")

[ -n "$smtp_user" ] && [ -n "$smtp_pass" ] || { echo "Mailbox and password are required." >&2; exit 1; }

# The settings travel on stdin (never on a command line); this program, sent
# base64-encoded as an argument, writes them into the env file.
PROG=$(base64 <<'PY' | tr -d '\n'
import os, sys
path = sys.argv[1]
keys = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "LEADS_EMAIL_TO"]
vals = [sys.stdin.readline().rstrip("\n") for _ in keys]
for k, v in zip(keys, vals):
    if "'" in v:
        sys.exit(f"{k} contains a single quote ('), which this settings file cannot store. Use another mailbox or password.")
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
printf '%s\n%s\n%s\n%s\n%s\n' "$smtp_host" "$smtp_port" "$smtp_user" "$smtp_pass" "$leads_to" |
  $SSH "$HOST" "cd /opt/aaa-web/app && echo $PROG | base64 -d > /root/.aaa-set-smtp.py && python3 /root/.aaa-set-smtp.py deploy/.env.production; s=\$?; rm -f /root/.aaa-set-smtp.py; exit \$s"
unset smtp_pass

echo "==> Restarting the app and sending a test enquiry"
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

since=$(date -u +%Y-%m-%dT%H:%M:%SZ)
curl -sS -o /dev/null -w '    form answered HTTP %{http_code}\n' -X POST http://127.0.0.1:3100/api/leads \
  -H 'content-type: application/json' \
  -d '{"source":"contact-form","business":"Website email test","contact":"AAA website","email":"website-email-test@example.com","sector":"Email test","message":"Test of the website lead notifications. Please ignore - it was sent while setting up the email on the server."}'
sleep 2

sql() { printf '%s\n' "$1" | $C exec -T db sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -At'; }
mailed=$(sql "select count(*) from \"LeadActivity\" a join \"Lead\" l on l.id = a.\"leadId\" where l.email = 'website-email-test@example.com' and a.type = 'email';")
sql "delete from \"Lead\" where email = 'website-email-test@example.com';" >/dev/null

if [ "${mailed:-0}" -gt 0 ]; then
  echo "==> OK: the test email was sent. Check the inbox of the notification address."
else
  echo "==> The email did NOT go out. The server said:"
  $C logs --since "$since" app 2>&1 | grep -i "email failed" | sed 's/^/    /' | tail -5
  echo "    Check the mailbox address and password (and that the mailbox may send through SMTP), then run this again."
  exit 1
fi
REMOTE

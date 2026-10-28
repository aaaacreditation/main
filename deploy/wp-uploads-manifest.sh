#!/bin/sh
# List every legacy WordPress upload the new site still links to, as paths
# relative to wp-content/uploads/ — one per line, ready for rsync --files-from.
#
#   sh deploy/wp-uploads-manifest.sh > /tmp/wp-uploads.txt
#
# Pages (app/documents, the scheme pages, the healthcare cluster…) and the
# migrated posts (app/news/posts-data.json) link to
# https://aaa-accreditation.org/wp-content/uploads/... Once the domain points
# at the new server those URLs 404 unless the files are copied there and
# served statically (deploy/nginx/… and deploy/Caddyfile both do this).
#
# Copy only these files, never the whole folder: the old WordPress site was
# compromised (SEO-spam injection, June 2026) and its uploads directory is not
# trusted. See docs/DEPLOYMENT.md "Legacy WordPress uploads".
set -eu
cd "$(dirname "$0")/.."

grep -rhoE "https?://(www\.)?aaa-accreditation\.org/wp-content/uploads/[^\"')<> ]+" app lib \
  | sed -E 's#^https?://(www\.)?aaa-accreditation\.org/wp-content/uploads/##' \
  | sed -E 's/[?#].*$//' \
  | grep -E '\.(pdf|docx?|xlsx?|pptx?|jpe?g|png|gif|webp)$' \
  | sort -u

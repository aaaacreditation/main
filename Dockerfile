# syntax=docker/dockerfile:1
#
# AAA website + admin portal — production image for the Hetzner VPS.
#
#   docker build -t aaa-web .            (or: docker compose -f docker-compose.prod.yml build)
#
# Stages
#   base     node 24 on Debian bookworm + openssl/ca-certificates. Prisma detects
#            debian-openssl-3.0.x here, so the engines it downloads match the
#            runtime — no binaryTargets change in schema.prisma is needed.
#   deps     npm ci from the lockfile (postinstall runs `prisma generate`).
#   builder  NEXT_OUTPUT=standalone next build. No DATABASE_URL exists at build
#            time; the public pages fall back to the bundled data files.
#   tools    a self-contained Prisma CLI + client + bcryptjs tree in /tools,
#            laid out like the repo (prisma/, app/_data/, app/news/) so that
#            `prisma migrate deploy` and prisma/seed.mjs run unchanged. Kept
#            apart from the traced standalone node_modules so neither can
#            break the other.
#   runner   standalone server.js as the unprivileged `node` user.
#
# Build on the machine that will run it (the Hetzner box is amd64; an Apple
# Silicon laptop builds arm64), or cross-build with
#   docker buildx build --platform linux/amd64 -t aaa-web .

ARG NODE_IMAGE=node:24-bookworm-slim

# ---------------------------------------------------------------- base
FROM ${NODE_IMAGE} AS base
RUN apt-get update \
 && apt-get install -y --no-install-recommends openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*
ENV NEXT_TELEMETRY_DISABLED=1 \
    CHECKPOINT_DISABLE=1 \
    PRISMA_HIDE_UPDATE_MESSAGE=1

# ---------------------------------------------------------------- deps
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# The postinstall hook (`prisma generate`) needs the schema during `npm ci`.
COPY prisma ./prisma
# --legacy-peer-deps: the project's dependency tree needs it (see README).
RUN npm ci --legacy-peer-deps --no-audit --no-fund

# ---------------------------------------------------------------- builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_OUTPUT=standalone switches next.config.ts to output "standalone" and
# distDir ".next" (local dev keeps ".next.nosync").
ENV NEXT_OUTPUT=standalone
RUN npx prisma generate \
 && npx next build

# ---------------------------------------------------------------- tools
FROM base AS tools
WORKDIR /tools
COPY package-lock.json /tmp/package-lock.json
# Same versions as the app, read from the lockfile (never a floating range).
RUN set -eu; \
    v() { node -p "require('/tmp/package-lock.json').packages['node_modules/$1'].version"; }; \
    echo '{ "name": "aaa-tools", "private": true, "type": "module" }' > package.json; \
    npm install --omit=dev --no-audit --no-fund --no-package-lock \
      "prisma@$(v prisma)" "@prisma/client@$(v @prisma/client)" "bcryptjs@$(v bcryptjs)"; \
    rm /tmp/package-lock.json
COPY prisma ./prisma
# Data the seed imports (posts snapshot, case studies, accredited register).
COPY app/_data ./app/_data
COPY app/news/posts-data.json ./app/news/posts-data.json
COPY deploy/create-user.mjs ./create-user.mjs
# Generate the client here, and fail the build if the schema engine (which
# `migrate deploy` needs) was not downloaded — the runtime user cannot fetch it.
RUN node node_modules/prisma/build/index.js generate --schema prisma/schema.prisma \
 && ls node_modules/@prisma/engines | grep -q '^schema-engine-' \
 && ls node_modules/.prisma/client | grep -q '^libquery_engine-'

# ---------------------------------------------------------------- runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000

# Standalone server + its traced node_modules. Owned by `node` because ISR and
# the image optimiser write under .next/ at runtime.
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
# The full generated Prisma client (query engine included), in case the trace
# missed a file. Same platform as the runner, so it is a no-op when complete.
COPY --from=builder --chown=node:node /app/node_modules/.prisma ./node_modules/.prisma

# Migration / seed / user tooling (read-only for the app user).
COPY --from=tools /tools /tools
COPY deploy/entrypoint.sh /usr/local/bin/aaa-entrypoint
RUN chmod 0755 /usr/local/bin/aaa-entrypoint \
 && mkdir -p /app/.next/cache \
 && chown node:node /app/.next/cache

USER node
EXPOSE 3000

# bookworm-slim ships no curl/wget; use Node's fetch. /robots.txt is cheap and
# does not touch the database.
HEALTHCHECK --interval=30s --timeout=5s --start-period=90s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/robots.txt').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

ENTRYPOINT ["aaa-entrypoint"]
CMD ["serve"]

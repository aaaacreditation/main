-- Admin-managed categories and tags (Nov 2026). Additive only.

-- CreateEnum
CREATE TYPE "TermKind" AS ENUM ('POST_CATEGORY', 'POST_TAG', 'ORG_TAG');

-- CreateTable
CREATE TABLE "Term" (
    "id" TEXT NOT NULL,
    "kind" "TermKind" NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "section" TEXT NOT NULL DEFAULT 'news',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Term_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Term_kind_slug_key" ON "Term"("kind", "slug");

-- CreateIndex
CREATE INDEX "Term_kind_order_idx" ON "Term"("kind", "order");

-- The starting categories: the ones the articles already use plus the editor's
-- old suggestions. News & Announcements list "news" categories, Articles the rest.
INSERT INTO "Term" ("id", "kind", "name", "slug", "section", "order", "updatedAt") VALUES
  ('term-cat-news',               'POST_CATEGORY', 'News',               'news',               'news',     0, NOW()),
  ('term-cat-announcements',      'POST_CATEGORY', 'Announcements',      'announcements',      'news',     1, NOW()),
  ('term-cat-events',             'POST_CATEGORY', 'Events',             'events',             'news',     2, NOW()),
  ('term-cat-accreditation',      'POST_CATEGORY', 'Accreditation',      'accreditation',      'articles', 3, NOW()),
  ('term-cat-healthcare',         'POST_CATEGORY', 'Healthcare',         'healthcare',         'articles', 4, NOW()),
  ('term-cat-training-providers', 'POST_CATEGORY', 'Training Providers', 'training-providers', 'articles', 5, NOW()),
  ('term-cat-services',           'POST_CATEGORY', 'Services',           'services',           'articles', 6, NOW()),
  ('term-cat-insights',           'POST_CATEGORY', 'Insights',           'insights',           'articles', 7, NOW())
ON CONFLICT ("kind", "slug") DO NOTHING;

-- Any other category or tag already on an article becomes a managed term too.
INSERT INTO "Term" ("id", "kind", "name", "slug", "section", "order", "updatedAt")
SELECT 'term-cat-' || md5(c), 'POST_CATEGORY', c,
       trim(both '-' from lower(regexp_replace(c, '[^a-zA-Z0-9]+', '-', 'g'))), 'articles', 100, NOW()
FROM (SELECT DISTINCT trim("category") AS c FROM "Post" WHERE trim("category") <> '') used
WHERE trim(both '-' from lower(regexp_replace(c, '[^a-zA-Z0-9]+', '-', 'g'))) <> ''
ON CONFLICT ("kind", "slug") DO NOTHING;

INSERT INTO "Term" ("id", "kind", "name", "slug", "section", "order", "updatedAt")
SELECT 'term-tag-' || md5(t), 'POST_TAG', t,
       trim(both '-' from lower(regexp_replace(t, '[^a-zA-Z0-9]+', '-', 'g'))), 'news', 0, NOW()
FROM (SELECT DISTINCT trim(x) AS t FROM "Post", unnest("tags") AS x WHERE trim(x) <> '') used
WHERE trim(both '-' from lower(regexp_replace(t, '[^a-zA-Z0-9]+', '-', 'g'))) <> ''
ON CONFLICT ("kind", "slug") DO NOTHING;

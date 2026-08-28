/**
 * Seeds the CMS database:
 *  - one ADMIN user (credentials from ADMIN_EMAIL / ADMIN_PASSWORD in .env)
 *  - all legacy WordPress articles from app/news/posts-data.json
 *
 * Idempotent, and INCREMENTAL: the admin user is upserted, and any post in the
 * snapshot whose slug is not already in the database is inserted. It used to
 * bail out entirely once the table was non-empty, which meant a refreshed
 * snapshot could never reach the database — re-running it after
 * `node scripts/sync-news-posts.mjs` silently imported nothing, and the new
 * articles 404'd because the DB takes precedence over the JSON fallback.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { readFileSync } from "node:fs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@aaa-accreditation.org";
  const password = process.env.ADMIN_PASSWORD || "ChangeMe!2026";
  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where: { email },
    update: { role: "ADMIN" },
    create: { email, name: "AAA Admin", passwordHash, role: "ADMIN" },
  });
  console.log(`Admin user ready: ${admin.email}`);

  const existing = await prisma.post.count();
  console.log(`Posts already in database: ${existing}`);

  const raw = JSON.parse(
    readFileSync(new URL("../app/news/posts-data.json", import.meta.url), "utf8")
  );

  const knownSlugs = new Set(
    (await prisma.post.findMany({ select: { slug: true } })).map((p) => p.slug)
  );
  const fresh = raw.filter((p) => !knownSlugs.has(p.slug));
  if (fresh.length === 0) {
    console.log("No new posts in the snapshot — database is up to date.");
    return;
  }
  console.log(`New posts to import: ${fresh.length}`);

  const data = fresh.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    content: p.content ?? "",
    images: Array.isArray(p.images) ? p.images : [],
    // Old-site image URLs are kept in `images` for reference but never used as
    // covers — the legacy WordPress host was compromised (June 2026).
    coverImage: null,
    category: "News",
    status: "PUBLISHED",
    publishedAt: new Date(p.date),
    authorId: admin.id,
  }));

  let imported = 0;
  for (let i = 0; i < data.length; i += 50) {
    const res = await prisma.post.createMany({
      data: data.slice(i, i + 50),
      skipDuplicates: true,
    });
    imported += res.count;
  }
  console.log(`Imported ${imported} posts from posts-data.json.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

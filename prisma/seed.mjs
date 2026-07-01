/**
 * Seeds the CMS database:
 *  - one ADMIN user (credentials from ADMIN_EMAIL / ADMIN_PASSWORD in .env)
 *  - all legacy WordPress articles from app/news/posts-data.json (299 posts)
 *
 * Idempotent: the admin user is upserted; posts are only imported when the
 * posts table is empty, and duplicates are skipped either way.
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
  if (existing > 0) {
    console.log(`Posts already present (${existing}) — skipping article import.`);
    return;
  }

  const raw = JSON.parse(
    readFileSync(new URL("../app/news/posts-data.json", import.meta.url), "utf8")
  );

  const data = raw.map((p) => ({
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

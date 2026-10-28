/**
 * Seeds the CMS database:
 *  - one ADMIN user (credentials from ADMIN_EMAIL / ADMIN_PASSWORD in .env)
 *  - all legacy WordPress articles from app/news/posts-data.json
 *  - case studies from app/_data/home-stories.ts + app/_data/case-studies.ts
 *  - the accredited-organizations register from app/_data/accredited-organizations.json
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
  console.log(`New posts to import: ${fresh.length}`);

  const data = fresh.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    content: p.content ?? "",
    images: Array.isArray(p.images) ? p.images : [],
    // Old-site image URLs stay in `images` for reference only — the legacy
    // WordPress host was compromised (June 2026). Covers are the local WebP
    // copies made by scripts/sync-news-posts.mjs (Oct 2026), never wp-content.
    coverImage: p.cover ?? null,
    category: p.category ?? "News",
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

  // Backfill covers and categories on posts imported before they existed.
  // Only rows still carrying the import defaults (no cover, "News") are
  // touched, so anything edited in the admin keeps its own values.
  let backfilled = 0;
  for (const p of raw) {
    if (!p.cover && !p.category) continue;
    const res = await prisma.post.updateMany({
      where: { slug: p.slug, coverImage: null, category: "News" },
      data: { coverImage: p.cover ?? null, category: p.category ?? "News" },
    });
    backfilled += res.count;
  }
  console.log(`Backfilled cover/category on ${backfilled} posts.`);

  await seedCaseStudies();
  await seedOrganizations();
}

/* ------------------------------------------------------------ case studies */

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96) || "untitled";

/**
 * The home carousel and the SME page were supplied as two separate lists with
 * different wording for the same organizations, so each placement gets its
 * own rows (verbatim, in the documents' order). Seeds only when the table is
 * empty — after that the admin owns the content.
 */
async function seedCaseStudies() {
  if ((await prisma.caseStudy.count()) > 0) {
    console.log("Case studies already seeded — skipping.");
    return;
  }
  // Node 24 strips TypeScript types natively; these files are plain data.
  const { HOME_STORIES } = await import("../app/_data/home-stories.ts");
  const { CASE_STUDIES } = await import("../app/_data/case-studies.ts");

  const used = new Set();
  const uniqueSlug = (base) => {
    let slug = base;
    for (let i = 2; used.has(slug); i++) slug = `${base}-${i}`;
    used.add(slug);
    return slug;
  };

  const rows = [
    ...HOME_STORIES.map((s, i) => ({
      slug: uniqueSlug(slugify(s.name)),
      name: s.name,
      sector: s.sector ?? "",
      country: s.country ?? "",
      metric: s.metric ?? "",
      quote: s.quote ?? "",
      image: s.img ?? null,
      imageAlt: s.alt ?? "",
      imagePosition: s.imgPosition ?? "",
      logo: s.logo ?? null,
      logoTight: Boolean(s.logoTight),
      videoUrl: s.video ?? null,
      link: s.href ?? null,
      featured: Boolean(s.featured),
      showOnHome: true,
      order: i,
    })),
    ...CASE_STUDIES.map((s, i) => ({
      slug: uniqueSlug(`${slugify(s.name)}-sme`),
      name: s.name,
      sector: s.sector ?? "",
      country: s.country ?? "",
      metric: s.metric ?? "",
      quote: s.quote ?? "",
      description: s.desc ?? "",
      image: s.img ?? null,
      imageAlt: `${s.name} — AAA accreditation`,
      logo: s.logo ?? null,
      initials: s.initials ?? "",
      showOnSme: true,
      order: 100 + i,
    })),
  ];
  const res = await prisma.caseStudy.createMany({ data: rows });
  console.log(`Seeded ${res.count} case studies (${HOME_STORIES.length} home, ${CASE_STUDIES.length} SME).`);
}

/* ---------------------------------------------------- accredited register */

const MONTHS = /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}$/i;

/** "May 1, 2029" → Date (UTC noon, so no timezone can shift the day). */
function parseExpiry(text) {
  const t = (text || "").trim();
  if (!MONTHS.test(t)) return null;
  const d = new Date(`${t} 12:00:00 UTC`);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Imports the register snapshot. Seeds only when the table is empty — the
 * admin owns the register afterwards (scripts/sync-accredited-organizations.mjs
 * refreshes the JSON fallback; re-import deliberately with --reset-directory).
 */
async function seedOrganizations() {
  const reset = process.argv.includes("--reset-directory");
  if (!reset && (await prisma.organization.count()) > 0) {
    console.log("Accredited organizations already seeded — skipping.");
    return;
  }
  if (reset) await prisma.organization.deleteMany();

  const orgs = JSON.parse(
    readFileSync(new URL("../app/_data/accredited-organizations.json", import.meta.url), "utf8")
  );
  const used = new Set();
  let records = 0;
  for (const [i, o] of orgs.entries()) {
    let slug = slugify(`${o.name}-${o.country || ""}`);
    for (let n = 2; used.has(slug); n++) slug = `${slugify(`${o.name}-${o.country || ""}`)}-${n}`;
    used.add(slug);
    await prisma.organization.create({
      data: {
        slug,
        name: o.name,
        location: o.location ?? "",
        country: o.country ?? "",
        description: o.description ?? "",
        logo: o.logo ?? null,
        order: i,
        accreditations: {
          create: (o.accreditations ?? []).map((a, j) => ({
            accreditedAs: a.accreditedAs ?? "",
            number: a.number ?? "",
            scope: a.scope ?? "",
            expiry: a.expiry ?? "",
            expiresOn: parseExpiry(a.expiry),
            status: a.status ?? "Accredited",
            order: j,
          })),
        },
      },
    });
    records += (o.accreditations ?? []).length;
  }
  console.log(`Seeded ${orgs.length} organizations with ${records} accreditation records.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

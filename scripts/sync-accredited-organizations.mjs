/**
 * Rebuild app/_data/accredited-organizations.json from the live register at
 * aaa-accreditation.org/accredited-organizations/.
 *
 * The register is rendered by a WordPress shortcode, so the public REST API
 * returns it fully rendered: one `.cbp-box` per accreditation record, with the
 * organization's logo, name, location, description and the record itself
 * (accredited as, scope, number, expiry, status) in `data-*` attributes.
 *
 * Several organizations hold more than one accreditation (Inspeed Global has
 * five), so records are grouped by organization name; the first record — the
 * register lists newest first — supplies the logo, location and description.
 *
 * Logos are downloaded into public/accredited/logos/ as WebP so the site no
 * longer depends on wp-content once it takes over the domain.
 *
 * Since Oct 2026 the database (Organization / Accreditation, edited in the
 * admin portal at /admin/directory) is the register's source of truth, and the
 * public pages read it through getAccreditedOrganizations() in
 * lib/directory.ts. The JSON this script writes is the seed (prisma/seed.mjs
 * imports it into an empty table) and the fallback the site renders when the
 * database is unreachable. Refreshing it does NOT change the live register:
 * to replace the database rows with a fresh snapshot, re-run the seed with
 * --reset-directory, which discards every edit made in the admin.
 *
 * Run:  node scripts/sync-accredited-organizations.mjs [--dry]
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const API = "https://aaa-accreditation.org/wp-json/wp/v2/pages?slug=accredited-organizations&_fields=content";
const OUT = new URL("../app/_data/accredited-organizations.json", import.meta.url);
const LOGO_DIR = new URL("../public/accredited/logos/", import.meta.url);
const DRY = process.argv.includes("--dry");

/** Spelling slips in the live register, corrected to the organization's own name. */
const NAME_FIXES = {
  "StudvMEDIC LLC": "StudyMEDIC LLC",
  "Delta university": "Delta University for Science & Technology",
};

/** Country spellings in `location` → the names the register filter uses. */
const COUNTRY_ALIASES = {
  usa: "United States",
  "u.s.a": "United States",
  "united states of america": "United States",
  uk: "United Kingdom",
  england: "United Kingdom",
  scotland: "United Kingdom",
  uae: "United Arab Emirates",
  turkiye: "Turkey",
  "türkiye": "Turkey",
  "trinidad & tobago": "Trinidad and Tobago",
  ksa: "Saudi Arabia",
};

const NAMED = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”", ndash: "–", mdash: "—", hellip: "…" };
const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_m, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_m, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => NAMED[n.toLowerCase()] ?? m);

const clean = (s) => decode(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();

/** "INDIA" → "India"; leaves mixed-case words and short codes (USA, UAE) alone. */
const unshout = (s) =>
  s.replace(/\b[A-Z][A-Z'’-]{3,}\b/g, (w) => w[0] + w.slice(1).toLowerCase());

function countryOf(location) {
  const last = location.split(",").pop().trim();
  const key = last.toLowerCase();
  if (COUNTRY_ALIASES[key]) return COUNTRY_ALIASES[key];
  return unshout(last);
}

const slugify = (s) =>
  s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

const norm = (s) => s.toLowerCase().replace(/’/g, "'").replace(/[^a-z0-9]/g, "");

const attr = (box, name) => {
  const m = box.match(new RegExp(`data-${name}="([^"]*)"`));
  return m ? clean(m[1]) : "";
};
const pick = (box, re) => {
  const m = box.match(re);
  return m ? m[1] : "";
};

const res = await fetch(API);
if (!res.ok) throw new Error(`register fetch failed: ${res.status}`);
const [page] = await res.json();
const html = page?.content?.rendered ?? "";
const boxes = html.split('<div class="cbp-box">').slice(1);
if (boxes.length === 0) throw new Error("no .cbp-box records found — has the register markup changed?");

/** @type {Map<string, any>} */
const orgs = new Map();
for (const box of boxes) {
  const rawName = clean(pick(box, /class="cbp-title">([\s\S]*?)<\/h2>/));
  const name = NAME_FIXES[rawName] ?? rawName;
  const location = unshout(clean(pick(box, /class="cbp-country">([\s\S]*?)<\/h4>/)));
  const record = {
    accreditedAs: attr(box, "accredited_as"),
    number: attr(box, "acc_no"),
    scope: attr(box, "scope"),
    expiry: attr(box, "exp_date"),
    status: attr(box, "status"),
  };
  const key = norm(name);
  const existing = orgs.get(key);
  if (existing) {
    existing.accreditations.push(record);
    continue;
  }
  orgs.set(key, {
    name,
    location,
    country: countryOf(location),
    description: clean(pick(box, /class="cbp-description">([\s\S]*?)<\/p>/)),
    logoUrl: pick(box, /<img[^>]*src="([^"]+)"[^>]*class="cbp-logo"/),
    accreditations: [record],
  });
}

// Prefer the readable casing when the first record shouted the name.
for (const o of orgs.values()) {
  if (o.name === o.name.toUpperCase() && /[A-Z]{4}/.test(o.name)) o.name = unshout(o.name);
}

if (!DRY) mkdirSync(LOGO_DIR, { recursive: true });

/**
 * The register embeds resized copies (…-300x130.jpg); the original upload is
 * sharper, so try it first and fall back to the embedded copy when it is
 * missing or too large to decode.
 */
async function saveLogo(url, dest) {
  const original = url.replace(/-\d+x\d+(\.[a-z]+)$/i, "$1");
  for (const candidate of original === url ? [url] : [original, url]) {
    const r = await fetch(candidate);
    if (!r.ok) continue;
    try {
      const input = Buffer.from(await r.arrayBuffer());
      // Trim the empty margins many uploads carry, so the mark fills its plate.
      const trimmed = await sharp(input).trim({ threshold: 18 }).toBuffer().catch(() => input);
      await sharp(trimmed)
        .extend({ top: 6, bottom: 6, left: 6, right: 6, background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .resize({ width: 400, height: 240, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 86, alphaQuality: 90 })
        .toFile(dest);
      return;
    } catch (err) {
      console.warn(`  ! ${candidate}: ${err.message}`);
    }
  }
  throw new Error(`logo download failed: ${url}`);
}

const out = [];
const used = new Set();
for (const o of orgs.values()) {
  let slug = slugify(o.name);
  while (used.has(slug)) slug += "-2";
  used.add(slug);
  const file = `${slug}.webp`;
  if (o.logoUrl && !DRY && !existsSync(new URL(file, LOGO_DIR))) {
    await saveLogo(o.logoUrl, new URL(file, LOGO_DIR).pathname);
  }
  out.push({
    name: o.name,
    location: o.location,
    country: o.country,
    ...(o.description ? { description: o.description } : {}),
    ...(o.logoUrl ? { logo: `/accredited/logos/${file}` } : {}),
    accreditations: o.accreditations,
  });
}

const records = out.reduce((n, o) => n + o.accreditations.length, 0);
console.log(`records=${boxes.length} organizations=${out.length} (multi-record: ${out.filter((o) => o.accreditations.length > 1).length})`);
if (records !== boxes.length) throw new Error("record count mismatch");

if (!DRY) {
  writeFileSync(OUT, JSON.stringify(out, null, 1) + "\n");
  console.log(`wrote ${out.length} organizations`);
}

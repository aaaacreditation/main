import legacyJson from "../app/_data/legacy-custom-box.json";
import type { Org } from "../app/_data/accredited-organizations";
import { slugify } from "./slug";

/**
 * Accredited-organization profile pages, /custom-box/<slug>/ (Nov 2026). The
 * old WordPress site had one page per organization at that address (150 of
 * them, many linked from certificates, emails and the organizations' own
 * sites); the client asked for those links to stay real pages.
 *
 * app/_data/legacy-custom-box.json maps every old profile slug to the register
 * organization it described (matched by name in the Nov 17 2026 audit), or to
 * null when the organization is no longer listed. An organization's address
 * is its old slug — the shortest one when the old site had duplicates
 * (inspeed-global, inspeed-global-2…) — or, for organizations added since,
 * the slug of its name. Client-safe (no database access).
 */

type LegacyEntry = { name: string; org: string } | null;
const LEGACY = legacyJson as Record<string, LegacyEntry>;

/** Organization name slug → its public profile slug (the shortest old slug). */
const PRIMARY = new Map<string, string>();
for (const old of Object.keys(LEGACY).sort((a, b) => a.length - b.length || a.localeCompare(b))) {
  const entry = LEGACY[old];
  if (entry && !PRIMARY.has(entry.org)) PRIMARY.set(entry.org, old);
}

export function profileSlug(org: Pick<Org, "name">): string {
  const key = slugify(org.name);
  return PRIMARY.get(key) ?? key;
}

/** Route path of an organization's profile (render through publicPath / SiteLink). */
export const profilePath = (org: Pick<Org, "name">) => `/custom-box/${profileSlug(org)}`;

export type ProfileMatch =
  | { kind: "org"; org: Org; slug: string }
  /** An old profile whose organization is no longer in the register. */
  | { kind: "delisted" }
  | null;

/** Resolve a /custom-box/<slug>/ address against the register. */
export function findProfile(orgs: Org[], slug: string): ProfileMatch {
  const legacy = Object.hasOwn(LEGACY, slug) ? LEGACY[slug] : undefined;
  if (legacy === null) return { kind: "delisted" };
  const key = legacy ? legacy.org : slug;
  const org = orgs.find((o) => slugify(o.name) === key);
  if (org) return { kind: "org", org, slug: profileSlug(org) };
  return legacy ? { kind: "delisted" } : null;
}

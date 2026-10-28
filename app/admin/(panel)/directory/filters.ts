import { ContentStatus, type Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import {
  ACCREDITATION_STATUSES,
  ACCREDITATION_TYPES,
  accreditationType,
  type AccreditationTypeId,
} from "@/app/_data/accredited-organizations";
import { DAY_MS, expiryTone } from "@/lib/directory";

/**
 * Directory admin: loading, filtering and stats shared by the list page and
 * the CSV export, so an export always contains exactly what the list shows.
 *
 * The program-type filter is the regex mapping in accreditationType(), which
 * SQL can't express, so the whole register (a few hundred rows) is loaded
 * once and filtered in memory — counts and pages stay consistent.
 */

export const adminOrgInclude = {
  accreditations: { orderBy: { order: "asc" } },
} satisfies Prisma.OrganizationInclude;

export type AdminOrg = Prisma.OrganizationGetPayload<{ include: typeof adminOrgInclude }>;
export type AdminRecord = AdminOrg["accreditations"][number];

/** Every organization, any publish status, in register order. */
export function loadAdminOrganizations(): Promise<AdminOrg[]> {
  return prisma.organization.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: adminOrgInclude,
  });
}

export const EXPIRY_FILTERS = {
  expired: "Expired",
  "30": "Expires ≤ 30 days",
  "90": "Expires ≤ 90 days",
} as const;
export type ExpiryFilter = keyof typeof EXPIRY_FILTERS;

export type DirectoryFilters = {
  q: string;
  country: string;
  type: AccreditationTypeId | "";
  rstatus: string;
  status: ContentStatus | "";
  expiry: ExpiryFilter | "";
};

type Params = Record<string, string | string[] | undefined> | URLSearchParams;

function param(sp: Params, key: string): string {
  const v = sp instanceof URLSearchParams ? sp.get(key) : sp[key];
  const s = Array.isArray(v) ? v[0] : v;
  return typeof s === "string" ? s.trim().slice(0, 200) : "";
}

export function parseDirectoryFilters(sp: Params): DirectoryFilters {
  const type = param(sp, "type");
  const rstatus = param(sp, "rstatus");
  const status = param(sp, "status");
  const expiry = param(sp, "expiry");
  return {
    q: param(sp, "q"),
    country: param(sp, "country"),
    type: Object.hasOwn(ACCREDITATION_TYPES, type) ? (type as AccreditationTypeId) : "",
    rstatus: (ACCREDITATION_STATUSES as readonly string[]).includes(rstatus) ? rstatus : "",
    status: status === "PUBLISHED" || status === "DRAFT" ? status : "",
    expiry: Object.hasOwn(EXPIRY_FILTERS, expiry) ? (expiry as ExpiryFilter) : "",
  };
}

/** The non-empty filters as a query string (no leading "?"). */
export function filtersQuery(f: DirectoryFilters, extra: Record<string, string> = {}): string {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries({ ...f, ...extra })) if (v) p.set(k, v);
  return p.toString();
}

export function hasRecordFilters(f: DirectoryFilters): boolean {
  return Boolean(f.type || f.rstatus || f.expiry);
}

/** Record-level filters: program type, record status and expiry window (date only). */
function recordMatches(a: AdminRecord, f: DirectoryFilters, now: number): boolean {
  if (f.type && accreditationType(a) !== f.type) return false;
  if (f.rstatus && a.status !== f.rstatus) return false;
  if (f.expiry) {
    if (!a.expiresOn) return false;
    const t = a.expiresOn.getTime();
    if (f.expiry === "expired") return t < now;
    return t >= now && t <= now + Number(f.expiry) * DAY_MS;
  }
  return true;
}

export type FilteredOrg = {
  org: AdminOrg;
  /** The records that satisfy the record-level filters (all of them when none is set). */
  matched: AdminRecord[];
};

export function filterOrganizations(
  orgs: AdminOrg[],
  f: DirectoryFilters,
  now: Date = new Date()
): FilteredOrg[] {
  const q = f.q.toLowerCase();
  const byRecord = hasRecordFilters(f);
  const t = now.getTime();
  const out: FilteredOrg[] = [];
  for (const org of orgs) {
    if (f.status && org.status !== f.status) continue;
    if (f.country && org.country !== f.country) continue;
    if (q) {
      const text = [
        org.name,
        org.location,
        org.country,
        ...org.accreditations.flatMap((a) => [a.number, a.accreditedAs]),
      ]
        .join(" \u0000 ")
        .toLowerCase();
      if (!text.includes(q)) continue;
    }
    const matched = byRecord
      ? org.accreditations.filter((a) => recordMatches(a, f, t))
      : org.accreditations;
    if (byRecord && matched.length === 0) continue;
    out.push({ org, matched });
  }
  return out;
}

/**
 * The record whose expiry the list shows: the soonest-expiring record still
 * marked Accredited, or — when none is — the soonest of the rest (shown
 * without an alert tone).
 */
export function soonestExpiry(org: AdminOrg): AdminRecord | null {
  const dated = org.accreditations.filter((a) => a.expiresOn);
  const pool = dated.some((a) => a.status === "Accredited")
    ? dated.filter((a) => a.status === "Accredited")
    : dated;
  let best: AdminRecord | null = null;
  for (const a of pool) if (!best || a.expiresOn! < best.expiresOn!) best = a;
  return best ?? org.accreditations.find((a) => a.expiry) ?? null;
}

export type DirectoryStats = {
  organizations: number;
  published: number;
  records: number;
  accreditedRecords: number;
  /** Countries on the public register (published organizations with a record). */
  publicCountries: number;
  /** Accredited records expiring within 90 days. */
  expiring: number;
  /** Accredited records already past their expiry date. */
  expired: number;
};

export function directoryStats(orgs: AdminOrg[], now: Date = new Date()): DirectoryStats {
  let records = 0;
  let accreditedRecords = 0;
  let expiring = 0;
  let expired = 0;
  const countries = new Set<string>();
  for (const o of orgs) {
    if (o.status === ContentStatus.PUBLISHED && o.accreditations.length > 0 && o.country) {
      countries.add(o.country);
    }
    for (const a of o.accreditations) {
      records++;
      if (a.status === "Accredited") accreditedRecords++;
      const tone = expiryTone(a, now, 90);
      if (tone === "expired") expired++;
      else if (tone === "soon") expiring++;
    }
  }
  return {
    organizations: orgs.length,
    published: orgs.filter((o) => o.status === ContentStatus.PUBLISHED).length,
    records,
    accreditedRecords,
    publicCountries: countries.size,
    expiring,
    expired,
  };
}

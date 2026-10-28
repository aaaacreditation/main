import { cache } from "react";
import { ContentStatus, type Prisma } from "@prisma/client";
import { prisma } from "./db";
import {
  ACCREDITED_ORGANIZATIONS,
  registerCountries,
  registerStats,
  type Org,
  type RegisterStats,
} from "@/app/_data/accredited-organizations";

/**
 * The public register of accredited organizations, read from the database.
 *
 * The Organization / Accreditation tables are the source of truth (edited at
 * /admin/directory). The bundled snapshot in app/_data/accredited-organizations.json
 * is used only when the database throws — a reachable database with no
 * published rows renders an empty register, never the snapshot. After one
 * failure the database is skipped for 60 seconds in this process, so a build
 * or preview without a database doesn't wait on a connection per page.
 *
 * Descriptions are the organizations' own wording and status is shown as
 * published — nothing here rewrites or infers either.
 *
 * Server-only (Prisma). Client components import the types and pure helpers
 * from app/_data/accredited-organizations instead.
 */

export { registerCountries, registerStats };
export type { Org, RegisterStats };

export const DAY_MS = 86_400_000;
const DB_RETRY_MS = 60_000;
let dbUnavailableUntil = 0;

const orgInclude = {
  accreditations: { orderBy: { order: "asc" } },
} satisfies Prisma.OrganizationInclude;

type OrgRow = Prisma.OrganizationGetPayload<{ include: typeof orgInclude }>;

/** A database row in the shape the public pages (and the JSON snapshot) use. */
function toOrg(r: OrgRow): Org {
  return {
    name: r.name,
    location: r.location,
    country: r.country,
    ...(r.description ? { description: r.description } : {}),
    ...(r.logo ? { logo: r.logo } : {}),
    accreditations: r.accreditations.map((a) => ({
      accreditedAs: a.accreditedAs,
      number: a.number,
      scope: a.scope,
      expiry: a.expiry,
      status: a.status,
    })),
  };
}

/**
 * Published organizations in register order (lower `order` first, so the most
 * recently added lead), each with its accreditation records in order.
 * Organizations without a record are left out: every register card leads with
 * one. Deduplicated per request with React `cache`, so `generateMetadata` and
 * the page share one query.
 */
export const getAccreditedOrganizations = cache(async (): Promise<Org[]> => {
  if (Date.now() < dbUnavailableUntil) return ACCREDITED_ORGANIZATIONS;
  try {
    const rows = await prisma.organization.findMany({
      where: { status: ContentStatus.PUBLISHED, accreditations: { some: {} } },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      include: orgInclude,
    });
    return rows.map(toOrg);
  } catch (err) {
    dbUnavailableUntil = Date.now() + DB_RETRY_MS;
    console.error("getAccreditedOrganizations: falling back to bundled register —", err);
    return ACCREDITED_ORGANIZATIONS;
  }
});

/**
 * Accreditation records due for renewal: status "Accredited" with a parsed
 * expiry between now and now + `days`. Counts every organization, published
 * or draft — it is a staff alert, not a public figure. Returns 0 if the
 * database is unreachable.
 */
export async function countExpiringAccreditations(days = 90): Promise<number> {
  const now = new Date();
  try {
    return await prisma.accreditation.count({
      where: {
        status: "Accredited",
        expiresOn: { gte: now, lte: new Date(now.getTime() + days * DAY_MS) },
      },
    });
  } catch (err) {
    console.error("countExpiringAccreditations failed —", err);
    return 0;
  }
}

/* ------------------------------------------------------------- helpers */

const EXPIRY_TEXT =
  /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}$/i;

/**
 * The published expiry text ("May 1, 2029") as a Date at UTC noon, so no
 * timezone can shift the day; null when the text isn't in "Month D, YYYY" form.
 * Same rule as prisma/seed.mjs.
 */
export function parseExpiry(text: string | null | undefined): Date | null {
  const t = (text ?? "").trim().replace(/\s+/g, " ");
  if (!EXPIRY_TEXT.test(t)) return null;
  const d = new Date(`${t} 12:00:00 UTC`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export type ExpiryTone = "expired" | "soon" | "ok" | "none";

/**
 * How urgent a record's expiry is. Only records still marked "Accredited"
 * raise an alert: a suspended or withdrawn record past its date is not due
 * for renewal.
 */
export function expiryTone(
  rec: { status: string; expiresOn: Date | null },
  now: Date = new Date(),
  soonDays = 90
): ExpiryTone {
  if (!rec.expiresOn) return "none";
  if (rec.status !== "Accredited") return "ok";
  const t = rec.expiresOn.getTime();
  if (t < now.getTime()) return "expired";
  if (t <= now.getTime() + soonDays * DAY_MS) return "soon";
  return "ok";
}

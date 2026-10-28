"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ContentStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { audit, int, requireArea, str } from "@/lib/admin";
import { parseExpiry } from "@/lib/directory";
import { slugify } from "@/lib/slug";
import { ACCREDITATION_STATUSES } from "@/app/_data/accredited-organizations";

/**
 * Directory admin server actions: save (create / update) and delete an
 * accredited organization with its accreditation records.
 *
 * Every field is stored as typed — descriptions are the organization's own
 * wording and record fields the register's own wording; nothing is rewritten
 * to match AAA's figures. `expiresOn` is parsed from the published expiry
 * text for renewal alerts only.
 */

const MAX_RECORDS = 30;

type RecordRow = {
  accreditedAs: string;
  number: string;
  scope: string;
  expiry: string;
  status: string;
};

/** Collapses internal whitespace runs inside a single-line field. */
const oneLine = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";
const multiLine = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Parses the repeater's JSON. Returns an error code instead of throwing. */
function parseRecords(raw: string): { rows: RecordRow[] } | { error: string } {
  let data: unknown;
  try {
    data = JSON.parse(raw || "[]");
  } catch {
    return { error: "records" };
  }
  if (!Array.isArray(data)) return { error: "records" };
  const rows: RecordRow[] = [];
  for (const item of data) {
    if (!item || typeof item !== "object") return { error: "records" };
    const r = item as Record<string, unknown>;
    const row: RecordRow = {
      accreditedAs: oneLine(r.accreditedAs, 300),
      number: oneLine(r.number, 120),
      scope: multiLine(r.scope, 4000),
      expiry: oneLine(r.expiry, 60),
      status: (ACCREDITATION_STATUSES as readonly string[]).includes(String(r.status))
        ? String(r.status)
        : "Accredited",
    };
    // A row left completely blank is ignored rather than rejected.
    if (!row.accreditedAs && !row.number && !row.scope && !row.expiry) continue;
    if (!row.accreditedAs) return { error: "accreditedAs" };
    rows.push(row);
  }
  if (rows.length > MAX_RECORDS) return { error: "too-many" };
  return { rows };
}

/** Site-relative paths and the hosts next/image is configured for. */
function validLogo(v: string): boolean {
  if (!v) return true;
  if (v.startsWith("/") && !v.startsWith("//")) return true;
  try {
    const u = new URL(v);
    return u.protocol === "https:" && (u.hostname === "aaa-accreditation.org" || u.hostname === "www.aaa-accreditation.org");
  } catch {
    return false;
  }
}

/** An http(s) URL, with https:// assumed when the scheme is missing; null when invalid. */
function normalizeWebsite(v: string): string | null | false {
  if (!v) return null;
  const withScheme = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    const u = new URL(withScheme);
    if (!u.hostname.includes(".")) return false;
    return u.toString();
  } catch {
    return false;
  }
}

async function uniqueOrgSlug(base: string, excludeId?: string) {
  let slug = base;
  for (let i = 2; ; i++) {
    const clash = await prisma.organization.findUnique({ where: { slug }, select: { id: true } });
    if (!clash || clash.id === excludeId) return slug;
    slug = `${base}-${i}`.slice(0, 120);
  }
}

function revalidateDirectory() {
  revalidatePath("/directory");
  revalidatePath("/directory/accredited-organizations");
  revalidatePath("/admin/directory");
}

export async function saveOrganization(formData: FormData) {
  const session = await requireArea("directory");

  const id = str(formData, "id", 64);
  const back = (code: string) => (id ? `/admin/directory/${id}?error=${code}` : `/admin/directory/new?error=${code}`);

  const name = oneLine(str(formData, "name", 300), 300);
  if (!name) redirect(back("name"));
  const location = oneLine(str(formData, "location", 200), 200);
  const country = oneLine(str(formData, "country", 120), 120);
  if (!country) redirect(back("country"));
  const description = str(formData, "description", 8000);

  const logo = str(formData, "logo", 600);
  if (!validLogo(logo)) redirect(back("logo"));

  const website = normalizeWebsite(str(formData, "website", 500));
  if (website === false) redirect(back("website"));

  const status = str(formData, "status") === "DRAFT" ? ContentStatus.DRAFT : ContentStatus.PUBLISHED;

  const parsed = parseRecords(str(formData, "accreditations", 400_000));
  if ("error" in parsed) redirect(back(parsed.error));
  const rows = parsed.rows;
  if (status === ContentStatus.PUBLISHED && rows.length === 0) redirect(back("no-records"));

  const records = rows.map((r, i) => ({ ...r, expiresOn: parseExpiry(r.expiry), order: i }));
  const requestedSlug = slugify(str(formData, "slug", 200) || `${name}-${country}`);
  const data = {
    name,
    location,
    country,
    description,
    logo: logo || null,
    website,
    status,
  };

  const summary = `${name} — ${records.length} accreditation record${records.length === 1 ? "" : "s"}${
    status === ContentStatus.DRAFT ? " (draft)" : ""
  }`;

  if (id) {
    const existing = await prisma.organization.findUnique({ where: { id }, select: { id: true, order: true } });
    if (!existing) redirect("/admin/directory?error=notfound");
    const slug = await uniqueOrgSlug(requestedSlug, id);
    const order = int(formData, "order", existing.order);
    await prisma.$transaction([
      prisma.organization.update({ where: { id }, data: { ...data, slug, order } }),
      prisma.accreditation.deleteMany({ where: { organizationId: id } }),
      ...(records.length > 0
        ? [prisma.accreditation.createMany({ data: records.map((r) => ({ ...r, organizationId: id })) })]
        : []),
    ]);
    await audit(session.user.id, "update", "organization", id, summary);
  } else {
    const slug = await uniqueOrgSlug(requestedSlug);
    const created = await prisma.$transaction(async (tx) => {
      // New entries go on top of the register: one above the current first.
      const { _min } = await tx.organization.aggregate({ _min: { order: true } });
      return tx.organization.create({
        data: {
          ...data,
          slug,
          order: _min.order === null ? 0 : _min.order - 1,
          accreditations: { create: records },
        },
        select: { id: true },
      });
    });
    await audit(session.user.id, "create", "organization", created.id, summary);
  }

  revalidateDirectory();
  redirect("/admin/directory?saved=1");
}

export async function deleteOrganization(formData: FormData) {
  const session = await requireArea("directory");
  const id = str(formData, "id", 64);
  if (!id) redirect("/admin/directory");
  // Accreditation records cascade with the organization (schema onDelete).
  const org = await prisma.organization
    .delete({ where: { id }, select: { id: true, name: true } })
    .catch(() => null);
  if (org) await audit(session.user.id, "delete", "organization", org.id, org.name);
  revalidateDirectory();
  redirect("/admin/directory?deleted=1");
}

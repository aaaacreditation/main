import { NextResponse } from "next/server";
import { getStaffSession } from "@/lib/admin";
import { ACCREDITATION_TYPES, accreditationType } from "@/app/_data/accredited-organizations";
import {
  filterOrganizations,
  loadAdminOrganizations,
  parseDirectoryFilters,
} from "@/app/admin/(panel)/directory/filters";

/**
 * CSV export of the accredited-organizations register for staff.
 *
 * One row per accreditation record, with the organization's columns repeated;
 * an organization without records still gets one row. Accepts the same query
 * string as /admin/directory, so "Export CSV" downloads exactly the filtered
 * view (with record-level filters, only the matching records). UTF-8 with a
 * BOM so Excel opens the accented names correctly; RFC 4180 quoting.
 */
export const dynamic = "force-dynamic";

const HEADER = [
  "Organization",
  "Location",
  "Country",
  "Description",
  "Website",
  "Logo",
  "Listing",
  "Register order",
  "Slug",
  "Accredited as",
  "Program",
  "Accreditation number",
  "Scope",
  "Expiry",
  "Expires on",
  "Record status",
];

/** RFC 4180 field, with spreadsheet-formula injection neutralised for text cells. */
function cell(value: string | number | null | undefined, text = true): string {
  let s = value === null || value === undefined ? "" : String(value);
  if (text && /^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET(req: Request) {
  const session = await getStaffSession("directory");
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const filters = parseDirectoryFilters(new URL(req.url).searchParams);
  const orgs = await loadAdminOrganizations();
  const results = filterOrganizations(orgs, filters);

  const lines = [HEADER.map((h) => cell(h)).join(",")];
  for (const { org, matched } of results) {
    const orgCols = [
      cell(org.name),
      cell(org.location),
      cell(org.country),
      cell(org.description),
      cell(org.website),
      cell(org.logo),
      cell(org.status === "PUBLISHED" ? "Published" : "Draft"),
      cell(org.order, false),
      cell(org.slug),
    ];
    const records = matched.length > 0 ? matched : [null];
    for (const a of records) {
      const recCols = a
        ? [
            cell(a.accreditedAs),
            cell(ACCREDITATION_TYPES[accreditationType(a)].label),
            cell(a.number),
            cell(a.scope),
            cell(a.expiry),
            cell(a.expiresOn ? a.expiresOn.toISOString().slice(0, 10) : ""),
            cell(a.status),
          ]
        : ["", "", "", "", "", "", ""];
      lines.push([...orgCols, ...recCols].join(","));
    }
  }

  const stamp = new Date().toISOString().slice(0, 10);
  return new NextResponse("﻿" + lines.join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="aaa-accredited-organizations-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}

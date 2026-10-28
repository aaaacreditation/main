import { audit, getStaffSession } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { LEAD_KIND_LABEL, LEAD_STATUS_LABEL, leadSourceLabel } from "@/lib/leads";
import { leadWhere, parseLeadFilters } from "@/app/admin/(panel)/leads/filters";

/**
 * CSV export of the leads list. Takes the same query string as /admin/leads
 * (see filters.ts), so the file holds exactly the rows the list was showing.
 */
export const dynamic = "force-dynamic";

const MAX_ROWS = 10_000;

const COLUMNS = [
  "Lead ID",
  "Received (UTC)",
  "Last updated (UTC)",
  "Type",
  "Status",
  "Organization",
  "Contact person",
  "Email",
  "Phone",
  "Program / topic",
  "Stage",
  "Message",
  "Source",
  "Source form",
  "Submitted from",
  "Owner",
  "Owner email",
];

/**
 * RFC 4180 field: quoted when it holds a comma, quote or line break, quotes
 * doubled. Text that a spreadsheet would run as a formula (=, +, -, @, tab,
 * CR at the start) is prefixed with an apostrophe — lead fields are typed by
 * the public.
 */
function cell(value: string): string {
  let v = value;
  if (/^[=+\-@\t\r]/.test(v)) v = `'${v}`;
  return /[",\r\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

function today(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export async function GET(req: Request) {
  const session = await getStaffSession("leads");
  if (!session) {
    return new Response("Unauthorized", { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  const filters = parseLeadFilters(new URL(req.url).searchParams);
  const leads = await prisma.lead.findMany({
    where: leadWhere(filters, session.user.id),
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: MAX_ROWS,
    include: { assignedTo: { select: { name: true, email: true } } },
  });

  const rows = leads.map((l) =>
    [
      l.id,
      l.createdAt.toISOString(),
      l.updatedAt.toISOString(),
      LEAD_KIND_LABEL[l.kind],
      LEAD_STATUS_LABEL[l.status],
      l.business,
      l.contact,
      l.email,
      l.phone,
      l.sector,
      l.stage,
      l.message,
      leadSourceLabel(l.source),
      l.source,
      l.referrer,
      l.assignedTo?.name ?? "",
      l.assignedTo?.email ?? "",
    ]
      .map(cell)
      .join(","),
  );
  // BOM so Excel opens the file as UTF-8 (names with accents, Arabic, etc.).
  const csv = "﻿" + [COLUMNS.map(cell).join(","), ...rows].join("\r\n") + "\r\n";

  await audit(
    session.user.id,
    "export",
    "lead",
    null,
    `Exported ${leads.length} lead${leads.length === 1 ? "" : "s"} to CSV${leads.length === MAX_ROWS ? " (row cap reached)" : ""}`,
  );

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="aaa-leads-${today()}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}

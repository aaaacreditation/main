import { LeadKind, LeadStatus, type Prisma } from "@prisma/client";

/**
 * Lead filters shared by the /admin/leads list and the CSV export, so an
 * export always contains exactly the rows the list was showing.
 *
 * Query string contract (all optional):
 *   kind      LeadKind enum name (CONTACT, APPLICATION, …)
 *   q         free text over organization, contact, email, phone, program/topic and message
 *   status    LeadStatus enum name, or "pipeline" (Contacted, Qualified, Proposal sent —
 *             the dashboard's "In the pipeline"). Empty = every status except SPAM:
 *             spam only shows when the filter asks for it.
 *   source    exact form id, e.g. "apply-form"
 *   assignee  user id, "none" (unassigned) or "me" (the signed-in user)
 *   from, to  YYYY-MM-DD, inclusive, server-local days
 */
export type LeadFilters = {
  kind: LeadKind | "";
  q: string;
  status: LeadStatus | "pipeline" | "";
  source: string;
  assignee: string;
  from: string;
  to: string;
};

/** Worked but undecided leads — matches the dashboard's "In the pipeline" figure. */
export const PIPELINE_STATUSES: LeadStatus[] = [
  LeadStatus.CONTACTED,
  LeadStatus.QUALIFIED,
  LeadStatus.PROPOSAL,
];

const FILTER_KEYS = ["kind", "q", "status", "source", "assignee", "from", "to"] as const;

const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;

type RawParams = URLSearchParams | Record<string, string | string[] | undefined>;

function first(sp: RawParams, key: string): string {
  const v = sp instanceof URLSearchParams ? sp.get(key) : sp[key];
  const s = Array.isArray(v) ? v[0] : v;
  return typeof s === "string" ? s.trim() : "";
}

/** Server-local midnight for a YYYY-MM-DD string, or null when it isn't a real day. */
function dayStart(v: string): Date | null {
  if (!DAY_RE.test(v)) return null;
  const d = new Date(`${v}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function parseLeadFilters(sp: RawParams): LeadFilters {
  const kind = first(sp, "kind");
  const status = first(sp, "status");
  const from = first(sp, "from");
  const to = first(sp, "to");
  return {
    kind: (Object.values(LeadKind) as string[]).includes(kind) ? (kind as LeadKind) : "",
    q: first(sp, "q").slice(0, 200),
    status:
      status === "pipeline" || (Object.values(LeadStatus) as string[]).includes(status)
        ? (status as LeadStatus | "pipeline")
        : "",
    source: first(sp, "source").slice(0, 60),
    assignee: first(sp, "assignee").slice(0, 40),
    from: dayStart(from) ? from : "",
    to: dayStart(to) ? to : "",
  };
}

/** True when anything other than the kind tab narrows the list. */
export function hasActiveFilters(f: LeadFilters): boolean {
  return Boolean(f.q || f.status || f.source || f.assignee || f.from || f.to);
}

/**
 * Prisma where-clause for a filter set. `userId` resolves assignee=me; without
 * it that option is ignored.
 */
export function leadWhere(f: LeadFilters, userId?: string): Prisma.LeadWhereInput {
  const and: Prisma.LeadWhereInput[] = [];

  if (f.kind) and.push({ kind: f.kind });

  if (f.status === "pipeline") and.push({ status: { in: PIPELINE_STATUSES } });
  else if (f.status) and.push({ status: f.status });
  else and.push({ status: { not: LeadStatus.SPAM } });

  if (f.source) and.push({ source: f.source });

  if (f.assignee === "none") and.push({ assignedToId: null });
  else if (f.assignee === "me") {
    if (userId) and.push({ assignedToId: userId });
  } else if (f.assignee) and.push({ assignedToId: f.assignee });

  const from = dayStart(f.from);
  const toStart = dayStart(f.to);
  if (from || toStart) {
    const createdAt: Prisma.DateTimeFilter = {};
    if (from) createdAt.gte = from;
    if (toStart) {
      // Inclusive "to": everything before the following midnight.
      const next = new Date(toStart);
      next.setDate(next.getDate() + 1);
      createdAt.lt = next;
    }
    and.push({ createdAt });
  }

  if (f.q) {
    const contains = { contains: f.q, mode: "insensitive" as const };
    and.push({
      OR: [
        { business: contains },
        { contact: contains },
        { email: contains },
        { phone: contains },
        { sector: contains },
        { message: contains },
      ],
    });
  }

  return { AND: and };
}

/**
 * Query string for a filter set (empty values dropped), with optional
 * overrides — used by the tabs, the pager and the export link.
 */
export function leadQuery(
  f: LeadFilters,
  overrides: Partial<Record<(typeof FILTER_KEYS)[number] | "page", string>> = {},
): string {
  const params = new URLSearchParams();
  for (const key of FILTER_KEYS) {
    const v = key in overrides ? overrides[key] : f[key];
    if (v) params.set(key, v);
  }
  if (overrides.page) params.set("page", overrides.page);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

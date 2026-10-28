"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LeadStatus, type Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { audit, requireArea, str } from "@/lib/admin";
import { LEAD_STATUS_LABEL } from "@/lib/leads";

/*
 * Leads CRM server actions. Every change is written together with its
 * LeadActivity row (one transaction), so the timeline on the detail page is
 * the lead's complete history.
 */

const NOTE_MAX = 4000;
const BULK_MAX = 200;

function parseStatus(v: string): LeadStatus | null {
  return (Object.values(LeadStatus) as string[]).includes(v) ? (v as LeadStatus) : null;
}

function refresh(id?: string) {
  revalidatePath("/admin/leads");
  if (id) revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin"); // dashboard counts + the sidebar's "new" badge
}

async function findLead(id: string) {
  if (!id) return null;
  return prisma.lead.findUnique({
    where: { id },
    select: { id: true, business: true, status: true, assignedToId: true, assignedTo: { select: { name: true } } },
  });
}

/** Staff who can be given a lead: active users of any role (ADMIN, EDITOR, SALES). */
async function findAssignee(userId: string) {
  return prisma.user.findFirst({
    where: { id: userId, active: true },
    select: { id: true, name: true, email: true },
  });
}

/** Return path for list-level actions; only ever the leads list. */
function backTo(formData: FormData, fallback = "/admin/leads") {
  const v = str(formData, "back", 1000);
  return v.startsWith("/admin/leads") && !v.startsWith("//") ? v : fallback;
}

function withParam(path: string, key: string, value: string) {
  const [base, qs = ""] = path.split("?");
  const params = new URLSearchParams(qs);
  params.delete("saved");
  params.delete("error");
  params.delete("deleted");
  params.set(key, value);
  return `${base}?${params.toString()}`;
}

/* ---------- status ---------- */

export async function updateLeadStatus(formData: FormData) {
  const session = await requireArea("leads");
  const id = str(formData, "id", 60);
  const status = parseStatus(str(formData, "status", 20));
  const note = str(formData, "note", NOTE_MAX);

  const lead = await findLead(id);
  if (!lead) redirect("/admin/leads?error=missing");
  if (!status) redirect(`/admin/leads/${lead.id}?error=status`);

  if (status === lead.status) {
    // Nothing moved; keep a note if one was typed so it isn't lost.
    if (note) {
      await prisma.$transaction([
        prisma.leadActivity.create({ data: { leadId: lead.id, authorId: session.user.id, type: "note", body: note } }),
        prisma.lead.update({ where: { id: lead.id }, data: { updatedAt: new Date() } }),
      ]);
      await audit(session.user.id, "note", "lead", lead.id, `Note on “${lead.business}”`);
      refresh(lead.id);
    }
    redirect(`/admin/leads/${lead.id}?saved=${note ? "note" : "1"}`);
  }

  const change = `Status: ${LEAD_STATUS_LABEL[lead.status]} → ${LEAD_STATUS_LABEL[status]}`;
  await prisma.$transaction([
    prisma.lead.update({ where: { id: lead.id }, data: { status } }),
    prisma.leadActivity.create({
      data: { leadId: lead.id, authorId: session.user.id, type: "status", body: note ? `${change}\n${note}` : change },
    }),
  ]);
  await audit(session.user.id, "update", "lead", lead.id, `“${lead.business}” — ${change}`);
  refresh(lead.id);
  redirect(`/admin/leads/${lead.id}?saved=status`);
}

/* ---------- assignment ---------- */

export async function assignLead(formData: FormData) {
  const session = await requireArea("leads");
  const id = str(formData, "id", 60);
  const assignee = str(formData, "assignee", 60); // "" or "none" = unassign

  const lead = await findLead(id);
  if (!lead) redirect("/admin/leads?error=missing");

  const wanted = assignee && assignee !== "none" ? assignee : null;
  // Unchanged (including a now-inactive owner left selected): nothing to log.
  if (wanted === lead.assignedToId) redirect(`/admin/leads/${lead.id}?saved=1`);

  const user = wanted ? await findAssignee(wanted) : null;
  if (wanted && !user) redirect(`/admin/leads/${lead.id}?error=assignee`);
  const nextId = user?.id ?? null;

  const was = lead.assignedTo ? ` (was ${lead.assignedTo.name})` : "";
  const body = user ? `Assigned to ${user.name || user.email}${was}` : `Unassigned${was}`;
  await prisma.$transaction([
    prisma.lead.update({ where: { id: lead.id }, data: { assignedToId: nextId } }),
    prisma.leadActivity.create({ data: { leadId: lead.id, authorId: session.user.id, type: "assign", body } }),
  ]);
  await audit(session.user.id, "assign", "lead", lead.id, `“${lead.business}” — ${body}`);
  refresh(lead.id);
  redirect(`/admin/leads/${lead.id}?saved=assign`);
}

/* ---------- notes ---------- */

export async function addLeadNote(formData: FormData) {
  const session = await requireArea("leads");
  const id = str(formData, "id", 60);
  const body = str(formData, "body", NOTE_MAX);

  const lead = await findLead(id);
  if (!lead) redirect("/admin/leads?error=missing");
  if (!body) redirect(`/admin/leads/${lead.id}?error=note`);

  await prisma.$transaction([
    prisma.leadActivity.create({ data: { leadId: lead.id, authorId: session.user.id, type: "note", body } }),
    // Touch the lead so "Last updated" reflects the latest activity.
    prisma.lead.update({ where: { id: lead.id }, data: { updatedAt: new Date() } }),
  ]);
  await audit(session.user.id, "note", "lead", lead.id, `Note on “${lead.business}”`);
  refresh(lead.id);
  redirect(`/admin/leads/${lead.id}?saved=note`);
}

/* ---------- delete ---------- */

export async function deleteLead(formData: FormData) {
  const session = await requireArea("leads");
  const id = str(formData, "id", 60);

  const lead = await findLead(id);
  if (!lead) redirect("/admin/leads?error=missing");

  await prisma.lead.delete({ where: { id: lead.id } }); // activities cascade
  await audit(session.user.id, "delete", "lead", lead.id, `Deleted lead “${lead.business}”`);
  refresh(lead.id);
  redirect("/admin/leads?deleted=1");
}

/* ---------- bulk (list checkboxes) ---------- */

export async function bulkUpdateLeads(formData: FormData) {
  const session = await requireArea("leads");
  const back = backTo(formData);

  const ids = [
    ...new Set(
      formData
        .getAll("ids")
        .filter((v): v is string => typeof v === "string" && v.length > 0 && v.length <= 60),
    ),
  ].slice(0, BULK_MAX);
  const rawStatus = str(formData, "bulkStatus", 20);
  const rawAssignee = str(formData, "bulkAssignee", 60); // "" = no change, "none" = unassign
  const status = rawStatus ? parseStatus(rawStatus) : null;

  if (ids.length === 0) redirect(withParam(back, "error", "bulk-none"));
  if ((rawStatus && !status) || (!status && !rawAssignee)) redirect(withParam(back, "error", "bulk-action"));

  const user = rawAssignee && rawAssignee !== "none" ? await findAssignee(rawAssignee) : null;
  if (rawAssignee && rawAssignee !== "none" && !user) redirect(withParam(back, "error", "assignee"));

  const leads = await prisma.lead.findMany({
    where: { id: { in: ids } },
    select: { id: true, status: true, assignedToId: true },
  });
  if (leads.length === 0) redirect(withParam(back, "error", "bulk-none"));

  const ops: Prisma.PrismaPromise<unknown>[] = [];
  let changed = 0;
  for (const l of leads) {
    const nextStatus = status && status !== l.status ? status : null;
    const nextAssignee = rawAssignee ? (user?.id ?? null) : l.assignedToId;
    const assignChanges = Boolean(rawAssignee) && nextAssignee !== l.assignedToId;
    if (!nextStatus && !assignChanges) continue;
    changed++;
    ops.push(
      prisma.lead.update({
        where: { id: l.id },
        data: {
          ...(nextStatus ? { status: nextStatus } : {}),
          ...(assignChanges ? { assignedToId: nextAssignee } : {}),
        },
      }),
    );
    if (nextStatus) {
      ops.push(
        prisma.leadActivity.create({
          data: {
            leadId: l.id,
            authorId: session.user.id,
            type: "status",
            body: `Status: ${LEAD_STATUS_LABEL[l.status]} → ${LEAD_STATUS_LABEL[nextStatus]} (bulk update)`,
          },
        }),
      );
    }
    if (assignChanges) {
      ops.push(
        prisma.leadActivity.create({
          data: {
            leadId: l.id,
            authorId: session.user.id,
            type: "assign",
            body: user ? `Assigned to ${user.name || user.email} (bulk update)` : "Unassigned (bulk update)",
          },
        }),
      );
    }
  }

  if (ops.length) await prisma.$transaction(ops);

  const parts = [
    status ? `status → ${LEAD_STATUS_LABEL[status]}` : "",
    rawAssignee ? (user ? `assigned to ${user.name || user.email}` : "unassigned") : "",
  ].filter(Boolean);
  await audit(session.user.id, "bulk-update", "lead", null, `Bulk update of ${changed} lead(s): ${parts.join(", ")}`);
  refresh();
  redirect(withParam(back, "saved", String(changed)));
}

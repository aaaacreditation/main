"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { audit, bool, requireArea, str } from "@/lib/admin";
import { invalidateRedirectCache } from "@/lib/redirect-map";
import { findLoop, graphFrom, normalizeFrom, normalizeTo, parseBulkLine } from "./validate";

const LIST = "/admin/seo/redirects";
const MAX_BULK_LINES = 1000;

export type RedirectFormValues = { from: string; to: string; permanent: boolean; note: string };
export type RedirectFormState = { error?: string; values?: RedirectFormValues };

export type BulkImportState = {
  done?: boolean;
  created?: number;
  updated?: number;
  skipped?: number;
  errors?: { line: number; text: string; reason: string }[];
  error?: string;
  /** Lines to put back in the box (the ones that need fixing). */
  remaining?: string;
};

/** Every rule except `excludeId`, as source → landing path. */
async function ruleGraph(excludeId?: string) {
  const rows = await prisma.redirect.findMany({
    where: excludeId ? { id: { not: excludeId } } : {},
    select: { from: true, to: true },
  });
  return graphFrom(rows);
}

/** Create (no id) or update (id) one redirect. Used with useActionState. */
export async function saveRedirect(_prev: RedirectFormState, formData: FormData): Promise<RedirectFormState> {
  const session = await requireArea("seo");
  const id = str(formData, "id", 64);
  const values: RedirectFormValues = {
    from: str(formData, "from", 600),
    to: str(formData, "to", 1200),
    permanent: str(formData, "type", 20) !== "temporary",
    note: str(formData, "note", 300),
  };

  const from = normalizeFrom(values.from);
  if (!from.ok) return { error: from.error, values };
  const to = normalizeTo(values.to);
  if (!to.ok) return { error: to.error, values };
  if (to.value.internalPath === from.value) {
    return { error: "The destination is the same page as the source.", values };
  }

  const existing = id ? await prisma.redirect.findUnique({ where: { id } }) : null;
  if (id && !existing) return { error: "This redirect no longer exists — it may have been deleted.", values };

  const clash = await prisma.redirect.findUnique({ where: { from: from.value }, select: { id: true } });
  if (clash && clash.id !== id) {
    return { error: `There is already a redirect from ${from.value}. Edit that one instead.`, values };
  }

  const loop = findLoop(from.value, to.value.internalPath, await ruleGraph(id || undefined));
  if (loop) return { error: `That would create a redirect loop: ${loop.join(" → ")}.`, values };

  const data = { from: from.value, to: to.value.value, permanent: values.permanent, note: values.note };
  let rowId: string;
  try {
    rowId = existing
      ? (await prisma.redirect.update({ where: { id: existing.id }, data })).id
      : (await prisma.redirect.create({ data })).id;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { error: `There is already a redirect from ${from.value}.`, values };
    }
    throw err;
  }

  const code = data.permanent ? 308 : 307;
  const summary = existing
    ? `${existing.from} → ${existing.to} changed to ${data.from} → ${data.to} (${code})`
    : `${data.from} → ${data.to} (${code})`;
  await audit(session.user.id, existing ? "update" : "create", "redirect", rowId, summary);
  invalidateRedirectCache();
  revalidatePath(LIST);
  redirect(`${LIST}?saved=${existing ? "updated" : "created"}`);
}

export async function deleteRedirect(formData: FormData) {
  const session = await requireArea("seo");
  const id = str(formData, "id", 64);
  const row = id ? await prisma.redirect.findUnique({ where: { id } }) : null;
  if (!row) redirect(LIST);

  await prisma.redirect.delete({ where: { id: row.id } });
  await audit(session.user.id, "delete", "redirect", row.id, `${row.from} → ${row.to} (${row.hits} hits)`);
  invalidateRedirectCache();
  revalidatePath(LIST);
  redirect(`${LIST}?saved=deleted`);
}

export async function resetRedirectHits(formData: FormData) {
  const session = await requireArea("seo");
  const id = str(formData, "id", 64);
  const row = id ? await prisma.redirect.findUnique({ where: { id } }) : null;
  if (!row) redirect(LIST);

  await prisma.redirect.update({ where: { id: row.id }, data: { hits: 0 } });
  await audit(session.user.id, "update", "redirect", row.id, `${row.from}: hit count reset (was ${row.hits})`);
  revalidatePath(LIST);
  redirect(`${LIST}?saved=reset`);
}

/**
 * Bulk paste: one redirect per line ("/old /new", optional 308/307). Lines
 * are validated against the existing rules and the lines above them; bad
 * lines are reported and skipped, good ones are written in one transaction.
 */
export async function bulkImportRedirects(_prev: BulkImportState, formData: FormData): Promise<BulkImportState> {
  const session = await requireArea("seo");
  const text = str(formData, "lines", 200_000);
  const overwrite = bool(formData, "overwrite");
  const defaultPermanent = str(formData, "type", 20) !== "temporary";

  const lines = text.split(/\r?\n/);
  if (lines.filter((l) => l.trim() && !l.trim().startsWith("#")).length === 0) {
    return { error: "Paste at least one line: /old-path /new-path", remaining: text };
  }
  if (lines.length > MAX_BULK_LINES) {
    return { error: `Paste at most ${MAX_BULK_LINES} lines at a time.`, remaining: text };
  }

  const existingRows = await prisma.redirect.findMany({ select: { id: true, from: true, to: true } });
  const byFrom = new Map(existingRows.map((r) => [r.from, r]));
  const graph = graphFrom(existingRows);
  const seenInBatch = new Set<string>();

  const errors: NonNullable<BulkImportState["errors"]> = [];
  const creates: Prisma.RedirectCreateManyInput[] = [];
  const updates: { id: string; to: string; permanent: boolean }[] = [];
  let skipped = 0;

  lines.forEach((raw, i) => {
    const line = i + 1;
    const snippet = raw.trim().slice(0, 300);
    const parsed = parseBulkLine(raw);
    if (parsed === null) return;
    if ("error" in parsed) return void errors.push({ line, text: snippet, reason: parsed.error });

    const from = normalizeFrom(parsed.from);
    if (!from.ok) return void errors.push({ line, text: snippet, reason: from.error });
    const to = normalizeTo(parsed.to);
    if (!to.ok) return void errors.push({ line, text: snippet, reason: to.error });
    if (to.value.internalPath === from.value) {
      return void errors.push({ line, text: snippet, reason: "The destination is the same page as the source." });
    }
    if (seenInBatch.has(from.value)) {
      return void errors.push({ line, text: snippet, reason: `${from.value} appears more than once in this paste.` });
    }

    const current = byFrom.get(from.value);
    if (current && !overwrite) {
      skipped += 1;
      return;
    }
    // Check the loop against the graph as it will be once this line applies.
    const before = graph.get(from.value);
    graph.delete(from.value);
    const loop = findLoop(from.value, to.value.internalPath, graph);
    if (loop) {
      if (before !== undefined) graph.set(from.value, before);
      return void errors.push({ line, text: snippet, reason: `Would create a loop: ${loop.join(" → ")}.` });
    }
    graph.set(from.value, to.value.internalPath);
    seenInBatch.add(from.value);

    const permanent = parsed.permanent ?? defaultPermanent;
    if (current) updates.push({ id: current.id, to: to.value.value, permanent });
    else creates.push({ from: from.value, to: to.value.value, permanent, note: "Bulk import" });
  });

  if (creates.length || updates.length) {
    await prisma.$transaction([
      ...(creates.length ? [prisma.redirect.createMany({ data: creates, skipDuplicates: true })] : []),
      ...updates.map((u) =>
        prisma.redirect.update({ where: { id: u.id }, data: { to: u.to, permanent: u.permanent } }),
      ),
    ]);
    await audit(
      session.user.id,
      "import",
      "redirect",
      null,
      `Bulk import: ${creates.length} created, ${updates.length} updated, ${skipped} skipped, ${errors.length} invalid`,
    );
    invalidateRedirectCache();
    revalidatePath(LIST);
  }

  return {
    done: true,
    created: creates.length,
    updated: updates.length,
    skipped,
    errors: errors.slice(0, 50),
    remaining: errors.map((e) => lines[e.line - 1].trim()).join("\n"),
  };
}

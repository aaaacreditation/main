import { redirect } from "next/navigation";
import type { Role } from "@prisma/client";
import { auth } from "@/auth";
import { prisma } from "./db";

/**
 * Admin portal access control.
 *
 * Roles: ADMIN (everything, incl. users), EDITOR (content, directory, case
 * studies, SEO, leads), SALES (leads only). Every admin page and server action
 * calls one of these guards — there is no middleware.
 */

export type AdminArea =
  | "dashboard"
  | "content" // news, pages, media
  | "case-studies"
  | "directory"
  | "seo"
  | "leads"
  | "users"
  | "activity";

const ACCESS: Record<Role, AdminArea[] | "all"> = {
  ADMIN: "all",
  EDITOR: ["dashboard", "content", "case-studies", "directory", "seo", "leads", "activity"],
  SALES: ["dashboard", "leads"],
};

export function canAccess(role: string | undefined, area: AdminArea): boolean {
  const rules = ACCESS[(role as Role) ?? "EDITOR"] ?? ACCESS.EDITOR;
  return rules === "all" || rules.includes(area);
}

/**
 * Guards admin pages and server actions. Redirects anonymous visitors to the
 * login screen and returns the session for signed-in staff.
 *
 * Sessions are JWTs, so the role and the active flag are re-read from the
 * database on every call: deactivating someone or changing their role takes
 * effect on their next click, not when their token expires.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) redirect("/admin/login");
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true, active: true, name: true, email: true },
  });
  if (!user || !user.active) redirect("/admin/login?inactive=1");
  session.user.role = user.role;
  session.user.name = user.name;
  session.user.email = user.email;
  return session;
}

/**
 * For route handlers: the active staff session, or null. Same database
 * re-check as requireAdmin, without the redirect.
 */
export async function getStaffSession(area?: AdminArea) {
  const session = await auth();
  if (!session?.user?.id) return null;
  const user = await prisma.user
    .findUnique({ where: { id: session.user.id }, select: { role: true, active: true } })
    .catch(() => null);
  if (!user?.active) return null;
  session.user.role = user.role;
  if (area && !canAccess(user.role, area)) return null;
  return session;
}

/** requireAdmin + an area check; staff without access land on the dashboard. */
export async function requireArea(area: AdminArea) {
  const session = await requireAdmin();
  if (!canAccess(session.user.role, area)) redirect("/admin?denied=" + area);
  return session;
}

/**
 * Record an admin action. Never throws — an audit hiccup must not undo the
 * change the user just made.
 */
export async function audit(
  userId: string | undefined | null,
  action: string,
  entity: string,
  entityId: string | null | undefined,
  summary: string,
) {
  await prisma.auditLog
    .create({
      data: {
        userId: userId || null,
        action,
        entity,
        entityId: entityId ?? null,
        summary: summary.slice(0, 500),
      },
    })
    .catch((err) => console.error("audit log failed:", err));
}

/* ------------------------------------------------- form-data helpers */

/** Trimmed string field, capped at `max` characters. */
export function str(formData: FormData, key: string, max = 100_000): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** Checkbox field: true when present with any value other than "false"/"0". */
export function bool(formData: FormData, key: string): boolean {
  const v = formData.get(key);
  return typeof v === "string" && v !== "" && v !== "false" && v !== "0";
}

/** Integer field with a fallback. */
export function int(formData: FormData, key: string, fallback = 0): number {
  const n = parseInt(str(formData, key, 20), 10);
  return Number.isFinite(n) ? n : fallback;
}

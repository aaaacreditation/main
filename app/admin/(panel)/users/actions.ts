"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/db";
import { audit, bool, requireAdmin, requireArea, str } from "@/lib/admin";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_PASSWORD = 10;

function parseRole(v: string): Role | null {
  return (Object.values(Role) as string[]).includes(v) ? (v as Role) : null;
}

/** True when removing `excludeId` from the active admins would leave none. */
async function wouldOrphanAdmins(excludeId: string) {
  const others = await prisma.user.count({
    where: { role: Role.ADMIN, active: true, id: { not: excludeId } },
  });
  return others === 0;
}

export async function createUser(formData: FormData) {
  const session = await requireArea("users");
  const name = str(formData, "name", 120);
  const email = str(formData, "email", 320).toLowerCase();
  const role = parseRole(str(formData, "role"));
  const password = str(formData, "password", 200);

  if (!name || !EMAIL_RE.test(email) || !role) redirect("/admin/users?error=fields");
  if (password.length < MIN_PASSWORD) redirect("/admin/users?error=password");
  if (await prisma.user.findUnique({ where: { email }, select: { id: true } })) {
    redirect("/admin/users?error=exists");
  }

  const user = await prisma.user.create({
    data: { name, email, role, passwordHash: await bcrypt.hash(password, 12) },
  });
  await audit(session.user.id, "create", "user", user.id, `Added ${email} as ${role}`);
  revalidatePath("/admin/users");
  redirect("/admin/users?saved=created");
}

export async function updateUser(formData: FormData) {
  const session = await requireArea("users");
  const id = str(formData, "id");
  const role = parseRole(str(formData, "role"));
  const active = bool(formData, "active");
  const password = str(formData, "password", 200);
  const name = str(formData, "name", 120);

  const user = id ? await prisma.user.findUnique({ where: { id } }) : null;
  if (!user || !role || !name) redirect("/admin/users?error=fields");

  const self = user.id === session.user.id;
  const losingAdmin = user.role === Role.ADMIN && (role !== Role.ADMIN || !active);
  if (self && losingAdmin) redirect("/admin/users?error=self");
  if (losingAdmin && (await wouldOrphanAdmins(user.id))) redirect("/admin/users?error=lastadmin");
  if (password && password.length < MIN_PASSWORD) redirect("/admin/users?error=password");

  await prisma.user.update({
    where: { id },
    data: {
      name,
      role,
      active,
      ...(password ? { passwordHash: await bcrypt.hash(password, 12) } : {}),
    },
  });

  const changes = [
    user.role !== role ? `role ${user.role} → ${role}` : "",
    user.active !== active ? (active ? "reactivated" : "deactivated") : "",
    password ? "password reset" : "",
    user.name !== name ? "renamed" : "",
  ].filter(Boolean);
  await audit(session.user.id, "update", "user", id, `${user.email}: ${changes.join(", ") || "no changes"}`);
  revalidatePath("/admin/users");
  redirect("/admin/users?saved=updated");
}

export async function deleteUser(formData: FormData) {
  const session = await requireArea("users");
  const id = str(formData, "id");
  const user = id ? await prisma.user.findUnique({ where: { id } }) : null;
  if (!user) redirect("/admin/users");
  if (user.id === session.user.id) redirect("/admin/users?error=self");
  if (user.role === Role.ADMIN && (await wouldOrphanAdmins(user.id))) redirect("/admin/users?error=lastadmin");

  // Posts, notes and media keep their content; the author link is nulled (onDelete: SetNull).
  await prisma.user.delete({ where: { id } });
  await audit(session.user.id, "delete", "user", id, `Removed ${user.email}`);
  revalidatePath("/admin/users");
  redirect("/admin/users?saved=deleted");
}

/* ---------- self-service (any signed-in role) ---------- */

export async function updateAccount(formData: FormData) {
  const session = await requireAdmin();
  const id = session.user.id!;
  const name = str(formData, "name", 120);
  const current = str(formData, "currentPassword", 200);
  const next = str(formData, "newPassword", 200);
  const confirm = str(formData, "confirmPassword", 200);

  if (!name) redirect("/admin/account?error=name");
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) redirect("/admin/login");

  let passwordHash: string | undefined;
  if (next || current) {
    if (!(await bcrypt.compare(current, user.passwordHash))) redirect("/admin/account?error=current");
    if (next.length < MIN_PASSWORD) redirect("/admin/account?error=password");
    if (next !== confirm) redirect("/admin/account?error=confirm");
    passwordHash = await bcrypt.hash(next, 12);
  }

  await prisma.user.update({ where: { id }, data: { name, ...(passwordHash ? { passwordHash } : {}) } });
  await audit(id, "update", "user", id, passwordHash ? "Changed own password" : "Updated own profile");
  revalidatePath("/admin", "layout");
  redirect("/admin/account?saved=1");
}

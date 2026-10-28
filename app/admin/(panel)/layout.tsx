import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LeadStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { canAccess, requireAdmin, type AdminArea } from "@/lib/admin";
import { logout } from "../actions";
import AdminNav from "../_components/AdminNav";
import "../admin.css";

export const metadata: Metadata = {
  title: { default: "AAA Admin Portal", template: "%s — AAA Admin Portal" },
  robots: { index: false, follow: false },
};

const AREAS: AdminArea[] = ["dashboard", "content", "case-studies", "directory", "seo", "leads", "users", "activity"];

const ROLE_LABEL: Record<string, string> = { ADMIN: "Administrator", EDITOR: "Editor", SALES: "Sales" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  const role = session.user.role;
  const name = session.user.name || session.user.email || "Admin";
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const allowed = AREAS.filter((a) => canAccess(role, a));
  const newLeads = canAccess(role, "leads")
    ? await prisma.lead.count({ where: { status: LeadStatus.NEW } }).catch(() => 0)
    : 0;

  return (
    <div className="adm">
      <aside className="adm-side">
        <Link href="/admin" className="adm-side-brand">
          <Image src="/logo/AAA-Logo.png" alt="AAA" width={132} height={41} priority />
          <span className="adm-side-tag">Admin Portal</span>
        </Link>

        <AdminNav allowed={allowed} newLeads={newLeads} />

        <div className="adm-side-foot">
          <Link href="/" className="adm-side-view" target="_blank">
            View website ↗
          </Link>
          <Link href="/admin/account" className="adm-side-user">
            <span className="adm-avatar">{initials}</span>
            <span className="adm-side-user-txt">
              <strong>{name}</strong>
              <em>{ROLE_LABEL[role ?? ""] ?? "Editor"}</em>
            </span>
          </Link>
          <form action={logout}>
            <button type="submit" className="adm-signout">Sign out</button>
          </form>
        </div>
      </aside>

      <div className="adm-main">{children}</div>
    </div>
  );
}

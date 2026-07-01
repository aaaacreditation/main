import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { logout } from "../actions";
import AdminNav from "../_components/AdminNav";

export const metadata: Metadata = {
  title: { default: "AAA Content Studio", template: "%s — AAA Content Studio" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  const name = session.user.name || session.user.email || "Admin";
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="adm">
      <aside className="adm-side">
        <Link href="/admin" className="adm-side-brand">
          <Image src="/logo/AAA-Logo.png" alt="AAA" width={132} height={41} priority />
          <span className="adm-side-tag">Content Studio</span>
        </Link>

        <AdminNav />

        <div className="adm-side-foot">
          <Link href="/" className="adm-side-view" target="_blank">
            View website ↗
          </Link>
          <div className="adm-side-user">
            <span className="adm-avatar">{initials}</span>
            <span className="adm-side-user-txt">
              <strong>{name}</strong>
              <em>{session.user.role === "ADMIN" ? "Administrator" : "Editor"}</em>
            </span>
          </div>
          <form action={logout}>
            <button type="submit" className="adm-signout">Sign out</button>
          </form>
        </div>
      </aside>

      <div className="adm-main">{children}</div>
    </div>
  );
}

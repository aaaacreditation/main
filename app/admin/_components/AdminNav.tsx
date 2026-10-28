"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AdminArea } from "@/lib/admin";

type Item = { href: string; label: string; icon: string; area: AdminArea; exact?: boolean; badge?: "leads" };

const GROUPS: { label?: string; items: Item[] }[] = [
  { items: [{ href: "/admin", label: "Dashboard", exact: true, icon: "◫", area: "dashboard" }] },
  {
    label: "Leads",
    items: [{ href: "/admin/leads", label: "Leads & Applications", icon: "☰", area: "leads", badge: "leads" }],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/posts", label: "News & Blog", icon: "✎", area: "content" },
      { href: "/admin/case-studies", label: "Case Studies", icon: "★", area: "case-studies" },
      { href: "/admin/pages", label: "Pages", icon: "▤", area: "content" },
      { href: "/admin/media", label: "Media Library", icon: "▣", area: "content" },
    ],
  },
  {
    label: "Directory",
    items: [{ href: "/admin/directory", label: "Accredited Register", icon: "◉", area: "directory" }],
  },
  {
    label: "SEO",
    items: [
      { href: "/admin/seo", label: "SEO Center", exact: true, icon: "◎", area: "seo" },
      { href: "/admin/seo/pages", label: "Page Metadata", icon: "⌘", area: "seo" },
      { href: "/admin/seo/redirects", label: "Redirects", icon: "↪", area: "seo" },
    ],
  },
  {
    label: "Settings",
    items: [
      { href: "/admin/users", label: "Team & Access", icon: "◍", area: "users" },
      { href: "/admin/activity", label: "Activity Log", icon: "≡", area: "activity" },
    ],
  },
];

export default function AdminNav({
  allowed,
  newLeads = 0,
}: {
  /** Areas the signed-in role may open (from canAccess in the layout). */
  allowed: AdminArea[];
  newLeads?: number;
}) {
  const pathname = usePathname();
  return (
    <nav className="adm-nav">
      {GROUPS.map((group, gi) => {
        const items = group.items.filter((it) => allowed.includes(it.area));
        if (items.length === 0) return null;
        return (
          <div className="adm-nav-group" key={group.label ?? gi}>
            {group.label ? <span className="adm-nav-label">{group.label}</span> : null}
            {items.map((item) => {
              const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={"adm-nav-item" + (active ? " active" : "")}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="adm-nav-ico" aria-hidden="true">{item.icon}</span>
                  {item.label}
                  {item.badge === "leads" && newLeads > 0 ? (
                    <span className="adm-nav-badge" aria-label={`${newLeads} new`}>
                      {newLeads > 99 ? "99+" : newLeads}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        );
      })}
    </nav>
  );
}

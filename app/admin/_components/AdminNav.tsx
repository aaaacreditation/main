"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/admin", label: "Dashboard", exact: true, icon: "◫" },
  { href: "/admin/posts", label: "News & Blog", icon: "✎" },
  { href: "/admin/pages", label: "Pages", icon: "▤" },
  { href: "/admin/leads", label: "Applications", icon: "☰" },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="adm-nav">
      {ITEMS.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={"adm-nav-item" + (active ? " active" : "")}
          >
            <span className="adm-nav-ico" aria-hidden="true">{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

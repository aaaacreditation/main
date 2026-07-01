"use client";

import { usePathname } from "next/navigation";

export default function SiteChrome({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const bare = pathname.startsWith("/lp/") || pathname.startsWith("/admin");
  return (
    <>
      {!bare && header}
      <main>{children}</main>
      {!bare && footer}
    </>
  );
}

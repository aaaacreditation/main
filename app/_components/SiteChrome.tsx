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
  const isLP = pathname.startsWith("/lp/");
  return (
    <>
      {!isLP && header}
      <main>{children}</main>
      {!isLP && footer}
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { META_PIXEL_ID, trackLinkClick, trackPageView } from "@/lib/meta-pixel";

/*
 * Meta Pixel on every public page (Nov 26 2026, client) — rendered once by
 * app/layout.tsx. Not on /admin (staff, not visitors) and not in `next dev`,
 * so neither pollutes the ad data. See lib/meta-pixel.ts for the events.
 */

const BASE_CODE = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;
n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`;

const isAdmin = (path: string) => path.startsWith("/admin");

export default function MetaPixel() {
  const pathname = usePathname();
  const first = useRef(true);

  // In-app navigations don't reload the page, so the base code's PageView
  // only covers the first one; track every later page change here.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!isAdmin(pathname)) trackPageView();
  }, [pathname]);

  // WhatsApp / phone / email / booking links anywhere on the page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (a && !isAdmin(window.location.pathname)) trackLinkClick(a.getAttribute("href") ?? "");
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (process.env.NODE_ENV !== "production" || isAdmin(pathname)) return null;
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {BASE_CODE}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- Meta's no-JS beacon */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

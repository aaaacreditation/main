"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { META_PIXEL_ID } from "@/lib/meta-pixel";
import { OPENAI_PIXEL_CODE } from "@/lib/openai-pixel";
import { trackLinkClick, trackPageView } from "@/lib/ad-tracking";
import { routeOf } from "@/lib/public-urls";

/*
 * The ad platforms' browser pixels, rendered once by app/layout.tsx: Meta
 * (Nov 26 2026) and OpenAI Ads (Nov 26 2026). Not on /admin (staff, not
 * visitors) and not in `next dev`, so neither pollutes the ad data. Events are
 * documented in lib/meta-pixel.ts and lib/openai-pixel.ts.
 */

const META_CODE = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;
n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`;

const isAdmin = (path: string) => path.startsWith("/admin");
const enabled = process.env.NODE_ENV === "production";

export default function AdPixels() {
  const pathname = usePathname();
  const first = useRef(true);

  // Every page, including in-app navigations (which don't reload the page).
  useEffect(() => {
    const firstPage = first.current;
    first.current = false;
    if (enabled && !isAdmin(pathname)) trackPageView(routeOf(pathname), firstPage);
  }, [pathname]);

  // WhatsApp / phone / email / booking links anywhere on the page.
  useEffect(() => {
    if (!enabled) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (a && !isAdmin(window.location.pathname)) trackLinkClick(a.getAttribute("href") ?? "");
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!enabled || isAdmin(pathname)) return null;
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {META_CODE}
      </Script>
      <Script id="openai-pixel" strategy="afterInteractive">
        {OPENAI_PIXEL_CODE}
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

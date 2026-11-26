/**
 * Meta (Facebook / Instagram) Pixel — the browser half of the site's Meta
 * tracking (Nov 26 2026, client). Safe to import from client components: no
 * secrets here. The pixel ID is public (it is in every page's HTML).
 *
 * The server half is lib/meta-capi.ts: /api/leads sends each form conversion
 * to the Conversions API and returns the same events (with their event IDs)
 * to the form, which fires them here with `trackLead()`. Meta counts an event
 * received from both sides once, so ad blockers no longer hide conversions.
 *
 * Events:
 *  - PageView     every page, including in-app navigations (MetaPixel.tsx)
 *  - Lead         every form submission (browser + Conversions API)
 *  - Contact      contact-form enquiries (browser + API), and clicks on
 *                 WhatsApp / phone / email links (browser)
 *  - SubmitApplication  accreditation and membership applications (browser + API)
 *  - BookConsultationClick (custom)  clicks on a Calendly booking link (browser)
 */

export const META_PIXEL_ID = "1127877600087566";

/** One event as /api/leads returns it to the form (no personal data). */
export type PixelEvent = {
  name: string;
  id: string;
  data: Record<string, string>;
};

type Fbq = (...args: unknown[]) => void;

function fbq(...args: unknown[]) {
  if (typeof window === "undefined") return;
  const f = (window as unknown as { fbq?: Fbq }).fbq;
  if (typeof f === "function") f(...args);
}

/** A page view after an in-app navigation (the base code tracks the first one). */
export function trackPageView() {
  fbq("track", "PageView");
}

/**
 * Fire the browser copy of the events /api/leads sent to the Conversions API.
 * Pass the parsed JSON of a successful response; anything else is ignored.
 */
export function trackLead(response: unknown) {
  const events = (response as { meta?: unknown } | null)?.meta;
  if (!Array.isArray(events)) return;
  for (const e of events as PixelEvent[]) {
    if (!e || typeof e.name !== "string" || typeof e.id !== "string") continue;
    fbq("track", e.name, e.data ?? {}, { eventID: e.id });
  }
}

/** Clicks that start a conversation or a booking (delegated in MetaPixel.tsx). */
export function trackLinkClick(href: string) {
  const h = href.toLowerCase();
  if (h.startsWith("https://wa.me") || h.includes("whatsapp.com") || h.startsWith("whatsapp:")) {
    fbq("track", "Contact", { content_name: "WhatsApp" });
  } else if (h.startsWith("tel:")) {
    fbq("track", "Contact", { content_name: "Phone" });
  } else if (h.startsWith("mailto:")) {
    fbq("track", "Contact", { content_name: "Email" });
  } else if (h.includes("calendly.com/")) {
    fbq("trackCustom", "BookConsultationClick", { content_name: "Calendly" });
  }
}

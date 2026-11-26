/**
 * OpenAI Ads Measurement Pixel — the browser half of the site's OpenAI Ads
 * (ChatGPT ads) tracking (Nov 26 2026, client). Safe to import from client
 * components: the pixel ID is public; the Conversions API key is server-only
 * (lib/openai-capi.ts). Follows OpenAI's reference (openai/plugins,
 * openai-ads-conversions): init once, `measure` only after a confirmed action,
 * the same event_id as the server event, user data only through `init`.
 *
 * Events:
 *  - page_viewed              every page, including in-app navigations
 *  - contents_viewed          program, membership and case-study pages
 *  - lead_created             every form submission (browser + Conversions API)
 *  - registration_completed   accreditation and membership applications (browser + API)
 *  - custom: whatsapp_click, phone_click, email_click, book_consultation_click
 */

export const OPENAI_PIXEL_ID = "6NRM8WHoC284zxFVq4ab6g";

/** The SDK loader + init (OpenAI's snippet, without `debug`). Rendered once by AdPixels.tsx. */
export const OPENAI_PIXEL_CODE = `!function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];
w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];
f.parentNode.insertBefore(j,f);}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");
oaiq("init",{pixelId:"${OPENAI_PIXEL_ID}"});
(window.__aaaOaiq||[]).forEach(function(a){oaiq.apply(null,a)});window.__aaaOaiq=null;`;

/** One event as /api/leads returns it to the form (no personal data). */
export type OpenAiEvent = {
  type: string;
  id: string;
  data: Record<string, unknown>;
};

type Win = Window & { oaiq?: (...args: unknown[]) => void; __aaaOaiq?: unknown[][] | null };

/**
 * Call the SDK; calls made before the loader ran (first render) are kept and
 * replayed by OPENAI_PIXEL_CODE right after init.
 */
function oaiq(...args: unknown[]) {
  if (typeof window === "undefined") return;
  const w = window as Win;
  if (typeof w.oaiq === "function") w.oaiq(...args);
  else if (w.__aaaOaiq !== null) (w.__aaaOaiq ??= []).push(args);
}

const custom = (name: string) =>
  oaiq("measure", "custom", { type: "custom" }, { custom_event_name: name });

/** Content units worth reporting as contents_viewed, by internal route. */
function contentTypeOf(route: string): string | null {
  if (route.startsWith("/programs/")) return "accreditation_program";
  if (route === "/membership" || route.startsWith("/membership/")) return "membership";
  if (route.startsWith("/case-studies/")) return "case_study";
  return null;
}

/** page_viewed for every page; contents_viewed on program/membership/case-study pages. */
export function trackOpenAiPageView(route: string) {
  oaiq("measure", "page_viewed", { type: "contents" });
  const contentType = contentTypeOf(route);
  if (!contentType) return;
  // The <title> updates just after an in-app navigation; read it a moment later.
  window.setTimeout(() => {
    const name = document.title.replace(/\s*\|\s*AAA\s*$/, "").trim();
    oaiq("measure", "contents_viewed", {
      type: "contents",
      contents: [{ id: route, content_type: contentType, ...(name ? { name } : {}) }],
    });
  }, 400);
}

/**
 * Fire the browser copy of the events /api/leads sent to the Conversions API,
 * after passing the submitter's hashed email to the Pixel through `init`.
 */
export function trackOpenAiLead(response: unknown) {
  const block = (response as { openai?: { user?: unknown; events?: unknown } } | null)?.openai;
  if (!block || !Array.isArray(block.events)) return;
  if (block.user && typeof block.user === "object") oaiq("init", { user: block.user });
  for (const e of block.events as OpenAiEvent[]) {
    if (!e || typeof e.type !== "string" || typeof e.id !== "string") continue;
    oaiq("measure", e.type, e.data ?? {}, { event_id: e.id });
  }
}

/** WhatsApp / phone / email / booking links. */
export function trackOpenAiLinkClick(href: string) {
  const h = href.toLowerCase();
  if (h.startsWith("https://wa.me") || h.includes("whatsapp.com") || h.startsWith("whatsapp:")) custom("whatsapp_click");
  else if (h.startsWith("tel:")) custom("phone_click");
  else if (h.startsWith("mailto:")) custom("email_click");
  else if (h.includes("calendly.com/")) custom("book_consultation_click");
}

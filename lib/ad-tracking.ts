import { trackMetaLead, trackMetaLinkClick, trackMetaPageView } from "./meta-pixel";
import { trackOpenAiLead, trackOpenAiLinkClick, trackOpenAiPageView } from "./openai-pixel";

/**
 * The site's one browser tracking layer (Nov 2026): every ad platform is a
 * sink here, so forms and components call these and never a platform
 * directly. Platforms: Meta (lib/meta-pixel.ts) and OpenAI Ads
 * (lib/openai-pixel.ts); the server halves are lib/meta-capi.ts and
 * lib/openai-capi.ts, called by /api/leads.
 */

/**
 * After a successful POST to /api/leads: fire the browser copy of the events
 * the server sent to each platform's Conversions API (same event IDs, so each
 * platform counts the conversion once). Pass the parsed JSON response.
 */
export function trackLead(response: unknown) {
  trackMetaLead(response);
  trackOpenAiLead(response);
}

/**
 * A page view. `route` is the internal route (routeOf). The Meta base code
 * already counts the first page, so Meta gets only the later ones.
 */
export function trackPageView(route: string, firstPage: boolean) {
  if (!firstPage) trackMetaPageView();
  trackOpenAiPageView(route);
}

/** A click on a WhatsApp / phone / email / booking link. */
export function trackLinkClick(href: string) {
  trackMetaLinkClick(href);
  trackOpenAiLinkClick(href);
}

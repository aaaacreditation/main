/*
 * The subdomain that is live ahead of the rest of the site.
 *
 * Shared by proxy.ts (which redirects every other route on this host to the
 * SME program page) and the SME page's own BareChrome component (which hides
 * the site header and footer there). Both behaviours are temporary and lift
 * together when the full site launches — keeping the hostname in one place
 * means they cannot drift apart in the meantime.
 */
export const GATED_HOST = "sme.aaa-accreditation.org";

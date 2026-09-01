import { headers } from "next/headers";
import { GATED_HOST } from "@/lib/gating";

/*
 * TEMPORARY — lifts together with the gate in proxy.ts.
 *
 * On sme.aaa-accreditation.org the SME program page is the only page the
 * public should see, so the site header and footer are hidden there: their
 * links all point at routes that proxy.ts bounces straight back here anyway.
 *
 * WHY CSS RATHER THAN NOT RENDERING THE CHROME
 * The header and footer come from SiteChrome in the ROOT layout. Making that
 * host-aware would mean calling headers() in the root layout, which opts the
 * ENTIRE site out of static rendering. Emitting a stylesheet from the page
 * instead confines the cost to this one route.
 *
 * The same page is also served on aaa-accreditation.org, where the full site
 * is meant to be browsable — hence the host check rather than hiding the
 * chrome for this route everywhere.
 *
 * sme.css is client-frozen, so the hero's top padding (which exists to clear
 * the absolute-positioned header) is corrected here rather than there.
 */
export default async function BareChrome() {
  const host = (await headers()).get("host")?.split(":")[0];
  if (host !== GATED_HOST) return null;

  return (
    <style
      /* eslint-disable-next-line react/no-danger */
      dangerouslySetInnerHTML={{
        __html: `
          .site-header,
          .header-compact,
          .site-footer { display: none !important; }
          /* The hero reserves ~197px for the absolute header that is no longer
             there. The padding sits on .lpx-hero-inner, not .smex-hero-grid. */
          .smex .lpx-hero-inner { padding-top: clamp(56px, 6vw, 88px) !important; }
        `,
      }}
    />
  );
}

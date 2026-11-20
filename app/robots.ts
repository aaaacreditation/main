import type { MetadataRoute } from "next";
import { getSeoSettings, isLiveSite } from "../lib/site-settings";
import { robotsRules } from "../lib/robots-policy";

/*
 * Rendered per request so NOINDEX is read at RUNTIME. Statically, the value
 * was frozen at build time — and the Docker image is built without the
 * server's env file (Nov 10 2026: the preview server served "Allow: /" with
 * NOINDEX=true set). The settings read is cached, so this stays cheap.
 */
export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  /*
   * Client-review and staging deployments must never be indexed: they serve
   * the same pages as the live site, so search engines would treat them as
   * duplicate content competing with aaa-accreditation.org. The preview
   * server sets NOINDEX=true.
   */
  if (!isLiveSite()) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return robotsRules(await getSeoSettings());
}


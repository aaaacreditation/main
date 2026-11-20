import { getSitemapFiles, sitemapIndexXml, urlsetXml } from "@/lib/sitemap";

/**
 * The XML sitemaps, under the old WordPress (Yoast) file names — see
 * lib/sitemap.ts. next.config.ts rewrites /sitemap_index.xml, /sitemap.xml
 * and /<name>.xml here. Dynamic so robots/NOINDEX-style runtime state and
 * admin saves apply at once; the data itself is cached (tag "sitemap").
 */
export const dynamic = "force-dynamic";

const INDEX = new Set(["index", "sitemap", "sitemap_index"]);

export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const name = (await params).name.replace(/\.xml$/, "");
  const files = await getSitemapFiles();
  let body: string | null = null;
  if (INDEX.has(name)) body = sitemapIndexXml(files);
  else {
    const file = files.find((f) => f.name === name);
    if (file) body = urlsetXml(file);
  }
  if (!body) return new Response("Not found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=600, stale-while-revalidate=3600",
      // A sitemap is for crawlers, not a page to rank.
      "x-robots-tag": "noindex, follow",
    },
  });
}

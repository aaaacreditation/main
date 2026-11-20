/**
 * Shared SEO + GEO helpers.
 *
 * "GEO" = generative-engine optimisation: the structured, quotable, clearly
 * attributed facts that AI answer engines cite. In practice that means every
 * page ships (a) a canonical URL, (b) OpenGraph/Twitter cards, and (c) JSON-LD
 * that names the organisation, the breadcrumb trail and — where the page
 * answers questions — an FAQPage block.
 */

import { publicPath } from "./public-urls";

export const SITE_URL = "https://aaa-accreditation.org";
export const SITE_NAME = "American Accreditation Association";
export const SITE_SHORT = "AAA";

export const ORG = {
  legalName: "American Accreditation Association",
  alternateName: "AAA Accreditation",
  email: "info@aaa-accreditation.org",
  telephone: "+1-571-601-2616",
  telephoneIntl: "+1-571-630-2066",
  street: "8609 Westwood Center Drive",
  city: "Tysons Corner",
  region: "VA",
  postalCode: "22182",
  country: "US",
  countryName: "United States",
} as const;

/** The generated site-wide share card (app/opengraph-image.tsx). */
export const DEFAULT_OG_IMAGE = "/opengraph-image";

/** <link rel="alternate"> to the article feeds, on every page (as WordPress did). */
export const FEED_ALTERNATES = {
  "application/rss+xml": [{ url: `${SITE_URL}/feed/`, title: `${SITE_NAME} — News & Articles` }],
  "application/feed+json": [{ url: `${SITE_URL}/feed.json`, title: `${SITE_NAME} — News & Articles (JSON Feed)` }],
};

/**
 * The square AAA seal, used as the logo in structured data (Nov 2026). Google
 * shows it on white in results and knowledge panels, so not the wide header
 * logo: AAA-Logo.png has white lettering and would vanish there.
 */
export const LOGO = { url: `${SITE_URL}/logo/aaalog.png`, width: 710, height: 671 } as const;

/** Suffix the root layout's title template adds ("%s | AAA"). */
const TITLE_SUFFIX = " | AAA";
/** Longest title Google shows in full (≈ 600px). */
export const TITLE_MAX = 60;

/**
 * Title for `metadata.title`. Short titles get the " | AAA" suffix from the
 * layout template; a title that would pass 60 characters with it is used on
 * its own (Nov 2026 audit: 282 titles were cut off in results, most of them
 * by the suffix alone).
 */
export function titleFor(title: string): string | { absolute: string } {
  const t = title.trim();
  return t.length + TITLE_SUFFIX.length > TITLE_MAX ? { absolute: t } : t;
}

/** Longest meta description shown in full. */
export const DESCRIPTION_MAX = 160;

/** A description cut to ≤ 160 characters at a word boundary, with an ellipsis when cut. */
export function clampDescription(text: string, max = DESCRIPTION_MAX): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const at = cut.lastIndexOf(" ");
  return `${(at > max * 0.6 ? cut.slice(0, at) : cut).replace(/[\s,;:.\-–—]+$/, "")}…`;
}

export type MetaInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/programs/healthcare". Becomes the canonical URL. */
  path: string;
  /**
   * Absolute or root-relative image path for the OG/Twitter card. Omit it and
   * the route inherits the generated card from app/opengraph-image.tsx — that
   * is the right default, so only pass this when a page has its own artwork.
   */
  image?: string;
  /** Set true on pages that should not be indexed (thank-you pages, etc.). */
  noindex?: boolean;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
};

/**
 * Build a complete Next.js `metadata` object: canonical, OpenGraph and Twitter
 * in one call, so no page has to remember all three.
 */
export function pageMeta({
  title,
  description,
  path,
  image,
  noindex = false,
  keywords,
  type = "website",
  publishedTime,
}: MetaInput) {
  // Canonical = the page's public address (its old WordPress URL, Nov 2026).
  const url = path === "/" ? SITE_URL : `${SITE_URL}${publicPath(path)}`;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : undefined;

  description = clampDescription(description);
  return {
    title: titleFor(title),
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: { canonical: url, types: FEED_ALTERNATES },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: "en_US",
      // Pages without bespoke artwork point at the generated site-wide card
      // (app/opengraph-image.tsx). Next does NOT inherit that card into a
      // page that sets its own `openGraph` object — the Oct 2026 SEO audit
      // found og:image missing on 406 of 408 pages — so name it explicitly.
      // Root-relative, resolved against metadataBase in app/layout.tsx.
      images: [{ url: ogImage ?? DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [ogImage ?? DEFAULT_OG_IMAGE],
    },
  };
}

/* ------------------------------------------------------------------ JSON-LD */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ORG.alternateName,
    legalName: ORG.legalName,
    url: SITE_URL,
    description:
      "The American Accreditation Association (AAA) is an international accreditation body headquartered in Virginia, USA. It accredits healthcare organizations, conformity assessment bodies, training and education providers, schools and SMEs.",
    logo: { "@type": "ImageObject", ...LOGO },
    image: { "@type": "ImageObject", ...LOGO },
    email: ORG.email,
    telephone: ORG.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: ORG.street,
      addressLocality: ORG.city,
      addressRegion: ORG.region,
      postalCode: ORG.postalCode,
      addressCountry: ORG.country,
    },
    areaServed: "Worldwide",
    // Confirms the organisation's identity across the web — the strongest
    // entity signal available to search engines and AI answer engines.
    sameAs: [
      "https://www.linkedin.com/company/aaa-accreditation/",
      "https://www.facebook.com/AAA.Accreditations/",
      "https://www.instagram.com/aaa.accreditations/",
      "https://twitter.com/AAAccreditation",
    ],
    knowsAbout: [
      "Accreditation",
      "Conformity assessment",
      "ISO/IEC 17021-1",
      "ISO/IEC 17025",
      "ISO 15189",
      "ISO/IEC 17020",
      "ISO/IEC 17024",
      "ISO/IEC 17065",
      "ISO/IEC 17043",
      "Healthcare accreditation",
      "Training provider accreditation",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: ORG.email,
        telephone: ORG.telephone,
        areaServed: "Worldwide",
        availableLanguage: ["English", "Arabic"],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
}

/** The organization, inline: Google's article/review parsers want a name and logo, not only an @id. */
const orgRef = () => ({
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: { "@type": "ImageObject", ...LOGO },
});

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    // Home is always prepended; drop a caller-supplied "/" entry so it never appears twice.
    itemListElement: [{ name: "Home", path: "/" }, ...items.filter((it) => it.path !== "/")].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path === "/" ? SITE_URL : `${SITE_URL}${publicPath(item.path)}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/**
 * An accreditation program, described as a Service so answer engines can state
 * who provides it, to which standard, and where it is available.
 */
export function serviceSchema({
  name,
  description,
  path,
  standard,
  audience,
}: {
  name: string;
  description: string;
  path: string;
  standard?: string;
  audience?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: "Accreditation",
    url: `${SITE_URL}${publicPath(path)}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "Worldwide",
    ...(audience ? { audience: { "@type": "Audience", audienceType: audience } } : {}),
    ...(standard
      ? {
          isBasedOn: {
            "@type": "CreativeWork",
            name: standard,
          },
        }
      : {}),
  };
}

export function articleSchema({
  title,
  description,
  path,
  datePublished,
  dateModified,
  image,
  type = "Article",
  section,
  keywords,
  wordCount,
}: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  /** NewsArticle for announcements, BlogPosting for articles (Nov 2026). */
  type?: "Article" | "NewsArticle" | "BlogPosting";
  section?: string;
  keywords?: string[];
  wordCount?: number;
}) {
  const url = `${SITE_URL}${publicPath(path)}`;
  // Google's Article rich result requires an image; pages without one use the
  // generated site card.
  const img = image ?? DEFAULT_OG_IMAGE;
  return {
    "@context": "https://schema.org",
    "@type": type,
    headline: title.length > 110 ? `${title.slice(0, 109).trimEnd()}…` : title,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(datePublished ? { datePublished } : {}),
    ...(datePublished || dateModified ? { dateModified: dateModified ?? datePublished } : {}),
    image: [img.startsWith("http") ? img : `${SITE_URL}${img}`],
    ...(section ? { articleSection: section } : {}),
    ...(keywords && keywords.length > 0 ? { keywords: keywords.join(", ") } : {}),
    ...(wordCount ? { wordCount } : {}),
    inLanguage: "en-US",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    author: orgRef(),
    publisher: orgRef(),
  };
}

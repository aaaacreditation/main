/**
 * Shared SEO + GEO helpers.
 *
 * "GEO" = generative-engine optimisation: the structured, quotable, clearly
 * attributed facts that AI answer engines cite. In practice that means every
 * page ships (a) a canonical URL, (b) OpenGraph/Twitter cards, and (c) JSON-LD
 * that names the organisation, the breadcrumb trail and — where the page
 * answers questions — an FAQPage block.
 */

export const SITE_URL = "https://aaa-accreditation.org";
export const SITE_NAME = "American Accreditation Association";
export const SITE_SHORT = "AAA";

export const ORG = {
  legalName: "American Accreditation Association",
  alternateName: "AAA Accreditation",
  email: "info@aaa-accreditation.org",
  telephone: "+1-571-601-2616",
  telephoneIntl: "+44-748-755-0737",
  street: "8609 Westwood Center Drive",
  city: "Tysons Corner",
  region: "VA",
  postalCode: "22182",
  country: "US",
  countryName: "United States",
} as const;

type MetaInput = {
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
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : undefined;

  return {
    title,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: { canonical: url },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: "en_US",
      // No `images` key when the page has no bespoke artwork: Next then falls
      // back to the generated site-wide card instead of pointing at a 404.
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] } : {}),
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
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
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo/AAA-Logo.png`,
    },
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

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path === "/" ? SITE_URL : `${SITE_URL}${item.path}`,
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
    url: `${SITE_URL}${path}`,
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
  image,
}: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: `${SITE_URL}${path}`,
    ...(datePublished ? { datePublished } : {}),
    ...(image ? { image: image.startsWith("http") ? image : `${SITE_URL}${image}` } : {}),
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

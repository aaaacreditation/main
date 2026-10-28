import type { GlyphName } from "../../_components/site/Glyph";

/**
 * Data contract for the eight conformity-assessment scheme pages (Oct 2026
 * client structure). Every scheme page shares the same eight sections:
 * 01 Hero · 02 Suitability · 03 Benefits · 04 Assessment areas ·
 * 05 Process + application/resources · 06 Testimonial(s) · 07 FAQ · 08 CTA.
 * Copy in these objects is the client's approved text — keep it verbatim.
 */

export type SchemeImage = { src: string; alt: string; width: number; height: number };

export type SchemeTile = { icon: GlyphName; title: string; text?: string };

export type SchemeStep = { title: string; text: string };

export type SchemeDoc = {
  label: string;
  href: string;
  /** File type chip ("PDF", "DOC") or "VIEW" for links to a page. */
  meta?: string;
};

export type SchemeQuote = {
  quote: string;
  name: string;
  /** Lines under the name (role, organization, country). */
  lines?: string[];
};

export type SchemeTestimonial = {
  /** Section kicker; defaults to "Client Experience". */
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Lead media: lazy YouTube video, photo, or a logo on a white plate. */
  media?:
    | { kind: "video"; id: string; title: string }
    | { kind: "image"; image: SchemeImage; caption?: string }
    | { kind: "logo"; image: SchemeImage; caption?: string };
  /** Heading + paragraph beside a video (used where there is no pull-quote). */
  story?: { title: string; text: string };
  quote?: SchemeQuote;
  highlights?: SchemeTile[];
  /** Optional note block (e.g. the Lazarus Alliance client-relationship panel). */
  clients?: { title: string; text: string; image: SchemeImage };
  /** A second, smaller testimonial (photo + quote). */
  second?: { image: SchemeImage; quote: SchemeQuote };
  /** Value cards used instead of a testimonial (no client story yet). */
  cards?: SchemeTile[];
};

export type SchemeData = {
  /** Page wrapper id for anchors and analytics, e.g. "testing-labs". */
  slug: string;
  path: string;
  /** Short label for breadcrumbs, e.g. "Testing Laboratories". */
  crumb: string;
  hero: {
    standard: string;
    title: string;
    lead: string;
    image: string;
    /** Client-supplied alt text for the hero photo. */
    imageAlt?: string;
    caption?: string;
    /** Last hero stat label pair (client wording differs per page). */
    stats: { v: string; k: string }[];
  };
  advisor?: {
    intro: string;
    /** Label of the free-text field ("Testing Activities"). */
    field: string;
    placeholder: string;
    sector: string;
    source: string;
  };
  suitability: {
    title: string;
    paragraphs: string[];
    label: string;
    tiles: SchemeTile[];
  };
  benefits: {
    title: string;
    items: SchemeTile[];
    image?: SchemeImage;
    captionTitle?: string;
    caption: string;
    /** Optional second photo card stacked under the first. */
    secondImage?: SchemeImage;
  };
  areas: {
    intro: string;
    tiles: SchemeTile[];
    note?: { title: string; text: string };
  };
  process: {
    title: string;
    steps: SchemeStep[];
    /** "Accreditation Application Form" card (5 of the 8 pages). */
    application?: { text: string; href: string; note: string };
    /** Resources list title + items. */
    resourcesTitle?: string;
    resources?: SchemeDoc[];
  };
  testimonial: SchemeTestimonial;
  faq: { intro: string; items: { q: string; a: string }[] };
  cta: { title: string; text: string };
  related: { href: string; label: string }[];
};

# AAA Brand Guidelines

These are the official brand guidelines for AAA. Follow them strictly for all UI work, components, styles, and assets in this project.

## Colors

> Rebranded July 2026 to the navy + gold palette from the client's `about_aaa2.html` reference. The previous single-color brand (`#024985`) is retired.

### Primary
- **Brand Navy**: `#173d73` (CSS token `--aaa-blue`)
  - Use for: primary buttons, links, headings, navigation accents, key brand elements, focus states.
  - Tailwind utility: configure as `brand` (e.g., `bg-brand`, `text-brand`, `border-brand`).
- **Royal Blue**: `#244f93` (`--aaa-blue-500`) — gradient partner for navy (`linear-gradient(135deg, #173d73, #244f93)`), lighter accents.
- **Brand Dark**: `#061a2c` (`--aaa-blue-950`) — dark surfaces: footer, utility bar, dark hero gradients (`#061a2c → #0b2d50 → #173d73`).

### Accent
- **Brand Gold**: `#b38a2e` (`--aaa-gold`) — the PRIMARY decorative accent. Kickers/eyebrows, accent bars and borders, icon rings, hover highlights on dark surfaces, gold CTA buttons (gradient `#b38a2e → #8e6b18`).
- **Deep Gold**: `#8e6b18` (`--aaa-gold-700`) — gold text on light backgrounds (better contrast), gradient partner.
- **Pale Gold**: `#f4e7c6` (`--aaa-gold-100`) — gold-tinted text on dark navy (e.g., hero subheadings).

### Tertiary (added Aug 2026)
- **Flag Red**: `#c1122f` (`--aaa-red`) — the third brand color, promoted site-wide from the
  client-approved SMEs Accreditation page (where it originated as `--sme-red`). It is an
  *accent of last resort*, not a peer of navy and gold.
  - Use for: urgency and time-boxed offers, alert/attention states, one high-intent CTA per
    page at most (`.ax-btn-red`), the American flag motif, error emphasis on marketing pages.
  - Never use for: section backgrounds, headings, body text, nav, icons-by-default, or more
    than one moment per page.
- **Deep Red**: `#8f0e23` (`--aaa-red-deep`) — gradient partner; red text on light surfaces.
- **Soft Red**: `#fff0f2` (`--aaa-red-soft`) — tinted surface for red notice blocks only.
- Contrast: `#c1122f` on white passes AA for normal text; white on `#c1122f` passes AA. Never
  place red on navy — the two are too close in value.

### Color Usage Rules
- Navy `#173d73` MUST remain the dominant brand color; gold is an accent, never a dominant
  surface color; red is a tertiary accent, rarer still than gold.
- Order of precedence on any page: **navy > gold > red**. If red appears more than once in a
  viewport, it is being overused.
- Do NOT introduce new accent colors without updating these guidelines first.
- Maintain WCAG AA contrast minimums:
  - White (`#FFFFFF`) text on `#173d73` / `#244f93` / `#061a2c` is approved.
  - Gold `#b38a2e` on dark navy passes AA only for large/bold text and decorative accents; do not use it for small body text on `#173d73`.
  - On white, prefer deep gold `#8e6b18` over `#b38a2e` for small gold text.
  - Do not place navy text on dark backgrounds — use white instead.

### Functional (semantic) colors — not brand accents
- Danger/error: `#B3261E` (text/icons) on `#FDF0EF` (surface), border `#F2C6C2`. Reserved for destructive actions and validation errors (admin CMS, form errors). Never used decoratively. (Added July 2026 with the admin CMS.)

### About-page editorial surfaces (July 10 2026 — client-approved Claude Design "AAA About Us")
- Warm parchment surfaces, used as **neutrals** (not accents) on the About page's editorial redesign: background `#f6f3ec`, borders/dividers `#ece7db`, secondary text `#5a6a7a`.
- The reference design's bright gold `#c9a648` is **not** adopted — map it to `--aaa-gold` (#b38a2e) on dark surfaces and `--aaa-gold-700` (#8e6b18) on light.
- The About redesign also uses sharp-cornered (no radius) uppercase letter-spaced buttons (`.abx-btn`) — scoped to that page's design language, not a site-wide button change.

### Suggested Supporting Palette
- Map marker red: `#D6334D` — reserved exclusively for the animated location markers on the "Countries We Operate" world map (carried over from the legacy site map at the client's request, June 2026). Do not use it anywhere else.
- Map deep navy: `#0E2A47` — world-map fill for countries without AAA accreditation (accredited countries use brand navy `#173d73`).
- Light blue surfaces: `#eef4ff` (`--aaa-blue-50`) subtle tinted backgrounds; `#d7e2f4` (`--aaa-blue-100`) tinted borders.
- White: `#FFFFFF` — backgrounds, surfaces, text on brand color.
- Neutral 900: `#0F172A` — body text on light backgrounds.
- Neutral 600: `#475569` — secondary text.
- Neutral 200: `#E2E8F0` — borders, dividers.
- Neutral 50: `#F8FAFC` — subtle section backgrounds.

## Typography

### Font Family
- **Primary Font**: **Poppins** (Google Fonts).
- Use Poppins for ALL text: headings, body, buttons, navigation, forms, captions.
- Load Poppins via `next/font/google` in `app/layout.tsx` and expose it as a CSS variable (e.g., `--font-poppins`).
- Tailwind: set Poppins as the default `font-sans` in `tailwind.config` so every element inherits it.

### Font Weights (Poppins)
- 300 — Light (rare, large display only)
- 400 — Regular (body text, default)
- 500 — Medium (subheadings, emphasized body)
- 600 — SemiBold (buttons, section titles)
- 700 — Bold (page headings, hero titles)

### Type Scale (recommended)
- H1 / Hero: 48–72px (inner-page heroes up to 88px), weight 600–700, tight tracking (−0.03 to −0.035em), fluid via clamp()
- H2: 24–36px (modern compact scale; capped site-wide), weight 600, line-height ~1.15, fluid via clamp()
- Headings use no italic — title accents are upright (color/weight only), never `font-style: italic`
- H3: 24–32px, weight 600
- H4: 20–24px, weight 600
- Body Large: 18px, weight 400
- Body: 16px, weight 400, line-height 1.6
- Small / Caption: 14px, weight 400
- Button: 14–16px, weight 600, normal case (avoid all-caps unless intentional)

## Logo & Imagery
- Maintain clear space around the logo equal to the height of its smallest letter.
- Never recolor the logo outside of approved variants (full color on white, white on brand blue).
- Imagery should feel professional, trustworthy, and aligned with AAA's institutional identity.

## Components

### Buttons
- Primary: `background: #173d73` (or gradient to `#244f93`), `color: #FFFFFF`, `font-weight: 600`, `border-radius: 6–8px`, hover darkens by ~8–10%.
- Gold CTA (hero/CTA bands only): `background: linear-gradient(135deg, #b38a2e, #8e6b18)`, `color: #FFFFFF`, `font-weight: 600` — reserve for the one highest-priority action per page.
- Secondary: `background: transparent`, `color: #173d73`, `border: 1px solid #173d73`, hover fills with `#173d73` and white text (on dark surfaces: white text + translucent white border).
- Disabled: 50% opacity, no hover state.

### Links
- Color: `#173d73`.
- Hover: underline + slight darken.

### Forms
- Inputs use neutral borders (`#E2E8F0`); focus state uses `#173d73` border + ring.
- Labels are `font-weight: 500`, body text is `font-weight: 400`.

### Cards / Surfaces
- White background, neutral 200 border or subtle shadow.
- Headings inside cards use brand blue or neutral 900.

## Spacing & Layout
- Use a consistent 4px / 8px spacing scale (Tailwind defaults).
- Section padding: minimum 64px top/bottom on desktop, 40px on mobile.
- Max content width: 1200–1280px; center with auto margins.

## Tone & Voice (for copy)
- Professional, clear, authoritative, accessible.
- Avoid jargon when explaining offerings to the public.

## Implementation Checklist (must be true for every page/component)
- [ ] Poppins is the active font family (no system fonts leaking through).
- [ ] Primary CTAs use `#173d73` (gold gradient reserved for the single highest-priority CTA).
- [ ] No off-brand accent colors introduced (gold `#b38a2e` primary accent, red `#c1122f` tertiary and sparing).
- [ ] Headings follow the type scale above.
- [ ] Sufficient contrast (WCAG AA) for all text.
- [ ] Spacing uses the 4/8px scale.
- [ ] Built from `.ax-*` primitives; any new CSS is page-local and scoped.
- [ ] Stats come from `lib/facts.ts`, not hardcoded.
- [ ] `metadata` via `pageMeta()` and JSON-LD via `<JsonLd>` are present.

## The `.ax-*` Design System (Aug 2026) — build with this first

`app/aaa-ds.css` is the site-wide component layer, extracted verbatim from the two
client-approved reference pages (`app/programs/iso-17021/cb.css` and
`app/programs/smes-accreditation-program/sme.css`). Those two files are FROZEN — do not edit
them; `aaa-ds.css` is the portable version every other page shares.

**Always reach for an `.ax-*` primitive before writing new CSS.** The vocabulary:

| Concern | Classes |
|---|---|
| Page wrapper | `.axp` |
| Sections | `.ax-section` + `.cream` `.fade` `.fade-up` `.navy` `.tight` |
| Headings | `.ax-head` (+`.center`), `.ax-rule`, `.ax-label`, `.eyebrow` |
| Buttons | `.ax-btn` + `-blue` `-gold` `-red` `-ghost` `-ghost-navy` `-white`, `.sm`, `.block` |
| Hero | `.ax-hero` (+`.red`), `.ax-hero-grid` (+`.solo` `.overlap`), `.ax-crumbs`, `.ax-hero-badge`, `.ax-hero-lead`, `.ax-stats`/`.ax-stat`, `.ax-hero-visual`/`.ax-hero-photo` |
| Cards | `.ax-grid` (+`.two` `.three` `.four` `.tight`), `.ax-card`, `.ax-card-ico`, `.ax-card-no`, `.ax-card-rule`, `.ax-tile` |
| Layout | `.ax-split` (+`.reverse` `.wide-left` `.even` `.top`), `.ax-photo`, `.ax-panel` |
| Sequences | `.ax-reasons`/`.ax-reason`, `.ax-steps-panel`/`.ax-steps`/`.ax-step`, `.ax-pill` |
| Lists | `.ax-checks` (+`.gold`), `.ax-docs`, `.ax-metrics`/`.ax-metric` |
| Proof | `.ax-quote`, `.ax-avatar` |
| Q&A | `.ax-faq-list` (+`.single`), `.ax-faq-item`, `.ax-faq-plus`, `.ax-faq-a` |
| Closing | `.ax-close`, `.ax-close-inner`, `.ax-close-actions`, `.ax-related` |
| Prose | `.ax-prose`, `.ax-note` (+`.gold` `.red`) |

### Sept 2026 refresh — BizGen "demo one" styling pass

The client asked for the site to take its styling cues from the **BizGen business-consulting
template, demo one** (`../newwebsite/bizgen-business-consulting-html-template-*/bizgen-html/index.html`),
rendered in AAA navy + gold + red. No colours or fonts changed — this is a treatment pass over
the existing primitives. What was adopted:

- **Three-tier header** (`app/_components/Header.tsx`, header block in `globals.css`): navy
  utility strip → **white logo row** carrying the logo left plus email / phone contact blocks
  (icon plate + label over value) and the primary CTA right → **full-bleed dark nav bar**,
  square corners, with a hairline-separated search cell and a gold `Apply` cell at its end.
  `--header-h` (188px) is the single knob heroes pad against — re-measure it if the header's
  height changes.
- **Arrow buttons** rest at −45° (↗) and swing level (→) on hover. Applied via
  `.ax-btn:has(path[d^="M5 12h14"])` so buttons carrying a download / document / shield icon
  keep the plain nudge.
- **Centred kickers** get a matching rule on the trailing side (— OUR SERVICES —).
- **Cards**: radius 20px, icon plate flips to a solid brand fill on hover, numerals render as
  an outlined watermark (`-webkit-text-stroke`, with a flat-tint `@supports` fallback).
- **`.ax-reason`** is now a stacked card with its numeral on a rounded plate hanging over the
  left edge. `.ax-reasons` carries `padding-left: 26px` equal to that overhang so the plate
  never spills out of its column — keep them in step if either changes.
- **Home hero** (`app/home.css`, scoped `.homex`): full-bleed photograph behind a navy scrim,
  kicker over a hairline, and a two-tier `h1` whose `<em>` is oversized gold with a solid
  underline bar. The `<em>` uses `width: min-content` so the bar ends flush with the text.
- **Footer**: gold underscore under each column heading, contact icons on tinted plates.

**The SMEs Accreditation page was explicitly excluded.** It is safe because it uses only its
own `.smex-*` classes from the frozen `sme.css` — it shares the Header and Footer (which did
change) but not one `.ax-*` rule. Verify that still holds before touching `aaa-ds.css`.

Rules:
- New page-specific CSS goes in a **page-local file** (e.g. `app/foo/foo.css`), with every rule
  scoped under a page-only class, imported by that page. Never grow `app/globals.css`.
- Shared shells `PageHero`, `PageBody`, `CTA`, `ProgramPage` already render `.ax-*`; prefer
  them over bespoke markup.
- Known quirk: `globals.css` carries `h2 { font-size: clamp(24px,2.7vw,36px) !important }`.
  Every `h2` on the site renders at that compact scale regardless of what a component
  stylesheet declares — that is the approved look, inherited from the reference pages.

## Facts, SEO and GEO

- **Never hardcode a company statistic.** `lib/facts.ts` is the single source of truth
  (`FACTS`, `CONTACT`, `PROGRAMS`, `CAB_SCHEMES`, `SOCIAL`). The site previously published
  nine different values for "countries served"; the canonical figure is **58**.
- The ISO/IEC 17021-1 program is named **"Management Systems Certification Bodies
  Accreditation"** (renamed Aug 2026 from "System Certification Bodies"). Use
  `PROGRAMS.iso17021.label`.
- Every page must export `metadata` built with `pageMeta()` from `lib/seo.ts` — it produces
  the canonical URL, OpenGraph and Twitter card together. Titles ≤ 60 chars, descriptions
  120–160.
- Every page emits JSON-LD via `<JsonLd>`: `breadcrumbSchema` always, plus `faqSchema` /
  `serviceSchema` / `articleSchema` where they apply. `organizationSchema` and
  `websiteSchema` are emitted once, in `app/layout.tsx`.
- Legacy WordPress URLs are redirected in `next.config.ts`; the news-post redirects are
  generated from `app/news/posts-data.json`, so re-running the migration keeps them in sync.

## Tech Stack Conventions
- Next.js (App Router) — keep components in `app/_components/` when shared.
- Tailwind CSS — extend the theme to expose `brand` color and Poppins font; do not hardcode `#173d73` in components, use `bg-brand` / `text-brand` (or the `--aaa-*` CSS tokens in globals.css) instead.
- Global styles live in `app/globals.css`.

---

**Rule of thumb**: if a design choice deviates from this document, update the document first (with reasoning), then implement. Brand consistency is non-negotiable.

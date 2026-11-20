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
  Exception (Oct 22 2026, client): the **home page** map (`.homex .hx-reach-map` in `home.css`) fills
  countries without accreditation with `#005ac2`. Reserved for that map only. Only accredited countries are interactive (name tooltip, hover, pointer) on every map.
- WhatsApp green: `#25D366` (hover `#1EBE5A` → `#128C4A`) — reserved exclusively for the floating WhatsApp
  button (`.fcx-wa`, `app/_components/floating-contact.css`), at the client's request (Nov 17 2026). Every
  other WhatsApp icon on the site stays in the surrounding brand colour (`WhatsAppIcon`, currentColor).
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
- 300 — Light (rare, large display only) — not loaded since Nov 2026 (unused; add it back to `app/layout.tsx` only if a design needs it)
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
- **Cards**: icon plate flips to a solid brand fill on hover. *(The 20px radius and the
  outlined `-webkit-text-stroke` numerals from this pass were superseded by the SME
  alignment below.)*
- **`.ax-reason`** is now a stacked card with its numeral on a plate hanging over the
  left edge. `.ax-reasons` carries `padding-left: 26px` equal to that overhang so the plate
  never spills out of its column — keep them in step if either changes.
- **Home hero** (`app/home.css`, scoped `.homex`): full-bleed photograph behind a navy scrim,
  kicker over a hairline, and a two-tier `h1` whose `<em>` is oversized gold with a solid
  underline bar. The `<em>` uses `width: min-content` so the bar ends flush with the text.
- **Footer**: gold underscore under each column heading, contact icons on tinted plates.

**The SMEs Accreditation page was explicitly excluded.** It is safe because it uses only its
own `.smex-*` classes from the frozen `sme.css` — it shares the Header and Footer (which did
change) but not one `.ax-*` rule. Verify that still holds before touching `aaa-ds.css`.

### Sept 10 2026 — type + card alignment to the SME page

The client asked for the site's **fonts and cards to match the SMEs Accreditation page**
while keeping the BizGen site treatment (header, hero layout, arrow buttons, kicker rules,
footer). `aaa-ds.css` and `home.css` were re-tuned to the measured values of `sme.css`:

- **Type**: `.ax-head h2` / `.ax-close-inner h2` use SME tracking and leading
  (`letter-spacing: -0.045em`, `line-height: 1.04`); `.ax-hero h1` is
  `clamp(38px, 4.5vw, 60px)`. Card titles are 18.5px / 1.35; card copy 13.5px / 1.7; FAQ
  question 16px, answer 15px. Figures use weight 700, titles 600 — never 800.
- **Card tokens**: `--ax-radius: 16px` (cards, tiles, reasons, metrics),
  `--ax-radius-lg: 22px` (panels, quotes, steps), `--ax-card-bg` (white → `#f5f8fc`
  surface), `--ax-navy-bg` (the SME navy gradient), `--ax-ring` / `--ax-ring-gold`.
- **Icon holders are thin-ring circles** (`.ax-card-ico`, `.ax-tile-ico`, home
  `.hx-why-ico`): 46px, 1.5px navy ring on light surfaces, gold ring on navy; they fill solid
  brand on hover. `.ax-panel-ico` is the SME form seal (46px, radius 13px, gold tint).
- **Ghost numerals are flat** (`.ax-card-no`, home `.hx-svc-no`): 40px / 700, navy at 16%
  (white at 22% on navy), warming to gold on hover. The outlined-stroke version is retired.
- **`.ax-metric` is the SME stat card**: centred navy tile, bold figure, 34px gold rule,
  light label. It is meant for white sections beside copy.
- **`.ax-card.navy`** is the SME pillar card (navy gradient, gold-ring icon, translucent
  numeral, white title) — opt-in; cards inside `.ax-section.navy` stay white.
- Photos, section rhythm and the two frozen reference stylesheets were not touched.

### Oct 2026 — client-structure rebuild ("every card is the SME blue card")

The client supplied the whole site as static HTML (content + section structure). Pages were
rebuilt on that structure in this design system. Rules that came with it:

- **Every card is the SME blue card.** Use `NavyCard` (`app/_components/site/NavyCard.tsx`) →
  `.ax-card.navy.ax-blue` in `aaa-ds.css`: navy gradient, animated conic border track (steel-blue
  ring, two red accents, `@property --ax-spin`), gold-ring icon, ghost numeral, gold rule. The
  description is visible by default (no hover-only text, no flip cards). Grids: `.ax-blue-grid`
  (+`.two` `.four` `.five`). Card grids sit on white or `.cream` sections. Forms, tables, logo
  plates, callout strips and FAQ accordions stay light.
- Kit: `NavyCard`, `SectionHead`, `Stat` (count-up from a `FACTS` string), `Glyph` (the only
  icon set for new cards) in `app/_components/site/`. `PageHero` takes `imageAlt`, and an optional
  `visual` node for a custom right-hand column instead of the bleeding photo (Oct 23 2026: the
  floating standards manual on `/programs/healthcare/standards`); `CTA` opens
  `http(s)` targets in a new tab.
- Pages render `<div className="axp …">` — `SiteChrome` already provides the single `<main>`.
- **Header menu = the client's "Main Navigation Menu" file**: Home · Accreditation Programs ·
  About AAA · Academy & Community · Accredited Directory · Resources (simple dropdown lists).
  Off-site/unconfirmed nav targets live in `EXTERNAL` in `lib/facts.ts`. The single white-row
  layout from that file was replaced on Oct 17 2026 — see "Website corrections" below.
- **Hero v2** (`PageHero` → `.ax-hero.v2` in `aaa-ds.css`; Mobbin refs: Okta, Legora, PayPal
  leadership, Deel): the photo bleeds to the right edge as a tall panel with a curved
  bottom-left corner + gold arc and a glass caption (hidden <640px); copy on deep navy over a
  slow pre-blurred aura; gold-line kicker; h1 `clamp(40px, 4.7vw, 70px)`, auto-stepping down for
  long titles (`data-size` lg/xl); glass stat row with count-up (`Stat countOnLoad`). Motion is
  CSS-only: copy blocks rise via `.axh-in` + `--d` stagger, photo clip-path wipe (starts 34%
  open, 0.75s — the photo is the LCP) then settle + slow breathe. Home and About Accreditation
  reuse the same keyframes; TEPA keeps its GSAP hero; SME is untouched.
- ISO/IEC 17025 is split into `/programs/testing-laboratories` and
  `/programs/calibration-laboratories` (`/programs/iso-17025` redirects to Testing). The eight
  scheme pages render through `app/programs/_scheme/SchemePage.tsx` from typed data.
- `breadcrumbSchema()` always prepends Home — don't pass it.

Rules:
- New page-specific CSS goes in a **page-local file** (e.g. `app/foo/foo.css`), with every rule
  scoped under a page-only class, imported by that page. Never grow `app/globals.css`.
- Shared shells `PageHero`, `PageBody`, `CTA`, `ProgramPage` already render `.ax-*`; prefer
  them over bespoke markup.
- Known quirk: `globals.css` carries `h2 { font-size: clamp(24px,2.7vw,36px) !important }`.
  Every `h2` on the site renders at that compact scale regardless of what a component
  stylesheet declares — that is the approved look, inherited from the reference pages.
  The one approved exception is the home Success Stories title (`.homex .hx-ss-head .ax-head
  h2`, Oct 17 2026), which the client asked to make larger.

### Oct 17 2026 — "Website corrections" + "success stories home page" documents

- **Header follows the live aaa-accreditation.org layout** ("place of logo and layout similar
  to the current website"): navy utility bar → the official logo centred on a plain white band
  (the client removed the skyline photo behind it, Oct 17) with search + gold "Apply for
  Accreditation" at the band's right → full-width navy menu bar with the items centred.
  `AAA-Logo.png` has white lettering, so it stays on dark surfaces (navy sticky bar, footer);
  the white band uses `AAA-Logo-navy.png`, the same file with only the wordmark recoloured to
  brand navy (seal and red initials untouched). `.sh2*` rules in `aaa-ds.css`; `--header-h` is 220px (34 + 134 + 52), 106px
  at 1025–1100px where the menu folds into the burger.
  **Oct 22 2026 update (client, live review):** above 1024px the logo band is transparent so
  the hero photo runs up behind the logo (utility and menu bars translucent), carrying the
  white-lettered `AAA-Logo.png`; the logo is 108px tall (was 80px) in a 134px band (was 110px).
  At ≤1024px the header stops overlaying the hero and the band is white with `AAA-Logo-navy.png`
  — `Brand` renders both and CSS (`.sh2-logo-light` / `.sh2-logo-navy`) picks one. The frozen SME page's hero padding is
  re-keyed to `--header-h` from `aaa-ds.css` (`.smex-hero.lpx-hero--nav .lpx-hero-inner`).
- **59 countries** (was 58) — client figure; every page reads it from `FACTS`. The world map
  (`ACCREDITED` in `WorldMapInteractive.tsx`; since Nov 2026 the map is client-only and loads when it scrolls near the viewport — `WorldMapFigure` in `WorldMap.tsx`) is the client's list: 55 distinct map countries (the list has
  duplicate UAE and Georgia rows, skips #49, and Scotland is drawn as the UK). Bahrain and
  Malta are marker-only points added in `scripts/generate-world-map.mjs`; Somaliland is merged
  into Somalia.
- **`/quote` is retired.** Every "Request a Quote" CTA uses `CONTACT.quoteHref`
  (`/contact?topic=quote#enquiry`, pre-selects "Quote request" in `ContactForm`); "Talk to an
  expert" / "Request information" CTAs use `CONTACT.formHref` (`/contact#enquiry`). `/quote`
  redirects there; the old site's `/get-a-quote/` is a real page (Nov 2026) showing the contact
  form with "Quote request" preselected.
- **Footer**: the client's new blurb, and only the four main programs (TEPA, Healthcare, CABs,
  SMEs).
- **Home**: "Why Organizations Trust AAA" cards are compact stacked rows beside the map; the
  Success Stories carousel holds the client's 12 organizations (logo plate on every card;
  video stories show the YouTube thumbnail and link to the video), with no hint text or pause
  button (hover/focus still pauses; reduced motion still gets a scroller). The SME page's story
  marquee still reads `CASE_STUDIES` and was not changed. *(Superseded Oct 27 2026: both the
  home carousel and the SME marquee now read the CaseStudy table — see "Admin Portal".)*

## Facts, SEO and GEO

- **Never hardcode a company statistic.** `lib/facts.ts` is the single source of truth
  (`FACTS`, `CONTACT`, `PROGRAMS`, `CAB_SCHEMES`, `SOCIAL`). The site previously published
  nine different values for "countries served"; the canonical figure is **59** (raised from 58
  by the client in Oct 2026).
- **Consultation bookings** (Nov 2026, client): never hardcode a Calendly URL. `ADVISORS` / `CONSULT`
  in `lib/facts.ts` map each area to its advisor — Adam (TEPA, general, CAB), Sara (Healthcare),
  Babita (SMEs, Memberships); /contact lists all three. Apply buttons link `applyHref(program)` so
  /apply pre-selects the program. Every WhatsApp number shows `WhatsAppIcon` (currentColor).
- **Floating contact widget** (Nov 17 2026, client): `FloatingContact.tsx` (+ `floating-contact.css`,
  scoped `.fcx`), rendered by `SiteChrome` on every page except `/admin` and `/lp/`. A WhatsApp-green
  circle (`CONTACT.whatsappHref`, white rim for the navy footer, pulse rings) under a white "Free
  Consultation Call" card whose blue "Schedule Now" books `CONSULT` for the current section. The card
  shows after 1.6 s (on phones, after scrolling past the first screen) and stays closed for the visit
  once dismissed. The button is WhatsApp green (client, Nov 17 2026); the card stays navy + white. `z-index: 48`, under the header, menus and dialogs.
- The ISO/IEC 17021-1 program is named **"Management Systems Certification Bodies
  Accreditation"** (renamed Aug 2026 from "System Certification Bodies"). Use
  `PROGRAMS.iso17021.label`.
- Every page exports `generateMetadata()` returning `seoPage({...})` from
  `lib/seo-overrides.ts` (same argument as `pageMeta()` in `lib/seo.ts`, plus the admin's
  per-URL SeoEntry override on top). Pages that build their own Metadata object wrap it in
  `withSeoOverride(path, metadata)`. It produces the canonical URL, OpenGraph (with the
  generated `/opengraph-image` card when a page has no artwork) and Twitter card together.
  Titles ≤ 60 chars, descriptions 120–160.
- Every page emits JSON-LD via `<JsonLd>`: `breadcrumbSchema` always, plus `faqSchema` /
  `serviceSchema` / `articleSchema` where they apply. `organizationSchema` and
  `websiteSchema` are emitted once, in `app/layout.tsx`.
- **Public URLs = the old WordPress URLs (Nov 17 2026, client: "real links, not redirects").**
  Every page that existed on aaa-accreditation.org answers at its exact old address, trailing
  slash included. Route folders keep their names; `app/_data/public-urls.json` maps each route to
  its public address (`pages`) and lists other old addresses that show the same page (`aliases`,
  canonical = the page's address). `next.config.ts` rewrites public → route and redirects route →
  public, so every page has one URL. Rules:
  - Write internal links as **route paths** (`/about`, `/news/<slug>`, `/programs/healthcare`)
    through `Link` from `@/app/_components/SiteLink` (never `next/link` on public pages) — it renders
    `publicPath()` (`lib/public-urls.ts`). Raw `<a>` / absolute URLs: wrap in `publicPath()`.
  - `pageMeta`/`seoPage`, `breadcrumbSchema`, `serviceSchema`, `articleSchema` and the sitemap
    map paths themselves — keep passing route paths.
  - Posts are served at the root, `/<slug>/`, by `app/[slug]` (CMS page first, then post —
    `app/news/PostPage.tsx`); categories `/category/<slug>/[page/<n>/]`, tags
    `/tag/<slug>/[page/<n>/]`, news pages `/news/page/<n>/` (rewrites to `app/news/...`).
  - Accredited-organization profiles are real pages at `/custom-box/<slug>/`
    (`app/custom-box/[slug]`, `lib/org-profiles.ts`, old slugs in `app/_data/legacy-custom-box.json`).
  - Pathname checks must accept both forms (the server may see the route, the browser the public
    address): use `routeOf(pathname)`.
  - `trailingSlash: true` with `skipTrailingSlashRedirect`; `proxy.ts` adds the slash for pages
    only (not `/api`, `/admin`).
  - Redirects remain only for URLs the old site itself redirected (index.php, dated permalinks,
    `?p=`/`?page_id=` shortlinks, `/<page>/2/`…), test pages and typos (`LEGACY_REDIRECTS` /
    `LEGACY_PATTERNS`); spam slugs return 410 in `proxy.ts`. A new page that replaces an old URL
    goes in `public-urls.json`, not in the redirects.
  - The old site's post tags were imported (migration `20261117120000_wp_post_tags`), so the 99
    `/tag/<slug>/` pages are real. New old-site posts: `node scripts/sync-news-posts.mjs`, then
    on the server `docker compose -f docker-compose.prod.yml run --rm app seed --only=news`.
  - The audit data (old sitemaps, REST API, Wayback) and probe scripts are not in the repo; the
    9 extra legacy documents are listed in `deploy/wp-uploads-extra.txt`.

## Admin Portal (`/admin`) — Oct 27 2026

The CMS ("Content Studio", July 2026) was expanded into the **AAA Admin Portal**. Postgres via
Prisma 6 (not 7), NextAuth v5 credentials. Deployment: the **Contabo server** 94.72.110.40
(Docker stack — `Dockerfile`, `docker-compose.prod.yml`, `deploy/`; `sh deploy/preview-deploy.sh`,
see `docs/DEPLOYMENT.md` "Preview server"). Vercel and Neon are retired (Nov 10 2026). The site
stays on Contabo, including for go-live (confirmed Nov 17 2026). The Hetzner box 2.28.26.33 hosts
only the TEPA landing pages (campaigns.aaa-accreditation.org) and has never run this site.

- **Areas** (`app/admin/(panel)/…`): Dashboard · Leads & Applications (`leads/`, CSV export,
  timeline, assignment, bulk status) · News & Blog · Case Studies · Pages · Media Library ·
  Accredited Register (`directory/`) · SEO Center (`seo/` audit crawler, `seo/pages`
  metadata editor, `seo/redirects`) · Team & Access (`users/`) · Activity Log · My account.
- **Roles** (`lib/admin.ts`): ADMIN everything; EDITOR everything except users; SALES
  dashboard + leads. Every admin page and server action starts with `requireArea(area)`
  (re-reads role/active from the DB — JWT sessions); route handlers use `getStaffSession()`.
  Every write calls `audit()`. Admin pages are `force-dynamic`.
- **Public content from the DB, with bundled fallbacks**: news (`lib/content.ts` ↔
  `app/news/posts-data.json`), case studies (`lib/case-studies.ts` ↔ `app/_data/home-stories.ts`
  + `case-studies.ts`), register (`lib/directory.ts` ↔ `accredited-organizations.json`), SEO
  overrides and managed redirects. Getters fall back to the bundled snapshot only when the DB
  throws (and skip the DB for 60s after a failure), so builds without `DATABASE_URL` still
  work. Public pages stay static/ISR; admin saves `revalidatePath()` the routes they feed
  (SEO saves use `updateTag("seo")`). Once the DB is live, edit content in the admin — the
  snapshot files are only the seed (`prisma/seed.mjs`) and the fallback.
- **Case studies** (Nov 6 2026, client): the 23 case studies of the retired
  casestudies.aaa-accreditation.org app were imported (`scripts/import-case-studies.mjs` →
  `app/_data/case-study-articles.json`, images in `public/images/site/case-studies/{slug}/`) and
  are public at `/case-studies` and `/case-studies/{slug}` (old slugs kept, so the old domain can
  redirect path-for-path). A CaseStudy row with a non-empty `body` is an article; rows without one
  are cards. Program-page cards (TEPA, Healthcare, CAB) are rows ticked under "Program pages"
  (`CaseStudy.pages`, keys in `app/_data/page-case-studies.ts`), each linking to its case study;
  `getPageCaseStudies(page)` feeds the page. Links to the old domain are rewritten by
  `caseStudyHref()`. The admin editor can hold tables; a YouTube link alone in a paragraph renders
  as a player.
- **Register "Accredited as" types** (Nov 6 2026, client): the public filter offers every type
  in `REGISTER_TYPES` (`app/_data/accredited-organizations.ts`) in a sideways-scrolling chip row.
  An organization is listed under every type its records name (`accreditationType()`) plus any
  `Organization.tags` ticked on the admin form — `orgTypes()` is the single rule.
- **Categories & Tags** (Nov 16 2026, client): Admin → Categories & Tags (`app/admin/(panel)/taxonomy/`)
  manages the `Term` table: blog categories, blog tags and register tags. Posts keep `category`/`tags`
  as names and organizations keep tag slugs; renaming or deleting a term rewrites them (`lib/taxonomy.ts`).
  Each category belongs to a Resources section: **News & Announcements** (`/news`) or **Articles**
  (`/articles`); category and tag pages are `/news/category/{slug}` and `/news/tag/{slug}`, all from
  `app/news/Archive.tsx` + `scope.ts`. New categories/tags can also be typed in the article and
  organization editors. Custom register tags appear after the built-in `REGISTER_TYPES` chips.
- **Case study page builder** (Nov 16 2026, client): `CaseStudy.layout` (JSON, `lib/case-study-layout.ts`)
  holds sections of 1–3 columns with text / image / YouTube video / quote blocks, arranged by drag and
  drop (plus arrow buttons) in `CaseStudyBuilder.tsx`. `body` is regenerated from the layout on save so
  "non-empty body = article" still holds; an untouched case study is saved without regenerating it.
  Rows without a layout render `body` as before.
- **Leads**: all site forms post to `/api/leads`; the lead is saved first and the notification email is
  best-effort (Nov 2026 — SMTP is off on the preview server, and the email used to be required); it derives `kind` (CONTACT / APPLICATION /
  QUOTE / ADVISOR / MEMBERSHIP) from `source` via `lib/leads.ts`. Add a new form by picking a
  `source` that `leadKindFromSource()` classifies.
- **Uploads** go to the Media table (bytea) and are served from `/media/<id>/<name>` — works
  on Vercel's read-only filesystem and travels with a `pg_dump`. 4 MB cap.
- **Redirects**: coded ones in `next.config.ts` run first; admin-managed ones are applied in
  `proxy.ts` (60s in-memory cache, `lib/redirect-map.ts`). Changing a published article/page
  slug creates a redirect automatically (`recordSlugChange`).
- **Admin CSS**: legacy `adm-*` rules live in `globals.css` (don't add to them); new shared
  admin primitives are in `app/admin/admin.css` (scoped `.adm`); module CSS is page-local.
  Inside the admin use `h3` for section titles — the global `h2 !important` rule applies.

## Tech Stack Conventions
- Next.js (App Router) — keep components in `app/_components/` when shared.
- Motion (added Sept 10 2026): `gsap` + `@gsap/react` for scroll choreography (ScrollTrigger
  reveals, parallax, counters, loops) and `framer-motion` for component-level interaction
  (accordions, magnetic buttons, springy entrances). First used on
  `app/programs/training-education/` — see `TepaMotion.tsx` for the pattern: hidden resting
  states live in page CSS on `[data-reveal]`, GSAP only ever animates *to* the visible state,
  and `prefers-reduced-motion` restores everything in CSS with no JS. Animate `y`, not
  `yPercent`, when the hidden state is a CSS percentage transform (GSAP reads it as px).
- Tailwind CSS — extend the theme to expose `brand` color and Poppins font; do not hardcode `#173d73` in components, use `bg-brand` / `text-brand` (or the `--aaa-*` CSS tokens in globals.css) instead.
- Global styles live in `app/globals.css`.

---

**Rule of thumb**: if a design choice deviates from this document, update the document first (with reasoning), then implement. Brand consistency is non-negotiable.

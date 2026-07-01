# AAA Brand Guidelines

These are the official brand guidelines for AAA. Follow them strictly for all UI work, components, styles, and assets in this project.

## Colors

### Primary
- **Brand Blue**: `#024985`
  - Use for: primary buttons, links, headings, navigation accents, key brand elements, focus states.
  - Tailwind utility: configure as `brand` (e.g., `bg-brand`, `text-brand`, `border-brand`).

### Color Usage Rules
- The primary color `#024985` MUST be used as the dominant brand color across the site.
- Do NOT introduce new accent colors without updating these guidelines first.
- Maintain WCAG AA contrast minimums:
  - White (`#FFFFFF`) text on `#024985` is approved (high contrast).
  - Do not place `#024985` text on dark backgrounds — use white instead.

### Functional (semantic) colors — not brand accents
- Danger/error: `#B3261E` (text/icons) on `#FDF0EF` (surface), border `#F2C6C2`. Reserved for destructive actions and validation errors (admin CMS, form errors). Never used decoratively. (Added July 2026 with the admin CMS.)

### Suggested Supporting Palette (derived from `#024985`)
- Map marker red: `#D6334D` — reserved exclusively for the animated location markers on the "Countries We Operate" world map (carried over from the legacy site map at the client's request, June 2026). Do not use it anywhere else.
- Map deep navy: `#0E2A47` — world-map fill for countries without AAA accreditation (accredited countries use brand `#024985`).
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
- Primary: `background: #024985`, `color: #FFFFFF`, `font-weight: 600`, `border-radius: 6–8px`, hover darkens by ~8–10%.
- Secondary: `background: transparent`, `color: #024985`, `border: 1px solid #024985`, hover fills with `#024985` and white text.
- Disabled: 50% opacity, no hover state.

### Links
- Color: `#024985`.
- Hover: underline + slight darken.

### Forms
- Inputs use neutral borders (`#E2E8F0`); focus state uses `#024985` border + ring.
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
- [ ] Primary CTAs use `#024985`.
- [ ] No off-brand accent colors introduced.
- [ ] Headings follow the type scale above.
- [ ] Sufficient contrast (WCAG AA) for all text.
- [ ] Spacing uses the 4/8px scale.

## Tech Stack Conventions
- Next.js (App Router) — keep components in `app/_components/` when shared.
- Tailwind CSS — extend the theme to expose `brand` color and Poppins font; do not hardcode `#024985` in components, use `bg-brand` / `text-brand` instead.
- Global styles live in `app/globals.css`.

---

**Rule of thumb**: if a design choice deviates from this document, update the document first (with reasoning), then implement. Brand consistency is non-negotiable.

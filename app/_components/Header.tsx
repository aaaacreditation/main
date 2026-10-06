"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import { EXTERNAL, PROGRAMS as P } from "../../lib/facts";

/*
 * Oct 2026: rebuilt on the client's "Main Navigation Menu" file — a thin navy
 * utility bar (Contact Us · Login / Client Portal) over ONE white row holding
 * the logo, the six-item menu with simple dropdowns, search and the gold
 * "Apply for Accreditation" button. Replaces the three-tier BizGen header
 * (utility strip → logo/contact row → dark nav bar). `--header-h` in
 * aaa-ds.css is the height heroes pad against; keep it in step with this.
 */
type NavItem = { href: string; label: string; external?: boolean };

const GROUPS: { label: string; href: string; items: NavItem[] }[] = [
  {
    label: "Accreditation Programs",
    href: "/programs",
    items: [
      { href: P.training.href, label: "Training & Education Providers" },
      { href: P.healthcare.href, label: "Healthcare Organizations" },
      { href: P.cab.href, label: "Conformity Assessment Bodies" },
      { href: P.sme.href, label: "SMEs Accreditation" },
    ],
  },
  {
    label: "About AAA",
    href: "/about",
    items: [
      { href: "/about", label: "About AAA" },
      { href: "/governance-leadership", label: "Governance & Leadership" },
      { href: "/partnerships", label: "Recognition & Partnerships" },
      { href: "/about-accreditation", label: "About Accreditation" },
      { href: "/impartiality-policy", label: "Impartiality & Independence" },
    ],
  },
  {
    label: "Academy & Community",
    href: "/membership",
    items: [
      { href: EXTERNAL.academy, label: "AAA Academy" },
      { href: "/membership/organizational", label: "Organizational Membership" },
      { href: "/membership/individual", label: "Individual Membership" },
    ],
  },
  {
    label: "Accredited Directory",
    href: "/directory",
    items: [
      { href: "/directory/accredited-organizations", label: "Accredited Organizations" },
      { href: EXTERNAL.accreditedPersonnel, label: "Accredited Personnel", external: true },
      { href: "/directory", label: "Verification Portal" },
    ],
  },
  {
    label: "Resources",
    href: "/news",
    items: [
      { href: EXTERNAL.successStories, label: "Success Stories", external: true },
      { href: "/news", label: "Articles" },
      { href: "/news", label: "News & Announcements" },
    ],
  },
];

function NavA({ item }: { item: NavItem }) {
  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer">
      {item.label}
    </a>
  ) : (
    <Link href={item.href}>{item.label}</Link>
  );
}

function NavLinks() {
  const pathname = usePathname();
  // Dropdowns open on hover/focus (CSS). After a click the pointer is still
  // over the item and the link keeps focus, so the panel would stay open on
  // the new page: mark the item closed until the pointer leaves it.
  const [closed, setClosed] = useState<string | null>(null);

  const close = (label: string) => {
    setClosed(label);
    (document.activeElement as HTMLElement | null)?.blur();
  };

  // Any route change (link, back/forward) closes whatever is open.
  useEffect(() => {
    (document.activeElement as HTMLElement | null)?.blur();
  }, [pathname]);

  return (
    <nav
      className="nav"
      aria-label="Main navigation"
      onKeyDown={(e) => {
        if (e.key !== "Escape") return;
        const item = (e.target as HTMLElement).closest<HTMLElement>(".nav-item");
        if (item?.dataset.label) close(item.dataset.label);
      }}
    >
      <Link href="/">Home</Link>
      {GROUPS.map((g) => (
        <span
          className={"nav-item" + (closed === g.label ? " nav-closed" : "")}
          key={g.label}
          data-label={g.label}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) close(g.label);
          }}
          onMouseLeave={() => closed === g.label && setClosed(null)}
        >
          <Link href={g.href} className="has-caret" aria-haspopup="true">{g.label}</Link>
          <span className="nav-dropdown">
            {g.items.map((i) => (
              <NavA key={i.label} item={i} />
            ))}
          </span>
        </span>
      ))}
    </nav>
  );
}

/* Seal + three-line wordmark, as in the client's menu file. The full-colour
   logo PNG has white lettering made for dark surfaces (it stays in the dark
   footer); on this white row the words are set in navy with the logo's red
   initials. */
function Brand({ size = 56, tabbable = true }: { size?: number; tabbable?: boolean }) {
  return (
    <Link href="/" className="brand sh2-brand" aria-label="American Accreditation Association — home" tabIndex={tabbable ? 0 : -1}>
      <Image src="/logo/aaalog.png" alt="" width={size} height={Math.round((size * 671) / 710)} priority className="sh2-seal" />
      <span className="sh2-wordmark" aria-hidden="true">
        <span><b>A</b>merican</span>
        <span><b>A</b>ccreditation</span>
        <span><b>A</b>ssociation</span>
      </span>
    </Link>
  );
}

function MenuToggle({ open, onToggle, tabbable = true }: { open: boolean; onToggle: () => void; tabbable?: boolean }) {
  return (
    <button
      className={"menu-toggle" + (open ? " open" : "")}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onToggle}
      tabIndex={tabbable ? 0 : -1}
    >
      <span className="bars" />
    </button>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 160);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => setMenuOpen((o) => !o);

  return (
    <>
      <header className="site-header sh2">
        <div className="utility-bar">
          <div className="container sh2-utility">
            <Link href="/contact">Contact Us</Link>
            <Link href={EXTERNAL.clientPortal}>Login / Client Portal</Link>
          </div>
        </div>

        <div className="sh2-main">
          <div className="container sh2-row">
            <Brand />
            <NavLinks />
            <div className="sh2-actions">
              <button className="sh2-search" aria-label="Search">
                <Icon name="search" size={18} />
              </button>
              <Link href="/apply" className="sh2-apply">
                Apply for Accreditation
              </Link>
            </div>
            <MenuToggle open={menuOpen} onToggle={toggle} />
          </div>
        </div>
      </header>

      {/* Same single row, pinned once the page scrolls past the header */}
      <div className={"header-compact sh2-compact" + (scrolled ? " show" : "")} aria-hidden={!scrolled}>
        <div className="container sh2-row">
          <Brand size={46} tabbable={scrolled} />
          <NavLinks />
          <div className="sh2-actions">
            <Link href="/apply" className="sh2-apply" tabIndex={scrolled ? 0 : -1}>
              Apply for Accreditation
            </Link>
          </div>
          <MenuToggle open={menuOpen} onToggle={toggle} tabbable={scrolled} />
        </div>
      </div>

      <div
        className={"mobile-menu" + (menuOpen ? " open" : "")}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setMenuOpen(false);
        }}
      >
        <div className="mm-links">
          <Link href="/">Home</Link>
        </div>
        {GROUPS.map((g) => (
          <details className="mm-group" key={g.label}>
            <summary>{g.label}</summary>
            {g.items.map((i) => (
              <NavA key={i.label} item={i} />
            ))}
          </details>
        ))}
        <div className="mm-links">
          <Link href="/contact">Contact Us</Link>
          <Link href={EXTERNAL.clientPortal}>Login / Client Portal</Link>
        </div>
        <div className="mm-ctas">
          <Link href="/apply" className="btn btn-primary sh2-apply">
            Apply for Accreditation
          </Link>
        </div>
      </div>
    </>
  );
}

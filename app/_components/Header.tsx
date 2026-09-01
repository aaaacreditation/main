"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { CAB_SCHEMES, CONTACT, PROGRAMS as P, SOCIAL } from "../../lib/facts";

/*
 * Aug 2026: nav labels now come from lib/facts.ts so the ISO/IEC 17021-1
 * program carries its renamed title ("Management Systems Certification Bodies
 * Accreditation") everywhere at once. The mega-menu also gained a second
 * column listing the eight conformity-assessment schemes — the live site only
 * links to those from the footer, which left the scheme pages with almost no
 * internal links pointing at them.
 */
const PROGRAMS = [
  { href: P.healthcare.href, label: P.healthcare.label, std: P.healthcare.standard },
  { href: P.cab.href, label: P.cab.label, std: P.cab.standard },
  { href: P.training.href, label: P.training.label, std: P.training.standard },
  { href: P.sme.href, label: P.sme.label, std: P.sme.standard },
  { href: P.school.href, label: P.school.label, std: P.school.standard },
];

const ABOUT = [
  { href: "/about", label: "About AAA" },
  { href: "/about-accreditation", label: "About Accreditation" },
  { href: "/news", label: "AAA News" },
  { href: "/advisory-committees", label: "Advisory Technical Committees" },
  { href: "/impartiality-policy", label: "Safeguarding Impartiality Policy" },
  { href: "/partnerships", label: "National & International Partnership" },
  { href: "/faq", label: "FAQ" },
];

const MEMBERSHIP = [
  { href: "/membership", label: "Membership Overview" },
  { href: "/membership/individual", label: "Individual Membership" },
  { href: "/membership/organizational", label: "Organizational Membership" },
];

function NavLinks() {
  return (
    <nav className="nav">
      <span className="nav-item">
        <Link href="/about" className="has-caret">About</Link>
        <span className="nav-dropdown">
          {ABOUT.map((i) => (
            <Link key={i.href} href={i.href}>{i.label}</Link>
          ))}
        </span>
      </span>
      <span className="nav-item">
        <Link href="/programs/healthcare" className="has-caret">Accreditation Programs</Link>
        <span className="nav-dropdown mega">
          <span className="mega-col">
            <span className="mega-head">Programs</span>
            {PROGRAMS.map((i) => (
              <Link key={i.href} href={i.href}>
                <span className="mega-label">{i.label}</span>
                <span className="mega-std">{i.std}</span>
              </Link>
            ))}
          </span>
          <span className="mega-col">
            <span className="mega-head">Conformity assessment schemes</span>
            {CAB_SCHEMES.map((i) => (
              <Link key={i.href} href={i.href}>
                <span className="mega-label">{i.shortLabel}</span>
                <span className="mega-std">{i.standard}</span>
              </Link>
            ))}
          </span>
        </span>
      </span>
      <span className="nav-item">
        <Link href="/membership" className="has-caret">Membership</Link>
        <span className="nav-dropdown">
          {MEMBERSHIP.map((i) => (
            <Link key={i.href} href={i.href}>{i.label}</Link>
          ))}
        </span>
      </span>
      <Link href="/directory/accredited-organizations">Accredited Organizations</Link>
      <Link href="/news">News</Link>
    </nav>
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
    const onScroll = () => setScrolled(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="site-header">
        {/* Top utility strip */}
        <div className="utility-bar">
          <div className="container">
            <div className="row">
              <div className="utility-left">
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <Icon name="pin" size={12} /> Tysons Corner, Virginia, USA
                </span>
                <span className="dot" />
                <span>International accreditation accepted globally</span>
                <span className="dot" />
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              </div>
              <div className="utility-right">
                <Link href="/apply">Apply</Link>
                <Link href="/about-accreditation">AAA Academy</Link>
                <Link href="/documents">Documents</Link>
                <Link href="/contact">Contact</Link>
                <span className="utility-divider" />
                {SOCIAL.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={`AAA on ${s.name}`}
                    target="_blank"
                    rel="noopener noreferrer me"
                  >
                    <Icon name={s.icon} size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Logo row — logo left, contact blocks and primary CTA right */}
        <div className="header-main">
          <div className="container">
            <Link href="/" className="brand" aria-label="American Accreditation Association — home">
              <Image
                src="/logo/AAA-Logo.png"
                alt="American Accreditation Association"
                width={350}
                height={120}
                priority
                className="brand-logo"
              />
            </Link>

            <div className="header-info">
              <a className="hinfo" href={`mailto:${CONTACT.email}`}>
                <span className="hinfo-ico"><Icon name="mail" size={18} /></span>
                <span className="hinfo-txt">
                  <span className="hinfo-label">Send us a message</span>
                  <strong>{CONTACT.email}</strong>
                </span>
              </a>
              <a className="hinfo" href={CONTACT.phoneHref}>
                <span className="hinfo-ico"><Icon name="phone" size={18} /></span>
                <span className="hinfo-txt">
                  <span className="hinfo-label">Call our team</span>
                  <strong>{CONTACT.phone}</strong>
                </span>
              </a>
              <Link href="/quote" className="btn btn-primary hinfo-cta">
                Get a Quote <Icon name="arrow" size={14} className="arrow" />
              </Link>
            </div>

            <button
              className={"menu-toggle" + (menuOpen ? " open" : "")}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="bars" />
            </button>
          </div>
        </div>

        {/* Primary nav — dark bar that floats over the top of the hero */}
        <div className="header-nav">
          <div className="container">
            <NavLinks />

            <div className="header-actions">
              <button className="search-btn" aria-label="Search"><Icon name="search" size={16} /></button>
              <Link href="/apply" className="nav-apply">
                Apply <Icon name="arrow" size={13} className="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Compact sticky bar — slides in once the tall header scrolls away */}
      <div className={"header-compact" + (scrolled ? " show" : "")} aria-hidden={!scrolled}>
        <div className="container">
          <Link href="/" className="hc-brand" aria-label="American Accreditation Association — home" tabIndex={scrolled ? 0 : -1}>
            <Image
              src="/logo/AAA-Logo.png"
              alt=""
              width={146}
              height={45}
              className="hc-logo"
            />
          </Link>
          <NavLinks />
          <div className="hc-actions">
            <Link href="/quote" className="btn hc-cta" tabIndex={scrolled ? 0 : -1}>
              Get a Quote <Icon name="arrow" size={13} className="arrow" />
            </Link>
            <button
              className={"menu-toggle" + (menuOpen ? " open" : "")}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="bars" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={"mobile-menu" + (menuOpen ? " open" : "")}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setMenuOpen(false);
        }}
      >
        <details className="mm-group" open>
          <summary>Accreditation Programs</summary>
          {PROGRAMS.map((i) => (
            <Link key={i.href} href={i.href}>{i.label}</Link>
          ))}
        </details>
        <details className="mm-group">
          <summary>About</summary>
          {ABOUT.map((i) => (
            <Link key={i.href} href={i.href}>{i.label}</Link>
          ))}
        </details>
        <details className="mm-group">
          <summary>Membership</summary>
          {MEMBERSHIP.map((i) => (
            <Link key={i.href} href={i.href}>{i.label}</Link>
          ))}
        </details>
        <details className="mm-group">
          <summary>Conformity assessment schemes</summary>
          {CAB_SCHEMES.map((i) => (
            <Link key={i.href} href={i.href}>{i.shortLabel}</Link>
          ))}
        </details>
        <div className="mm-links">
          <Link href="/directory/accredited-organizations">Accredited Organizations</Link>
          <Link href="/news">News</Link>
          <Link href="/documents">Documents</Link>
          <Link href="/apply">Apply</Link>
        </div>
        <div className="mm-ctas">
          <Link href="/quote" className="btn btn-primary">
            Get a Quote <Icon name="arrow" size={14} className="arrow" />
          </Link>
          <Link href="/contact" className="btn btn-ghost">Contact</Link>
        </div>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Icon from "./Icon";

const PROGRAMS = [
  { href: "/programs/healthcare", label: "Healthcare Accreditation", std: "ISQua EEA Recognized" },
  { href: "/programs/conformity-assessment-bodies", label: "Conformity Assessment Bodies Accreditation", std: "7 Programs" },
  { href: "/programs/training-education", label: "Training & Education Providers Accreditation", std: "Worldwide" },
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

const DIRECTORY = [
  { href: "/directory/accredited-organizations", label: "Accredited Organizations" },
  { href: "https://adcp.aaa-accreditation.org", label: "Accredited Personnel ↗" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
              </div>
              <div className="utility-right">
                <Link href="/apply">Apply</Link>
                <Link href="/about-accreditation">AAA Academy</Link>
                <Link href="/documents">Documents</Link>
                <Link href="/contact">Contact</Link>
                <span className="utility-divider" />
                <a href="#" aria-label="LinkedIn"><Icon name="linkedin" size={14} /></a>
                <a href="#" aria-label="Twitter"><Icon name="twitter" size={14} /></a>
                <a href="#" aria-label="YouTube"><Icon name="youtube" size={14} /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Centered logo */}
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

        {/* Centered primary nav */}
        <div className="header-nav">
          <div className="container">
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
                  {PROGRAMS.map((i) => (
                    <Link key={i.href} href={i.href}>
                      <span className="mega-label">{i.label}</span>
                      <span className="mega-std">{i.std}</span>
                    </Link>
                  ))}
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
              <span className="nav-item">
                <Link href="/directory/accredited-organizations" className="has-caret">Directory</Link>
                <span className="nav-dropdown">
                  {DIRECTORY.map((i) =>
                    i.href.startsWith("http") ? (
                      <a key={i.href} href={i.href} target="_blank" rel="noreferrer">{i.label}</a>
                    ) : (
                      <Link key={i.href} href={i.href}>{i.label}</Link>
                    )
                  )}
                </span>
              </span>
              <Link href="/news">News</Link>
            </nav>

            <div className="header-actions">
              <button className="search-btn" aria-label="Search"><Icon name="search" size={16} /></button>
              <Link href="/quote" className="btn btn-primary">
                Get a Quote <Icon name="arrow" size={14} className="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </header>

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
          <summary>Directory</summary>
          {DIRECTORY.map((i) =>
            i.href.startsWith("http") ? (
              <a key={i.href} href={i.href} target="_blank" rel="noreferrer">{i.label}</a>
            ) : (
              <Link key={i.href} href={i.href}>{i.label}</Link>
            )
          )}
        </details>
        <div className="mm-links">
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

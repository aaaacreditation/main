"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CONSULT, CONTACT } from "@/lib/facts";
import { routeOf } from "@/lib/public-urls";
import Glyph from "./site/Glyph";
import WhatsAppIcon from "./WhatsAppIcon";
import "./floating-contact.css";

/**
 * Floating contact widget, bottom-right of every public page (client, Nov 17
 * 2026): a sticky WhatsApp button and, above it, a small "Free Consultation
 * Call" card. The card rises in shortly after load (on phones, once the visitor
 * scrolls past the first screen); closing it keeps it closed for the rest of
 * the visit (sessionStorage). The WhatsApp button always stays.
 *
 * "Schedule Now" books the advisor for the section the visitor is in, like
 * every other consultation link on the site (`CONSULT` in lib/facts.ts).
 * The WhatsApp button is WhatsApp green (client, Nov 17 2026); the card is brand navy + white.
 */

const CLOSED_KEY = "aaa-consult-card-closed";
const SHOW_AFTER_MS = 1600;

function consultUrl(pathname: string): string {
  // Route path, whichever address the page was reached at: the server may see
  // the rewritten route and the browser the public (old-site) URL.
  const path = routeOf(pathname);
  if (path.startsWith("/programs/healthcare")) return CONSULT.healthcare;
  if (path.startsWith("/programs/smes-accreditation-program")) return CONSULT.sme;
  if (path.startsWith("/membership")) return CONSULT.membership;
  if (path.startsWith("/programs/training-education")) return CONSULT.training;
  return CONSULT.general;
}

export default function FloatingContact() {
  const pathname = usePathname();
  const [cardOpen, setCardOpen] = useState(false);

  useEffect(() => {
    let closed = false;
    try {
      closed = window.sessionStorage.getItem(CLOSED_KEY) === "1";
    } catch {
      /* storage blocked: show the card */
    }
    if (closed) return;

    // Phones: the card would cover the hero's own buttons, so it waits until
    // the visitor has scrolled past the first screen.
    if (window.matchMedia("(max-width: 640px)").matches) {
      const onScroll = () => {
        if (window.scrollY < window.innerHeight * 0.8) return;
        setCardOpen(true);
        window.removeEventListener("scroll", onScroll);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }

    const t = window.setTimeout(() => setCardOpen(true), SHOW_AFTER_MS);
    return () => window.clearTimeout(t);
  }, []);

  const closeCard = () => {
    setCardOpen(false);
    try {
      window.sessionStorage.setItem(CLOSED_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="fcx">
      <aside
        className="fcx-card"
        data-state={cardOpen ? "open" : "closed"}
        aria-label="Free consultation call"
        aria-hidden={!cardOpen}
        inert={!cardOpen}
      >
        <button type="button" className="fcx-close" onClick={closeCard} aria-label="Close the consultation card">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <div className="fcx-head">
          <span className="fcx-ico">
            <Glyph name="headset" size={20} strokeWidth={1.8} />
          </span>
          <div>
            <p className="fcx-title">Free Consultation Call</p>
            <p className="fcx-text">Book your free consultation call with AAA experts today!</p>
          </div>
        </div>
        <a className="fcx-btn" href={consultUrl(pathname)} target="_blank" rel="noopener noreferrer">
          <Glyph name="calendar" size={16} strokeWidth={2} />
          <span>Schedule Now</span>
          <Glyph name="arrow-right" size={16} strokeWidth={2} className="fcx-btn-arrow" />
        </a>
      </aside>

      <a
        className="fcx-wa"
        href={CONTACT.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with AAA on WhatsApp: ${CONTACT.whatsapp}`}
      >
        <span className="fcx-wa-ring" aria-hidden="true" />
        <span className="fcx-wa-ring two" aria-hidden="true" />
        <WhatsAppIcon size={28} className="fcx-wa-ico" />
        <span className="fcx-wa-tip" aria-hidden="true">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}

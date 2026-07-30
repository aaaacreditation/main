"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Icon from "../../_components/Icon";

/**
 * Holds the readiness check closed until the visitor asks for it, then opens
 * the self-contained app (public/readiness-check) inline in this section.
 *
 * The CTAs higher up the page are <Link href="#readiness"> — the router changes
 * the URL with pushState, which fires no hashchange, so those are caught with a
 * delegated click listener rather than by watching the hash.
 */
export default function ReadinessLauncher() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);

  /*
   * The check is same-origin, so its height can be measured directly and the
   * frame grown to match — the whole form shows at once instead of scrolling
   * inside a fixed box. Measured from the card rather than body.scrollHeight
   * because the app sets html,body{height:100%}, which would just echo back
   * whatever height the frame already has.
   */
  useEffect(() => {
    if (!open) return;
    const frame = frameRef.current;
    if (!frame) return;

    let ro: ResizeObserver | undefined;
    let mo: MutationObserver | undefined;

    const fit = () => {
      const doc = frame.contentDocument;
      const card = doc?.querySelector(".card") as HTMLElement | null;
      if (!doc || !card) return;
      const body = doc.defaultView?.getComputedStyle(doc.body);
      const pad =
        (parseFloat(body?.paddingTop || "0") || 0) +
        (parseFloat(body?.paddingBottom || "0") || 0);
      frame.style.height = `${Math.ceil(card.getBoundingClientRect().height + pad)}px`;
    };

    const onLoad = () => {
      fit();
      const doc = frame.contentDocument;
      if (!doc) return;
      ro = new ResizeObserver(fit);
      ro.observe(doc.body);
      // the app swaps whole screens in, which a size observer alone can miss
      mo = new MutationObserver(fit);
      mo.observe(doc.body, { childList: true, subtree: true });
    };

    frame.addEventListener("load", onLoad);
    if (frame.contentDocument?.readyState === "complete") onLoad();
    window.addEventListener("resize", fit);

    return () => {
      frame.removeEventListener("load", onLoad);
      window.removeEventListener("resize", fit);
      ro?.disconnect();
      mo?.disconnect();
    };
  }, [open]);

  // Only ever opens on a click — never on load, even if the URL still carries
  // #readiness from an earlier visit.
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a[href*="#readiness"]');
      if (link) setOpen(true);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Delayed so this settles after the router's own hash scrolling.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="smex-btn smex-btn-blue"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="smex-rc-panel"
      >
        Start Business Readiness Check <Icon name="arrow" size={16} />
      </button>

      <figure className="smex-strip-preview">
        <Image
          src="/sme-readiness-preview.png"
          alt="Sample result: an overall readiness score of 79% and a six-area profile chart"
          width={1536}
          height={1024}
          sizes="(max-width: 860px) 60vw, 300px"
        />
      </figure>

      {open && (
        <div className="smex-rc-panel" id="smex-rc-panel" ref={panelRef}>
          <iframe
            ref={frameRef}
            src="/readiness-check"
            title="AAA SMEs business readiness check"
            scrolling="no"
          />
        </div>
      )}
    </>
  );
}

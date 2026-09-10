"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll choreography for the TEPA page. Wraps the page root so every
 * selector is scoped to it, and reverts everything on unmount.
 *
 * Initial (hidden) states live in tep.css on `[data-reveal]`, `.tepx-word`
 * and `.tepx-steps-line`, so nothing flashes before hydration; this file only
 * ever animates *to* the resting state. Readers who prefer reduced motion get
 * the CSS reset and no animation at all.
 */
export default function TepaMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(scope);
        const inHero = (el: Element) => Boolean(el.closest(".tepx-hero"));
        const ease = "power3.out";

        /* ---------------------------------------------------- Hero intro */
        const heroWords = q(".tepx-hero h1 .tepx-word > span");
        const heroBits = q(".tepx-hero [data-reveal]");
        gsap
          .timeline({ defaults: { ease } })
          .to(q(".tepx-hero .ax-crumbs, .tepx-hero-kicker"), { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 })
          .to(heroWords, { y: 0, duration: 0.9, stagger: 0.06 }, "-=0.3")
          .to(q(".tepx-ul"), { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, "-=0.45")
          .to(heroBits, { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.09 }, "-=0.55");

        // Wave bands roll slowly across the foot of the hero, each at its own
        // pace, with a soft vertical breathe so they never look mechanical.
        [
          { sel: ".tepx-wave.w1", period: 1440, drift: 34, bob: 9 },
          { sel: ".tepx-wave.w2", period: 720, drift: 22, bob: 7 },
          { sel: ".tepx-wave.w3", period: 960, drift: 28, bob: 11 },
        ].forEach(({ sel, period, drift, bob }, i) => {
          const g = q(sel);
          gsap.to(g, { x: -period, duration: drift, ease: "none", repeat: -1 });
          gsap.to(g, { y: bob, duration: 5 + i * 1.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
        });
        gsap.to(q(".tepx-hero-glow"), {
          xPercent: 14,
          yPercent: -10,
          scale: 1.15,
          duration: 14,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // The backdrop drifts slower than the page — a quiet parallax.
        gsap.to(q(".tepx-hero-bg"), {
          yPercent: 16,
          ease: "none",
          scrollTrigger: { trigger: q(".tepx-hero")[0], start: "top top", end: "bottom top", scrub: true },
        });

        /* ------------------------------------------- Section headings */
        q(".ax-head, .ax-close-inner").forEach((head) => {
          if (inHero(head)) return;
          const words = head.querySelectorAll<HTMLElement>(".tepx-word > span");
          const rest = head.querySelectorAll<HTMLElement>("[data-reveal]");
          const tl = gsap.timeline({
            defaults: { ease },
            scrollTrigger: { trigger: head, start: "top 84%", once: true },
          });
          const kicker = head.querySelector(".eyebrow");
          if (kicker) tl.to(kicker, { opacity: 1, y: 0, duration: 0.5 });
          if (words.length) tl.to(words, { y: 0, duration: 0.8, stagger: 0.045 }, "-=0.25");
          if (rest.length) tl.to(rest, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.45");
        });

        /* ------------------------------------------- Generic reveals */
        const generic = q("[data-reveal]").filter(
          (el) =>
            !inHero(el) &&
            !el.closest(".ax-head, .ax-close-inner, .tepx-steps") &&
            !["pop", "line", "row"].includes(el.getAttribute("data-reveal") || "")
        );
        ScrollTrigger.batch(generic, {
          start: "top 88%",
          once: true,
          onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease, overwrite: true }),
        });

        /* ------------------------------------------- Proof photos */
        q(".tepx-proof-media > img, .tepx-video > img").forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });

        /* ------------------------------------------- Counting figures */
        q<HTMLElement>("[data-count]").forEach((el) => {
          const end = parseFloat(el.dataset.count || "0");
          const decimals = Number(el.dataset.decimals || 0);
          const prefix = el.dataset.prefix || "";
          const suffix = el.dataset.suffix || "";
          const n = { v: 0 };
          gsap.to(n, {
            v: end,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = prefix + n.v.toFixed(decimals) + suffix;
            },
          });
        });

        /* ------------------------------------------- Process track */
        const steps = q(".tepx-steps")[0];
        if (steps) {
          gsap
            .timeline({ defaults: { ease }, scrollTrigger: { trigger: steps, start: "top 80%", once: true } })
            .to(q(".tepx-steps-line"), { scaleX: 1, duration: 1.4, ease: "power2.inOut" })
            .to(q('.tepx-step [data-reveal="pop"]'), { opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: "back.out(1.8)" }, "<0.1")
            .to(q(".tepx-step-no, .tepx-step-card"), { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 }, "-=0.8");
        }

        /* ------------------------------------------- ADCP hub rows */
        const hub = q(".tepx-hub")[0];
        if (hub) {
          gsap.to(q('[data-reveal="row"]'), {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.12,
            ease,
            scrollTrigger: { trigger: hub, start: "top 85%", once: true },
          });
        }

        /* ------------------------------------------- Watermarks drift */
        q(".tepx-wm-text").forEach((w) => {
          gsap.fromTo(
            w,
            { xPercent: 6 },
            {
              xPercent: -6,
              ease: "none",
              scrollTrigger: { trigger: w.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });
      });
    },
    { scope }
  );

  return (
    <div ref={scope} className="axp tepx">
      {children}
    </div>
  );
}

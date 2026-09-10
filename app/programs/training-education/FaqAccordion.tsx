"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Two-column FAQ with animated open/close. Uses the shared `.ax-faq-*`
 * look, but a button + measured height instead of <details> so the answer
 * unfolds rather than snapping.
 */
export default function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="ax-faq-list">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div className={"ax-faq-item tepx-faq" + (isOpen ? " open" : "")} key={it.q}>
            <button
              type="button"
              className="tepx-faq-q"
              id={`tepa-faq-btn-${i}`}
              aria-expanded={isOpen}
              aria-controls={`tepa-faq-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{it.q}</span>
              <motion.span
                className="ax-faq-plus"
                aria-hidden="true"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  id={`tepa-faq-${i}`}
                  role="region"
                  aria-labelledby={`tepa-faq-btn-${i}`}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ height: { duration: 0.38, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.25 } }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="ax-faq-a">
                    <p>{it.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

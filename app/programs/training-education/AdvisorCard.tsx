"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The advisor enquiry card — third column of the hero (client's final TEPA
 * order, Oct 2026: "Hero + enquiry form"). It rises in on a soft spring the
 * first time it comes into view.
 */
export default function AdvisorCard({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="tepx-advisor"
      id="consultation"
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.9 }}
    >
      {children}
    </motion.div>
  );
}

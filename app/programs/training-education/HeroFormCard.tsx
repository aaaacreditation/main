"use client";

import { motion, useReducedMotion } from "framer-motion";

/** The hero enquiry card slides in from the right on a soft spring. */
export default function HeroFormCard({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="tepx-hero-form"
      id="consultation"
      initial={reduce ? false : { opacity: 0, x: 48, y: 16 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.9, delay: 0.55 }}
    >
      {children}
    </motion.div>
  );
}

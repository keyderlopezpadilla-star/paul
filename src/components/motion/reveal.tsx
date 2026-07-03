"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

/**
 * Fade + rise reveal triggered when the element scrolls into view.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number = 0.06) => ({
    transition: { staggerChildren: stagger },
  }),
};

const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.8, ease: EASE } },
};

type TextRevealProps = {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
};

/**
 * Word-by-word masked reveal for headlines (each word rises from a clip mask).
 */
export function TextReveal({ text, className, stagger = 0.05, delay = 0 }: TextRevealProps) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      variants={containerVariants}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden
        >
          <motion.span className="inline-block" variants={wordVariants}>
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

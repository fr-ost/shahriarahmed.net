"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds, useful for staggering siblings. */
  delay?: number;
  /** Vertical offset in pixels to rise from. */
  y?: number;
  as?: "div" | "li" | "article";
}

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Fades and lifts content into view once. Visible immediately without
 * JavaScript (see the <noscript> rule in app/layout.tsx) and for users who
 * prefer reduced motion (see styles/globals.css).
 */
export function Reveal({ children, className, delay = 0, y = 18, as = "div" }: RevealProps) {
  const Component = as === "li" ? m.li : as === "article" ? m.article : m.div;

  return (
    <Component
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </Component>
  );
}

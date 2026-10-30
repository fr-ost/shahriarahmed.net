"use client";

import { useScroll } from "motion/react";
import * as m from "motion/react-m";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * One segment of a timeline rail that fills with colour as the visitor
 * scrolls past it, so the timeline draws itself.
 */
export function RailSegment({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });

  return (
    <span ref={ref} aria-hidden className={cn("absolute w-px bg-line-strong", className)}>
      <m.span
        className="absolute inset-0 origin-top bg-[linear-gradient(to_bottom,var(--accent-bright),#38bdf8)]"
        style={{ scaleY: scrollYProgress }}
      />
    </span>
  );
}

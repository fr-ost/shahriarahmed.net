"use client";

import { useScroll, useSpring } from "motion/react";
import * as m from "motion/react-m";

/** Hairline reading-progress indicator along the top edge of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 32, restDelta: 0.001 });

  return (
    <m.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent-bright"
      style={{ scaleX }}
    />
  );
}

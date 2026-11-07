"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const segments = new Set<{ rail: HTMLElement; fill: HTMLElement }>();
let frame = 0;

/** Fill each rail from when its top passes 85% of the viewport until its bottom passes 55%. */
function update() {
  frame = 0;
  const height = window.innerHeight;
  const progress = [...segments].map(({ rail }) => {
    const rect = rail.getBoundingClientRect();
    const value = (0.85 * height - rect.top) / (0.3 * height + rect.height);
    return Math.min(1, Math.max(0, value));
  });
  [...segments].forEach(({ fill }, index) => {
    fill.style.transform = `scaleY(${progress[index]})`;
  });
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(update);
}

/**
 * One segment of a timeline rail that fills with colour as the visitor
 * scrolls past it, so the timeline draws itself. All segments share one
 * scroll handler that runs at most once per frame.
 */
export function RailSegment({ className }: { className?: string }) {
  const railRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    const fill = fillRef.current;
    if (!rail || !fill) return;
    const segment = { rail, fill };
    if (segments.size === 0) {
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
    }
    segments.add(segment);
    schedule();
    return () => {
      segments.delete(segment);
      if (segments.size === 0) {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
      }
    };
  }, []);

  return (
    <span ref={railRef} aria-hidden className={cn("absolute w-px bg-line-strong", className)}>
      <span
        ref={fillRef}
        className="absolute inset-0 origin-top bg-[linear-gradient(to_bottom,var(--accent-bright),#38bdf8)]"
        style={{ transform: "scaleY(0)" }}
      />
    </span>
  );
}

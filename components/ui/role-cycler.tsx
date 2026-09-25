"use client";

import { Pause, Play } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

interface RoleCyclerProps {
  roles: string[];
  /** Milliseconds each role stays on screen. */
  interval?: number;
}

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Cycles through roles with a soft vertical slide. Screen readers get the
 * full list once; the rotation can be paused (WCAG 2.2.2) and does not run
 * for users who prefer reduced motion.
 */
export function RoleCycler({ roles, interval = 2600 }: RoleCyclerProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const running = !paused && !reduceMotion && roles.length > 1;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % roles.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [running, interval, roles.length]);

  return (
    <span className="inline-flex items-center gap-3">
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden className="relative inline-grid overflow-hidden py-[0.08em]">
        <AnimatePresence initial={false}>
          <m.span
            key={roles[index]}
            className="col-start-1 row-start-1 whitespace-nowrap"
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-105%", opacity: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            {roles[index]}
          </m.span>
        </AnimatePresence>
      </span>
      {reduceMotion ? null : (
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? "Resume role animation" : "Pause role animation"}
          aria-pressed={paused}
          className="inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-line text-faint transition-colors duration-300 hover:border-line-strong hover:text-fg"
        >
          {paused ? (
            <Play aria-hidden className="size-2.5 fill-current" />
          ) : (
            <Pause aria-hidden className="size-2.5 fill-current" />
          )}
        </button>
      )}
    </span>
  );
}

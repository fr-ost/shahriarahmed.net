"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface RoleCyclerProps {
  roles: string[];
  /** Milliseconds each role stays on screen. */
  interval?: number;
}

/**
 * Cycles through roles with a soft vertical slide (CSS keyframes: the old
 * role leaves upwards as the new one rises in). Screen readers get the
 * full list once; the rotation can be paused (WCAG 2.2.2) and does not run
 * for users who prefer reduced motion.
 */
export function RoleCycler({ roles, interval = 2600 }: RoleCyclerProps) {
  const [{ index, previous }, setRole] = useState({ index: 0, previous: -1 });
  const [paused, setPaused] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const running = !paused && !reduceMotion && roles.length > 1;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setRole((role) => ({ index: (role.index + 1) % roles.length, previous: role.index }));
    }, interval);
    return () => window.clearInterval(id);
  }, [running, interval, roles.length]);

  return (
    <span className="inline-flex items-center gap-3">
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden className="relative inline-grid overflow-hidden py-[0.08em]">
        {previous >= 0 ? (
          <span key={`out-${index}`} className="role-out col-start-1 row-start-1 whitespace-nowrap">
            {roles[previous]}
          </span>
        ) : null}
        <span
          key={`in-${index}`}
          className={cn("col-start-1 row-start-1 whitespace-nowrap", previous >= 0 && "role-in")}
        >
          {roles[index]}
        </span>
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

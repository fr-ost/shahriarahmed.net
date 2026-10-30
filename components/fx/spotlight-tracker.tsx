"use client";

import { useEffect } from "react";

/**
 * Feeds the pointer position to the `.spotlight` card under it (as
 * `--spot-x` / `--spot-y`), which lights its surface and edge. One listener
 * for the whole site, throttled to animation frames; mouse and pen only.
 */
export function SpotlightTracker() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;

    const update = () => {
      frame = 0;
      const event = last;
      if (!event || !(event.target instanceof Element)) return;
      const card = event.target.closest<HTMLElement>(".spotlight");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    };

    const onMove = (event: PointerEvent) => {
      last = event;
      if (!frame) frame = requestAnimationFrame(update);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

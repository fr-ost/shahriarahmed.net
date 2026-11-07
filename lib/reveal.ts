"use client";

import { useEffect, useRef } from "react";

let observer: IntersectionObserver | null = null;

/** One observer for every revealed element on the page. */
function sharedObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        // In view, or already scrolled past (e.g. after jumping to an anchor).
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          (entry.target as HTMLElement).dataset.shown = "";
          observer?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  return observer;
}

/**
 * Marks the element with `data-shown` once it scrolls into view; CSS does
 * the animation (see `[data-reveal]` in styles/globals.css), so it runs on
 * the compositor rather than in JavaScript on every frame.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const io = sharedObserver();
    io.observe(element);
    return () => io.unobserve(element);
  }, []);
  return ref;
}

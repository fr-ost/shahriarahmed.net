"use client";

import { useRevealOnScroll } from "@/lib/reveal";

/** Runs the page's scroll reveals (see lib/reveal.ts). Renders nothing. */
export function RevealObserver() {
  useRevealOnScroll();
  return null;
}

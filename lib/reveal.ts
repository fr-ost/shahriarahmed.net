"use client";

import { useEffect } from "react";

/**
 * Scroll reveals for the whole page, from one place. Elements opt in with
 * attributes rendered on the server, so the components that draw them
 * (components/ui/reveal.tsx, components/fx/reveal-words.tsx and
 * components/fx/sweep-text.tsx) ship no JavaScript and need no hydration:
 *
 *   [data-reveal], [data-reveal-group]  get `data-shown` once in view
 *   [data-sweep]                        gets `data-shown` once a third is in view
 *
 * Only `data-shown` is ever written, an attribute React does not render, so
 * it never disagrees with what React expects in the DOM.
 * CSS does the animation (styles/globals.css), on the compositor. Content
 * added later — after a client-side navigation or a filter — is picked up
 * by a MutationObserver.
 */
const REVEAL = "[data-reveal]:not([data-shown]), [data-reveal-group]:not([data-shown])";
const SWEEP = "[data-sweep]:not([data-shown])";

export function useRevealOnScroll() {
  useEffect(() => {
    const seen = new WeakSet<Element>();
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // In view, or already scrolled past (e.g. after jumping to an anchor).
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            (entry.target as HTMLElement).dataset.shown = "";
            reveal.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    const sweep = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            (entry.target as HTMLElement).dataset.shown = "";
            sweep.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.35 },
    );

    const scan = () => {
      for (const element of document.querySelectorAll(REVEAL)) {
        if (!seen.has(element)) {
          seen.add(element);
          reveal.observe(element);
        }
      }
      for (const element of document.querySelectorAll(SWEEP)) {
        if (!seen.has(element)) {
          seen.add(element);
          sweep.observe(element);
        }
      }
    };

    let frame = 0;
    const mutations = new MutationObserver(() => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        scan();
      });
    });
    scan();
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      reveal.disconnect();
      sweep.disconnect();
    };
  }, []);
}

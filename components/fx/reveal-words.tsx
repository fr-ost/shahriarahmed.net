"use client";

import { Fragment, type CSSProperties } from "react";
import { useReveal } from "@/lib/reveal";
import { cn } from "@/lib/utils";

interface RevealWordsProps {
  /** Plain text, then an optional accent part shown with a gradient. */
  text: string;
  accent?: string;
  className?: string;
  /** Seconds before the first word starts. */
  delay?: number;
}

/**
 * Heading text whose words rise into place one after another when it comes
 * into view (CSS transitions; see `[data-reveal-word]`). Visible without
 * JavaScript (see the <noscript> rule in app/layout.tsx); static for
 * visitors who prefer reduced motion.
 */
export function RevealWords({ text, accent, className, delay = 0 }: RevealWordsProps) {
  const ref = useReveal<HTMLSpanElement>();
  const words = [
    ...text
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, accent: false })),
    ...(accent ?? "")
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, accent: true })),
  ];

  return (
    <span
      ref={ref}
      data-reveal-group=""
      className={className}
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {words.map((item, index) => (
        <Fragment key={`${item.word}-${index}`}>
          <span className="-mb-[0.16em] inline-block overflow-hidden pb-[0.16em] align-bottom">
            <span
              data-reveal-word=""
              className={cn("inline-block", item.accent && "text-gradient")}
              style={{ "--i": index } as CSSProperties}
            >
              {item.word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

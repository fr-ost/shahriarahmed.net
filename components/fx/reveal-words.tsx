"use client";

import * as m from "motion/react-m";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

interface RevealWordsProps {
  /** Plain text, then an optional accent part shown with a gradient. */
  text: string;
  accent?: string;
  className?: string;
  /** Seconds before the first word starts. */
  delay?: number;
}

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Heading text whose words rise into place one after another when it comes
 * into view. Visible without JavaScript (see the <noscript> rule in
 * app/layout.tsx); static for visitors who prefer reduced motion.
 */
export function RevealWords({ text, accent, className, delay = 0 }: RevealWordsProps) {
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
    <span className={className}>
      {words.map((item, index) => (
        <Fragment key={`${item.word}-${index}`}>
          <span className="-mb-[0.16em] inline-block overflow-hidden pb-[0.16em] align-bottom">
            <m.span
              data-reveal=""
              className={cn("inline-block", item.accent && "text-gradient")}
              initial={{ y: "108%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "0px 0px -6% 0px" }}
              transition={{ duration: 0.85, delay: delay + index * 0.07, ease }}
            >
              {item.word}
            </m.span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

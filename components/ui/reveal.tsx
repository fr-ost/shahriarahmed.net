import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds, useful for staggering siblings. */
  delay?: number;
  /** Vertical offset in pixels to rise from. */
  y?: number;
  as?: "div" | "li" | "article";
}

/**
 * Fades and lifts content into view once, with a CSS transition started by
 * the page's one observer (lib/reveal.ts) — no JavaScript of its own.
 * Visible immediately without JavaScript (see the <noscript> rule in
 * app/layout.tsx) and for users who prefer reduced motion (see
 * styles/globals.css).
 */
export function Reveal({ children, className, delay = 0, y = 18, as = "div" }: RevealProps) {
  const Component = as;
  const style = { "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px` } as CSSProperties;

  return (
    <Component data-reveal="" className={className} style={style}>
      {children}
    </Component>
  );
}

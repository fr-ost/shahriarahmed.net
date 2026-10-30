import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  /** Accessible name of the list. */
  label: string;
  /** Scroll right to left (default) or left to right. */
  reverse?: boolean;
  /** Seconds for one full loop. */
  duration?: number;
  className?: string;
  itemClassName?: string;
}

/**
 * An endless ticker. The list is announced once; the copy that makes the
 * loop seamless is hidden from assistive technology. It pauses on hover and
 * becomes a static, wrapped list for visitors who prefer reduced motion.
 */
export function Marquee({
  items,
  label,
  reverse = false,
  duration = 48,
  className,
  itemClassName,
}: MarqueeProps) {
  const track = (copy: boolean) => (
    <ul className="marquee-track" {...(copy ? { "aria-hidden": true } : { "aria-label": label })}>
      {items.map((item) => (
        <li
          key={item}
          className={cn("flex shrink-0 items-center gap-[var(--marquee-gap)]", itemClassName)}
        >
          <span>{item}</span>
          <span aria-hidden className="size-1.5 rotate-45 rounded-[2px] bg-accent-bright/70" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn("marquee", className)}
      data-reverse={reverse ? "" : undefined}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      {track(false)}
      {track(true)}
    </div>
  );
}

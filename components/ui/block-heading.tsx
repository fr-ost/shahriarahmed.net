import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

interface BlockHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  /** Extra content to the right of the heading on large screens. */
  aside?: ReactNode;
  className?: string;
}

/** Heading for a block within a page (an `h2` under the page title). */
export function BlockHeading({
  id,
  eyebrow,
  title,
  description,
  aside,
  className,
}: BlockHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <Reveal className="max-w-2xl">
        <p className="eyebrow flex items-center gap-3 text-faint">
          <span aria-hidden className="h-px w-8 bg-line-strong" />
          {eyebrow}
        </p>
        <h2
          id={id}
          className="mt-4 text-[clamp(1.875rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-fg"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>
        ) : null}
      </Reveal>
      {aside ? <Reveal delay={0.1}>{aside}</Reveal> : null}
    </div>
  );
}

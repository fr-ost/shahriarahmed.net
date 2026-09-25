import type { ReactNode } from "react";
import type { SectionMeta } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

interface SectionProps {
  meta: SectionMeta;
  children: ReactNode;
  className?: string;
  /** Classes for the inner container. */
  containerClassName?: string;
}

/** Page section with a labelled landmark, consistent spacing and a hairline top rule. */
export function Section({ meta, children, className, containerClassName }: SectionProps) {
  return (
    <section
      id={meta.id}
      aria-labelledby={`${meta.id}-title`}
      tabIndex={-1}
      className={cn("relative py-24 outline-none sm:py-28 lg:py-32", className)}
    >
      <div className={cn("container-page", containerClassName)}>{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  meta: SectionMeta;
  /** Extra content to the right of the heading on large screens. */
  aside?: ReactNode;
  className?: string;
  tone?: "default" | "panel";
  spacing?: "default" | "tight" | "none";
}

const headingSpacing = {
  default: "mb-12 sm:mb-16",
  tight: "mb-8 sm:mb-10",
  none: "",
};

export function SectionHeading({
  meta,
  aside,
  className,
  tone = "default",
  spacing = "default",
}: SectionHeadingProps) {
  const panel = tone === "panel";

  return (
    <div
      className={cn(
        "flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between",
        headingSpacing[spacing],
        className,
      )}
    >
      <Reveal className="max-w-3xl">
        <p
          className={cn(
            "eyebrow mb-5 flex items-center gap-3",
            panel ? "text-panel-muted" : "text-faint",
          )}
        >
          <span className={panel ? "text-panel-accent" : "text-accent"}>{meta.index}</span>
          <span
            aria-hidden
            className={cn("h-px w-8", panel ? "bg-panel-line" : "bg-line-strong")}
          />
          <span>{meta.eyebrow}</span>
        </p>
        <h2
          id={`${meta.id}-title`}
          className={cn(
            "font-serif text-[clamp(2.75rem,7vw,4.75rem)] leading-[0.95] tracking-[-0.02em]",
            panel ? "text-panel-fg" : "text-fg",
          )}
        >
          {meta.title}
          {meta.titleAccent ? (
            <>
              {" "}
              <em className={cn("italic", panel ? "text-panel-accent" : "text-accent")}>
                {meta.titleAccent}
              </em>
            </>
          ) : null}
        </h2>
        {meta.description ? (
          <p
            className={cn(
              "mt-5 max-w-xl text-lg leading-relaxed",
              panel ? "text-panel-muted" : "text-muted",
            )}
          >
            {meta.description}
          </p>
        ) : null}
      </Reveal>
      {aside ? <Reveal delay={0.1}>{aside}</Reveal> : null}
    </div>
  );
}

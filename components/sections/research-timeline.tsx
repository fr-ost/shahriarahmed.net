import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SmartLink } from "@/components/ui/smart-link";
import type { TimelineMilestone } from "@/lib/types";
import { cn, pad2 } from "@/lib/utils";

/**
 * Research milestones: vertical on small screens, a horizontal process line
 * on large screens. Driven entirely by `researchTimeline` in the data file.
 */
export function ResearchTimeline({ milestones }: { milestones: TimelineMilestone[] }) {
  return (
    <div className="mt-24 sm:mt-28">
      <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow text-faint">Research timeline</p>
          <h3 className="mt-3 font-serif text-3xl tracking-[-0.01em] text-fg sm:text-4xl">
            From question to <em className="italic text-accent">publication</em>
          </h3>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-faint">
          Key stages of the featured research project.
        </p>
      </Reveal>

      <div className="relative mt-12">
        {/* Connecting line */}
        <span
          aria-hidden
          className="absolute bottom-3 left-[7px] top-3 w-px bg-line-strong lg:bottom-auto lg:left-2 lg:right-2 lg:top-[7px] lg:h-px lg:w-auto"
        />

        <ol className="relative grid grid-cols-1 gap-9 lg:grid-cols-7 lg:gap-5">
          {milestones.map((milestone, index) => (
            <Reveal
              as="li"
              key={milestone.id}
              delay={index * 0.06}
              className="relative pl-9 lg:pl-0 lg:pt-10"
            >
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-1 flex size-[15px] items-center justify-center rounded-full border bg-bg lg:top-0",
                  milestone.highlight ? "border-accent-bright" : "border-line-strong",
                )}
              >
                <span
                  className={cn(
                    "size-[7px] rounded-full",
                    milestone.highlight ? "bg-accent-bright" : "bg-faint/50",
                  )}
                />
              </span>

              <p className="eyebrow flex flex-wrap items-center gap-x-2 gap-y-1 text-faint">
                <span className={milestone.highlight ? "text-accent" : undefined}>
                  {pad2(index + 1)}
                </span>
                {milestone.date ? (
                  <>
                    <span aria-hidden>·</span>
                    <time dateTime={milestone.dateTime}>{milestone.date}</time>
                  </>
                ) : null}
              </p>
              <h4 className="mt-2.5 text-[1.0625rem] font-semibold leading-snug tracking-tight text-fg">
                {milestone.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{milestone.description}</p>
              {milestone.link ? (
                <SmartLink
                  href={milestone.link.href}
                  className="group/doi mt-3 inline-flex max-w-full items-center gap-1 break-all font-mono text-[0.6875rem] text-accent"
                >
                  {milestone.link.label}
                  <ArrowUpRight
                    aria-hidden
                    className="size-3 shrink-0 transition-transform group-hover/doi:-translate-y-0.5 group-hover/doi:translate-x-0.5"
                  />
                </SmartLink>
              ) : null}
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  );
}

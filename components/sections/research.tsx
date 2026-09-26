import { LockKeyhole } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { CellCycleVisual } from "@/components/visuals/cell-cycle-visual";
import { currentResearch, sections } from "@/data/portfolio";

/** Details withheld until publication; each renders as a placeholder. */
const withheldDetails = ["Research objective", "Biological model", "Current status"];

export function Research() {
  const research = currentResearch;

  return (
    <Section meta={sections.research}>
      <SectionHeading meta={sections.research} />

      <Reveal>
        <article
          aria-labelledby="current-research-title"
          className="relative overflow-hidden rounded-[2rem] border border-line bg-elevated shadow-card"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="p-6 sm:p-10 lg:col-span-7 lg:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <Chip tone="accent">
                  <LockKeyhole aria-hidden className="size-3.5" strokeWidth={2} />
                  {research.label}
                </Chip>
                <span className="eyebrow text-faint">{research.context}</span>
              </div>

              <h3
                id="current-research-title"
                className="mt-7 text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-fg"
              >
                {research.title}
              </h3>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                {research.description}
              </p>

              <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2">
                {withheldDetails.map((label) => (
                  <div key={label}>
                    <dt className="eyebrow text-faint">{label}</dt>
                    <dd className="mt-2.5">
                      <Placeholder>After publication</Placeholder>
                    </dd>
                  </div>
                ))}
                <div>
                  <dt className="eyebrow text-faint">Research areas</dt>
                  <dd className="mt-2">
                    <ul className="flex flex-wrap gap-2">
                      {research.areas.map((area) => (
                        <li key={area}>
                          <Chip>{area}</Chip>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>

              <div className="mt-10">
                <ButtonLink href="#publications" variant="secondary" icon="arrow-right">
                  See published work
                </ButtonLink>
              </div>
            </div>

            <div className="relative border-t border-line bg-subtle/60 p-8 sm:p-12 lg:col-span-5 lg:border-l lg:border-t-0">
              <div aria-hidden className="absolute inset-0 bg-grid mask-fade-radial" />
              <div className="relative flex h-full items-center">
                <CellCycleVisual className="w-full" />
              </div>
            </div>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}

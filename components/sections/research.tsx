import { BookOpenText } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Chip, StatusDot } from "@/components/ui/chip";
import { Placeholder } from "@/components/ui/placeholder";
import { ResearchDetailsDialog } from "@/components/ui/research-details-dialog";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { CellCycleVisual } from "@/components/visuals/cell-cycle-visual";
import { featuredResearch, researchTimeline, sections } from "@/data/portfolio";
import { ResearchTimeline } from "./research-timeline";

export function Research() {
  const research = featuredResearch;
  const doiUrl = research.publicationDoi ? `https://doi.org/${research.publicationDoi}` : null;
  const outputs = researchTimeline.filter((milestone) => milestone.highlight);

  return (
    <Section meta={sections.research}>
      <SectionHeading meta={sections.research} />

      <Reveal>
        <article
          aria-labelledby="featured-research-title"
          className="group/research relative overflow-hidden rounded-[2rem] border border-line bg-elevated shadow-card transition-[box-shadow,border-color] duration-700 ease-smooth hover:border-line-strong hover:shadow-float"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="p-6 sm:p-10 lg:col-span-7 lg:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <Chip tone="accent">{research.label}</Chip>
                <span className="eyebrow text-faint">{research.context}</span>
              </div>

              <h3
                id="featured-research-title"
                className="mt-7 font-serif text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.08] tracking-[-0.015em] text-fg"
              >
                {research.title}
              </h3>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                {research.summary}
              </p>

              <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-7 border-t border-line pt-8 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <dt className="eyebrow text-faint">Research objective</dt>
                  <dd className="mt-2 leading-relaxed text-fg">{research.objective}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-faint">Biological model</dt>
                  <dd className="mt-2 text-fg">{research.model}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-faint">Current status</dt>
                  <dd className="mt-2 flex items-center gap-2.5 text-fg">
                    {research.status ? (
                      <>
                        <StatusDot />
                        {research.status}
                      </>
                    ) : (
                      <Placeholder />
                    )}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="eyebrow text-faint">Research focus</dt>
                  <dd className="mt-3">
                    <ul className="flex flex-wrap gap-2">
                      {research.focus.map((item) => (
                        <li key={item}>
                          <Chip tone="accent">{item}</Chip>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="eyebrow text-faint">Experimental techniques</dt>
                  <dd className="mt-3">
                    <ul className="flex flex-wrap gap-2">
                      {research.techniques.map((technique) => (
                        <li key={technique}>
                          <Chip>{technique}</Chip>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ResearchDetailsDialog research={research} outputs={outputs} />
                <ButtonLink
                  href="#publications"
                  variant="secondary"
                  leadingIcon={<BookOpenText aria-hidden className="size-4" />}
                >
                  Publication
                </ButtonLink>
                {doiUrl ? (
                  <ButtonLink
                    href={doiUrl}
                    variant="secondary"
                    aria-label="DOI (opens doi.org in a new tab)"
                  >
                    DOI
                  </ButtonLink>
                ) : null}
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

      <ResearchTimeline milestones={researchTimeline} />
    </Section>
  );
}

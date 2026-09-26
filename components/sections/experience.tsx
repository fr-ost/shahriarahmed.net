import { ArrowRight, GraduationCap } from "lucide-react";
import { StatusDot } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { education, experience, sections } from "@/data/portfolio";
import type { ExperienceCategory, ExperienceEntry } from "@/lib/types";
import { cn, pad2 } from "@/lib/utils";

const categoryOrder: ExperienceCategory[] = [
  "Entrepreneurship",
  "Academic",
  "Research",
  "Technology",
  "Conferences",
  "Projects",
];

function Meta({ entry }: { entry: ExperienceEntry }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <p className="eyebrow text-faint">{entry.categories.join(" · ")}</p>
      {entry.current ? (
        <span className="eyebrow inline-flex items-center gap-2 text-accent">
          <StatusDot />
          Current
        </span>
      ) : null}
      {entry.period ? <p className="eyebrow text-faint">{entry.period}</p> : null}
    </div>
  );
}

export function Experience() {
  const counts = categoryOrder
    .map((category) => ({
      category,
      count: experience.filter((entry) => entry.categories.includes(category)).length,
    }))
    .filter((item) => item.count > 0);

  return (
    <Section meta={sections.experience}>
      <SectionHeading meta={sections.experience} />

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
        <ol className="relative lg:col-span-8">
          {experience.map((entry, index) => (
            <Reveal
              as="li"
              key={entry.id}
              delay={index * 0.05}
              className="relative grid grid-cols-[1.75rem_1fr] gap-x-4 pb-10 last:pb-0 sm:grid-cols-[2.5rem_1fr] sm:gap-x-6"
            >
              {/* Rail */}
              <div aria-hidden className="relative flex justify-center">
                {index < experience.length - 1 ? (
                  <span className="absolute bottom-[-2.5rem] top-3 w-px bg-line-strong" />
                ) : null}
                <span
                  className={cn(
                    "relative mt-1.5 flex items-center justify-center rounded-full border bg-bg",
                    entry.featured ? "size-5 border-accent-bright" : "size-3.5 border-line-strong",
                  )}
                >
                  <span
                    className={cn(
                      "rounded-full",
                      entry.featured ? "size-2.5 bg-accent-bright" : "size-1.5 bg-faint/60",
                    )}
                  />
                </span>
              </div>

              {entry.featured ? (
                <article className="rounded-3xl border border-line bg-elevated p-6 shadow-card sm:p-8">
                  <Meta entry={entry} />
                  <h3 className="mt-4 text-3xl font-semibold leading-[1.05] tracking-[-0.035em] text-fg sm:text-[2.5rem]">
                    {entry.role} <span className="text-accent">—</span> {entry.organization}
                  </h3>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                    {entry.description}
                  </p>
                  {entry.link ? (
                    <a
                      href={entry.link.href}
                      className="group/xp mt-6 inline-flex items-center gap-2 text-sm font-medium text-fg hover:text-accent"
                    >
                      {entry.link.label}
                      <ArrowRight
                        aria-hidden
                        className="size-4 transition-transform group-hover/xp:translate-x-0.5"
                      />
                    </a>
                  ) : null}
                </article>
              ) : (
                <article className="pt-0.5">
                  <Meta entry={entry} />
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                    {entry.role}
                  </h3>
                  <p className="mt-1 text-muted">{entry.organization}</p>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted">{entry.description}</p>
                  {entry.link ? (
                    <a
                      href={entry.link.href}
                      className="group/xp mt-4 inline-flex items-center gap-2 text-sm font-medium text-fg hover:text-accent"
                    >
                      {entry.link.label}
                      <ArrowRight
                        aria-hidden
                        className="size-4 transition-transform group-hover/xp:translate-x-0.5"
                      />
                    </a>
                  ) : null}
                </article>
              )}
            </Reveal>
          ))}
        </ol>

        <aside aria-label="Education and focus" className="lg:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-28">
            <Reveal className="rounded-3xl border border-line bg-elevated p-6 shadow-card sm:p-7">
              <p className="eyebrow flex items-center gap-2 text-faint">
                <GraduationCap aria-hidden className="size-4 text-accent" strokeWidth={1.75} />
                Education
              </p>
              <ul className="mt-5 space-y-5">
                {education.map((entry) => (
                  <li key={entry.id}>
                    <p className="text-xl font-semibold leading-snug tracking-[-0.02em] text-fg">
                      {entry.degree} in {entry.field}
                    </p>
                    <p className="mt-2 text-muted">{entry.institution}</p>
                    <p className="eyebrow mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-faint">
                      <span>{entry.location}</span>
                      {entry.status ? (
                        <span className="inline-flex items-center gap-2 text-accent">
                          <StatusDot />
                          {entry.status}
                        </span>
                      ) : null}
                      {entry.period ? <span>{entry.period}</span> : null}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08} className="rounded-3xl border border-line p-6 sm:p-7">
              <p className="eyebrow text-faint">Across the timeline</p>
              <ul className="mt-4 divide-y divide-line">
                {counts.map(({ category, count }) => (
                  <li key={category} className="flex items-center justify-between py-3 text-sm">
                    <span className="text-fg">{category}</span>
                    <span className="text-xs font-medium tabular-nums text-faint">
                      {pad2(count)}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </aside>
      </div>
    </Section>
  );
}

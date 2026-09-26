import { Award, CalendarDays, Landmark } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { achievements, sections } from "@/data/portfolio";

/** Concentric rings behind the rank numeral — a quiet medal motif. */
function Rings() {
  return (
    <svg
      viewBox="-100 -100 200 200"
      aria-hidden
      className="absolute -right-44 top-1/2 size-[26rem] -translate-y-1/2 animate-spin-slower text-line-strong opacity-70 sm:-right-40 lg:-right-36"
    >
      {[92, 74, 56].map((r, i) => (
        <circle
          key={r}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeDasharray={i === 0 ? "0.6 3" : i === 1 ? undefined : "4 3"}
        />
      ))}
      <circle cx="0" cy="-92" r="2.4" className="fill-accent-bright" />
    </svg>
  );
}

export function Achievements() {
  const [featured, ...rest] = achievements;

  return (
    <Section meta={sections.achievements}>
      <SectionHeading meta={sections.achievements} />

      {featured ? (
        <Reveal>
          <article
            aria-labelledby={`${featured.id}-title`}
            className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-elevated p-6 shadow-card sm:p-10 lg:p-14"
          >
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <Rings />
            </div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-4">
                <p className="eyebrow flex items-center gap-2 text-accent">
                  <Award aria-hidden className="size-4" strokeWidth={1.75} />
                  Recognition · {featured.dateTime.slice(0, 4)}
                </p>
                <p className="mt-4 flex items-start font-semibold leading-[0.85] tracking-[-0.06em] text-fg">
                  <span className="text-[clamp(5.5rem,15vw,9rem)] tabular-nums">
                    {featured.rank.replace(/\D+$/, "")}
                  </span>
                  <span className="ml-1 mt-2 text-[clamp(1.75rem,4.5vw,2.75rem)] tracking-[-0.03em] text-accent">
                    {featured.rank.replace(/^\d+/, "")}
                  </span>
                </p>
                <p className="eyebrow mt-4 text-faint">Place</p>
              </div>

              <div className="lg:col-span-8 lg:border-l lg:border-line lg:pl-12">
                <h3
                  id={`${featured.id}-title`}
                  className="text-[clamp(1.625rem,3.2vw,2.375rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-fg"
                >
                  {featured.title}
                </h3>
                {featured.description ? (
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
                    {featured.description}
                  </p>
                ) : null}

                <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <dt className="eyebrow text-faint">Conference</dt>
                    <dd className="mt-2 text-lg text-fg">{featured.event}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow flex items-center gap-2 text-faint">
                      <Landmark aria-hidden className="size-3.5" strokeWidth={1.75} />
                      Institution
                    </dt>
                    <dd className="mt-2 text-fg">{featured.institution}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow flex items-center gap-2 text-faint">
                      <CalendarDays aria-hidden className="size-3.5" strokeWidth={1.75} />
                      Date
                    </dt>
                    <dd className="mt-2 text-fg">
                      <time dateTime={featured.dateTime}>{featured.date}</time>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </article>
        </Reveal>
      ) : null}

      {rest.length > 0 ? (
        <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {rest.map((item, index) => (
            <Reveal as="li" key={item.id} delay={index * 0.06}>
              <article className="h-full rounded-3xl border border-line bg-elevated p-6 shadow-card sm:p-8">
                <p className="eyebrow text-accent">{item.placement}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg">{item.title}</h3>
                <p className="mt-2 text-muted">{item.event}</p>
                <p className="eyebrow mt-4 text-faint">
                  {item.institution} · <time dateTime={item.dateTime}>{item.date}</time>
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      ) : null}
    </Section>
  );
}

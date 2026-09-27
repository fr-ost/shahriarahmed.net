import { Award, CalendarDays, Landmark } from "lucide-react";
import { ComingSoonCard } from "@/components/ui/coming-soon";
import { Reveal } from "@/components/ui/reveal";
import { Rings } from "@/components/visuals/rings";
import { achievements } from "@/data/portfolio";

/** The first achievement as a featured card, the rest in a grid. */
export function AchievementsList() {
  const [featured, ...rest] = achievements;

  return (
    <>
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
                <h2
                  id={`${featured.id}-title`}
                  className="text-[clamp(1.625rem,3.2vw,2.375rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-fg"
                >
                  {featured.title}
                </h2>
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
      ) : (
        <ComingSoonCard
          eyebrow="Recognition"
          icon={Award}
          text="Awards and recognition will be listed here."
          as="h2"
        />
      )}

      {rest.length > 0 ? (
        <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {rest.map((item, index) => (
            <Reveal as="li" key={item.id} delay={index * 0.06}>
              <article className="h-full rounded-3xl border border-line bg-elevated p-6 shadow-card sm:p-8">
                <p className="eyebrow text-accent">{item.placement}</p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-fg">{item.title}</h2>
                <p className="mt-2 text-muted">{item.event}</p>
                <p className="eyebrow mt-4 text-faint">
                  {item.institution} · <time dateTime={item.dateTime}>{item.date}</time>
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      ) : null}
    </>
  );
}

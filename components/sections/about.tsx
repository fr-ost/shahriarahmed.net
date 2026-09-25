import Image from "next/image";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { about, person, sections } from "@/data/portfolio";
import portrait from "@/public/images/shahriar-ahmed.webp";

export function About() {
  const [lead, ...paragraphs] = about.paragraphs;

  return (
    <Section meta={sections.about}>
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <SectionHeading meta={sections.about} spacing="tight" />

          <Reveal>
            <p className="text-2xl leading-[1.45] tracking-[-0.01em] text-fg sm:text-[1.625rem]">
              {lead}
            </p>
          </Reveal>

          <div className="mt-8 space-y-5">
            {paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph} delay={0.05 * (index + 1)}>
                <p className="text-lg leading-relaxed text-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-12">
            <p className="eyebrow text-faint">Focus areas</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {about.focusAreas.map((area) => (
                <li key={area}>
                  <Chip>{area}</Chip>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.1} className="mx-auto max-w-md lg:sticky lg:top-28 lg:max-w-none">
            <article
              aria-label="Profile"
              className="overflow-hidden rounded-[1.75rem] border border-line bg-elevated shadow-card"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <p className="eyebrow text-faint">Profile</p>
                <p className="eyebrow text-faint">{person.location.coordinates}</p>
              </div>

              <div className="p-3">
                <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-subtle after:pointer-events-none after:absolute after:inset-0 after:rounded-[1.25rem] after:ring-1 after:ring-inset after:ring-black/[0.06] after:content-['']">
                  <Image
                    src={portrait}
                    alt={person.portrait.alt}
                    placeholder="blur"
                    sizes="(min-width: 1280px) 420px, (min-width: 1024px) 36vw, (min-width: 500px) 424px, 90vw"
                    className="size-full object-cover transition-[filter] duration-500 dark:brightness-[0.9] dark:contrast-[1.02]"
                  />
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-[#0e1010] backdrop-blur-md">
                    <div className="min-w-0">
                      <p className="truncate text-[0.9375rem] font-semibold tracking-tight">
                        {person.name}
                      </p>
                      <p className="truncate text-xs text-[#4e5452]">{person.title}</p>
                    </div>
                    <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent-bright" />
                  </div>
                </div>
              </div>

              <dl className="divide-y divide-line px-5 pb-2">
                {about.profile.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[8.5rem_1fr] items-baseline gap-4 py-3.5"
                  >
                    <dt className="eyebrow text-faint">{row.label}</dt>
                    <dd className="text-[0.9375rem] text-fg">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

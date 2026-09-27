import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { about, education, pages, person, publications, sections } from "@/data/portfolio";
import portrait from "@/public/images/shahriar-ahmed.webp";

/** Introduction and profile card, shared by the homepage and the About page. */
export function AboutBody({ heading, footer }: { heading?: ReactNode; footer?: ReactNode }) {
  const [lead, ...paragraphs] = about.paragraphs;

  return (
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        {heading}

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

        {footer}
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
  );
}

/** Homepage section, linking to the full About page. */
export function About() {
  return (
    <Section meta={sections.about}>
      <AboutBody
        heading={<SectionHeading meta={sections.about} spacing="tight" />}
        footer={
          <Reveal delay={0.1} className="mt-10">
            <Link
              href={pages.about.href}
              className="group/more inline-flex items-center gap-2 text-[0.9375rem] font-medium text-fg hover:text-accent"
            >
              More about {person.name}
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover/more:translate-x-0.5"
              />
            </Link>
          </Reveal>
        }
      />
    </Section>
  );
}

/** Education, latest publication and company, each linking to more. */
export function AboutHighlights() {
  const degree = education[0];
  const [latest] = publications;
  const cards = [
    degree
      ? {
          eyebrow: "Education",
          title: `${degree.degree} in ${degree.field}`,
          text: `${degree.institution}, ${degree.location}${degree.status ? ` · ${degree.status}` : ""}`,
          link: { label: "View experience", href: pages.experience.href },
        }
      : null,
    latest?.title
      ? {
          eyebrow: "Latest publication",
          title: latest.title,
          text: [latest.journal, latest.published?.label].filter(Boolean).join(" · "),
          link: { label: "Read the paper", href: `${pages.research.href}#publications` },
        }
      : null,
    {
      eyebrow: "Company",
      title: person.title,
      text: pages.uniqueLabs.description,
      link: { label: "About Unique Labs", href: pages.uniqueLabs.href },
    },
  ].filter((card) => card !== null);

  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {cards.map((card, index) => (
        <Reveal as="li" key={card.eyebrow} delay={index * 0.06} className="flex">
          <article className="flex w-full flex-col rounded-3xl border border-line bg-elevated p-6 shadow-card sm:p-7">
            <p className="eyebrow text-accent">{card.eyebrow}</p>
            <h3 className="mt-3 text-lg font-semibold leading-snug tracking-[-0.015em] text-fg">
              {card.title}
            </h3>
            <p className="mt-2 leading-relaxed text-muted">{card.text}</p>
            <div className="mt-auto pt-6">
              <Link
                href={card.link.href}
                className="group/more inline-flex items-center gap-2 text-sm font-medium text-fg hover:text-accent"
              >
                {card.link.label}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover/more:translate-x-0.5"
                />
              </Link>
            </div>
          </article>
        </Reveal>
      ))}
    </ul>
  );
}

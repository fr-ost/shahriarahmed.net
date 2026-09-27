import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { contentIcons } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import {
  achievements,
  collaborations,
  experience,
  pages,
  projects,
  publications,
  sections,
} from "@/data/portfolio";
import type { PageMeta } from "@/lib/types";
import { cn, pad2 } from "@/lib/utils";

/** The content pages, in the order they are offered. */
const contentPages = [
  pages.research,
  pages.projects,
  pages.experience,
  pages.web3,
  pages.achievements,
] satisfies PageMeta[];

function count(n: number, noun: string, plural = `${noun}s`) {
  return `${pad2(n)} ${n === 1 ? noun : plural}`;
}

/** A short, factual line about what each page holds. */
function statFor(page: PageMeta): string {
  switch (page.href) {
    case pages.research.href:
      return count(publications.length, "publication");
    case pages.projects.href:
      return count(projects.length, "project");
    case pages.experience.href:
      return count(experience.length, "entry", "entries");
    case pages.web3.href:
      return collaborations.length > 0
        ? count(collaborations.length, "collaboration")
        : "Collaborations coming soon";
    case pages.achievements.href:
      return achievements.length > 0 ? count(achievements.length, "achievement") : "Coming soon";
    default:
      return "";
  }
}

/** Card linking to a page. The whole card is clickable via the title link. */
function PageCard({ page, compact = false }: { page: PageMeta; compact?: boolean }) {
  const Icon = contentIcons[page.icon ?? "paper"];

  return (
    <article
      className={cn(
        "group/page relative flex h-full flex-col rounded-3xl border border-line bg-elevated shadow-card transition-[border-color,box-shadow,transform] duration-500 ease-smooth hover:-translate-y-1 hover:border-line-strong hover:shadow-float has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-accent",
        compact ? "p-5 sm:p-6" : "p-6 sm:p-8",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-2xl border border-line bg-bg text-accent transition-colors duration-500 group-hover/page:border-accent/30 group-hover/page:bg-accent/[0.07]",
            compact ? "size-10" : "size-12",
          )}
        >
          <Icon aria-hidden className={compact ? "size-[1.125rem]" : "size-5"} strokeWidth={1.6} />
        </span>
        <span
          aria-hidden
          className="inline-flex size-9 items-center justify-center rounded-full border border-line text-faint transition-[color,border-color,transform] duration-500 ease-smooth group-hover/page:translate-x-0.5 group-hover/page:border-accent/40 group-hover/page:text-accent"
        >
          <ArrowRight className="size-4" />
        </span>
      </div>

      <p className={cn("eyebrow text-faint", compact ? "mt-6" : "mt-10")}>{statFor(page)}</p>
      <h3
        className={cn(
          "mt-2 font-semibold tracking-tight text-fg",
          compact ? "text-lg" : "text-2xl",
        )}
      >
        <Link
          href={page.href}
          className="focus-visible:outline-hidden after:absolute after:inset-0 after:rounded-3xl after:content-['']"
        >
          {page.label}
        </Link>
      </h3>
      {!compact && page.summary ? (
        <p className="mt-3 leading-relaxed text-muted">{page.summary}</p>
      ) : null}
    </article>
  );
}

/** Homepage section linking to the separate pages. */
export function Explore() {
  // Two wide cards on top, three below on large screens.
  const spans = [
    "lg:col-span-3",
    "lg:col-span-3",
    "lg:col-span-2",
    "lg:col-span-2",
    "md:col-span-2 lg:col-span-2",
  ];

  return (
    <Section meta={sections.explore}>
      <SectionHeading meta={sections.explore} />
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
        {contentPages.map((page, index) => (
          <Reveal as="li" key={page.href} delay={index * 0.06} className={spans[index]}>
            <PageCard page={page} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/** Links to the other content pages, shown at the end of each page. */
export function KeepExploring({ current }: { current: string }) {
  const others = contentPages.filter((page) => page.href !== current);

  return (
    <section aria-labelledby="keep-exploring-title" className="border-t border-line py-16 sm:py-20">
      <div className="container-page">
        <h2 id="keep-exploring-title" className="eyebrow flex items-center gap-3 text-faint">
          <span aria-hidden className="h-px w-8 bg-line-strong" />
          Keep exploring
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((page, index) => (
            <Reveal as="li" key={page.href} delay={index * 0.05}>
              <PageCard page={page} compact />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

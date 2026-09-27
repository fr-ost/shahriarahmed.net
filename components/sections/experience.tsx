import { ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";
import { StatusDot } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { SmartLink } from "@/components/ui/smart-link";
import { education, experience, pages } from "@/data/portfolio";
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

function EntryLink({ entry, className }: { entry: ExperienceEntry; className: string }) {
  if (!entry.link) return null;
  return (
    <SmartLink
      href={entry.link.href}
      className={cn(
        "group/xp inline-flex items-center gap-2 text-sm font-medium text-fg hover:text-accent",
        className,
      )}
    >
      {entry.link.label}
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform group-hover/xp:translate-x-0.5"
      />
    </SmartLink>
  );
}

/** Vertical timeline; `featured` entries render as a highlighted card. */
export function ExperienceTimeline({
  entries,
  headingLevel: Heading = "h2",
}: {
  entries: ExperienceEntry[];
  headingLevel?: "h2" | "h3";
}) {
  return (
    <ol className="relative">
      {entries.map((entry, index) => (
        <Reveal
          as="li"
          key={entry.id}
          delay={index * 0.05}
          className="relative grid grid-cols-[1.75rem_1fr] gap-x-4 pb-10 last:pb-0 sm:grid-cols-[2.5rem_1fr] sm:gap-x-6"
        >
          {/* Rail */}
          <div aria-hidden className="relative flex justify-center">
            {index < entries.length - 1 ? (
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
              <Heading className="mt-4 text-3xl font-semibold leading-[1.05] tracking-[-0.035em] text-fg sm:text-[2.5rem]">
                {entry.role} <span className="text-accent">—</span> {entry.organization}
              </Heading>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                {entry.description}
              </p>
              <EntryLink entry={entry} className="mt-6" />
            </article>
          ) : (
            <article className="pt-0.5">
              <Meta entry={entry} />
              <Heading className="mt-3 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                {entry.role}
              </Heading>
              <p className="mt-1 text-muted">{entry.organization}</p>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{entry.description}</p>
              <EntryLink entry={entry} className="mt-4" />
            </article>
          )}
        </Reveal>
      ))}
    </ol>
  );
}

/** Education card and how many timeline entries fall in each category. */
export function ExperienceAside() {
  const counts = categoryOrder
    .map((category) => ({
      category,
      count: experience.filter((entry) => entry.categories.includes(category)).length,
    }))
    .filter((item) => item.count > 0);

  return (
    <aside aria-label="Education and focus">
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
                <span className="text-xs font-medium tabular-nums text-faint">{pad2(count)}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </aside>
  );
}

const experienceTabs = [
  { key: "experience", label: "Professional & academic", href: pages.experience.href },
  { key: "web3", label: "Web3 & collaborations", href: pages.web3.href },
] as const;

/** Switches between the two experience pages. */
export function ExperienceTabs({ active }: { active: "experience" | "web3" }) {
  return (
    <nav aria-label="Experience pages" className="mt-10 max-w-md">
      <ul className="grid grid-cols-2 gap-1 rounded-full border border-line bg-elevated p-1 shadow-card">
        {experienceTabs.map((tab) => {
          const current = tab.key === active;
          return (
            <li key={tab.key} className="flex">
              <Link
                href={tab.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "flex w-full items-center justify-center rounded-full px-3 py-2 text-center text-[0.8125rem] font-medium leading-tight transition-colors duration-300 sm:text-sm",
                  current ? "bg-fg text-bg" : "text-muted hover:text-fg",
                )}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

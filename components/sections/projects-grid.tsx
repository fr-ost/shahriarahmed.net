"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import * as m from "motion/react-m";
import { useState } from "react";
import { contentIcons } from "@/components/icons";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { Chip, StatusDot } from "@/components/ui/chip";
import { Placeholder } from "@/components/ui/placeholder";
import type { Project, ProjectCategory } from "@/lib/types";
import { cn, pad2, prettyUrl } from "@/lib/utils";

type Filter = "All" | ProjectCategory;

interface ProjectsGridProps {
  projects: Project[];
  categories: ProjectCategory[];
}

const ease = [0.22, 1, 0.36, 1] as const;

export function ProjectsGrid({ projects, categories }: ProjectsGridProps) {
  const [filter, setFilter] = useState<Filter>("All");
  // Only offer categories that currently have projects.
  const filters: Filter[] = [
    "All",
    ...categories.filter((category) =>
      projects.some((project) => project.categories.includes(category)),
    ),
  ];
  const visible =
    filter === "All" ? projects : projects.filter((project) => project.categories.includes(filter));

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Filter projects by category"
          className="-mx-1 flex flex-wrap gap-1.5"
        >
          {filters.map((item) => {
            const count =
              item === "All"
                ? projects.length
                : projects.filter((project) => project.categories.includes(item)).length;
            const selected = filter === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(item)}
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm transition-[background-color,border-color,color] duration-300 ease-smooth",
                  selected
                    ? "border-fg bg-fg text-bg"
                    : "border-line text-muted hover:border-line-strong hover:text-fg",
                )}
              >
                {item}
                <span
                  className={cn(
                    "text-[0.6875rem] font-medium tabular-nums",
                    selected ? "text-bg/60" : "text-faint",
                  )}
                >
                  {pad2(count)}
                </span>
              </button>
            );
          })}
        </div>
        <p className="eyebrow text-faint" aria-live="polite">
          Showing {pad2(visible.length)} / {pad2(projects.length)}
        </p>
      </div>

      <ul key={filter} className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        {visible.map((project, index) => {
          // With an odd number of cards, the first one spans both columns.
          const wide = visible.length % 2 === 1 && index === 0;
          return (
            <m.li
              key={project.id}
              data-reveal=""
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.6, delay: index * 0.07, ease }}
              className={cn("flex", wide && "md:col-span-2")}
            >
              <ProjectCard project={project} wide={wide} />
            </m.li>
          );
        })}
      </ul>
    </div>
  );
}

const linkClass =
  "group/link inline-flex items-center gap-2 text-sm font-medium text-fg hover:text-accent";

function ExternalArrow() {
  return (
    <ArrowUpRight
      aria-hidden
      className="size-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
    />
  );
}

function ProjectCard({ project, wide }: { project: Project; wide: boolean }) {
  const Icon = contentIcons[project.icon];
  const { github, demo, website, internal } = project.links;
  const hasLinks = Boolean(github || demo || website || internal);
  const details = project.details ?? [];
  const items = project.items ?? [];
  const split = wide && details.length > 0;

  return (
    <article className="group/card relative flex w-full flex-col rounded-3xl border border-line bg-elevated p-6 shadow-card transition-[border-color,box-shadow,transform] duration-500 ease-smooth hover:-translate-y-1 hover:border-line-strong hover:shadow-float sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-line bg-bg text-fg transition-colors duration-500 group-hover/card:border-accent/30 group-hover/card:bg-accent/[0.07] group-hover/card:text-accent">
          <Icon aria-hidden className="size-5" strokeWidth={1.6} />
        </span>
        {project.status ? (
          <span className="inline-flex items-center gap-2 text-sm text-muted">
            <StatusDot />
            {project.status}
          </span>
        ) : items.length > 0 ? (
          <span className="eyebrow text-faint">
            {pad2(items.length)} {project.itemNoun ?? "item"}
            {items.length === 1 ? "" : "s"}
          </span>
        ) : (
          <Placeholder>Status TBA</Placeholder>
        )}
      </div>

      <div
        className={cn(
          "mt-8",
          split && "md:grid md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:items-start md:gap-12",
        )}
      >
        <div>
          <p className="eyebrow text-faint">{project.categories.join(" · ")}</p>
          <h3
            className={cn(
              "mt-2 font-semibold tracking-tight text-fg",
              wide ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
            )}
          >
            {project.name}
          </h3>
          <p className={cn("mt-3 leading-relaxed text-muted", wide && "max-w-2xl sm:text-lg")}>
            {project.description}
          </p>

          {project.technologies.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
              {project.technologies.map((technology) => (
                <li key={technology}>
                  <Chip tone="muted">{technology}</Chip>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {details.length > 0 ? (
          <dl
            className={cn(
              "mt-6 divide-y divide-line rounded-2xl border border-line bg-bg/60",
              split && "md:mt-0",
            )}
          >
            {details.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 px-4 py-3 sm:px-5"
              >
                <dt className="eyebrow text-faint">{row.label}</dt>
                <dd className="text-sm text-fg">{row.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      {items.length > 0 ? (
        <ul className="mt-6 divide-y divide-line border-t border-line">
          {items.map((item) => (
            <li key={item.name} className="py-4 last:pb-0">
              <h4 className="text-[0.9375rem] font-semibold leading-snug tracking-tight text-fg">
                {item.name}
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link mt-2.5 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-fg"
                >
                  {item.linkLabel}
                  <ExternalArrow />
                  <span className="sr-only"> — {item.name} (opens in a new tab)</span>
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      {hasLinks || items.length === 0 ? (
        <div className="mt-auto pt-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-5">
            {website ? (
              <a href={website} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {prettyUrl(website)}
                <ExternalArrow />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
            {github ? (
              <a href={github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <GitHubIcon size={15} />
                GitHub
                <ExternalArrow />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
            {demo ? (
              <a href={demo} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Live demo
                <ExternalArrow />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
            {internal ? (
              <a href={internal.href} className={linkClass}>
                {internal.label}
                <ArrowRight
                  aria-hidden
                  className="size-3.5 transition-transform group-hover/link:translate-x-0.5"
                />
              </a>
            ) : null}
            {!hasLinks ? <Placeholder>Links coming soon</Placeholder> : null}
          </div>
        </div>
      ) : null}
    </article>
  );
}

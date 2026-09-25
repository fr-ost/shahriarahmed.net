"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import * as m from "motion/react-m";
import { useState } from "react";
import { contentIcons } from "@/components/icons";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { Chip, StatusDot } from "@/components/ui/chip";
import { Placeholder } from "@/components/ui/placeholder";
import type { Project, ProjectCategory } from "@/lib/types";
import { cn, pad2 } from "@/lib/utils";

type Filter = "All" | ProjectCategory;

interface ProjectsGridProps {
  projects: Project[];
  categories: ProjectCategory[];
}

const ease = [0.22, 1, 0.36, 1] as const;

export function ProjectsGrid({ projects, categories }: ProjectsGridProps) {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...categories];
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
                    "font-mono text-[0.6875rem]",
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
        {visible.map((project, index) => (
          <m.li
            key={project.id}
            data-reveal=""
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.6, delay: index * 0.07, ease }}
            className="flex"
          >
            <ProjectCard project={project} />
          </m.li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const Icon = contentIcons[project.icon];
  const { github, demo, internal } = project.links;
  const hasLinks = Boolean(github || demo || internal);

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
        ) : (
          <Placeholder>Status TBA</Placeholder>
        )}
      </div>

      <p className="eyebrow mt-8 text-faint">{project.categories.join(" · ")}</p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
        {project.name}
      </h3>
      <p className="mt-3 leading-relaxed text-muted">{project.description}</p>

      {project.technologies.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
          {project.technologies.map((technology) => (
            <li key={technology}>
              <Chip tone="muted">{technology}</Chip>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto pt-8">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-5">
          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-fg hover:text-accent"
            >
              <GitHubIcon size={15} />
              GitHub
              <ArrowUpRight
                aria-hidden
                className="size-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
          {demo ? (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-fg hover:text-accent"
            >
              Live demo
              <ArrowUpRight
                aria-hidden
                className="size-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
          {internal ? (
            <a
              href={internal.href}
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-fg hover:text-accent"
            >
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
    </article>
  );
}

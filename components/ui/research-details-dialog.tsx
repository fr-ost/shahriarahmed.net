"use client";

import { ArrowUpRight, FileSearch, X } from "lucide-react";
import { useId, useRef } from "react";
import type { ResearchProject, TimelineMilestone } from "@/lib/types";
import { Button } from "./button";
import { Chip, StatusDot } from "./chip";
import { Placeholder } from "./placeholder";

interface ResearchDetailsDialogProps {
  research: ResearchProject;
  outputs: TimelineMilestone[];
}

/**
 * "Research Details" trigger and modal. Uses the native <dialog> element for
 * focus trapping, Escape to close and focus restoration.
 */
export function ResearchDetailsDialog({ research, outputs }: ResearchDetailsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  return (
    <>
      <Button
        variant="primary"
        leadingIcon={<FileSearch aria-hidden className="size-4" />}
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        Research Details
      </Button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="dialog"
        onClick={(event) => {
          // Close when the backdrop (the dialog element itself) is clicked.
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="relative p-6 sm:p-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="eyebrow text-accent">{research.label}</p>
              <p className="eyebrow mt-2 text-faint">{research.context}</p>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close research details"
              className="-mr-2 -mt-2 inline-flex size-10 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-subtle hover:text-fg"
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>

          <h2
            id={titleId}
            className="mt-6 font-serif text-3xl leading-[1.1] tracking-[-0.01em] text-fg sm:text-4xl"
          >
            {research.title}
          </h2>

          <dl className="mt-10 grid gap-8">
            <div>
              <dt className="eyebrow text-faint">Objective</dt>
              <dd className="mt-2 text-lg leading-relaxed text-fg">{research.objective}</dd>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
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
            </div>

            <div>
              <dt className="eyebrow text-faint">Experimental approach</dt>
              <dd className="mt-4 grid gap-5">
                {research.techniqueGroups.map((group) => (
                  <div key={group.name} className="rounded-2xl border border-line p-4 sm:p-5">
                    <p className="text-sm font-medium text-fg">{group.name}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {group.techniques.map((technique) => (
                        <li key={technique}>
                          <Chip>{technique}</Chip>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </dd>
            </div>

            <div>
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

            <div>
              <dt className="eyebrow text-faint">Findings</dt>
              <dd className="mt-2 text-fg">
                {research.findings ?? (
                  <span className="flex flex-wrap items-center gap-3 text-muted">
                    <Placeholder>Summary coming soon</Placeholder>
                    <span className="text-sm">See the publication for published results.</span>
                  </span>
                )}
              </dd>
            </div>

            <div>
              <dt className="eyebrow text-faint">Research outputs</dt>
              <dd className="mt-3">
                <ul className="divide-y divide-line border-y border-line">
                  {outputs.map((output) => (
                    <li
                      key={output.id}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5"
                    >
                      <span className="text-fg">{output.title}</span>
                      {output.link ? (
                        <a
                          href={output.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/out inline-flex items-center gap-1 font-mono text-xs text-accent"
                        >
                          {output.link.label}
                          <ArrowUpRight
                            aria-hidden
                            className="size-3.5 transition-transform group-hover/out:-translate-y-0.5 group-hover/out:translate-x-0.5"
                          />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : output.date ? (
                        <time dateTime={output.dateTime} className="font-mono text-xs text-faint">
                          {output.date}
                        </time>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </dialog>
    </>
  );
}

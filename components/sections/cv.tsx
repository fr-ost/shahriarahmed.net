import { FileText } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { cv, sections } from "@/data/portfolio";
import type { CvLink } from "@/lib/cv";

export function CvSection({ cvLink }: { cvLink: CvLink }) {
  const meta = sections.cv;

  return (
    <section
      id={meta.id}
      aria-labelledby={`${meta.id}-title`}
      tabIndex={-1}
      className="relative py-12 outline-none sm:py-16"
    >
      <div className="container-page">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-elevated p-6 shadow-card sm:p-10 lg:p-12">
            <div
              aria-hidden
              className="absolute inset-y-0 right-0 -z-10 w-2/3 bg-grid [mask-image:linear-gradient(to_left,black,transparent)]"
            />

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="eyebrow flex items-center gap-3 text-faint">
                  <span className="text-accent">{meta.index}</span>
                  <span aria-hidden className="h-px w-8 bg-line-strong" />
                  <span>{meta.eyebrow}</span>
                </p>
                <h2
                  id={`${meta.id}-title`}
                  className="mt-5 font-serif text-[clamp(2.5rem,6vw,3.75rem)] leading-[0.95] tracking-[-0.02em] text-fg"
                >
                  {meta.title} <em className="italic text-accent">{meta.titleAccent}</em>
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{cv.text}</p>
              </div>

              <div className="lg:col-span-5 lg:justify-self-end">
                <div className="flex items-center gap-4 rounded-2xl border border-line bg-bg p-4 pr-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-line bg-elevated text-accent">
                    <FileText aria-hidden className="size-5" strokeWidth={1.6} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-mono text-sm text-fg">{cv.fileName}</p>
                    <p className="eyebrow mt-1 text-faint">
                      {cvLink.available ? "PDF · Download" : "PDF"}
                    </p>
                  </div>
                  {cvLink.available ? null : (
                    <Placeholder className="ml-auto shrink-0">Soon</Placeholder>
                  )}
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink
                    href={cvLink.href}
                    size="lg"
                    icon={cvLink.available ? "download" : "mail"}
                    className="w-full sm:w-auto"
                    {...(cvLink.available ? { download: cv.fileName } : {})}
                  >
                    {cvLink.label}
                  </ButtonLink>
                </div>
                {cvLink.available ? null : (
                  <p className="mt-3 text-sm text-faint">
                    The PDF will be available here shortly — until then, request it by email.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

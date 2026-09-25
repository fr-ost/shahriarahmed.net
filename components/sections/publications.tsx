import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { CopyButton } from "@/components/ui/copy-button";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { publications, sections } from "@/data/portfolio";
import type { Publication } from "@/lib/types";
import { cn, pad2 } from "@/lib/utils";

const MISSING = "Publication details coming soon.";

function PublicationCard({ publication, index }: { publication: Publication; index: number }) {
  const featured = index === 0;
  const meta = [
    { label: "Authors", value: publication.authors?.join(", ") ?? null },
    { label: "Journal", value: publication.journal },
    { label: "Year", value: publication.year ? String(publication.year) : null },
  ];

  return (
    <article
      aria-labelledby={`${publication.id}-title`}
      className={cn(
        "grid grid-cols-1 overflow-hidden rounded-[2rem] border border-line bg-elevated shadow-card",
        featured ? "md:grid-cols-[11rem_1fr] lg:grid-cols-[14rem_1fr]" : "md:grid-cols-[9rem_1fr]",
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line bg-subtle/60 p-6 md:flex-col md:items-start md:justify-between md:border-b-0 md:border-r sm:p-8">
        <p className="font-mono text-[clamp(2.75rem,6vw,4.25rem)] leading-none tracking-[-0.04em] text-fg">
          {pad2(index + 1)}
        </p>
        <div className="text-right md:text-left">
          <Chip tone="accent">{publication.status}</Chip>
          <p className="eyebrow mt-3 text-faint">Publication</p>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10">
        <h3
          id={`${publication.id}-title`}
          className={cn(
            "font-serif leading-[1.1] tracking-[-0.01em]",
            featured ? "text-[clamp(1.75rem,3.2vw,2.5rem)]" : "text-2xl",
            publication.title ? "text-fg" : "italic text-muted",
          )}
        >
          {publication.title ?? MISSING}
        </h3>

        <dl className="mt-8 grid grid-cols-1 gap-6 border-y border-line py-6 sm:grid-cols-3">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="eyebrow text-faint">{item.label}</dt>
              <dd className="mt-2 text-fg">{item.value ?? <Placeholder />}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6">
          <p className="eyebrow text-faint">Abstract</p>
          {publication.abstract ? (
            <p className="mt-3 leading-relaxed text-muted">{publication.abstract}</p>
          ) : (
            <div className="mt-3">
              <Placeholder />
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="eyebrow text-faint">DOI</p>
            <a
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 block break-all font-mono text-sm text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
            >
              {publication.doi}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <CopyButton value={publication.doi} label="Copy DOI" />
            <ButtonLink href={publication.url} size="sm">
              View publication
            </ButtonLink>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Publications() {
  const count = publications.length;

  return (
    <Section meta={sections.publications}>
      <SectionHeading
        meta={sections.publications}
        aside={
          <p className="flex items-baseline gap-3 lg:justify-end">
            <span className="font-mono text-5xl leading-none tracking-[-0.04em] text-fg">
              {pad2(count)}
            </span>
            <span className="eyebrow text-faint">Published {count === 1 ? "paper" : "papers"}</span>
          </p>
        }
      />

      <ol className="space-y-6">
        {publications.map((publication, index) => (
          <Reveal as="li" key={publication.id} delay={index * 0.06}>
            <PublicationCard publication={publication} index={index} />
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

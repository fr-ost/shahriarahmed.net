import { Fragment } from "react";
import { socialIcons } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { CopyButton } from "@/components/ui/copy-button";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { person, publications, sections, socials } from "@/data/portfolio";
import type { Publication, SocialLink } from "@/lib/types";
import { cn, pad2 } from "@/lib/utils";

const MISSING = "Publication details coming soon.";

/** Comma-separated author list with the site owner's name emphasised. */
function Authors({ authors }: { authors: string[] }) {
  return (
    <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
      <span className="sr-only">Authors: </span>
      {authors.map((author, index) => (
        <Fragment key={author}>
          {index > 0 ? ", " : null}
          {author.includes(person.name) ? (
            <strong className="whitespace-nowrap font-semibold text-fg underline decoration-accent-bright/60 decoration-2 underline-offset-4">
              {author}
            </strong>
          ) : (
            author
          )}
        </Fragment>
      ))}
    </p>
  );
}

function PublicationCard({ publication, index }: { publication: Publication; index: number }) {
  const featured = index === 0;
  const meta = [
    { label: "Journal", value: publication.journal },
    { label: "Year", value: publication.year ? String(publication.year) : null },
    { label: "Presented at", value: publication.presentedAt },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));

  return (
    <article
      aria-labelledby={`${publication.id}-title`}
      className={cn(
        "grid grid-cols-1 overflow-hidden rounded-[2rem] border border-line bg-elevated shadow-card",
        featured ? "md:grid-cols-[11rem_1fr] lg:grid-cols-[13rem_1fr]" : "md:grid-cols-[9rem_1fr]",
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line bg-subtle/60 p-6 sm:p-8 md:flex-col md:items-start md:justify-between md:border-b-0 md:border-r">
        <p className="text-[clamp(2.75rem,6vw,4rem)] font-semibold leading-none tracking-[-0.05em] tabular-nums text-fg">
          {pad2(index + 1)}
        </p>
        <div className="text-right md:text-left">
          <Chip tone="accent">{publication.status}</Chip>
          <p className="eyebrow mt-3 text-faint">Publication</p>
        </div>
      </div>

      <div className="min-w-0 p-6 sm:p-8 lg:p-10">
        {publication.journal ? <p className="eyebrow text-accent">{publication.journal}</p> : null}
        <h3
          id={`${publication.id}-title`}
          className={cn(
            "font-semibold tracking-[-0.025em]",
            publication.journal ? "mt-3" : "",
            featured
              ? "text-[clamp(1.5rem,2.8vw,2.125rem)] leading-[1.18]"
              : "text-xl leading-snug",
            publication.title ? "text-fg" : "text-muted",
          )}
        >
          {publication.title ?? MISSING}
        </h3>

        {publication.authors && publication.authors.length > 0 ? (
          <Authors authors={publication.authors} />
        ) : null}

        {meta.length > 0 ? (
          <dl className="mt-8 grid grid-cols-1 gap-6 border-t border-line pt-6 sm:grid-cols-2">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="eyebrow text-faint">{item.label}</dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-fg">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-8 border-t border-line pt-6">
          <p className="eyebrow text-faint">Abstract</p>
          {publication.abstract ? (
            <p className="mt-3 max-w-3xl text-[0.9375rem] leading-relaxed text-muted">
              {publication.abstract}
            </p>
          ) : (
            <div className="mt-3">
              <Placeholder />
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="eyebrow text-faint">DOI</p>
            <a
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 block break-all text-[0.9375rem] font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
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

/** Google Scholar, ORCID and any other research profiles with a link. */
const researchProfiles = socials.filter(
  (social): social is SocialLink & { href: string } =>
    social.group === "research" && social.href !== null,
);

export function Publications() {
  const count = publications.length;

  return (
    <Section meta={sections.publications}>
      <SectionHeading
        meta={sections.publications}
        aside={
          <p className="flex items-baseline gap-3 lg:justify-end">
            <span className="text-5xl font-semibold leading-none tracking-[-0.05em] tabular-nums text-fg">
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

      {researchProfiles.length > 0 ? (
        <Reveal className="mt-6 flex flex-col gap-4 rounded-3xl border border-line px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="eyebrow text-faint">Research profiles</p>
          <ul className="flex flex-wrap gap-2">
            {researchProfiles.map((profile) => {
              const Icon = socialIcons[profile.id];
              return (
                <li key={profile.id}>
                  <ButtonLink
                    href={profile.href}
                    variant="secondary"
                    size="sm"
                    leadingIcon={<Icon size={15} />}
                  >
                    {profile.label}
                  </ButtonLink>
                </li>
              );
            })}
          </ul>
        </Reveal>
      ) : null}
    </Section>
  );
}

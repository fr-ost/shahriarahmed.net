import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { SmartLink } from "@/components/ui/smart-link";
import {
  cv,
  education,
  experience,
  pages,
  person,
  projects,
  publications,
  site,
  skillGroups,
  socials,
  uniqueLabs,
} from "@/data/portfolio";
import { extensions } from "@/data/products";
import { getCvLink } from "@/lib/cv";
import { buildPageJsonLd, ids } from "@/lib/json-ld";
import { pageLastModified } from "@/lib/lastmod";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbTrail } from "@/lib/pages";
import type { ExperienceEntry } from "@/lib/types";
import { prettyUrl } from "@/lib/utils";

/**
 * The CV, built from the same data as the rest of the site, and laid out to
 * print on A4. `npm run cv:pdf` prints this page to /public, which turns on
 * the "Download CV" links.
 */

const page = pages.cv;

export const metadata: Metadata = pageMetadata(page);

const languageNames: Record<string, string> = { en: "English", bn: "Bangla (Bengali)" };

const byId = (id: string) => experience.find((entry) => entry.id === id);
const pick = (...entryIds: string[]) =>
  entryIds.map(byId).filter((entry): entry is ExperienceEntry => Boolean(entry));

const profileLinks = socials.filter(
  (social) => social.href && ["scholar", "orcid", "linkedin", "github", "x"].includes(social.id),
);

const bots = projects.find((project) => project.id === "telegram-bots")?.items ?? [];

function CvSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10 print:mt-6">
      <h2 className="eyebrow break-after-avoid border-b border-line pb-2 text-accent print:text-[#0b5cad]">
        {title}
      </h2>
      <div className="mt-4 space-y-5 print:space-y-3.5">{children}</div>
    </section>
  );
}

function Entry({
  title,
  where,
  period,
  children,
}: {
  title: ReactNode;
  where?: ReactNode;
  period?: string | null;
  children?: ReactNode;
}) {
  return (
    <div className="break-inside-avoid">
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 print:flex-row print:items-baseline print:justify-between">
        <h3 className="font-semibold tracking-tight text-fg">{title}</h3>
        {period ? (
          <p className="shrink-0 text-sm tabular-nums text-faint">{period.replace(" — ", "–")}</p>
        ) : null}
      </div>
      {where ? <p className="text-[0.9375rem] text-muted">{where}</p> : null}
      {children ? (
        <div className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{children}</div>
      ) : null}
    </div>
  );
}

export default function CvPage() {
  const cvLink = getCvLink();
  const updated = pageLastModified(page.href);
  const paper = publications[0];
  const research = pick("masters-research", "cbcro", "icrast");
  const unique = byId("unique-labs");
  const leadership = pick("asm");

  return (
    <>
      <JsonLd
        data={buildPageJsonLd({
          page,
          // The homepage is the profile page; this one is about the same person.
          mainEntity: { "@id": ids.person },
        })}
      />
      <div className="container-page pb-24 pt-32 sm:pb-28 sm:pt-40 print:p-0">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between print:hidden">
          <div>
            <Breadcrumbs trail={breadcrumbTrail(page)} />
            <p className="mt-5 max-w-xl text-muted">{page.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {cvLink.available ? (
              <ButtonLink href={cvLink.href} icon="download" download={cv.fileName}>
                Download PDF
              </ButtonLink>
            ) : null}
            <ButtonLink href={pages.contact.href} variant="secondary" icon="arrow-right">
              Contact
            </ButtonLink>
          </div>
        </div>

        <article className="mx-auto mt-10 max-w-4xl rounded-[2rem] border border-line bg-elevated p-6 shadow-card sm:p-10 lg:p-14 print:mt-0 print:max-w-none print:rounded-none print:border-0 print:bg-white print:p-0 print:text-[10.5pt] print:shadow-none">
          <header className="break-inside-avoid">
            <h1 className="text-4xl font-semibold tracking-[-0.035em] text-fg sm:text-5xl print:text-[24pt]">
              {person.fullName}
            </h1>
            <p className="mt-2 text-lg font-medium text-fg print:text-[12pt]">
              {person.field} researcher · {person.jobTitle}, {uniqueLabs.name}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted">
              <li>
                {person.location.city}, {person.location.country}
              </li>
              <li>
                <a href={`mailto:${person.email}`} className="hover:text-fg">
                  {person.email}
                </a>
              </li>
              <li>
                <Link href="/" className="hover:text-fg">
                  {site.domain}
                </Link>
              </li>
              {profileLinks.map((social) => (
                <li key={social.id}>
                  <SmartLink href={social.href!} className="hover:text-fg">
                    {social.id === "scholar"
                      ? "Google Scholar"
                      : `${social.label}: ${social.handle}`}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </header>

          <CvSection title="Profile">
            <p className="leading-relaxed text-muted">
              {person.field} researcher at the {person.institution}, with research rooted in cancer
              biology and computational methods such as density functional theory (DFT) and
              molecular docking. Co-founder of {uniqueLabs.name} ({uniqueLabs.founded}, formerly{" "}
              {uniqueLabs.formerName}), which offers KOC and consultancy services, digital marketing
              and blockchain development, and builds its own Chrome extensions.
            </p>
          </CvSection>

          <CvSection title="Education">
            {education.map((entry) => (
              <Entry
                key={entry.id}
                title={`${entry.degree} in ${entry.field}`}
                where={`${entry.institution}, ${entry.location}`}
                period={entry.period ?? (entry.status === "Current" ? "In progress" : null)}
              />
            ))}
          </CvSection>

          {paper ? (
            <CvSection title="Publication">
              <Entry title={paper.title} period={paper.published ? paper.published.label : null}>
                <p>
                  {(paper.authors ?? []).map((author, index) => (
                    <span key={author}>
                      {index > 0 ? ", " : ""}
                      {author.includes(person.name) ? (
                        <strong className="font-semibold text-fg">{author}</strong>
                      ) : (
                        author
                      )}
                    </span>
                  ))}
                  . <em>{paper.journal}</em> {paper.volume}, {paper.articleNumber}.{" "}
                  <SmartLink href={paper.url} className="text-accent">
                    doi:{paper.doi}
                  </SmartLink>
                </p>
                {paper.presentedAt ? (
                  <p className="mt-1">Presented at the {paper.presentedAt}.</p>
                ) : null}
              </Entry>
            </CvSection>
          ) : null}

          <CvSection title="Research">
            {research.map((entry) => (
              <Entry
                key={entry.id}
                title={entry.role}
                where={entry.organization}
                period={entry.period}
              >
                {entry.description}
              </Entry>
            ))}
          </CvSection>

          {unique ? (
            <CvSection title="Entrepreneurship">
              <Entry
                title={`${person.jobTitle}, ${uniqueLabs.name}`}
                where={uniqueLabs.website ? prettyUrl(uniqueLabs.website) : null}
                period={unique.period}
              >
                <p>{unique.description}</p>
                <p className="mt-1.5">
                  Chrome extensions: {extensions.map((item) => item.name).join(", ")}.
                </p>
                {bots.length ? (
                  <p className="mt-1.5">
                    Telegram: {bots.map((item) => `${item.name} (${item.linkLabel})`).join(", ")}.
                  </p>
                ) : null}
              </Entry>
            </CvSection>
          ) : null}

          {leadership.length ? (
            <CvSection title="Leadership">
              {leadership.map((entry) => (
                <Entry
                  key={entry.id}
                  title={entry.role}
                  where={entry.organization}
                  period={entry.period}
                >
                  {entry.description}
                </Entry>
              ))}
            </CvSection>
          ) : null}

          <CvSection title="Skills">
            <dl className="space-y-2.5">
              {skillGroups.map((group) => (
                <div
                  key={group.id}
                  className="grid grid-cols-1 gap-1 sm:grid-cols-[13rem_1fr] sm:gap-4 print:grid-cols-[11rem_1fr]"
                >
                  <dt className="font-semibold text-fg">{group.title}</dt>
                  <dd className="text-[0.9375rem] leading-relaxed text-muted">
                    {group.skills.join(", ")}
                  </dd>
                </div>
              ))}
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-[13rem_1fr] sm:gap-4 print:grid-cols-[11rem_1fr]">
                <dt className="font-semibold text-fg">Computational</dt>
                <dd className="text-[0.9375rem] leading-relaxed text-muted">
                  Density functional theory (DFT, TD-DFT), molecular docking
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-[13rem_1fr] sm:gap-4 print:grid-cols-[11rem_1fr]">
                <dt className="font-semibold text-fg">Languages</dt>
                <dd className="text-[0.9375rem] leading-relaxed text-muted">
                  {person.languages.map((code) => languageNames[code] ?? code).join(", ")}
                </dd>
              </div>
            </dl>
          </CvSection>

          <footer className="mt-10 border-t border-line pt-4 text-xs text-faint print:mt-8">
            Current version: {site.url.replace(/^https?:\/\//, "")}
            {page.href}
            {updated ? (
              <>
                {" "}
                · Updated{" "}
                <time dateTime={updated}>
                  {new Date(updated).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "Asia/Dhaka",
                  })}
                </time>
              </>
            ) : null}
          </footer>
        </article>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { KeepExploring } from "@/components/sections/explore";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { PageHeader } from "@/components/ui/page-header";
import { pages, person, publications } from "@/data/portfolio";
import { absolute, buildPageJsonLd, ids } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

/**
 * Plain-language explainer of the 2026 Journal of Molecular Structure paper.
 * Every finding here is taken from the paper's published abstract; nothing
 * is added beyond it, and the Mcl-1 result is presented as the prediction
 * it is.
 */

const page = pages.researchPaper;
const paper = publications.find((publication) => publication.id === "molstruc-2026-146299")!;
const authors = paper.authors ?? [];
const position = authors.findIndex((author) => author.includes(person.name)) + 1;
const correspondingAuthor = "Prof. Md. Rabiul Karim";

/** Date this explainer was first published on the site. */
const explainerPublished = "2026-11-22";

export const metadata: Metadata = pageMetadata(page);

const keyNumbers = [
  { value: "537 × 10⁻³¹ esu", label: "First hyperpolarizability (βtotal) of PDPMP" },
  { value: "≈ 69×", label: "Urea, a standard reference (7.803 × 10⁻³¹ esu)" },
  { value: "≈ 3.5×", label: "p-Nitroaniline, another reference (155 × 10⁻³¹ esu)" },
  { value: "Up to 3×", label: "Higher again in polar solvents" },
];

const glossary: { term: string; definition: string }[] = [
  {
    term: "Azo–hydrazone",
    definition:
      "A family of organic molecules with nitrogen–nitrogen linkages that can switch between two related forms. Many dyes belong to it.",
  },
  {
    term: "Nonlinear optics (NLO)",
    definition:
      "How a material responds to intense light in ways that are not simply proportional to it — the basis of many laser and photonics technologies.",
  },
  {
    term: "First hyperpolarizability (β)",
    definition:
      "A number that measures a molecule’s nonlinear optical response. Higher means stronger; it is compared with reference molecules such as urea.",
  },
  {
    term: "Solvatochromism",
    definition:
      "A change in a molecule’s colour, or light absorption, with the solvent around it. “Positive” means absorption shifts to longer wavelengths as the solvent gets more polar.",
  },
  {
    term: "DFT and TD-DFT",
    definition:
      "Density functional theory and its time-dependent form: quantum-chemistry methods for calculating a molecule’s structure, electrons and response to light on a computer.",
  },
  {
    term: "HOMO–LUMO gap",
    definition:
      "The energy between a molecule’s highest occupied and lowest unoccupied orbitals; it relates to how easily the molecule absorbs light and moves charge.",
  },
  {
    term: "Molecular docking",
    definition:
      "A computer method that predicts how a small molecule fits into a protein and how tightly it might bind. It is a prediction, not an experiment.",
  },
  {
    term: "Mcl-1",
    definition:
      "Myeloid cell leukemia 1, a protein that helps cells avoid programmed cell death (apoptosis). Many cancers rely on it, which makes it a drug target.",
  },
  {
    term: "Obatoclax",
    definition:
      "A preclinical drug that targets Mcl-1 and related proteins, used here as the point of comparison.",
  },
];

const citation = `${authors.join(", ")} (2026). ${paper.title}. ${paper.journal} ${paper.volume}, ${paper.articleNumber}. ${paper.url}`;

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-14 first:mt-0">
      <h2 id={id} className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-[1.0625rem] leading-relaxed text-muted [&_strong]:font-semibold [&_strong]:text-fg [&_p>a]:font-medium [&_p>a]:text-accent [&_p>a]:underline [&_p>a]:decoration-accent/30 [&_p>a]:underline-offset-4 [&_p>a:hover]:decoration-accent">
        {children}
      </div>
    </section>
  );
}

export default function PaperExplainerPage() {
  const url = absolute(page.href);
  const explainer = {
    "@type": "TechArticle",
    "@id": `${url}#article`,
    headline: page.seoTitle,
    description: page.seoDescription,
    url,
    inLanguage: "en",
    datePublished: explainerPublished,
    author: { "@id": ids.person },
    publisher: { "@id": ids.person },
    mainEntityOfPage: { "@id": `${url}#webpage` },
    about: [
      { "@id": paper.url },
      { "@type": "Thing", name: "Myeloid cell leukemia 1 (Mcl-1)" },
      { "@type": "Thing", name: "Nonlinear optics" },
    ],
    citation: {
      "@type": "ScholarlyArticle",
      "@id": paper.url,
      headline: paper.title,
      url: paper.url,
      identifier: { "@type": "PropertyValue", propertyID: "DOI", value: paper.doi },
      ...(paper.published ? { datePublished: paper.published.dateTime } : {}),
      isPartOf: {
        "@type": "PublicationVolume",
        volumeNumber: paper.volume,
        isPartOf: { "@type": "Periodical", name: paper.journal },
      },
      pagination: paper.articleNumber,
      author: authors.map((name) =>
        name.includes(person.name) ? { "@id": ids.person } : { "@type": "Person", name },
      ),
    },
  };

  const facts: { label: string; value: ReactNode }[] = [
    { label: "Journal", value: paper.journal },
    { label: "Volume", value: paper.volume },
    { label: "Article", value: paper.articleNumber },
    ...(paper.published
      ? [
          {
            label: "Published",
            value: <time dateTime={paper.published.dateTime}>{paper.published.label}</time>,
          },
        ]
      : []),
    { label: "Authors", value: authors.length },
    ...(position > 0 ? [{ label: "My position", value: `${position} of ${authors.length}` }] : []),
    { label: "Corresponding", value: correspondingAuthor },
  ];

  return (
    <>
      <JsonLd
        data={buildPageJsonLd({
          page,
          parents: [pages.research],
          type: "WebPage",
          about: { "@id": paper.url },
          mainEntity: { "@id": `${url}#article` },
          nodes: [explainer],
        })}
      />
      <PageHeader page={page} parents={[pages.research]}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ButtonLink href={paper.url}>Read the paper</ButtonLink>
          <ButtonLink
            href={`${pages.research.href}#publications`}
            variant="secondary"
            icon="arrow-right"
          >
            All publications
          </ButtonLink>
        </div>
      </PageHeader>

      <div className="container-page pb-24 sm:pb-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <article className="min-w-0 lg:col-span-8">
            <Section id="summary-title" title="The paper in one paragraph">
              <p>
                We made a new molecule, an azo–hydrazone compound called <strong>PDPMP</strong>, and
                studied it in the lab and on the computer. Its response to intense light — its
                nonlinear optical (NLO) response — came out strong: about 69 times that of urea, a
                standard reference, and higher still in polar solvents. In computer docking against{" "}
                <strong>Mcl-1</strong>, a protein many cancers depend on, it was predicted to bind
                more strongly than the preclinical drug obatoclax. So it may be useful in two ways:
                as an optical material, and as a starting point worth testing against cancer.
              </p>
            </Section>

            <Section id="made-title" title="What we made">
              <p>
                The compound is 4-((E)-phenyldiazenyl)-2-((E)-(2-phenylhydrazono)methyl)phenol,
                PDPMP for short. After synthesis, its structure was confirmed with four standard
                techniques: infrared spectroscopy (FT-IR), ultraviolet–visible spectroscopy
                (UV–Vis), nuclear magnetic resonance (NMR) and liquid chromatography–mass
                spectrometry (LC-MS).
              </p>
            </Section>

            <Section id="computed-title" title="How it was studied on the computer">
              <p>
                Its structure, electrons and optical properties were calculated with density
                functional theory (DFT) and time-dependent DFT (TD-DFT), at the B3LYP/6-311++G(d,p)
                level. To see what the surroundings do, the calculations were repeated in solvents
                of different polarity using the IEFPCM solvent model.
              </p>
            </Section>

            <Section id="light-title" title="What we found: light and solvents">
              <p>
                The solvent mattered. Its polarity changed how PDPMP absorbs light (its UV–Vis
                spectrum), its HOMO–LUMO gap, how charge moves across the molecule, and how
                efficient its nonlinear optical response is.
              </p>
              <ul className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                {keyNumbers.map((item) => (
                  <li
                    key={item.value}
                    className="rounded-2xl border border-line bg-elevated p-5 shadow-card"
                  >
                    <p className="text-2xl font-semibold tracking-tight text-fg tabular-nums">
                      {item.value}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.label}</p>
                  </li>
                ))}
              </ul>
              <p>
                The response grew up to threefold in polar solvents, with positive solvatochromism.
                Two analyses of its excited states (NTO and TDM) confirmed that the solvent drives
                charge transfer within the molecule, and two more (NBO and RDG) showed how its
                orbitals spread out and which weak, noncovalent interactions hold it together.
              </p>
            </Section>

            <Section id="mcl1-title" title="What we found: Mcl-1">
              <p>
                Mcl-1 helps cells escape programmed cell death, and many cancers lean on it to
                survive — which makes blocking it a goal of cancer drug research. We docked PDPMP
                into two published structures of Mcl-1 (Protein Data Bank IDs 4HW3 and 6GL8). The
                docking suggested that PDPMP binds Mcl-1 more strongly than obatoclax, a preclinical
                drug that targets it.
              </p>
              <p className="rounded-2xl border border-line bg-subtle/60 p-5 text-[0.9375rem]">
                <strong>What this does and does not show.</strong> Docking is a computer prediction.
                It is a reason to study PDPMP further as a possible anticancer agent — which is how
                the paper puts it — not evidence that it treats cancer.
              </p>
            </Section>

            <Section id="matters-title" title="Why it matters">
              <p>
                Strong nonlinear optical molecules are wanted for photonics and laser technology,
                and a molecule whose response can be tuned by its solvent is easier to put to work.
                The paper suggests PDPMP could serve as a dual-function material — optical on one
                side, a candidate Mcl-1 antagonist on the other — and that both deserve further
                investigation.
              </p>
            </Section>

            <Section id="role-title" title="My part">
              <p>
                I am one of the paper’s {authors.length} authors
                {position > 0 ? ` (${ordinal(position)} in the author list)` : ""}. The
                corresponding author is {correspondingAuthor} of the Department of Chemistry,
                University of Rajshahi.
                {paper.presentedAt
                  ? ` The work was also presented at the ${paper.presentedAt}.`
                  : ""}{" "}
                More about my research is on the{" "}
                <Link href={pages.research.href}>research page</Link> and in my{" "}
                <Link href={pages.cv.href}>CV</Link>.
              </p>
            </Section>

            <Section id="glossary-title" title="Glossary">
              <dl className="divide-y divide-line border-y border-line">
                {glossary.map((item) => (
                  <div
                    key={item.term}
                    className="grid grid-cols-1 gap-1.5 py-4 sm:grid-cols-3 sm:gap-6"
                  >
                    <dt className="font-semibold text-fg">{item.term}</dt>
                    <dd className="text-[0.9375rem] sm:col-span-2">{item.definition}</dd>
                  </div>
                ))}
              </dl>
            </Section>

            <Section id="cite-title" title="Cite this paper">
              <p className="rounded-2xl border border-line bg-elevated p-5 text-[0.9375rem] leading-relaxed text-fg shadow-card">
                {citation}
              </p>
              <div className="flex flex-wrap gap-2">
                <CopyButton value={citation} label="Copy citation" />
                <CopyButton value={paper.doi} label="Copy DOI" />
              </div>
            </Section>
          </article>

          <aside aria-label="The paper at a glance" className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-3xl border border-line bg-elevated p-5 shadow-card">
                <p className="eyebrow text-faint">The paper</p>
                <p className="mt-3 font-semibold leading-snug tracking-tight text-fg">
                  {paper.title}
                </p>
                <dl className="mt-5 divide-y divide-line border-t border-line">
                  {facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-baseline justify-between gap-4 py-3"
                    >
                      <dt className="eyebrow text-faint">{fact.label}</dt>
                      <dd className="text-right text-sm font-medium text-fg">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-2 border-t border-line pt-4 text-sm">
                  <span className="eyebrow block text-faint">DOI</span>
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap mt-1 inline-block break-all font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
                  >
                    {paper.doi}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <KeepExploring current={pages.research.href} />
    </>
  );
}

function ordinal(n: number): string {
  const suffix =
    n % 100 >= 11 && n % 100 <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" }[n % 10] ?? "th");
  return `${n}${suffix}`;
}

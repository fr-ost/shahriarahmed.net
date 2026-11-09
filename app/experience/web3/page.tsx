import type { Metadata } from "next";
import { ExperienceTabs, ExperienceTimeline } from "@/components/sections/experience";
import { KeepExploring } from "@/components/sections/explore";
import { Web3Aside } from "@/components/sections/web3";
import { BlockHeading } from "@/components/ui/block-heading";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { pages, uniqueLabs, web3Experience } from "@/data/portfolio";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { prettyUrl } from "@/lib/utils";

const page = pages.web3;

export const metadata: Metadata = pageMetadata(page);

export default function Web3Page() {
  return (
    <>
      <JsonLd data={buildPageJsonLd({ page, parents: [pages.experience] })} />
      <PageHeader page={page} parents={[pages.experience]}>
        <ExperienceTabs active="web3" />
      </PageHeader>
      <div className="container-page pb-24 sm:pb-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <section aria-labelledby="web3-experience-title" className="lg:col-span-8">
            <BlockHeading id="web3-experience-title" eyebrow="Web3" title="Roles" />
            <ExperienceTimeline entries={web3Experience} headingLevel="h3" />
          </section>
          <div className="lg:col-span-4">
            <Web3Aside />
          </div>
        </div>

        {/* Partnerships live on the Unique Labs website. */}
        {uniqueLabs.website ? (
          <section
            aria-labelledby="partnerships-title"
            className="mt-24 flex flex-col gap-6 rounded-3xl border border-line bg-elevated p-6 shadow-card sm:mt-32 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div>
              <p className="eyebrow text-faint">Partnerships</p>
              <h2
                id="partnerships-title"
                className="mt-2 text-2xl font-semibold tracking-tight text-fg"
              >
                Partnerships are on the {uniqueLabs.name} website
              </h2>
              <p className="mt-2 leading-relaxed text-muted">
                The exchanges, launchpads, and Web3 projects {uniqueLabs.name} works with are listed
                there.
              </p>
            </div>
            <ButtonLink href={uniqueLabs.website} variant="secondary" className="shrink-0">
              {prettyUrl(uniqueLabs.website)}
            </ButtonLink>
          </section>
        ) : null}
      </div>
      <KeepExploring current={page.href} />
    </>
  );
}

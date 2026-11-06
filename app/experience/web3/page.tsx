import type { Metadata } from "next";
import { ExperienceTabs, ExperienceTimeline } from "@/components/sections/experience";
import { KeepExploring } from "@/components/sections/explore";
import { Web3Aside } from "@/components/sections/web3";
import { BlockHeading } from "@/components/ui/block-heading";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { collaborations, pages, web3Experience } from "@/data/portfolio";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

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
            <BlockHeading id="web3-experience-title" eyebrow="Web3" title="Web3 experience" />
            <ExperienceTimeline entries={web3Experience} headingLevel="h3" />
          </section>
          <div className="lg:col-span-4">
            <Web3Aside />
          </div>
        </div>

        {/* The full list is on the Unique Labs page. */}
        {collaborations.length > 0 ? (
          <section
            aria-labelledby="collaborations-title"
            className="mt-24 flex flex-col gap-6 rounded-3xl border border-line bg-elevated p-6 shadow-card sm:mt-32 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div>
              <p className="eyebrow text-faint">History</p>
              <h2
                id="collaborations-title"
                className="mt-2 text-2xl font-semibold tracking-tight text-fg"
              >
                Collaboration history
              </h2>
              <p className="mt-2 leading-relaxed text-muted">
                {collaborations.length} exchanges, launchpads, and projects — listed on the Unique
                Labs page.
              </p>
            </div>
            <ButtonLink
              href={`${pages.uniqueLabs.href}#collaborations`}
              variant="secondary"
              icon="arrow-right"
              className="shrink-0"
            >
              See all {collaborations.length}
            </ButtonLink>
          </section>
        ) : null}
      </div>
      <KeepExploring current={page.href} />
    </>
  );
}

import type { Metadata } from "next";
import { ExperienceTabs, ExperienceTimeline } from "@/components/sections/experience";
import { KeepExploring } from "@/components/sections/explore";
import { CollaborationList, Web3Aside } from "@/components/sections/web3";
import { BlockHeading } from "@/components/ui/block-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { pages, web3Experience } from "@/data/portfolio";
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

        <section
          id="collaborations"
          aria-labelledby="collaborations-title"
          tabIndex={-1}
          className="mt-24 outline-none sm:mt-32"
        >
          <BlockHeading
            id="collaborations-title"
            eyebrow="History"
            title="Collaboration history"
            description="Brands, projects, and teams I have worked with in Web3."
          />
          <CollaborationList />
        </section>
      </div>
      <KeepExploring current={page.href} />
    </>
  );
}

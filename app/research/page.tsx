import type { Metadata } from "next";
import { KeepExploring } from "@/components/sections/explore";
import { PublicationCount, PublicationList } from "@/components/sections/publications";
import { CurrentResearchCard } from "@/components/sections/research";
import { BlockHeading } from "@/components/ui/block-heading";
import { PageHeader } from "@/components/ui/page-header";
import { pages } from "@/data/portfolio";
import { pageMetadata } from "@/lib/metadata";

const page = pages.research;

export const metadata: Metadata = pageMetadata(page);

export default function ResearchPage() {
  return (
    <>
      <PageHeader page={page} />
      <div className="container-page pb-24 sm:pb-28">
        <CurrentResearchCard />

        <section
          id="publications"
          aria-labelledby="publications-title"
          tabIndex={-1}
          className="mt-24 outline-none sm:mt-32"
        >
          <BlockHeading
            id="publications-title"
            eyebrow="Publications"
            title="Published work"
            aside={<PublicationCount />}
          />
          <PublicationList />
        </section>
      </div>
      <KeepExploring current={page.href} />
    </>
  );
}

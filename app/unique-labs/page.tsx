import type { Metadata } from "next";
import { KeepExploring } from "@/components/sections/explore";
import { FounderCard, UniqueLabs } from "@/components/sections/unique-labs";
import { CollaborationList } from "@/components/sections/web3";
import { JsonLd } from "@/components/seo/json-ld";
import { BlockHeading } from "@/components/ui/block-heading";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { collaborations, pages } from "@/data/portfolio";
import { buildPageJsonLd, ids, organizationNode } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbTrail } from "@/lib/pages";

const page = pages.uniqueLabs;

export const metadata: Metadata = pageMetadata(page);

export default function UniqueLabsPage() {
  return (
    <>
      <JsonLd
        data={buildPageJsonLd({
          page,
          type: "AboutPage",
          about: { "@id": ids.organization },
          mainEntity: { "@id": ids.organization },
          nodes: [organizationNode()],
        })}
      />
      <div id="top" className="pt-28 sm:pt-32">
        <div className="container-page">
          <Breadcrumbs trail={breadcrumbTrail(page)} />
        </div>
        <UniqueLabs as="h1" />

        {collaborations.length > 0 ? (
          <section
            id="collaborations"
            aria-labelledby="collaborations-title"
            tabIndex={-1}
            className="container-page pt-12 outline-none"
          >
            <BlockHeading
              id="collaborations-title"
              eyebrow="Track record"
              title="Collaboration history"
              description={`Exchanges, launchpads, and projects worked with in Web3 — ${collaborations.length} so far.`}
            />
            <CollaborationList />
          </section>
        ) : null}

        <section
          aria-labelledby="founder-title"
          className="container-page pb-24 pt-24 sm:pb-28 sm:pt-28"
        >
          <BlockHeading id="founder-title" eyebrow="Founder" title="Co-founded by Shahriar Ahmed" />
          <FounderCard />
        </section>
      </div>
      <KeepExploring current={page.href} />
    </>
  );
}

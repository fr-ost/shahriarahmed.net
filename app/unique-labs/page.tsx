import type { Metadata } from "next";
import { KeepExploring } from "@/components/sections/explore";
import { FounderCard, UniqueLabs } from "@/components/sections/unique-labs";
import { JsonLd } from "@/components/seo/json-ld";
import { BlockHeading } from "@/components/ui/block-heading";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { pages } from "@/data/portfolio";
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

        <section aria-labelledby="founder-title" className="container-page pb-24 pt-12 sm:pb-28">
          <BlockHeading id="founder-title" eyebrow="Founder" title="Co-founded by Shahriar Ahmed" />
          <FounderCard />
        </section>
      </div>
      <KeepExploring current={page.href} />
    </>
  );
}

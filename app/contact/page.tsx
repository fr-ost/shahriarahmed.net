import type { Metadata } from "next";
import { ContactBody, ContactTopics } from "@/components/sections/contact";
import { KeepExploring } from "@/components/sections/explore";
import { JsonLd } from "@/components/seo/json-ld";
import { BlockHeading } from "@/components/ui/block-heading";
import { PageHeader } from "@/components/ui/page-header";
import { pages } from "@/data/portfolio";
import { buildPageJsonLd, ids, personNode } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

const page = pages.contact;

export const metadata: Metadata = pageMetadata(page);

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={buildPageJsonLd({
          page,
          type: "ContactPage",
          mainEntity: { "@id": ids.person },
          nodes: [personNode()],
        })}
      />
      <PageHeader page={page} />
      <div className="container-page pb-24 sm:pb-28">
        <ContactBody groupHeading="h2" />

        <section aria-labelledby="topics-title" className="mt-24 sm:mt-32">
          <BlockHeading id="topics-title" eyebrow="Topics" title="What to get in touch about" />
          <ContactTopics />
        </section>
      </div>
      <KeepExploring current={page.href} />
    </>
  );
}

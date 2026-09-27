import type { Metadata } from "next";
import { AboutBody, AboutHighlights } from "@/components/sections/about";
import { KeepExploring } from "@/components/sections/explore";
import { JsonLd } from "@/components/seo/json-ld";
import { BlockHeading } from "@/components/ui/block-heading";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { pages, person } from "@/data/portfolio";
import { buildPageJsonLd, ids, organizationNode, personNode } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

const page = pages.about;

export const metadata: Metadata = pageMetadata(page, { profile: true });

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={buildPageJsonLd({
          page,
          type: "AboutPage",
          mainEntity: { "@id": ids.person },
          nodes: [personNode(), organizationNode()],
        })}
      />
      <PageHeader page={page} />
      <div className="container-page pb-24 sm:pb-28">
        <AboutBody />

        <section aria-labelledby="highlights-title" className="mt-24 sm:mt-32">
          <BlockHeading
            id="highlights-title"
            eyebrow="Highlights"
            title="Research, education, and Unique Labs"
          />
          <AboutHighlights />
        </section>

        <Reveal className="mt-16 flex flex-col gap-6 rounded-[2rem] border border-line p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-fg sm:text-3xl">
              Let’s work together
            </h2>
            <p className="mt-2 max-w-xl text-lg leading-relaxed text-muted">
              Research collaborations, Unique Labs projects, or technology work — get in touch.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={pages.contact.href} icon="arrow-right">
              Contact {person.givenName}
            </ButtonLink>
            <ButtonLink href={`mailto:${person.email}`} variant="secondary" icon="mail">
              Email me
            </ButtonLink>
          </div>
        </Reveal>
      </div>
      <KeepExploring current={page.href} />
    </>
  );
}

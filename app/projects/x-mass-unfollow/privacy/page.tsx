import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { LegalDocument } from "@/components/ui/legal-document";
import { PageHeader } from "@/components/ui/page-header";
import { pages } from "@/data/portfolio";
import { unfollowX, unfollowXPrivacy, unfollowXPrivacyUpdated } from "@/data/unfollowx";
import { buildPageJsonLd, softwareNode } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { prettyUrl } from "@/lib/utils";

// At its old address: the extension was called X Mass Unfollow when the
// Chrome Web Store listing first linked here.
const page = pages.unfollowXPrivacy;
const parents = [pages.projects];

export const metadata: Metadata = pageMetadata(page);

export default function UnfollowXPrivacyPage() {
  const software = softwareNode(unfollowX);
  return (
    <>
      <JsonLd
        data={buildPageJsonLd({
          page,
          parents,
          about: { "@id": software["@id"] },
          nodes: [software],
        })}
      />
      <PageHeader page={page} parents={parents}>
        <ButtonLink href={unfollowX.website} variant="secondary" size="sm" className="mt-8">
          {prettyUrl(unfollowX.website)}
        </ButtonLink>
      </PageHeader>
      <div className="container-page pb-24 sm:pb-28">
        <LegalDocument sections={unfollowXPrivacy} updated={unfollowXPrivacyUpdated} />
      </div>
    </>
  );
}

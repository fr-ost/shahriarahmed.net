import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { LegalDocument } from "@/components/ui/legal-document";
import { PageHeader } from "@/components/ui/page-header";
import { pages } from "@/data/portfolio";
import {
  xMassUnfollow as product,
  xMassUnfollowPrivacy,
  xMassUnfollowPrivacyUpdated,
} from "@/data/x-mass-unfollow";
import { buildPageJsonLd, softwareId, softwareReference } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

const page = pages.xMassUnfollowPrivacy;
const productPage = pages.xMassUnfollow;
const parents = [pages.projects, productPage];

export const metadata: Metadata = pageMetadata(page, { image: product.shareImage });

export default function XMassUnfollowPrivacyPage() {
  return (
    <>
      <JsonLd
        data={buildPageJsonLd({
          page,
          parents,
          about: { "@id": softwareId(productPage) },
          nodes: [softwareReference(product, productPage)],
        })}
      />
      <PageHeader page={page} parents={parents}>
        <ButtonLink
          href={productPage.href}
          variant="secondary"
          size="sm"
          icon="arrow-right"
          className="mt-8"
        >
          About the extension
        </ButtonLink>
      </PageHeader>
      <div className="container-page pb-24 sm:pb-28">
        <LegalDocument sections={xMassUnfollowPrivacy} updated={xMassUnfollowPrivacyUpdated} />
      </div>
    </>
  );
}

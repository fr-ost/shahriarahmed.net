import type { Metadata } from "next";
import { LegalDocument } from "@/components/ui/legal-document";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { legalUpdated, privacyPolicy } from "@/data/legal";
import { pages } from "@/data/portfolio";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

const page = pages.privacy;

export const metadata: Metadata = pageMetadata(page);

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={buildPageJsonLd({ page })} />
      <PageHeader page={page} />
      <div className="container-page pb-24 sm:pb-28">
        <LegalDocument sections={privacyPolicy} updated={legalUpdated} />
      </div>
    </>
  );
}

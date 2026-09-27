import type { Metadata } from "next";
import { LegalDocument } from "@/components/ui/legal-document";
import { PageHeader } from "@/components/ui/page-header";
import { dmcaPolicy, legalUpdated } from "@/data/legal";
import { pages } from "@/data/portfolio";
import { pageMetadata } from "@/lib/metadata";

const page = pages.dmca;

export const metadata: Metadata = pageMetadata(page);

export default function DmcaPage() {
  return (
    <>
      <PageHeader page={page} />
      <div className="container-page pb-24 sm:pb-28">
        <LegalDocument sections={dmcaPolicy} updated={legalUpdated} />
      </div>
    </>
  );
}

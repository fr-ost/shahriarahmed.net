import type { Metadata } from "next";
import { KeepExploring } from "@/components/sections/explore";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { pages, projectCategories, projects } from "@/data/portfolio";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

const page = pages.projects;

export const metadata: Metadata = pageMetadata(page);

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={buildPageJsonLd({ page, type: "CollectionPage" })} />
      <PageHeader page={page} />
      <div className="container-page pb-24 sm:pb-28">
        <ProjectsGrid projects={projects} categories={projectCategories} />
      </div>
      <KeepExploring current={page.href} />
    </>
  );
}

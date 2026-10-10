import type { Metadata } from "next";
import { KeepExploring } from "@/components/sections/explore";
import { ArchivedProjects, ProjectsGrid } from "@/components/sections/projects-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { BlockHeading } from "@/components/ui/block-heading";
import { PageHeader } from "@/components/ui/page-header";
import { archivedProjects, pages, projectCategories, projects } from "@/data/portfolio";
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
      <section
        id="archived"
        aria-labelledby="archived-title"
        className="border-t border-line py-20 sm:py-24"
      >
        <div className="container-page">
          <BlockHeading
            id="archived-title"
            eyebrow="Archived"
            title="Archived projects (discontinued)"
            description="Projects that are no longer running, kept here for reference."
          />
          <ArchivedProjects projects={archivedProjects} />
        </div>
      </section>
      <KeepExploring current={page.href} />
    </>
  );
}

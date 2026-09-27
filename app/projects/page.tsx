import type { Metadata } from "next";
import { KeepExploring } from "@/components/sections/explore";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { PageHeader } from "@/components/ui/page-header";
import { pages, projectCategories, projects } from "@/data/portfolio";
import { pageMetadata } from "@/lib/metadata";

const page = pages.projects;

export const metadata: Metadata = pageMetadata(page);

export default function ProjectsPage() {
  return (
    <>
      <PageHeader page={page} />
      <div className="container-page pb-24 sm:pb-28">
        <ProjectsGrid projects={projects} categories={projectCategories} />
      </div>
      <KeepExploring current={page.href} />
    </>
  );
}

import { Section, SectionHeading } from "@/components/ui/section";
import { projectCategories, projects, sections } from "@/data/portfolio";
import { ProjectsGrid } from "./projects-grid";

export function Projects() {
  return (
    <Section meta={sections.projects}>
      <SectionHeading meta={sections.projects} />
      <ProjectsGrid projects={projects} categories={projectCategories} />
    </Section>
  );
}

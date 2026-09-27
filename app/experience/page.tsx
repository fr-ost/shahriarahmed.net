import type { Metadata } from "next";
import {
  ExperienceAside,
  ExperienceTabs,
  ExperienceTimeline,
} from "@/components/sections/experience";
import { KeepExploring } from "@/components/sections/explore";
import { PageHeader } from "@/components/ui/page-header";
import { experience, pages } from "@/data/portfolio";
import { pageMetadata } from "@/lib/metadata";

const page = pages.experience;

export const metadata: Metadata = pageMetadata(page);

export default function ExperiencePage() {
  return (
    <>
      <PageHeader page={page}>
        <ExperienceTabs active="experience" />
      </PageHeader>
      <div className="container-page pb-24 sm:pb-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <ExperienceTimeline entries={experience} />
          </div>
          <div className="lg:col-span-4">
            <ExperienceAside />
          </div>
        </div>
      </div>
      <KeepExploring current={page.href} />
    </>
  );
}

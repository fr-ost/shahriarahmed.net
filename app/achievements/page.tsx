import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AchievementsList } from "@/components/sections/achievements";
import { KeepExploring } from "@/components/sections/explore";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { achievements, pages } from "@/data/portfolio";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

const page = pages.achievements;

export const metadata: Metadata = pageMetadata(page);

export default function AchievementsPage() {
  // The page appears (and is linked) once there is an achievement to show.
  if (achievements.length === 0) notFound();

  return (
    <>
      <JsonLd data={buildPageJsonLd({ page })} />
      <PageHeader page={page} />
      <div className="container-page pb-24 sm:pb-28">
        <AchievementsList />
      </div>
      <KeepExploring current={page.href} />
    </>
  );
}

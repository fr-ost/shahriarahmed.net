import type { MetadataRoute } from "next";
import { legalUpdated } from "@/data/legal";
import { pages, person, site } from "@/data/portfolio";
import { xMassUnfollow, xMassUnfollowPrivacyUpdated } from "@/data/x-mass-unfollow";
import { contentPages } from "@/lib/pages";
import { productScreenshots } from "@/lib/products";

/**
 * Every page of the site, for search engines. Pages that show the portrait
 * or product screenshots also list them, so they can appear in image search.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const portrait = `${site.url}${person.portrait.src}`;
  const entry = (
    href: string,
    priority: number,
    changeFrequency: "monthly" | "yearly",
    extra: Partial<MetadataRoute.Sitemap[number]> = {},
  ) => ({
    url: href === "/" ? site.url : `${site.url}${href}`,
    lastModified,
    changeFrequency,
    priority,
    ...extra,
  });

  return [
    entry("/", 1, "monthly", { images: [portrait] }),
    entry(pages.about.href, 0.9, "monthly", { images: [portrait] }),
    entry(pages.uniqueLabs.href, 0.9, "monthly", { images: [portrait] }),
    ...contentPages.map((page) => entry(page.href, 0.8, "monthly")),
    entry(pages.xMassUnfollow.href, 0.8, "monthly", {
      images: productScreenshots(xMassUnfollow).map((image) => `${site.url}${image.src}`),
    }),
    entry(pages.contact.href, 0.7, "monthly"),
    ...[pages.privacy, pages.dmca].map((page) =>
      entry(page.href, 0.3, "yearly", { lastModified: new Date(legalUpdated.dateTime) }),
    ),
    entry(pages.xMassUnfollowPrivacy.href, 0.3, "yearly", {
      lastModified: new Date(xMassUnfollowPrivacyUpdated.dateTime),
    }),
  ];
}

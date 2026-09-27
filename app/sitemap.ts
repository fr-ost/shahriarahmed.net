import type { MetadataRoute } from "next";
import { pages, site } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const contentPages = [
    pages.research,
    pages.projects,
    pages.experience,
    pages.web3,
    pages.achievements,
  ];

  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    ...contentPages.map((page) => ({
      url: `${site.url}${page.href}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...[pages.privacy, pages.dmca].map((page) => ({
      url: `${site.url}${page.href}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}

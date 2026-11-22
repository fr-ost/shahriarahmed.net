import type { MetadataRoute } from "next";
import { legalUpdated } from "@/data/legal";
import { pages, person } from "@/data/portfolio";
import { productDetails } from "@/data/product-details";
import { sortedPosts } from "@/data/posts";
import { extensions } from "@/data/products";
import { unfollowXPrivacyUpdated } from "@/data/unfollowx";
import { absolute } from "@/lib/json-ld";
import { pageLastModified } from "@/lib/lastmod";
import { contentPages } from "@/lib/pages";

/**
 * Every page of the site, for search engines. `lastmod` is when the page's
 * content last changed (from git, or the date written on legal pages) and
 * is left out when unknown. `changefreq` and `priority` are omitted:
 * Google ignores them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const portrait = absolute(person.portrait.src);
  const entry = (
    href: string,
    extra: Partial<MetadataRoute.Sitemap[number]> = {},
  ): MetadataRoute.Sitemap[number] => {
    const lastModified = pageLastModified(href);
    return {
      url: absolute(href),
      ...(lastModified ? { lastModified } : {}),
      ...extra,
    };
  };
  const products = extensions.filter((item) => item.slug);

  return [
    entry("/", { images: [portrait] }),
    entry(pages.about.href, { images: [portrait] }),
    entry(pages.uniqueLabs.href),
    ...contentPages.map((page) => entry(page.href)),
    entry(pages.researchPaper.href),
    ...products.map((item) => {
      const cover = item.slug ? productDetails[item.slug]?.cover : undefined;
      return entry(`/projects/${item.slug}`, cover ? { images: [absolute(cover.src)] } : {});
    }),
    entry(pages.bcsBot.href),
    ...sortedPosts.map((post) =>
      entry(`/blog/${post.slug}`, { lastModified: post.updated ?? post.published }),
    ),
    entry(pages.cv.href),
    entry(pages.now.href),
    entry(pages.contact.href),
    ...[pages.privacy, pages.dmca].map((page) =>
      entry(page.href, { lastModified: legalUpdated.dateTime }),
    ),
    entry(pages.unfollowXPrivacy.href, { lastModified: unfollowXPrivacyUpdated.dateTime }),
  ];
}

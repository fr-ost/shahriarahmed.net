import { pages } from "@/data/portfolio";
import type { PageMeta } from "@/lib/types";

/** Pages with their own content, in the order they are offered. */
export const contentPages: PageMeta[] = [
  pages.research,
  pages.projects,
  pages.experience,
  pages.web3,
  pages.achievements,
];

/** Pages about the site and its owner, listed beside the legal pages. */
export const infoPages: PageMeta[] = [pages.about, pages.contact, pages.privacy, pages.dmca];

/** Heading text of a page, e.g. "Selected Projects". */
export function pageTitle(page: PageMeta): string {
  return page.titleAccent ? `${page.title} ${page.titleAccent}` : page.title;
}

/** Breadcrumb from the homepage to `page`, through any `parents`. */
export function breadcrumbTrail(page: PageMeta, parents: PageMeta[] = []) {
  return [
    { label: "Home", href: "/" },
    ...parents.map((parent) => ({ label: parent.label, href: parent.href })),
    { label: page.label, href: page.href },
  ];
}

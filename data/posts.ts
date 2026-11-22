/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Blog posts.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  The blog stays hidden — /blog and /blog/rss.xml return 404, and nothing
 *  links to them — until the first post is added here. Then it appears in
 *  the footer, the sitemap and llms.txt by itself.
 *
 *  `body` takes the Markdown subset of components/ui/markdown.tsx:
 *  paragraphs, "## " headings (all rendered as h2), "- " and "1. " lists, **bold**
 *  and [links](/research). Dates are ISO (YYYY-MM-DD). Write only what is
 *  true; cite sources with links.
 *
 *  Example:
 *  {
 *    slug: "koc-marketing-web3",
 *    title: "What is KOC marketing in Web3 (and how it differs from KOL)",
 *    description: "…about 150 characters for search results…",
 *    published: "2026-12-01",
 *    tags: ["Web3", "Marketing"],
 *    body: `First paragraph…\n\n## A heading\n\nMore text…`,
 *  }
 */

export interface Post {
  slug: string;
  title: string;
  /** For search results and the feed: about 150 characters. */
  description: string;
  published: string;
  /** When the post last changed meaningfully, if after `published`. */
  updated?: string;
  tags?: string[];
  body: string;
}

export const posts: Post[] = [];

/** Newest first. */
export const sortedPosts = [...posts].sort((a, b) => b.published.localeCompare(a.published));

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

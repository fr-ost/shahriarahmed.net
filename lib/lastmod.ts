/**
 * When each page last changed, from git history, for the sitemap's
 * `lastmod` and the pages' `dateModified`.
 *
 * Runs at build time only (the site is static). A date is reported only
 * when git knows it: without git, or when the latest commit touching a
 * page is the cut-off of a shallow clone (whose date is not the real one),
 * the date is left out rather than guessed.
 */

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

/** Commits at the edge of a shallow clone: their file history is cut off. */
const shallowEdge: Set<string> = (() => {
  try {
    const file = join(root, ".git", "shallow");
    return new Set(existsSync(file) ? readFileSync(file, "utf8").split(/\s+/).filter(Boolean) : []);
  } catch {
    return new Set();
  }
})();

const cache = new Map<string, string | undefined>();

/** ISO date of the latest commit touching any of `paths`, if git knows it. */
export function lastModified(paths: string[]): string | undefined {
  const key = paths.join("\0");
  if (cache.has(key)) return cache.get(key);
  let date: string | undefined;
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%H %cI", "--", ...paths], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    const [hash, iso] = out.split(" ");
    if (hash && iso && !shallowEdge.has(hash)) date = iso;
  } catch {
    date = undefined;
  }
  cache.set(key, date);
  return date;
}

/** Content shared by many pages: the profile data and the page shell. */
const shared = ["data/portfolio.ts", "components/sections", "components/ui"];

/** The files each page's content comes from. */
const sources: Record<string, string[]> = {
  "/": ["app/page.tsx", "data/products.ts", "data/unfollowx.ts", ...shared],
  "/about": ["app/about", ...shared],
  "/research": ["app/research/page.tsx", ...shared],
  "/research/mcl-1-azo-hydrazone-paper": [
    "app/research/mcl-1-azo-hydrazone-paper",
    "data/portfolio.ts",
  ],
  "/projects": ["app/projects/page.tsx", "data/products.ts", "data/unfollowx.ts", ...shared],
  "/projects/bcs-newspaper-brief": ["app/projects/bcs-newspaper-brief", "data/portfolio.ts"],
  "/experience": ["app/experience", ...shared],
  "/experience/web3": ["app/experience/web3", ...shared],
  "/unique-labs": ["app/unique-labs", "data/products.ts", ...shared],
  "/achievements": ["app/achievements", ...shared],
  "/contact": ["app/contact", ...shared],
  "/cv": ["app/cv", ...shared],
  "/now": ["app/now", "data/now.ts"],
  "/blog": ["app/blog", "data/posts.ts"],
  "/privacy": ["app/privacy", "data/legal.ts"],
  "/dmca": ["app/dmca", "data/legal.ts"],
};

/** Product pages share one template and their data files. */
const productSources = [
  "app/projects/[slug]",
  "data/products.ts",
  "data/product-details.ts",
  "data/unfollowx.ts",
];

/** When the page at `href` last changed, if known. */
export function pageLastModified(href: string): string | undefined {
  const paths = sources[href] ?? (href.startsWith("/projects/") ? productSources : null);
  return paths ? lastModified(paths) : undefined;
}

import type { Metadata } from "next";
import { person, site, socials } from "@/data/portfolio";
import { socialImage } from "@/lib/social-image";
import type { PageMeta } from "@/lib/types";

const xHandle = socials.find((social) => social.id === "x")?.handle;

// A page that sets its own `openGraph` or `twitter` replaces the root
// layout's, so the share images generated at the root are added back here.
const imageDetails = {
  alt: socialImage.alt,
  type: socialImage.contentType,
  ...socialImage.size,
};

/** Title, description, canonical URL and social cards for a standalone page. */
export function pageMetadata(page: PageMeta): Metadata {
  const title = page.titleAccent ? `${page.title} ${page.titleAccent}` : page.title;
  const fullTitle = `${title} — ${person.name}`;

  return {
    title,
    description: page.description,
    alternates: { canonical: page.href },
    openGraph: {
      type: "website",
      url: page.href,
      siteName: person.name,
      title: fullTitle,
      description: page.description,
      locale: site.locale,
      images: [{ url: "/opengraph-image", ...imageDetails }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: page.description,
      creator: xHandle,
      images: [{ url: "/twitter-image", ...imageDetails }],
    },
  };
}

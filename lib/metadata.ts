import type { Metadata } from "next";
import { person, site, socials } from "@/data/portfolio";
import { pageTitle } from "@/lib/pages";
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
export function pageMetadata(page: PageMeta, options: { profile?: boolean } = {}): Metadata {
  const fullTitle = page.seoTitle ?? `${pageTitle(page)} — ${person.name}`;
  const description = page.seoDescription ?? page.description;
  const common = {
    url: page.href,
    siteName: person.name,
    title: fullTitle,
    description,
    locale: site.locale,
    images: [{ url: "/opengraph-image", ...imageDetails }],
  };

  return {
    // An explicit SEO title already names the site owner, so skip the template.
    title: page.seoTitle ? { absolute: page.seoTitle } : pageTitle(page),
    description,
    alternates: { canonical: page.href },
    openGraph: options.profile
      ? {
          ...common,
          type: "profile",
          firstName: person.givenName,
          lastName: person.familyName,
        }
      : { ...common, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: xHandle,
      images: [{ url: "/twitter-image", ...imageDetails }],
    },
  };
}

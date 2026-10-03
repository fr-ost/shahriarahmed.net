import type { Metadata } from "next";
import { person, site, socials } from "@/data/portfolio";
import { pageTitle } from "@/lib/pages";
import { socialImage } from "@/lib/social-image";
import type { ImageAsset, PageMeta } from "@/lib/types";

const xHandle = socials.find((social) => social.id === "x")?.handle;

// A page that sets its own `openGraph` or `twitter` replaces the root
// layout's, so the share images generated at the root are added back here.
const imageDetails = {
  alt: socialImage.alt,
  type: socialImage.contentType,
  ...socialImage.size,
};

const imageTypes: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

/** A page's own share image, in place of the site-wide one. */
function shareImage(image: ImageAsset) {
  return {
    url: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
    type: imageTypes[image.src.split(".").pop() ?? ""],
  };
}

interface PageMetadataOptions {
  /** Open Graph "profile" card, for pages about the site owner. */
  profile?: boolean;
  /** Share image for this page (1200 × 630), e.g. a product screenshot. */
  image?: ImageAsset;
}

/** Title, description, canonical URL and social cards for a standalone page. */
export function pageMetadata(page: PageMeta, options: PageMetadataOptions = {}): Metadata {
  const fullTitle = page.seoTitle ?? `${pageTitle(page)} — ${person.name}`;
  const description = page.seoDescription ?? page.description;
  const common = {
    url: page.href,
    siteName: person.name,
    title: fullTitle,
    description,
    locale: site.locale,
    images: [
      options.image ? shareImage(options.image) : { url: "/opengraph-image", ...imageDetails },
    ],
  };

  return {
    // An explicit SEO title already names the site owner, so skip the template.
    title: page.seoTitle ? { absolute: page.seoTitle } : pageTitle(page),
    description,
    ...(page.keywords ? { keywords: page.keywords } : {}),
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
      images: [
        options.image ? shareImage(options.image) : { url: "/twitter-image", ...imageDetails },
      ],
    },
  };
}

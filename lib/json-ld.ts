import {
  about,
  education,
  pages,
  person,
  publications,
  site,
  skillGroups,
  socials,
  uniqueLabs,
} from "@/data/portfolio";
import { breadcrumbTrail, pageTitle } from "@/lib/pages";
import { productScreenshots } from "@/lib/products";
import type { Faq, ImageAsset, PageMeta, ProductShowcase } from "@/lib/types";

/**
 * schema.org structured data (JSON-LD). Every page describes itself and
 * points at the same person, website and company by `@id`, so search
 * engines connect the pages, the name variants and the profiles to one
 * entity. Only verified facts from data/portfolio.ts are used.
 */

export const ids = {
  person: `${site.url}/#person`,
  website: `${site.url}/#website`,
  organization: `${site.url}${pages.uniqueLabs.href}#organization`,
};

/** Wikipedia pages that identify institutions unambiguously. */
const institutionSameAs: Record<string, string> = {
  "University of Rajshahi": "https://en.wikipedia.org/wiki/University_of_Rajshahi",
};

// Evaluated at build time, like the rest of the static site.
const buildDate = new Date().toISOString();

const absolute = (href: string) => (href === "/" ? site.url : `${site.url}${href}`);

/** The person's website, as given for the Person schema. */
const personUrl = `${site.url}/`;

export function personNode() {
  const sameAs = socials
    .filter((social) => social.id !== "email" && social.href)
    .map((social) => social.href);
  const orcid = socials.find((social) => social.id === "orcid");
  const knowsAbout = [
    person.field,
    ...about.focusAreas,
    ...skillGroups.flatMap((group) => group.skills),
    ...uniqueLabs.whatWeBuild.map((service) => service.title),
  ];

  return {
    "@type": "Person",
    "@id": ids.person,
    name: person.name,
    alternateName: [person.fullName],
    url: personUrl,
    image: {
      "@type": "ImageObject",
      url: `${site.url}${person.portrait.src}`,
      caption: person.portrait.alt,
    },
    email: `mailto:${person.email}`,
    jobTitle: person.jobTitle,
    description: site.description,
    // Named here so it resolves on pages that do not include the company node.
    worksFor: { "@type": "Organization", "@id": ids.organization, name: uniqueLabs.name },
    affiliation: education.map((entry) => ({
      "@type": "CollegeOrUniversity",
      name: entry.institution,
      ...(institutionSameAs[entry.institution]
        ? { sameAs: institutionSameAs[entry.institution] }
        : {}),
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: person.location.city,
      addressCountry: person.location.countryCode,
    },
    knowsAbout: [...new Set(knowsAbout)],
    sameAs,
    ...(orcid?.href
      ? {
          identifier: {
            "@type": "PropertyValue",
            propertyID: "ORCID",
            value: orcid.handle,
            url: orcid.href,
          },
        }
      : {}),
  };
}

/** Short reference to the person, for pages that are not about them. */
function personReference() {
  return {
    "@type": "Person",
    "@id": ids.person,
    name: person.name,
    alternateName: [person.fullName],
    url: personUrl,
  };
}

export function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ids.organization,
    name: uniqueLabs.name,
    url: uniqueLabs.website ?? absolute(pages.uniqueLabs.href),
    description: pages.uniqueLabs.description,
    slogan: uniqueLabs.tagline,
    founder: { "@id": ids.person },
    knowsAbout: [
      ...new Set([
        ...uniqueLabs.whatWeBuild.map((service) => service.title),
        ...uniqueLabs.focusAreas,
      ]),
    ],
    ...(uniqueLabs.github ? { sameAs: [uniqueLabs.github] } : {}),
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: site.url,
    name: person.name,
    alternateName: [person.fullName, site.domain],
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": ids.person },
  };
}

export function articleNodes() {
  return publications
    .filter((publication) => publication.title)
    .map((publication) => ({
      "@type": "ScholarlyArticle",
      "@id": publication.url,
      headline: publication.title,
      url: publication.url,
      sameAs: publication.url,
      identifier: { "@type": "PropertyValue", propertyID: "DOI", value: publication.doi },
      author: publication.authors
        ? publication.authors.map((name) =>
            name.includes(person.name) ? { "@id": ids.person } : { "@type": "Person", name },
          )
        : { "@id": ids.person },
      ...(publication.abstract ? { abstract: publication.abstract } : {}),
      ...(publication.journal
        ? { isPartOf: { "@type": "Periodical", name: publication.journal } }
        : {}),
      ...(publication.published ? { datePublished: publication.published.dateTime } : {}),
    }));
}

/** Structured data for the homepage. */
export function buildHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteNode(),
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profile`,
        url: site.url,
        name: site.title,
        description: site.description,
        inLanguage: "en",
        dateModified: buildDate,
        mainEntity: { "@id": ids.person },
        isPartOf: { "@id": ids.website },
      },
      personNode(),
      organizationNode(),
      ...articleNodes(),
    ],
  };
}

/** `@id` of the software a product page describes. */
export function softwareId(page: PageMeta) {
  return `${absolute(page.href)}#software`;
}

/**
 * A browser extension, as a SoftwareApplication. There is no rating: Google
 * does not accept ratings copied from another site, such as a web store.
 */
export function softwareNode(product: ProductShowcase, page: PageMeta) {
  return {
    "@type": "SoftwareApplication",
    "@id": softwareId(page),
    name: product.name,
    alternateName: [product.fullName],
    description: product.description,
    url: absolute(page.href),
    image: absolute(product.icon.src),
    screenshot: productScreenshots(product).map((image) => ({
      "@type": "ImageObject",
      url: absolute(image.src),
      caption: image.alt,
      width: image.width,
      height: image.height,
    })),
    applicationCategory: "BrowserApplication",
    applicationSubCategory: "Chrome extension",
    operatingSystem: "Windows, macOS, Linux, ChromeOS",
    browserRequirements: `Requires Google Chrome ${product.minimumChrome} or later`,
    softwareVersion: product.version,
    releaseNotes: product.whatsNew.join(" "),
    featureList: product.features.map((feature) => feature.title),
    permissions: product.permissions.map((permission) => permission.name).join(", "),
    installUrl: product.storeUrl,
    downloadUrl: product.storeUrl,
    sameAs: [product.storeUrl],
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", url: product.storeUrl },
    inLanguage: "en",
    author: { "@id": ids.person },
    publisher: { "@type": "Organization", "@id": ids.organization, name: uniqueLabs.name },
  };
}

/** Short reference to the software, for pages about it such as its privacy policy. */
export function softwareReference(product: ProductShowcase, page: PageMeta) {
  return {
    "@type": "SoftwareApplication",
    "@id": softwareId(page),
    name: product.name,
    url: absolute(page.href),
  };
}

/** Questions answered on a page; the answers must also be visible on it. */
export function faqNode(page: PageMeta, faqs: Faq[]) {
  const url = absolute(page.href);
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    name: `${page.label}: questions & answers`,
    inLanguage: "en",
    isPartOf: { "@id": `${url}#webpage` },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

type PageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "ItemPage";

interface PageJsonLdOptions {
  page: PageMeta;
  parents?: PageMeta[];
  type?: PageType;
  /** What the page is about; defaults to the site owner. */
  about?: { "@id": string };
  mainEntity?: { "@id": string };
  /** The page's main image, e.g. a product screenshot. */
  image?: ImageAsset;
  /** Extra nodes, e.g. the full person or company description. */
  nodes?: object[];
}

/** Structured data for a standalone page, including its breadcrumb. */
export function buildPageJsonLd({
  page,
  parents = [],
  type = "WebPage",
  about: subject = { "@id": ids.person },
  mainEntity,
  image,
  nodes = [],
}: PageJsonLdOptions) {
  const url = absolute(page.href);
  const breadcrumbId = `${url}#breadcrumb`;
  const includesPerson = nodes.some((node) => (node as { "@id"?: string })["@id"] === ids.person);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name: page.seoTitle ?? `${pageTitle(page)} — ${person.name}`,
        description: page.seoDescription ?? page.description,
        inLanguage: "en",
        dateModified: buildDate,
        isPartOf: { "@id": ids.website },
        about: subject,
        ...(mainEntity ? { mainEntity } : {}),
        ...(image
          ? {
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: absolute(image.src),
                caption: image.alt,
                width: image.width,
                height: image.height,
              },
            }
          : {}),
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: breadcrumbTrail(page, parents).map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: absolute(item.href),
        })),
      },
      { "@type": "WebSite", "@id": ids.website, url: site.url, name: person.name },
      ...(includesPerson ? [] : [personReference()]),
      ...nodes,
    ],
  };
}

/** Serialise for a <script type="application/ld+json"> tag, escaping `<`. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

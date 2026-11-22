import {
  education,
  experience,
  pages,
  person,
  publications,
  site,
  socials,
  uniqueLabs,
} from "@/data/portfolio";
import { pageLastModified } from "@/lib/lastmod";
import { breadcrumbTrail, pageTitle } from "@/lib/pages";
import type {
  BrowserExtension,
  ImageAsset,
  PageMeta,
  ProductDetail,
  ProjectItem,
} from "@/lib/types";

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

/** `dateModified` from git history, when known (see lib/lastmod.ts). */
function dateModified(href: string) {
  const date = pageLastModified(href);
  return date ? { dateModified: date } : {};
}

/** Absolute URL of a page of this site. */
export const absolute = (href: string) => (href === "/" ? site.url : `${site.url}${href}`);

/** The person's website, as given for the Person schema. */
const personUrl = `${site.url}/`;

/** A university, linked to its Wikipedia page where known. */
function university(name: string) {
  return {
    "@type": "CollegeOrUniversity",
    name,
    ...(institutionSameAs[name] ? { sameAs: institutionSameAs[name] } : {}),
  };
}

/** "Jul 2025 — Sep 2026" → { startDate: "2025-07", endDate: "2026-09" }. */
function periodDates(period: string | null) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const parse = (part?: string) => {
    const match = part?.trim().match(/^(?:([A-Z][a-z]{2}) )?(\d{4})$/);
    if (!match) return undefined;
    const month = match[1] ? months.indexOf(match[1]) + 1 : 0;
    return month ? `${match[2]}-${String(month).padStart(2, "0")}` : match[2];
  };
  const [start, end] = (period ?? "").split("—");
  const startDate = parse(start);
  const endDate = parse(end);
  return { ...(startDate ? { startDate } : {}), ...(endDate ? { endDate } : {}) };
}

/** Research and student organisations, as roles with their dates. */
function memberships() {
  return experience
    .filter((entry) => ["cbcro", "asm"].includes(entry.id))
    .map((entry) => ({
      "@type": "OrganizationRole",
      roleName: entry.role.replace(/ \(former\)$/, ""),
      ...periodDates(entry.period),
      memberOf: { "@type": "Organization", name: entry.organization },
    }));
}

export function personNode() {
  const sameAs = [
    ...socials
      .filter((social) => social.id !== "email" && social.href)
      .map((social) => social.href),
    ...(uniqueLabs.founderProfile ? [uniqueLabs.founderProfile] : []),
  ];
  const orcid = socials.find((social) => social.id === "orcid");
  const completed = education.filter((entry) => entry.status === "Completed");
  const current = education.filter((entry) => entry.status !== "Completed");

  return {
    "@type": "Person",
    "@id": ids.person,
    name: person.name,
    // Searches for "Shahriar" alone should match this person too.
    alternateName: [person.fullName, person.givenName],
    givenName: person.givenName,
    familyName: person.familyName,
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
    hasOccupation: [
      {
        "@type": "Occupation",
        name: person.jobTitle,
        description: `${person.jobTitle} of ${uniqueLabs.name}: KOC and consultancy, digital marketing, blockchain development and Chrome extensions.`,
      },
      {
        "@type": "Occupation",
        name: "Researcher",
        occupationalCategory: person.field,
      },
    ],
    alumniOf: [...new Set(completed.map((entry) => entry.institution))].map(university),
    affiliation: [...new Set(current.map((entry) => entry.institution))].map(university),
    memberOf: memberships(),
    knowsLanguage: person.languages,
    address: {
      "@type": "PostalAddress",
      addressLocality: person.location.city,
      addressCountry: person.location.countryCode,
    },
    homeLocation: {
      "@type": "Place",
      name: `${person.location.city}, ${person.location.country}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: person.location.city,
        addressCountry: person.location.countryCode,
      },
    },
    knowsAbout: person.knowsAbout,
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
    // Searches for "Shahriar" alone should match this person too.
    alternateName: [person.fullName, person.givenName],
    url: personUrl,
  };
}

export function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ids.organization,
    name: uniqueLabs.name,
    url: uniqueLabs.website ?? absolute(pages.uniqueLabs.href),
    ...(uniqueLabs.formerName ? { alternateName: uniqueLabs.formerName } : {}),
    ...(uniqueLabs.founded ? { foundingDate: uniqueLabs.founded } : {}),
    description: pages.uniqueLabs.description,
    slogan: uniqueLabs.tagline,
    founder: { "@id": ids.person },
    knowsAbout: [
      ...new Set([
        ...uniqueLabs.whatWeBuild.map((service) => service.title),
        ...uniqueLabs.focusAreas,
      ]),
    ],
    ...(uniqueLabs.website || uniqueLabs.github
      ? { sameAs: [uniqueLabs.website, uniqueLabs.github].filter(Boolean) }
      : {}),
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: site.url,
    name: person.name,
    alternateName: [person.fullName, person.givenName, site.domain],
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
        ? {
            isPartOf: publication.volume
              ? {
                  "@type": "PublicationVolume",
                  volumeNumber: publication.volume,
                  isPartOf: { "@type": "Periodical", name: publication.journal },
                }
              : { "@type": "Periodical", name: publication.journal },
          }
        : {}),
      ...(publication.articleNumber ? { pagination: publication.articleNumber } : {}),
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
        ...dateModified("/"),
        mainEntity: { "@id": ids.person },
        about: { "@id": ids.person },
        isPartOf: { "@id": ids.website },
      },
      personNode(),
      organizationNode(),
      ...articleNodes(),
    ],
  };
}

/**
 * A browser extension, as a SoftwareApplication. Its own website is the
 * canonical page about it; pages here (such as its privacy policy) refer to it.
 */
export function softwareNode(extension: BrowserExtension) {
  return {
    "@type": "SoftwareApplication",
    "@id": `${extension.website}#software`,
    name: extension.name,
    ...(extension.formerName ? { alternateName: [extension.formerName] } : {}),
    description: extension.description,
    url: extension.website,
    image: absolute(extension.icon.src),
    applicationCategory: "BrowserApplication",
    applicationSubCategory: "Chrome extension",
    installUrl: extension.storeUrl,
    sameAs: [extension.storeUrl],
    author: { "@id": ids.person },
    publisher: { "@type": "Organization", "@id": ids.organization, name: uniqueLabs.name },
  };
}

/**
 * One of the Chrome extensions, as a SoftwareApplication made by the person
 * and published by the company, for its page on this site.
 */
export function productNode(item: ProjectItem, detail: ProductDetail | undefined, href: string) {
  const sameAs = [item.page?.href, item.href].filter((url): url is string => Boolean(url));
  return {
    "@type": "SoftwareApplication",
    "@id": `${absolute(href)}#software`,
    name: item.name,
    description: item.description,
    url: item.page?.href ?? absolute(href),
    ...(item.icon ? { image: absolute(item.icon) } : {}),
    applicationCategory: "BrowserApplication",
    applicationSubCategory: "Chrome extension",
    operatingSystem: "Chrome",
    ...(item.href ? { installUrl: item.href } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    ...(detail?.pricing === "FREE"
      ? { offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }
      : {}),
    ...(detail?.features.length
      ? { featureList: detail.features.map((feature) => feature.title) }
      : {}),
    author: { "@id": ids.person },
    creator: { "@id": ids.person },
    publisher: { "@type": "Organization", "@id": ids.organization, name: uniqueLabs.name },
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
        ...dateModified(page.href),
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

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
import type { PageMeta } from "@/lib/types";

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
    givenName: person.givenName,
    familyName: person.familyName,
    url: site.url,
    image: {
      "@type": "ImageObject",
      url: `${site.url}${person.portrait.src}`,
      caption: person.portrait.alt,
    },
    email: `mailto:${person.email}`,
    jobTitle: person.jobTitle,
    description: site.description,
    worksFor: { "@id": ids.organization },
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
    url: site.url,
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

type PageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";

interface PageJsonLdOptions {
  page: PageMeta;
  parents?: PageMeta[];
  type?: PageType;
  /** What the page is about; defaults to the site owner. */
  about?: { "@id": string };
  mainEntity?: { "@id": string };
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

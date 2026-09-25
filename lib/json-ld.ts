import {
  about,
  education,
  person,
  publications,
  site,
  skillGroups,
  socials,
  uniqueLabs,
} from "@/data/portfolio";

/**
 * schema.org structured data describing the site and its owner. Only
 * verified facts from data/portfolio.ts are included; publications are
 * described once their titles are filled in.
 */
export function buildJsonLd() {
  const personId = `${site.url}/#person`;
  const sameAs = socials.filter((social) => social.id !== "email").map((social) => social.href);

  const knowsAbout = [
    person.field,
    ...about.focusAreas,
    ...skillGroups.flatMap((group) => group.skills),
  ];

  const articles = publications
    .filter((publication) => publication.title)
    .map((publication) => ({
      "@type": "ScholarlyArticle",
      "@id": publication.url,
      headline: publication.title,
      url: publication.url,
      sameAs: publication.url,
      identifier: { "@type": "PropertyValue", propertyID: "DOI", value: publication.doi },
      author: { "@id": personId },
      ...(publication.journal
        ? { isPartOf: { "@type": "Periodical", name: publication.journal } }
        : {}),
      ...(publication.year ? { datePublished: String(publication.year) } : {}),
    }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: person.name,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profile`,
        url: site.url,
        name: site.title,
        mainEntity: { "@id": personId },
        isPartOf: { "@id": `${site.url}/#website` },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: person.name,
        givenName: person.givenName,
        familyName: person.familyName,
        url: site.url,
        image: `${site.url}${person.portrait.src}`,
        email: `mailto:${person.email}`,
        jobTitle: person.jobTitle,
        description: site.description,
        worksFor: {
          "@type": "Organization",
          name: uniqueLabs.name,
          ...(uniqueLabs.website ? { url: uniqueLabs.website } : {}),
        },
        affiliation: education.map((entry) => ({
          "@type": "CollegeOrUniversity",
          name: entry.institution,
        })),
        address: {
          "@type": "PostalAddress",
          addressLocality: person.location.city,
          addressCountry: person.location.countryCode,
        },
        knowsAbout: [...new Set(knowsAbout)],
        sameAs,
      },
      ...articles,
    ],
  };
}

/** Serialise for a <script type="application/ld+json"> tag, escaping `<`. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

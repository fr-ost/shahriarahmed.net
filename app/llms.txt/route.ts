import { pages, person, projects, publications, site, socials, uniqueLabs } from "@/data/portfolio";
import { unfollowX } from "@/data/unfollowx";
import { contentPages } from "@/lib/pages";
import { isExternalHref } from "@/lib/utils";

// A plain-text summary of the site for AI assistants (llmstxt.org),
// generated at build time from the same data as the pages.
export const dynamic = "force-static";

const absolute = (href: string) => (href === "/" ? site.url : `${site.url}${href}`);

export function GET() {
  const lines = [
    `# ${person.name}`,
    "",
    `> ${site.description}`,
    "",
    `${person.name} (full name ${person.fullName}) is based in ${person.location.city}, ${person.location.country}. ${pages.uniqueLabs.description}${uniqueLabs.website ? ` Unique Labs' website: ${uniqueLabs.website}` : ""}`,
    "",
    "## Pages",
    "",
    `- [Home](${site.url}): ${site.description}`,
    ...[pages.about, pages.uniqueLabs, ...contentPages, pages.contact].map(
      (page) => `- [${page.label}](${absolute(page.href)}): ${page.description}`,
    ),
    "",
    "## Projects",
    "",
    ...projects.flatMap((project) => {
      const link = project.links.website ? ` (${project.links.website})` : "";
      return [
        `- ${project.name}${link}: ${project.description}`,
        ...(project.items ?? []).map((item) => {
          const itemLink = item.page
            ? isExternalHref(item.page.href)
              ? item.page.href
              : absolute(item.page.href)
            : item.href;
          return `  - ${item.name}${itemLink ? ` (${itemLink})` : ""}: ${item.description}`;
        }),
      ];
    }),
    "",
    `## ${unfollowX.name}`,
    "",
    `${unfollowX.description} A Chrome extension by ${person.name}, a product of Unique Labs; formerly ${unfollowX.formerName}.`,
    "",
    `- Website: ${unfollowX.website}`,
    `- Chrome Web Store: ${unfollowX.storeUrl}`,
    `- Privacy policy: ${absolute(pages.unfollowXPrivacy.href)}`,
    "",
    "## Publications",
    "",
    ...publications.map((publication) =>
      [
        `- ${publication.title ?? publication.doi}`,
        publication.journal,
        publication.published?.label,
        publication.url,
      ]
        .filter(Boolean)
        .join(" — "),
    ),
    "",
    "## Profiles",
    "",
    ...socials
      .filter((social) => social.href && social.id !== "email")
      .map((social) => `- ${social.label}: ${social.href}`),
    `- Email: ${person.email}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

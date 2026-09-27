import { pages, person, projects, publications, site, socials } from "@/data/portfolio";
import { contentPages } from "@/lib/pages";

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
    `${person.name} (also published as ${person.fullName}) is based in ${person.location.city}, ${person.location.country}. ${pages.uniqueLabs.description}`,
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
    ...projects.map((project) => {
      const link = project.links.website ? ` (${project.links.website})` : "";
      return `- ${project.name}${link}: ${project.description}`;
    }),
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

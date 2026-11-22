import { pages, person } from "@/data/portfolio";
import { sortedPosts } from "@/data/posts";
import { absolute } from "@/lib/json-ld";

// RSS 2.0 feed of the blog, generated at build time. 404 while there are no
// posts (see data/posts.ts).
export const dynamic = "force-static";

const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  if (sortedPosts.length === 0) return new Response("Not found", { status: 404 });

  const items = sortedPosts.map((post) => {
    const url = absolute(`/blog/${post.slug}`);
    return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${new Date(`${post.published}T00:00:00Z`).toUTCString()}</pubDate>
      <dc:creator>${escape(person.fullName)}</dc:creator>
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escape(pages.blog.seoTitle ?? person.name)}</title>
    <link>${absolute(pages.blog.href)}</link>
    <atom:link href="${absolute(`${pages.blog.href}/rss.xml`)}" rel="self" type="application/rss+xml"/>
    <description>${escape(pages.blog.description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date(`${sortedPosts[0].updated ?? sortedPosts[0].published}T00:00:00Z`).toUTCString()}</lastBuildDate>
${items.join("\n")}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

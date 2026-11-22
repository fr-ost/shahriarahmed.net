import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KeepExploring } from "@/components/sections/explore";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { pages } from "@/data/portfolio";
import { formatPostDate, sortedPosts } from "@/data/posts";
import { absolute, buildPageJsonLd, ids } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

const page = pages.blog;

export const metadata: Metadata = {
  ...pageMetadata(page),
  alternates: {
    canonical: page.href,
    types: { "application/rss+xml": `${page.href}/rss.xml` },
  },
};

export default function BlogPage() {
  // Hidden until there is something to read (see data/posts.ts).
  if (sortedPosts.length === 0) notFound();

  return (
    <>
      <JsonLd
        data={buildPageJsonLd({
          page,
          type: "CollectionPage",
          nodes: [
            {
              "@type": "Blog",
              "@id": `${absolute(page.href)}#blog`,
              name: page.seoTitle,
              url: absolute(page.href),
              author: { "@id": ids.person },
              blogPost: sortedPosts.map((post) => ({
                "@id": `${absolute(`/blog/${post.slug}`)}#post`,
              })),
            },
          ],
        })}
      />
      <PageHeader page={page} />
      <div className="container-page pb-24 sm:pb-28">
        <ol className="divide-y divide-line border-y border-line">
          {sortedPosts.map((post) => (
            <li key={post.slug} className="grid grid-cols-1 gap-2 py-7 sm:grid-cols-12 sm:gap-8">
              <p className="eyebrow text-faint sm:col-span-3 sm:pt-1.5">
                <time dateTime={post.published}>{formatPostDate(post.published)}</time>
              </p>
              <div className="sm:col-span-9">
                <h2 className="text-xl font-semibold tracking-tight text-fg">
                  <Link href={`/blog/${post.slug}`} className="hover:text-accent">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 leading-relaxed text-muted">{post.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-faint">
          <a href={`${page.href}/rss.xml`} className="underline underline-offset-4 hover:text-fg">
            RSS feed
          </a>
        </p>
      </div>
      <KeepExploring current={page.href} />
    </>
  );
}

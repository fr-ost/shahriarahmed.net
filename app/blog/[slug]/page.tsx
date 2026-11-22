import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorBox } from "@/components/sections/author-box";
import { JsonLd } from "@/components/seo/json-ld";
import { Markdown } from "@/components/ui/markdown";
import { PageHeader } from "@/components/ui/page-header";
import { pages, person } from "@/data/portfolio";
import { formatPostDate, posts, sortedPosts, type Post } from "@/data/posts";
import { absolute, buildPageJsonLd, ids } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import type { PageMeta } from "@/lib/types";

interface Params {
  slug: string;
}

function pageFor(post: Post): PageMeta {
  return {
    href: `/blog/${post.slug}`,
    label: post.title,
    eyebrow: "Blog",
    title: post.title,
    description: post.description,
    seoTitle:
      `${post.title} — ${person.name}`.length <= 60 ? `${post.title} — ${person.name}` : post.title,
    seoDescription: post.description,
  };
}

export function generateStaticParams(): Params[] {
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) return {};
  const base = pageMetadata(pageFor(post));
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.published,
      ...(post.updated ? { modifiedTime: post.updated } : {}),
      authors: [absolute(pages.about.href)],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();
  const page = pageFor(post);
  const url = absolute(page.href);
  const related = sortedPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={buildPageJsonLd({
          page,
          parents: [pages.blog],
          mainEntity: { "@id": `${url}#post` },
          nodes: [
            {
              "@type": "BlogPosting",
              "@id": `${url}#post`,
              headline: post.title,
              description: post.description,
              url,
              inLanguage: "en",
              datePublished: post.published,
              dateModified: post.updated ?? post.published,
              author: { "@id": ids.person },
              publisher: { "@id": ids.person },
              mainEntityOfPage: { "@id": `${url}#webpage` },
              isPartOf: { "@id": `${absolute(pages.blog.href)}#blog` },
              ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
            },
          ],
        })}
      />
      <PageHeader page={page} parents={[pages.blog]}>
        <p className="eyebrow mt-8 text-faint">
          By {person.name} · <time dateTime={post.published}>{formatPostDate(post.published)}</time>
          {post.updated ? (
            <>
              {" "}
              · Updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
            </>
          ) : null}
        </p>
      </PageHeader>
      <div className="container-page pb-24 sm:pb-28">
        <article className="max-w-3xl text-[1.0625rem]">
          <Markdown text={post.body} headingLevel="h2" />
        </article>
        <div className="mt-16 max-w-3xl">
          <AuthorBox />
        </div>
        {related.length ? (
          <nav aria-labelledby="related-title" className="mt-20 max-w-3xl">
            <h2 id="related-title" className="eyebrow text-faint">
              More posts
            </h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {related.map((item) => (
                <li key={item.slug} className="py-4">
                  <Link
                    href={`/blog/${item.slug}`}
                    className="font-semibold text-fg hover:text-accent"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </>
  );
}

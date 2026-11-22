import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KeepExploring } from "@/components/sections/explore";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Markdown } from "@/components/ui/markdown";
import { PageHeader } from "@/components/ui/page-header";
import { pages, person, uniqueLabs } from "@/data/portfolio";
import { productDetails } from "@/data/product-details";
import { extensions } from "@/data/products";
import { buildPageJsonLd, productNode } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import type { PageMeta, ProductDetail, ProjectItem } from "@/lib/types";
import { prettyUrl } from "@/lib/utils";

interface Params {
  slug: string;
}

const pricing: Record<ProductDetail["pricing"], string | null> = {
  FREE: "Free",
  FREEMIUM: "Free, with paid features",
  PAID: "Paid",
  UNSPECIFIED: null,
};

const stage: Record<ProductDetail["stage"], string> = {
  AVAILABLE: "Available",
  BETA: "Beta",
  COMING_SOON: "Coming soon",
  PRIVATE: "Private use",
  DISCONTINUED: "Discontinued",
};

function productBySlug(slug: string) {
  const item = extensions.find((product) => product.slug === slug);
  return item ? { item, detail: productDetails[slug] } : null;
}

function pageFor(item: ProjectItem): PageMeta {
  return {
    href: `/projects/${item.slug}`,
    label: item.name,
    eyebrow: "Chrome extension",
    title: item.name,
    description: item.tagline ?? item.description,
    seoTitle: `${item.name} — Chrome Extension by ${person.name}`,
    seoDescription: item.seoDescription,
  };
}

export function generateStaticParams(): Params[] {
  return extensions.flatMap((item) => (item.slug ? [{ slug: item.slug }] : []));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const product = productBySlug((await params).slug);
  if (!product) return {};
  return pageMetadata(pageFor(product.item), { image: product.detail?.cover });
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const product = productBySlug((await params).slug);
  if (!product) notFound();
  const { item, detail } = product;
  const page = pageFor(item);
  const software = productNode(item, detail, page.href);
  const others = extensions.filter((other) => other.slug !== item.slug);
  const price = detail ? pricing[detail.pricing] : null;

  const facts = [
    { label: "Made by", value: <Link href={pages.uniqueLabs.href}>{uniqueLabs.name}</Link> },
    { label: "Built by", value: <Link href={pages.about.href}>{person.name}</Link> },
    { label: "Platform", value: "Chrome extension" },
    ...(price ? [{ label: "Price", value: price }] : []),
    ...(detail ? [{ label: "Status", value: stage[detail.stage] }] : []),
  ];
  const links = [
    ...(item.page ? [{ label: "Product website", href: item.page.href }] : []),
    ...(item.href ? [{ label: "Chrome Web Store", href: item.href }] : []),
    ...(detail?.privacyPolicy ? [{ label: "Privacy policy", href: detail.privacyPolicy }] : []),
    ...(detail?.support ? [{ label: "Support", href: detail.support }] : []),
  ];

  return (
    <>
      <JsonLd
        data={buildPageJsonLd({
          page,
          parents: [pages.projects],
          type: "ItemPage",
          about: { "@id": software["@id"] },
          mainEntity: { "@id": software["@id"] },
          nodes: [software],
        })}
      />
      <PageHeader page={page} parents={[pages.projects]}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {item.icon ? (
            <Image
              src={item.icon}
              alt=""
              width={48}
              height={48}
              className="mr-1 size-12 rounded-xl"
            />
          ) : null}
          {item.page ? (
            <ButtonLink href={item.page.href}>Visit {prettyUrl(item.page.href)}</ButtonLink>
          ) : null}
          {item.href ? (
            <ButtonLink href={item.href} variant="secondary">
              Chrome Web Store
            </ButtonLink>
          ) : null}
          {item.status ? (
            <span className="eyebrow rounded-full border border-line px-3 py-1.5 text-faint">
              {item.status}
            </span>
          ) : null}
        </div>
      </PageHeader>

      <div className="container-page pb-24 sm:pb-28">
        {detail?.cover ? (
          <Image
            src={detail.cover.src}
            alt={detail.cover.alt}
            width={detail.cover.width}
            height={detail.cover.height}
            priority
            className="h-auto w-full rounded-3xl border border-line shadow-card"
          />
        ) : null}

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <article className="lg:col-span-8">
            <h2 className="text-3xl font-semibold tracking-tight text-fg">About {item.name}</h2>
            <div className="mt-6">
              {detail ? <Markdown text={detail.description} /> : <p>{item.description}</p>}
            </div>

            {detail?.features.length ? (
              <section aria-labelledby="features-title" className="mt-14">
                <h2 id="features-title" className="text-3xl font-semibold tracking-tight text-fg">
                  Features
                </h2>
                <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {detail.features.map((feature) => (
                    <li
                      key={feature.title}
                      className="rounded-2xl border border-line bg-elevated p-5 shadow-card"
                    >
                      <h3 className="font-semibold tracking-tight text-fg">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {feature.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </article>

          <aside aria-label={`${item.name} at a glance`} className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <dl className="divide-y divide-line rounded-3xl border border-line bg-elevated shadow-card">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-4 px-5 py-3.5"
                  >
                    <dt className="eyebrow text-faint">{fact.label}</dt>
                    <dd className="text-right text-sm font-medium text-fg [&_a]:underline [&_a]:decoration-line-strong [&_a]:underline-offset-4 [&_a:hover]:decoration-accent">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
              {links.length ? (
                <nav
                  aria-label={`${item.name} links`}
                  className="rounded-3xl border border-line p-5"
                >
                  <p className="eyebrow text-faint">Links</p>
                  <ul className="mt-3 space-y-2.5">
                    {links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tap text-sm font-medium text-accent hover:text-fg"
                        >
                          {link.label} ↗<span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}
            </div>
          </aside>
        </div>

        <section aria-labelledby="more-products-title" className="mt-20">
          <h2 id="more-products-title" className="text-2xl font-semibold tracking-tight text-fg">
            More from {uniqueLabs.name}
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((other) => (
              <li key={other.name}>
                <Link
                  href={`/projects/${other.slug}`}
                  className="flex h-full items-center gap-3 rounded-2xl border border-line bg-elevated p-3 transition-colors hover:border-accent/40"
                >
                  {other.icon ? (
                    <Image
                      src={other.icon}
                      alt=""
                      width={36}
                      height={36}
                      className="size-9 rounded-lg"
                    />
                  ) : null}
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-fg">
                      {other.name}
                    </span>
                    <span className="block truncate text-xs text-muted">{other.tagline}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <KeepExploring current={pages.projects.href} />
    </>
  );
}

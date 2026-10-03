import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { pages } from "@/data/portfolio";
import { breadcrumbTrail } from "@/lib/pages";
import type { PageMeta, ProductShowcase } from "@/lib/types";
import { ProductShot } from "./product-shot";

interface ProductHeroProps {
  page: PageMeta;
  parents: PageMeta[];
  product: ProductShowcase;
  /** In-page link to the first section, e.g. "#how-it-works". */
  tourHref: string;
}

/** Staggered CSS entrance, as in the page header: runs on first paint. */
function rise(delay: number): CSSProperties {
  return { animationDelay: `${delay}ms` };
}

/** Top of a product page: name, summary, install button, key facts and a screenshot. */
export function ProductHero({ page, parents, product, tourHref }: ProductHeroProps) {
  return (
    <header id="top" className="relative isolate overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-40">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_75%_85%_at_25%_0%,black,transparent_75%)]"
      />
      <div
        aria-hidden
        className="absolute -right-48 -top-48 -z-10 size-[44rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent-bright)_9%,transparent),transparent)]"
      />

      <div className="container-page">
        <Breadcrumbs
          trail={breadcrumbTrail(page, parents)}
          className="animate-rise"
          style={rise(0)}
        />

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 animate-rise" style={rise(60)}>
              <Image
                src={product.logo.src}
                alt=""
                width={product.logo.width}
                height={product.logo.height}
                className="size-14 drop-shadow-[0_8px_16px_rgb(79_70_229/0.25)] sm:size-16"
              />
              <div>
                <p className="eyebrow text-accent">{page.eyebrow}</p>
                <p className="mt-1 text-sm text-muted">
                  {product.tagline} · by{" "}
                  <Link
                    href={pages.uniqueLabs.href}
                    className="font-medium text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    Unique Labs
                  </Link>
                </p>
              </div>
            </div>

            <h1 className="mt-7 text-[clamp(2.75rem,8.5vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-fg animate-focus-in">
              {page.title}
              {page.titleAccent ? (
                <>
                  {" "}
                  <span className="text-accent">{page.titleAccent}</span>
                </>
              ) : null}
            </h1>
            <p
              className="mt-6 max-w-2xl text-lg leading-relaxed text-muted animate-rise sm:text-xl"
              style={rise(120)}
            >
              {page.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-3 animate-rise" style={rise(200)}>
              <ButtonLink href={product.storeUrl} size="lg">
                Add to Chrome — it’s free
              </ButtonLink>
              <ButtonLink href={tourHref} variant="secondary" size="lg" icon="arrow-down">
                How it works
              </ButtonLink>
            </div>
          </div>

          <dl
            className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line animate-rise sm:grid-cols-4 lg:col-span-5 lg:grid-cols-2"
            style={rise(260)}
          >
            {product.facts.map((fact) => (
              <div key={fact.label} className="bg-elevated px-5 py-4 sm:px-6 sm:py-5">
                <dt className="eyebrow text-faint">{fact.label}</dt>
                <dd className="mt-1.5 text-lg font-semibold tracking-tight text-fg">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Not faded in: the screenshot is usually the largest thing on screen. */}
        <ProductShot
          image={product.hero}
          eager
          sizes="(min-width: 1216px) 1120px, 92vw"
          className="mt-14 sm:mt-16"
        />
      </div>
    </header>
  );
}

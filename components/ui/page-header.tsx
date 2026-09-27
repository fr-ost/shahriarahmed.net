import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { site } from "@/data/portfolio";
import { serializeJsonLd } from "@/lib/json-ld";
import type { PageMeta } from "@/lib/types";

interface PageHeaderProps {
  page: PageMeta;
  /** Pages between Home and this one in the breadcrumb. */
  parents?: PageMeta[];
  /** Extra content under the description, e.g. tabs. */
  children?: ReactNode;
}

/** Staggered CSS entrance, as in the hero: runs on first paint. */
function rise(delay: number): CSSProperties {
  return { animationDelay: `${delay}ms` };
}

/** Title block of a standalone page, with breadcrumb navigation. */
export function PageHeader({ page, parents = [], children }: PageHeaderProps) {
  const trail = [
    { label: "Home", href: "/" },
    ...parents.map((parent) => ({ label: parent.label, href: parent.href })),
    { label: page.label, href: page.href },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href === "/" ? site.url : `${site.url}${item.href}`,
    })),
  };

  return (
    <header id="top" className="relative isolate overflow-hidden pb-14 pt-32 sm:pb-20 sm:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_75%_85%_at_25%_0%,black,transparent_75%)]"
      />
      <div
        aria-hidden
        className="absolute -right-48 -top-48 -z-10 size-[44rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent-bright)_9%,transparent),transparent)]"
      />

      <div className="container-page">
        <nav aria-label="Breadcrumb" className="animate-rise" style={rise(0)}>
          <ol className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-faint">
            {trail.map((item, index) => {
              const last = index === trail.length - 1;
              return (
                <li key={item.href} className="flex items-center gap-3">
                  {index > 0 ? <span aria-hidden className="h-px w-5 bg-line-strong" /> : null}
                  {last ? (
                    <span aria-current="page" className="text-accent">
                      {item.label}
                    </span>
                  ) : (
                    <Link href={item.href} className="transition-colors hover:text-fg">
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <h1 className="mt-7 max-w-4xl text-[clamp(2.75rem,8.5vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-fg animate-focus-in">
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
        {children ? (
          <div className="animate-rise" style={rise(200)}>
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
}

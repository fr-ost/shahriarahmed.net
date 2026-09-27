import type { CSSProperties, ReactNode } from "react";
import { breadcrumbTrail } from "@/lib/pages";
import type { PageMeta } from "@/lib/types";
import { Breadcrumbs } from "./breadcrumbs";

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
  return (
    <header id="top" className="relative isolate overflow-hidden pb-14 pt-32 sm:pb-20 sm:pt-40">
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

import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { KeepExploring } from "@/components/sections/explore";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { now, nowUpdated, recently, type NowItem } from "@/data/now";
import { pages, person } from "@/data/portfolio";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

const page = pages.now;

export const metadata: Metadata = pageMetadata(page);

function NowList({ items, compact = false }: { items: NowItem[]; compact?: boolean }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <li key={item.title} className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-12 sm:gap-8">
          <h3
            className={
              compact
                ? "font-semibold tracking-tight text-fg sm:col-span-5"
                : "text-lg font-semibold tracking-tight text-fg sm:col-span-5"
            }
          >
            {item.title}
          </h3>
          <div className="sm:col-span-7">
            <p className="leading-relaxed text-muted">{item.text}</p>
            {item.link ? (
              <Link
                href={item.link.href}
                className="tap mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-fg"
              >
                {item.link.label}
                <ArrowRight aria-hidden className="size-3.5" />
              </Link>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function NowPage() {
  return (
    <>
      <JsonLd data={buildPageJsonLd({ page })} />
      <PageHeader page={page}>
        <p className="eyebrow mt-8 text-faint">
          Updated <time dateTime={nowUpdated.dateTime}>{nowUpdated.label}</time> ·{" "}
          {person.location.city}, {person.location.country}
        </p>
      </PageHeader>
      <div className="container-page pb-24 sm:pb-28">
        <section aria-labelledby="now-title">
          <h2 id="now-title" className="eyebrow text-accent">
            At the moment
          </h2>
          <div className="mt-5">
            <NowList items={now} />
          </div>
        </section>
        <section aria-labelledby="recently-title" className="mt-20">
          <h2 id="recently-title" className="eyebrow text-accent">
            Recently
          </h2>
          <div className="mt-5">
            <NowList items={recently} compact />
          </div>
        </section>
        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-faint">
          This is a “now page”: what I am focused on at this point. For the full picture, see the{" "}
          <Link href={pages.about.href} className="underline underline-offset-4 hover:text-fg">
            About
          </Link>{" "}
          page and the{" "}
          <Link href={pages.cv.href} className="underline underline-offset-4 hover:text-fg">
            CV
          </Link>
          .
        </p>
      </div>
      <KeepExploring current={page.href} />
    </>
  );
}

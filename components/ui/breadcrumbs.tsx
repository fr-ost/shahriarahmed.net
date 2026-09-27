import Link from "next/link";
import type { CSSProperties } from "react";

interface BreadcrumbsProps {
  trail: { label: string; href: string }[];
  className?: string;
  style?: CSSProperties;
}

/** Breadcrumb navigation; the last item is the current page. */
export function Breadcrumbs({ trail, className, style }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className} style={style}>
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
  );
}

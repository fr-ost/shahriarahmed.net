import { ArrowUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Mark } from "@/components/icons/mark";
import { SocialLinks } from "@/components/ui/social-links";
import { pages, person, socials } from "@/data/portfolio";
import { contentPages, infoPages } from "@/lib/pages";

const pageLinks = [pages.uniqueLabs, ...contentPages];

const linkClass =
  "inline-flex items-center gap-1.5 text-[0.9375rem] text-muted transition-colors duration-300 hover:text-fg";

// Evaluated when the page is built, so the year stays current on redeploy.
const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-line">
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[30rem] bg-[radial-gradient(ellipse_55%_75%_at_50%_100%,var(--glow),transparent_70%)] opacity-35"
      />

      <div className="container-page grid grid-cols-1 gap-12 pb-10 pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Link href="/" className="group/brand inline-flex items-center gap-3 text-fg">
            <Mark className="size-8 transition-transform duration-700 ease-smooth group-hover/brand:rotate-[60deg]" />
            <span className="text-lg font-semibold tracking-tight">{person.name}</span>
          </Link>
          <p className="mt-5 max-w-sm leading-relaxed text-muted">
            {person.title}, and {person.field} researcher at the {person.institution}.
          </p>
          <a
            href={`mailto:${person.email}`}
            className="group/mail mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-fg"
          >
            <span className="link-underline">{person.email}</span>
            <ArrowUpRight
              aria-hidden
              className="size-4 text-accent transition-transform duration-300 group-hover/mail:-translate-y-0.5 group-hover/mail:translate-x-0.5"
            />
          </a>
          <SocialLinks
            links={socials.filter((social) => social.featured)}
            size="sm"
            className="-ml-2 mt-6"
          />
        </div>

        <nav aria-label="Pages" className="lg:col-span-3 lg:col-start-7">
          <p className="eyebrow text-faint">Explore</p>
          <ul className="mt-5 space-y-3">
            {pageLinks.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className={linkClass}>
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="About this site" className="lg:col-span-3">
          <p className="eyebrow text-faint">This site</p>
          <ul className="mt-5 space-y-3">
            {infoPages.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className={linkClass}>
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Decorative wordmark, drawn by CSS so it is not read or indexed twice. */}
      {/* Sized to its column: the name is about 7em wide. */}
      <div className="container-page">
        <div className="@container">
          <div
            aria-hidden
            data-wordmark={person.name}
            className="footer-wordmark select-none whitespace-nowrap text-[13.6cqi] font-semibold leading-[0.85] tracking-[-0.06em]"
          />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-4 py-6 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {person.name}. Built with Next.js.
          </p>
          <a
            href="#top"
            className="eyebrow group/top inline-flex items-center gap-2 self-start rounded-full transition-colors hover:text-fg sm:self-auto"
          >
            Back to top
            <ArrowUp
              aria-hidden
              className="size-3.5 transition-transform duration-300 ease-smooth group-hover/top:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { Mark } from "@/components/icons/mark";
import { SocialLinks } from "@/components/ui/social-links";
import { pages, person, socials } from "@/data/portfolio";

const pageLinks = [
  pages.research,
  pages.projects,
  pages.experience,
  pages.web3,
  pages.achievements,
];
const legalLinks = [pages.privacy, pages.dmca];

const linkClass = "text-muted transition-colors duration-300 hover:text-fg";

// Evaluated when the page is built, so the year stays current on redeploy.
const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-6 py-10 sm:py-12 lg:grid-cols-3 lg:items-center lg:gap-8">
        <div className="flex items-center gap-3">
          <Mark className="size-6 text-fg" />
          <p className="text-sm text-muted">
            © {year} {person.name}
          </p>
        </div>

        <p className="text-sm text-muted lg:text-center">{person.title}</p>

        <SocialLinks
          links={socials.filter((social) => social.featured)}
          size="sm"
          className="-ml-2 lg:ml-0 lg:justify-end"
        />
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-5 py-7 text-sm lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Pages">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {pageLinks.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className={linkClass}>
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {legalLinks.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className={linkClass}>
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex items-center justify-between gap-4 py-5">
          <p className="eyebrow text-faint">Built with Next.js</p>
          <a
            href="#top"
            className="eyebrow group/top inline-flex items-center gap-2 rounded-full text-faint transition-colors hover:text-fg"
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

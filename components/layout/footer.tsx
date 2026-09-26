import { ArrowUp } from "lucide-react";
import { Mark } from "@/components/icons/mark";
import { SocialLinks } from "@/components/ui/social-links";
import { person, socials } from "@/data/portfolio";

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

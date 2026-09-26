import { ArrowRight, Download, Mail } from "lucide-react";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button";
import { RoleCycler } from "@/components/ui/role-cycler";
import { SocialLinks } from "@/components/ui/social-links";
import { MolecularVisual } from "@/components/visuals/molecular-visual";
import { hero, person, socials } from "@/data/portfolio";
import type { CvLink } from "@/lib/cv";

/** Staggered CSS entrance: runs on first paint, independent of hydration. */
function rise(delay: number): CSSProperties {
  return { animationDelay: `${delay}ms` };
}

export function Hero({ cvLink }: { cvLink: CvLink }) {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-16 pt-32 sm:pt-40 lg:pb-24 lg:pt-44"
    >
      {/* Background: lab-notebook grid and a soft accent glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_80%_70%_at_60%_35%,black,transparent_75%)]"
      />
      <div
        aria-hidden
        className="absolute -right-40 -top-40 -z-10 size-[48rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent-bright)_10%,transparent),transparent)]"
      />

      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <ul
            className="eyebrow flex flex-wrap items-center gap-x-2.5 gap-y-2 text-faint animate-rise max-sm:text-[0.625rem] max-sm:tracking-[0.05em] sm:gap-x-3"
            style={rise(0)}
            aria-label="Areas of work"
          >
            {hero.eyebrow.map((item, index) => (
              <li key={item} className="flex items-center gap-2.5 sm:gap-3">
                {index > 0 ? (
                  <span aria-hidden className="size-1 rounded-full bg-accent-bright" />
                ) : null}
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h1
            id="hero-title"
            className="mt-7 text-[clamp(3.5rem,15vw,7.75rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-fg"
          >
            <span className="block animate-focus-in" style={rise(90)}>
              {person.givenName}
            </span>{" "}
            <span className="block animate-focus-in" style={rise(170)}>
              {person.familyName}
            </span>
          </h1>

          <div className="mt-9 animate-rise" style={rise(280)}>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xl font-medium tracking-[-0.02em] text-fg sm:text-2xl">
              <span aria-hidden className="h-px w-8 bg-fg" />
              <span>
                {person.jobTitle},{" "}
                <a
                  href="#unique-labs"
                  className="underline decoration-accent-bright/50 decoration-1 underline-offset-[6px] transition-colors duration-300 hover:text-accent hover:decoration-accent"
                >
                  {person.company}
                </a>
              </span>
            </p>
            <p className="mt-3 flex items-center pl-11 text-xl font-semibold tracking-[-0.02em] text-accent sm:text-2xl">
              <RoleCycler roles={hero.roles} />
            </p>
          </div>

          <p
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl animate-rise"
            style={rise(360)}
          >
            {hero.description}
          </p>

          <div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap animate-rise"
            style={rise(440)}
          >
            {hero.primaryActions.map((action, index) => (
              <ButtonLink
                key={action.href}
                href={action.href}
                size="lg"
                variant={index === 0 ? "primary" : "secondary"}
                icon="arrow-right"
              >
                {action.label}
              </ButtonLink>
            ))}
          </div>

          <div
            className="@container mt-7 flex flex-wrap items-center gap-x-7 gap-y-4 animate-rise"
            style={rise(520)}
          >
            <a
              href={hero.workAction.href}
              className="group/work inline-flex items-center gap-2 text-[0.9375rem] font-medium text-fg"
            >
              <span className="link-underline">{hero.workAction.label}</span>
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover/work:translate-x-0.5"
              />
            </a>
            <a
              href={cvLink.href}
              {...(cvLink.available ? { download: true } : {})}
              className="group/cv inline-flex items-center gap-2 text-[0.9375rem] font-medium text-fg"
            >
              {cvLink.available ? (
                <Download
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover/cv:translate-y-0.5"
                />
              ) : (
                <Mail aria-hidden className="size-4" />
              )}
              <span className="link-underline">{cvLink.label}</span>
            </a>
            {/* The divider only shows when the icons fit on the same line. */}
            <span aria-hidden className="hidden h-5 w-px bg-line-strong @min-[36rem]:block" />
            <SocialLinks
              links={socials.filter((social) => social.featured)}
              size="sm"
              className="-ml-2 @min-[36rem]:ml-0"
            />
          </div>
        </div>

        <div className="animate-fade lg:col-span-5" style={rise(250)}>
          <MolecularVisual className="mx-auto w-full max-w-[26rem] sm:max-w-[30rem] lg:max-w-none" />
        </div>
      </div>
    </section>
  );
}

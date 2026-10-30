import { ArrowRight, BookOpenText, Building2, Download, Microscope } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Aurora } from "@/components/fx/aurora";
import { MoleculeField } from "@/components/fx/molecule-field";
import { ScrollCue } from "@/components/fx/scroll-cue";
import { Tilt } from "@/components/fx/tilt";
import { ButtonLink } from "@/components/ui/button";
import { StatusDot } from "@/components/ui/chip";
import { RoleCycler } from "@/components/ui/role-cycler";
import { SocialLinks } from "@/components/ui/social-links";
import { currentResearch, hero, person, publications, socials } from "@/data/portfolio";
import type { CvLink } from "@/lib/cv";
import { cn } from "@/lib/utils";
import portrait from "@/public/images/shahriar-ahmed.webp";

/** Staggered CSS entrance: runs on first paint, independent of hydration. */
function rise(delay: number): CSSProperties {
  return { animationDelay: `${delay}ms` };
}

/** A small glass card that floats beside the portrait. */
function FloatingFact({
  icon,
  label,
  value,
  className,
  delay,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  className?: string;
  delay: number;
}) {
  return (
    <div
      className={cn(
        "absolute z-10 hidden max-w-[18rem] items-center gap-3 rounded-2xl border border-line bg-elevated/75 py-2.5 pl-2.5 pr-4 shadow-float backdrop-blur-xl sm:flex",
        "animate-float",
        className,
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="eyebrow block text-faint">{label}</span>
        <span className="mt-0.5 block truncate text-sm font-medium text-fg">{value}</span>
      </span>
    </div>
  );
}

export function Hero({ cvLink }: { cvLink: CvLink }) {
  const [latest] = publications;
  const year = latest?.published?.dateTime.slice(0, 4);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex flex-col overflow-hidden pt-28 sm:pt-32 lg:min-h-[100svh]"
    >
      {/* Background: drifting aurora, a fading lab grid and a live molecular network */}
      <Aurora fade />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid opacity-80 [mask-image:radial-gradient(ellipse_70%_65%_at_50%_35%,black,transparent_78%)]"
      />
      <MoleculeField className="-z-10 [mask-image:radial-gradient(ellipse_70%_75%_at_72%_42%,black_15%,transparent_78%)]" />

      <div className="container-page grid flex-1 grid-cols-1 items-center gap-14 pb-10 lg:grid-cols-12 lg:gap-8 lg:pb-6">
        <div className="lg:col-span-7">
          <p
            className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-elevated/60 py-1.5 pl-3 pr-4 text-sm text-muted shadow-card backdrop-blur-md animate-rise"
            style={rise(0)}
          >
            <StatusDot />
            <span className="truncate">
              <span className="font-medium text-fg">{person.title}</span>
              <span aria-hidden className="mx-2 text-faint">
                ·
              </span>
              {person.location.city}, {person.location.country}
            </span>
          </p>

          <h1
            id="hero-title"
            className="mt-8 text-[clamp(3.75rem,15vw,9.25rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-fg"
          >
            <span className="block animate-focus-in" style={rise(80)}>
              {person.givenName}
            </span>{" "}
            <span className="block text-gradient animate-name">{person.familyName}</span>
          </h1>

          <p
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xl font-semibold tracking-[-0.02em] text-accent sm:text-2xl animate-rise"
            style={rise(260)}
          >
            <span aria-hidden className="h-px w-8 bg-accent/60" />
            <RoleCycler roles={hero.roles} />
          </p>

          <p
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl animate-focus-in"
            style={rise(340)}
          >
            {hero.description}
          </p>

          <div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap animate-rise"
            style={rise(420)}
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
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 animate-rise"
            style={rise(500)}
          >
            <Link
              href={hero.workAction.href}
              className="group/work inline-flex items-center gap-2 text-[0.9375rem] font-medium text-fg"
            >
              <span className="link-underline">{hero.workAction.label}</span>
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover/work:translate-x-0.5"
              />
            </Link>
            {cvLink.available ? (
              <a
                href={cvLink.href}
                download
                className="group/cv inline-flex items-center gap-2 text-[0.9375rem] font-medium text-fg"
              >
                <Download
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover/cv:translate-y-0.5"
                />
                <span className="link-underline">{cvLink.label}</span>
              </a>
            ) : null}
            <span aria-hidden className="hidden h-5 w-px bg-line-strong sm:block" />
            <SocialLinks
              links={socials.filter((social) => social.featured)}
              size="sm"
              className="-ml-2 sm:ml-0"
            />
          </div>
        </div>

        <div
          className="relative mx-auto w-full max-w-[19rem] sm:max-w-[23rem] lg:col-span-5 lg:max-w-[26rem] animate-fade"
          style={rise(200)}
        >
          {/* Soft glow behind the portrait */}
          <div
            aria-hidden
            className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] opacity-70 blur-2xl"
          />

          <Tilt max={6}>
            <figure className="relative overflow-hidden rounded-[2.25rem] p-[2px] shadow-float">
              {/* Rotating gradient ring: a spinning conic field behind the frame */}
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2"
              >
                <span className="ring-conic block size-full rounded-full animate-spin-ring" />
              </span>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2.25rem-2px)] bg-subtle">
                <Image
                  src={portrait}
                  alt={person.portrait.alt}
                  placeholder="blur"
                  loading="eager"
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 416px, (min-width: 640px) 368px, 304px"
                  className="size-full object-cover dark:brightness-[0.92]"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_top,rgb(5_8_8/0.55),transparent)]"
                />
                <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-white backdrop-blur-md">
                  <span className="min-w-0">
                    <span className="block truncate text-[0.9375rem] font-semibold tracking-tight">
                      {person.name}
                    </span>
                    <span className="block truncate text-xs text-white/80">{person.field}</span>
                  </span>
                  <StatusDot />
                </figcaption>
              </div>
            </figure>
          </Tilt>

          <FloatingFact
            icon={<Microscope aria-hidden className="size-4" strokeWidth={1.75} />}
            label="Research"
            value={currentResearch.areas[0] ?? person.field}
            className="-left-10 top-[14%] xl:-left-16"
            delay={0}
          />
          {latest?.journal ? (
            <FloatingFact
              icon={<BookOpenText aria-hidden className="size-4" strokeWidth={1.75} />}
              label={year ? `Published · ${year}` : "Published"}
              value={latest.journal}
              className="-right-6 -top-7 lg:-right-10 xl:-right-14"
              delay={1.4}
            />
          ) : null}
          <FloatingFact
            icon={<Building2 aria-hidden className="size-4" strokeWidth={1.75} />}
            label={person.jobTitle}
            value={person.company}
            className="-left-10 bottom-[24%] xl:-left-14"
            delay={2.8}
          />
        </div>
      </div>

      <div className="hidden justify-center pb-8 lg:flex animate-rise" style={rise(700)}>
        <ScrollCue href="#about" />
      </div>
    </section>
  );
}

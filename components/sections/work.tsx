import {
  ArrowRight,
  ArrowUpRight,
  BotMessageSquare,
  BriefcaseBusiness,
  Building2,
  Microscope,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Tilt } from "@/components/fx/tilt";
import { contentIcons } from "@/components/icons";
import { StatusDot } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import {
  currentResearch,
  experience,
  pages,
  projects,
  publications,
  sections,
  uniqueLabs,
} from "@/data/portfolio";
import { xMassUnfollow } from "@/data/x-mass-unfollow";
import type { ProjectItem } from "@/lib/types";
import { cn, isExternalHref } from "@/lib/utils";

/** The card's main link covers the whole card; other links sit above it. */
const stretched =
  "after:absolute after:inset-0 after:rounded-[inherit] after:content-[''] focus-visible:outline-hidden";
const aboveStretched = "relative z-10";

const cardBase =
  "spotlight group/card flex w-full flex-col overflow-hidden rounded-[1.75rem] border p-6 transition-[border-color,box-shadow,transform] duration-500 ease-smooth hover:-translate-y-1 sm:p-8 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-accent";

function Card({
  children,
  className,
  panel = false,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  panel?: boolean;
  delay?: number;
}) {
  return (
    <Reveal as="li" delay={delay} className={cn("flex", className)}>
      <article
        className={cn(
          cardBase,
          panel
            ? "border-panel-line bg-panel text-panel-fg shadow-float"
            : "border-line bg-elevated shadow-card hover:border-line-strong hover:shadow-float",
        )}
      >
        {children}
      </article>
    </Reveal>
  );
}

function IconTile({ children, panel = false }: { children: ReactNode; panel?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-2xl border transition-colors duration-500",
        panel
          ? "border-panel-line bg-white/[0.04] text-panel-accent"
          : "border-line bg-bg text-accent group-hover/card:border-accent/30 group-hover/card:bg-accent/[0.07]",
      )}
    >
      {children}
    </span>
  );
}

const extensionLinkClass = cn(
  aboveStretched,
  "group/link inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-fg",
);

function ExternalArrow() {
  return (
    <ArrowUpRight
      aria-hidden
      className="size-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
    />
  );
}

/** "Product page" then the store link, as on the Projects page. */
function ExtensionLinks({ item, className }: { item: ProjectItem; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", className)}>
      {item.page ? (
        isExternalHref(item.page.href) ? (
          <a
            href={item.page.href}
            target="_blank"
            rel="noopener noreferrer"
            className={extensionLinkClass}
          >
            {item.page.label}
            <ExternalArrow />
            <span className="sr-only"> — {item.name} (opens in a new tab)</span>
          </a>
        ) : (
          <Link href={item.page.href} className={extensionLinkClass}>
            {item.page.label}
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform group-hover/link:translate-x-0.5"
            />
            <span className="sr-only"> — {item.name}</span>
          </Link>
        )
      ) : null}
      {item.href ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={extensionLinkClass}
        >
          {item.linkLabel}
          <ExternalArrow />
          <span className="sr-only"> — {item.name} (opens in a new tab)</span>
        </a>
      ) : null}
    </div>
  );
}

function MoreArrow() {
  return (
    <span
      aria-hidden
      className="inline-flex size-9 items-center justify-center rounded-full border border-current/15 transition-transform duration-500 ease-smooth group-hover/card:translate-x-0.5"
    >
      <ArrowRight className="size-4" />
    </span>
  );
}

/** Homepage overview of research, the company, experience and products. */
export function Work() {
  const [latest] = publications;
  const extensions = projects.find((project) => project.id === "x-chrome-extensions");
  const bots = projects.find((project) => project.id === "telegram-bots");
  const growX = extensions?.items?.find((item) => item.name.startsWith("GrowX"));
  const massUnfollow = extensions?.items?.find(
    (item) => item.page?.href === pages.xMassUnfollow.href,
  );
  const recent = experience.slice(0, 3);

  return (
    <Section meta={sections.work}>
      <SectionHeading
        meta={sections.work}
        aside={
          <Link
            href={pages.projects.href}
            className="group/all inline-flex items-center gap-2 text-[0.9375rem] font-medium text-fg hover:text-accent"
          >
            All projects
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover/all:translate-x-0.5"
            />
          </Link>
        }
      />

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        {/* Research */}
        <Card className="md:col-span-2 lg:col-span-7">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] opacity-50 transition-opacity duration-700 group-hover/card:opacity-90"
          />
          <div className="flex items-start justify-between gap-4">
            <IconTile>
              <Microscope aria-hidden className="size-5" strokeWidth={1.6} />
            </IconTile>
            <span className="eyebrow text-right text-faint">{currentResearch.context}</span>
          </div>
          <p className="eyebrow mt-10 text-accent">{pages.research.label}</p>
          <h3 className="mt-3 max-w-xl text-[clamp(1.5rem,2.6vw,2.125rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-fg">
            <Link href={pages.research.href} className={stretched}>
              {pages.research.description}
            </Link>
          </h3>
          {latest?.title ? (
            <div className="mt-8 rounded-2xl border border-line bg-bg/60 p-5">
              <p className="eyebrow text-faint">
                Latest publication
                {latest.published ? ` · ${latest.published.label}` : null}
              </p>
              <p className="mt-2 line-clamp-2 text-[0.9375rem] font-medium leading-snug text-fg">
                {latest.title}
              </p>
              {latest.journal ? (
                <p className="mt-1.5 text-sm text-muted">{latest.journal}</p>
              ) : null}
            </div>
          ) : null}
          <div className="mt-auto flex items-center justify-between gap-4 pt-8 text-fg">
            <span className="text-sm font-medium">Research &amp; publications</span>
            <MoreArrow />
          </div>
        </Card>

        {/* Unique Labs */}
        <Card panel delay={0.06} className="lg:col-span-5 lg:row-span-2">
          <div aria-hidden className="absolute inset-0 -z-10 bg-grid-panel mask-fade-radial" />
          <div
            aria-hidden
            className="absolute -bottom-32 -right-24 -z-10 size-96 rounded-full bg-[radial-gradient(closest-side,rgb(79_209_178/0.22),transparent)] transition-transform duration-1000 ease-smooth group-hover/card:scale-110"
          />
          <div className="flex items-start justify-between gap-4">
            <IconTile panel>
              <Building2 aria-hidden className="size-5" strokeWidth={1.6} />
            </IconTile>
            <span className="eyebrow inline-flex items-center gap-2 text-panel-muted">
              <StatusDot />
              {uniqueLabs.founderRole}
            </span>
          </div>
          <h3 className="mt-10 text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-none tracking-[-0.04em]">
            <Link href={pages.uniqueLabs.href} className={stretched}>
              Unique <span className="text-panel-accent">Labs</span>
            </Link>
          </h3>
          <p className="mt-4 max-w-sm leading-relaxed text-panel-muted">{uniqueLabs.tagline}</p>

          <ul className="mt-8 divide-y divide-panel-line border-y border-panel-line">
            {uniqueLabs.whatWeBuild.map((service) => {
              const Icon = contentIcons[service.icon];
              return (
                <li key={service.title} className="flex items-start gap-4 py-3.5 lg:py-4">
                  <Icon
                    aria-hidden
                    className="mt-0.5 size-[1.125rem] shrink-0 text-panel-accent"
                    strokeWidth={1.6}
                  />
                  <span className="min-w-0">
                    <span className="block text-[0.9375rem] text-panel-fg">{service.title}</span>
                    {/* Only where the tall card has room for it; the full text is on /unique-labs. */}
                    <span className="mt-1 hidden text-sm leading-relaxed text-panel-muted lg:block">
                      {service.description}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto flex items-center justify-between gap-4 pt-8">
            <span className="text-sm font-medium">Explore Unique Labs</span>
            <MoreArrow />
          </div>
        </Card>

        {/* Experience */}
        <Card delay={0.08} className="lg:col-span-7">
          <div className="flex items-start justify-between gap-4">
            <IconTile>
              <BriefcaseBusiness aria-hidden className="size-5" strokeWidth={1.6} />
            </IconTile>
            <span className="eyebrow text-faint">{pages.experience.label}</span>
          </div>
          <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em] text-fg sm:text-2xl">
            <Link href={pages.experience.href} className={stretched}>
              {pages.experience.description}
            </Link>
          </h3>
          <ol className="mt-6 space-y-3">
            {recent.map((entry) => (
              <li key={entry.id} className="flex items-baseline gap-3">
                <span
                  aria-hidden
                  className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-accent-bright"
                />
                <span className="min-w-0 text-[0.9375rem] leading-snug">
                  <span className="font-medium text-fg">{entry.role}</span>
                  <span className="text-muted"> · {entry.organization}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-auto flex items-center justify-between gap-4 pt-8 text-fg">
            <span className="text-sm font-medium">Full timeline</span>
            <MoreArrow />
          </div>
        </Card>

        {/* X Mass Unfollow */}
        <Card delay={0.04} className="md:col-span-2 lg:col-span-7 lg:row-span-2">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 bottom-0 -z-10 size-96 rounded-full bg-[radial-gradient(closest-side,rgb(99_102_241/0.16),transparent)]"
          />
          <div className="flex items-start justify-between gap-4">
            <Image
              src={xMassUnfollow.logo.src}
              alt=""
              width={44}
              height={44}
              className="size-11 drop-shadow-[0_6px_14px_rgb(79_70_229/0.3)]"
            />
            <span className="eyebrow text-faint">Chrome extension · Free</span>
          </div>
          <div className="mt-8 max-w-md">
            <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-none tracking-[-0.04em] text-fg">
              <Link href={pages.xMassUnfollow.href} className={stretched}>
                {xMassUnfollow.name}
              </Link>
            </h3>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
              {xMassUnfollow.description}
            </p>
            {massUnfollow ? <ExtensionLinks item={massUnfollow} className="mt-5" /> : null}
          </div>
          <Tilt max={5} className="mt-8 lg:mt-auto lg:pt-8">
            <Image
              src={xMassUnfollow.hero.src}
              alt={xMassUnfollow.hero.alt}
              width={xMassUnfollow.hero.width}
              height={xMassUnfollow.hero.height}
              quality={90}
              sizes="(min-width: 1216px) 640px, (min-width: 1024px) 54vw, 90vw"
              className="h-auto w-full rounded-2xl shadow-float ring-1 ring-line dark:brightness-[0.92]"
            />
          </Tilt>
        </Card>

        {/* GrowX */}
        {growX ? (
          <Card delay={0.08} className="lg:col-span-5">
            <div className="flex items-start justify-between gap-4">
              {growX.icon ? (
                <Image
                  src={growX.icon}
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 rounded-xl"
                />
              ) : null}
              <span className="eyebrow text-faint">Chrome extension</span>
            </div>
            <h3 className="mt-8 text-xl font-semibold leading-snug tracking-[-0.02em] text-fg">
              {growX.page ? (
                <a
                  href={growX.page.href}
                  {...(isExternalHref(growX.page.href)
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={stretched}
                >
                  {growX.name}
                  {isExternalHref(growX.page.href) ? (
                    <span className="sr-only"> (opens in a new tab)</span>
                  ) : null}
                </a>
              ) : (
                growX.name
              )}
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{growX.description}</p>
            <ExtensionLinks item={growX} className="mt-auto pt-6" />
          </Card>
        ) : null}

        {/* Telegram bots */}
        {bots?.items ? (
          <Card delay={0.12} className="lg:col-span-5">
            <div className="flex items-start justify-between gap-4">
              <IconTile>
                <BotMessageSquare aria-hidden className="size-5" strokeWidth={1.6} />
              </IconTile>
              <span className="eyebrow text-faint">{bots.items.length} bots</span>
            </div>
            <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em] text-fg">
              <Link href={pages.projects.href} className={stretched}>
                {bots.name}
              </Link>
            </h3>
            <ul className="mt-5 space-y-2">
              {bots.items.map((bot) => (
                <li key={bot.name}>
                  {bot.href ? (
                    <a
                      href={bot.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        aboveStretched,
                        "group/bot flex items-center justify-between gap-4 rounded-xl border border-line bg-bg/60 px-3.5 py-2.5 transition-colors hover:border-accent/40",
                      )}
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-fg">
                          {bot.name}
                        </span>
                        <span className="block truncate text-xs text-accent">{bot.linkLabel}</span>
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-3.5 shrink-0 text-faint transition-transform group-hover/bot:-translate-y-0.5 group-hover/bot:translate-x-0.5 group-hover/bot:text-accent"
                      />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <span className="text-sm text-muted">{bot.name}</span>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex justify-end pt-6 text-fg">
              <MoreArrow />
            </div>
          </Card>
        ) : null}
      </ul>
    </Section>
  );
}

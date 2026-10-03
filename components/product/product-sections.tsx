import { ArrowRight, Check, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { BlockHeading } from "@/components/ui/block-heading";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import type {
  Faq,
  ProductFeature,
  ProductPermission,
  ProductShowcase,
  ProductSpotlight,
  SpeedPreset,
} from "@/lib/types";
import { cn, pad2 } from "@/lib/utils";
import { productIcons } from "./icons";
import { ProductShot } from "./product-shot";

/* ── Layout ───────────────────────────────────────────────────────────── */

interface ProductSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  /** "split" puts the heading beside the content on large screens. */
  layout?: "stacked" | "split";
  children: ReactNode;
}

/** A titled block of a product page, separated from the last by a hairline. */
export function ProductSection({
  id,
  eyebrow,
  title,
  description,
  layout = "stacked",
  children,
}: ProductSectionProps) {
  const heading = (
    <BlockHeading
      id={`${id}-title`}
      eyebrow={eyebrow}
      title={title}
      description={description}
      className={layout === "split" ? "lg:sticky lg:top-28 lg:mb-0" : undefined}
    />
  );

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="border-t border-line py-20 sm:py-24"
    >
      <div className="container-page">
        {layout === "split" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">{heading}</div>
            <div className="lg:col-span-8">{children}</div>
          </div>
        ) : (
          <>
            {heading}
            {children}
          </>
        )}
      </div>
    </section>
  );
}

/* ── How it works ─────────────────────────────────────────────────────── */

export function Steps({ steps }: { steps: ProductShowcase["steps"] }) {
  return (
    <ol className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {steps.map((step, index) => (
        <Reveal
          as="li"
          key={step.title}
          delay={index * 0.08}
          className="relative isolate overflow-hidden rounded-3xl border border-line bg-elevated p-6 shadow-card sm:p-8"
        >
          <span
            aria-hidden
            className="absolute right-6 top-4 -z-10 select-none text-[5.5rem] font-semibold leading-none tracking-[-0.06em] text-subtle sm:right-8"
          >
            {index + 1}
          </span>
          <p className="eyebrow text-accent">Step {pad2(index + 1)}</p>
          <h3 className="mt-12 text-2xl font-semibold tracking-[-0.02em] text-fg">{step.title}</h3>
          <p className="mt-3 leading-relaxed text-muted">{step.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/* ── Features ─────────────────────────────────────────────────────────── */

export function FeatureGrid({ features }: { features: ProductFeature[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => {
        const Icon = productIcons[feature.icon];
        return (
          <Reveal
            as="li"
            key={feature.title}
            delay={(index % 3) * 0.06}
            className="group/feature rounded-3xl border border-line bg-elevated p-6 shadow-card transition-[border-color,box-shadow] duration-500 ease-smooth hover:border-line-strong hover:shadow-float sm:p-7"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-line bg-bg text-accent transition-colors duration-500 group-hover/feature:border-accent/30 group-hover/feature:bg-accent/[0.07]">
              <Icon aria-hidden className="size-5" strokeWidth={1.6} />
            </span>
            <h3 className="mt-5 text-lg font-semibold tracking-[-0.015em] text-fg">
              {feature.title}
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
              {feature.description}
            </p>
          </Reveal>
        );
      })}
    </ul>
  );
}

/* ── Spotlight: one feature beside its screenshot ─────────────────────── */

interface SpotlightProps {
  spotlight: ProductSpotlight;
  /** Screenshot on the left on large screens. */
  reverse?: boolean;
  /** Extra content below, e.g. a table of settings. */
  children?: ReactNode;
}

export function Spotlight({ spotlight, reverse = false, children }: SpotlightProps) {
  const titleId = `${spotlight.id}-title`;

  return (
    <section
      id={spotlight.id}
      aria-labelledby={titleId}
      className="border-t border-line py-20 sm:py-24"
    >
      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className={cn("lg:col-span-5", reverse && "lg:order-last")}>
            <p className="eyebrow flex items-center gap-3 text-faint">
              <span aria-hidden className="h-px w-8 bg-line-strong" />
              {spotlight.eyebrow}
            </p>
            <h2
              id={titleId}
              className="mt-4 text-[clamp(1.875rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-fg"
            >
              {spotlight.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{spotlight.description}</p>
            <ul className="mt-7 space-y-3">
              {spotlight.points.map((point) => (
                <li key={point} className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted">
                  <Check aria-hidden className="mt-[0.3rem] size-4 shrink-0 text-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <ProductShot
              image={spotlight.image}
              sizes="(min-width: 1216px) 660px, (min-width: 1024px) 56vw, 92vw"
            />
          </Reveal>
        </div>
        {children}
      </div>
    </section>
  );
}

/* ── Speed presets ────────────────────────────────────────────────────── */

export function SpeedPresets({ presets, note }: { presets: SpeedPreset[]; note: string }) {
  return (
    <div className="mt-16 sm:mt-20">
      <Reveal className="max-w-2xl">
        <h3 className="text-2xl font-semibold tracking-[-0.02em] text-fg">Speed presets</h3>
        <p className="mt-3 leading-relaxed text-muted">{note}</p>
      </Reveal>
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {presets.map((preset, index) => (
          <Reveal
            as="li"
            key={preset.name}
            delay={index * 0.06}
            className={cn(
              "rounded-3xl border p-6",
              preset.recommended
                ? "border-accent/40 bg-accent/[0.05]"
                : "border-line bg-elevated shadow-card",
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-lg font-semibold tracking-tight text-fg">{preset.name}</h4>
              {preset.tag ? (
                <Chip tone={preset.recommended ? "accent" : "default"}>{preset.tag}</Chip>
              ) : null}
            </div>
            <dl className="mt-6 space-y-4">
              {[
                { label: "Between unfollows", value: preset.delay },
                { label: "Breaks", value: preset.breaks },
                { label: "Per day", value: preset.dailyLimit },
              ].map((row) => (
                <div key={row.label}>
                  <dt className="eyebrow text-faint">{row.label}</dt>
                  <dd className="mt-1 text-[0.9375rem] font-medium tabular-nums text-fg">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

/* ── Privacy details: ads and permissions ─────────────────────────────── */

interface PrivacyDetailsProps {
  adsNote: string;
  permissions: ProductPermission[];
  policyHref: string;
}

export function PrivacyDetails({ adsNote, permissions, policyHref }: PrivacyDetailsProps) {
  return (
    <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 lg:grid-cols-12">
      <Reveal className="flex flex-col rounded-3xl border border-line bg-elevated p-6 shadow-card sm:p-8 lg:col-span-5">
        <h3 className="text-xl font-semibold tracking-[-0.02em] text-fg">How it stays free</h3>
        <p className="mt-3 leading-relaxed text-muted">{adsNote}</p>
        <div className="mt-auto pt-6">
          <Link
            href={policyHref}
            className="group/link inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-fg"
          >
            Read the full privacy policy
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform group-hover/link:translate-x-0.5"
            />
          </Link>
        </div>
      </Reveal>
      <Reveal
        delay={0.08}
        className="overflow-hidden rounded-3xl border border-line bg-elevated shadow-card lg:col-span-7"
      >
        <h3 className="px-6 pt-6 text-xl font-semibold tracking-[-0.02em] text-fg sm:px-8 sm:pt-8">
          Permissions, in plain words
        </h3>
        <dl className="mt-5 divide-y divide-line border-t border-line">
          {permissions.map((permission) => (
            <div
              key={permission.name}
              className="grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-[12.5rem_minmax(0,1fr)] sm:gap-6 sm:px-8"
            >
              <dt className="font-mono text-[0.8125rem] leading-6 text-fg">{permission.name}</dt>
              <dd className="text-sm leading-6 text-muted">{permission.reason}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  );
}

/* ── What's new ───────────────────────────────────────────────────────── */

export function WhatsNew({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {items.map((item, index) => (
        <Reveal
          as="li"
          key={item}
          delay={(index % 2) * 0.06}
          className="flex gap-4 rounded-3xl border border-line bg-elevated p-6 shadow-card"
        >
          <Sparkles aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.6} />
          <p className="leading-relaxed text-muted">{item}</p>
        </Reveal>
      ))}
    </ul>
  );
}

/* ── Questions & answers ──────────────────────────────────────────────── */

interface FaqListProps {
  faqs: Faq[];
  /** Where to ask anything that is not answered here. */
  support: { label: string; href: string };
}

export function FaqList({ faqs, support }: FaqListProps) {
  return (
    <div>
      <div className="divide-y divide-line border-y border-line">
        {faqs.map((faq) => (
          <details key={faq.question} className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium leading-snug text-fg transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
              <span>{faq.question}</span>
              <Plus
                aria-hidden
                className="mt-0.5 size-5 shrink-0 text-faint transition-transform duration-300 ease-smooth group-open:rotate-45"
              />
            </summary>
            <p className="max-w-2xl pb-6 pr-10 leading-relaxed text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
      <p className="mt-6 text-muted">
        Still have a question?{" "}
        <a
          href={support.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
        >
          Message {support.label}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </p>
    </div>
  );
}

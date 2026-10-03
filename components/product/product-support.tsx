import { ArrowUpRight, Bug, Heart, Share2, Star, type LucideIcon } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";
import { Reveal } from "@/components/ui/reveal";
import type { ProductShowcase } from "@/lib/types";

interface SupportOption {
  title: string;
  description: string;
  icon: LucideIcon;
  action: { kind: "link"; label: string; href: string } | { kind: "copy"; value: string };
}

const actionLinkClass =
  "group/link inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-fg";

/** Ways to get help, give feedback or spread the word. */
export function SupportOptions({
  product,
  pageUrl,
}: {
  product: ProductShowcase;
  pageUrl: string;
}) {
  const options: SupportOption[] = [
    {
      title: "Report a bug",
      description: "Spotted something off, or need a hand? Send a message on Telegram.",
      icon: Bug,
      action: { kind: "link", label: product.support.label, href: product.support.href },
    },
    {
      title: "Rate it",
      description:
        "A quick review on the Chrome Web Store helps other people find a tool that works.",
      icon: Star,
      action: { kind: "link", label: "Review on the Chrome Web Store", href: product.storeUrl },
    },
    {
      title: "Share it",
      description: "Send the link to anyone with a messy following list.",
      icon: Share2,
      action: { kind: "copy", value: pageUrl },
    },
  ];

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {options.map((option, index) => {
        const Icon = option.icon;
        return (
          <Reveal
            as="li"
            key={option.title}
            delay={index * 0.06}
            className="flex flex-col rounded-3xl border border-line bg-elevated p-6 shadow-card sm:p-7"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-line bg-bg text-accent">
              <Icon aria-hidden className="size-5" strokeWidth={1.6} />
            </span>
            <h3 className="mt-5 text-lg font-semibold tracking-[-0.015em] text-fg">
              {option.title}
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{option.description}</p>
            <div className="mt-auto pt-5">
              {option.action.kind === "link" ? (
                <a
                  href={option.action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={actionLinkClass}
                >
                  {option.action.label}
                  <ArrowUpRight
                    aria-hidden
                    className="size-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <CopyButton value={option.action.value} label="Copy link" />
              )}
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}

/** Crypto addresses for tips, each with a copy button. */
export function Donations({ product }: { product: ProductShowcase }) {
  return (
    <Reveal className="mt-5 rounded-3xl border border-line bg-elevated p-6 shadow-card sm:p-8">
      <h3 className="flex items-center gap-2.5 text-xl font-semibold tracking-[-0.02em] text-fg">
        <Heart aria-hidden className="size-5 text-accent" strokeWidth={1.8} />
        Donate
      </h3>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted">{product.donationsIntro}</p>

      <ul className="mt-6 divide-y divide-line border-y border-line">
        {product.donations.map((donation) => (
          <li
            key={donation.network}
            className="grid grid-cols-1 gap-3 py-5 md:grid-cols-[11rem_minmax(0,1fr)_auto] md:items-center md:gap-6"
          >
            <div>
              <p className="font-medium text-fg">{donation.network}</p>
              <p className="text-sm text-muted">{donation.coins}</p>
            </div>
            <div className="min-w-0">
              <code className="block break-all font-mono text-[0.8125rem] leading-6 text-fg">
                {donation.address}
              </code>
              <p className="mt-1 text-xs leading-5 text-faint">{donation.note}</p>
            </div>
            <CopyButton
              value={donation.address}
              label="Copy address"
              className="justify-self-start"
            />
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm leading-relaxed text-faint">{product.donationsNote}</p>
    </Reveal>
  );
}

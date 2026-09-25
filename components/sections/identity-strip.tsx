import { ArrowUpRight } from "lucide-react";
import { Fragment } from "react";
import { contentIcons } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { identityStrip } from "@/data/portfolio";

/** Digits in the display serif read ambiguously ("1" vs "l"); set them in the sans. */
function WithSansNumerals({ text }: { text: string }) {
  return text.split(/(\d+)/).map((part, index) =>
    /^\d+$/.test(part) ? (
      <span key={index} className="font-sans text-[0.9em] font-medium tracking-tight">
        {part}
      </span>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}

/** Compact "at a glance" profile directly beneath the hero. */
export function IdentityStrip() {
  return (
    <section aria-label="Profile at a glance" className="border-y border-line bg-elevated/60">
      <div className="container-page">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {identityStrip.map((item, index) => {
            const Icon = contentIcons[item.icon];
            return (
              <Reveal
                key={item.label}
                delay={index * 0.06}
                y={10}
                className="group/item relative border-line px-4 py-7 transition-colors duration-500 hover:bg-elevated odd:border-r max-lg:[&:nth-child(-n+2)]:border-b sm:px-7 sm:py-9 lg:border-r lg:first:border-l lg:last:border-r"
              >
                <dt className="eyebrow flex items-center gap-2 text-faint">
                  <Icon aria-hidden className="size-3.5 text-accent" strokeWidth={1.75} />
                  {item.label}
                </dt>
                <dd className="mt-3 font-serif text-[1.375rem] leading-[1.15] text-fg sm:text-[1.75rem]">
                  {item.href ? (
                    <a href={item.href} className="after:absolute after:inset-0 after:content-['']">
                      <WithSansNumerals text={item.value} />
                    </a>
                  ) : (
                    <WithSansNumerals text={item.value} />
                  )}
                </dd>
                {item.detail ? (
                  <dd className="eyebrow mt-2 whitespace-nowrap text-faint max-sm:text-[0.625rem] max-sm:tracking-[0.06em]">
                    {item.detail}
                  </dd>
                ) : null}
                {item.href ? (
                  <ArrowUpRight
                    aria-hidden
                    className="absolute right-4 top-7 size-4 text-faint opacity-0 transition-all duration-500 ease-smooth group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 group-hover/item:opacity-100 sm:right-6 sm:top-9"
                  />
                ) : null}
              </Reveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

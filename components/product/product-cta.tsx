import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { pages, person, uniqueLabs } from "@/data/portfolio";
import type { ProductShowcase } from "@/lib/types";

const creditLinkClass =
  "font-medium text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent";

/** Closing call to action, with who made the product. */
export function ProductCta({
  product,
  policyHref,
}: {
  product: ProductShowcase;
  policyHref: string;
}) {
  return (
    <section aria-labelledby="get-it-title" className="pb-20 pt-4 sm:pb-24">
      <div className="container-page">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-panel px-6 py-12 text-panel-fg ring-1 ring-panel-line sm:rounded-[2.5rem] sm:px-12 sm:py-16">
            <div aria-hidden className="absolute inset-0 -z-10 bg-grid-panel mask-fade-radial" />
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <Image
                  src={product.logo.src}
                  alt=""
                  width={product.logo.width}
                  height={product.logo.height}
                  className="size-14"
                />
                <h2
                  id="get-it-title"
                  className="mt-6 text-[clamp(1.875rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
                >
                  Clean up your following list today
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-panel-muted">
                  Free and unlimited, with no sign-up. Version {product.version}, for Chrome{" "}
                  {product.minimumChrome} and later.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:shrink-0">
                <ButtonLink href={product.storeUrl} variant="panel" size="lg">
                  Add to Chrome — it’s free
                </ButtonLink>
                <ButtonLink href={policyHref} variant="panel-outline" size="lg" icon="arrow-right">
                  Privacy policy
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 space-y-2 text-sm leading-relaxed">
          <p className="text-muted">
            A product of{" "}
            <Link href={pages.uniqueLabs.href} className={creditLinkClass}>
              {uniqueLabs.name}
            </Link>
            . Developed by{" "}
            <Link href={pages.about.href} className={creditLinkClass}>
              {person.name}
            </Link>
            .
          </p>
          <p className="text-faint">{product.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}

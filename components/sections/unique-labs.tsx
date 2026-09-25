import { ArrowUpRight, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { ButtonLink } from "@/components/ui/button";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section";
import { SmartLink } from "@/components/ui/smart-link";
import { VennVisual } from "@/components/visuals/venn-visual";
import { person, sections, uniqueLabs } from "@/data/portfolio";
import { cn } from "@/lib/utils";

function ProfileField({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("bg-panel p-6 sm:p-8", className)}>
      <dt className="eyebrow text-panel-muted">{label}</dt>
      <dd className="mt-3 text-panel-fg">{children}</dd>
    </div>
  );
}

function prettyUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function UniqueLabs() {
  const labs = uniqueLabs;
  const contactEmail = labs.contactEmail ?? person.email;
  const mailSubject = encodeURIComponent(`Hello ${labs.name}`);

  return (
    <section
      id={sections.uniqueLabs.id}
      aria-labelledby={`${sections.uniqueLabs.id}-title`}
      tabIndex={-1}
      className="relative py-12 outline-none sm:py-16 lg:py-20"
    >
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-panel text-panel-fg ring-1 ring-panel-line sm:rounded-[2.5rem]">
          <div aria-hidden className="absolute inset-0 -z-10 bg-grid-panel mask-fade-radial" />
          <div
            aria-hidden
            className="absolute -right-32 -top-32 -z-10 size-[36rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--panel-accent)_16%,transparent),transparent)]"
          />

          <div className="grid grid-cols-1 items-center gap-12 px-6 pb-4 pt-12 sm:px-10 sm:pt-16 lg:grid-cols-12 lg:gap-8 lg:px-16 lg:pb-8 lg:pt-20">
            <div className="lg:col-span-6">
              <SectionHeading meta={sections.uniqueLabs} tone="panel" spacing="none" />

              <Reveal delay={0.1} className="mt-10">
                <div className="flex items-center gap-4 border-y border-panel-line py-5">
                  <span className="flex size-11 items-center justify-center rounded-full border border-panel-line font-serif text-lg text-panel-fg">
                    {person.givenName.charAt(0)}
                    {person.familyName.charAt(0)}
                  </span>
                  <div>
                    <p className="font-medium text-panel-fg">
                      {labs.founderRole} — {labs.founderName}
                    </p>
                    <p className="eyebrow mt-1 text-panel-muted">{labs.name}</p>
                  </div>
                </div>
                <p className="mt-6 text-lg leading-relaxed text-panel-muted">{labs.description}</p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink
                    href={`mailto:${contactEmail}?subject=${mailSubject}`}
                    variant="panel"
                    icon="mail"
                  >
                    Contact {labs.name}
                  </ButtonLink>
                  {labs.website ? (
                    <ButtonLink href={labs.website} variant="panel-outline">
                      Visit website
                    </ButtonLink>
                  ) : null}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="lg:col-span-6">
              <VennVisual
                name={labs.name}
                className="mx-auto w-full max-w-[24rem] sm:max-w-[28rem]"
              />
            </Reveal>
          </div>

          <Reveal className="mt-8 border-t border-panel-line">
            <h3 className="sr-only">Company profile</h3>
            <dl className="grid grid-cols-1 gap-px bg-panel-line sm:grid-cols-2 lg:grid-cols-4">
              <ProfileField label="Mission" className="sm:col-span-2">
                {labs.mission ? (
                  <p className="text-lg leading-relaxed">{labs.mission}</p>
                ) : (
                  <Placeholder tone="panel" />
                )}
              </ProfileField>
              <ProfileField label="What we build" className="sm:col-span-2">
                {labs.whatWeBuild ? (
                  <p className="text-lg leading-relaxed">{labs.whatWeBuild}</p>
                ) : (
                  <Placeholder tone="panel" />
                )}
              </ProfileField>
              <ProfileField label="Current products" className="sm:col-span-2">
                {labs.products.length > 0 ? (
                  <ul className="space-y-3">
                    {labs.products.map((product) => (
                      <li key={product.name}>
                        {product.href ? (
                          <SmartLink
                            href={product.href}
                            className="font-medium text-panel-fg hover:text-panel-accent"
                          >
                            {product.name}
                          </SmartLink>
                        ) : (
                          <span className="font-medium">{product.name}</span>
                        )}
                        <p className="mt-1 text-sm text-panel-muted">{product.description}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Placeholder tone="panel" />
                )}
              </ProfileField>
              <ProfileField label="Areas of focus" className="sm:col-span-2">
                {labs.focusAreas.length > 0 ? (
                  <ul className="flex flex-wrap gap-2">
                    {labs.focusAreas.map((area) => (
                      <li
                        key={area}
                        className="rounded-full border border-panel-line bg-white/[0.03] px-3 py-1 text-sm text-panel-fg"
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Placeholder tone="panel" />
                )}
              </ProfileField>
              <ProfileField label="Co-Founder">
                <span className="font-medium">{labs.founderName}</span>
              </ProfileField>
              <ProfileField label="Website">
                {labs.website ? (
                  <SmartLink
                    href={labs.website}
                    className="group/w inline-flex items-center gap-1 hover:text-panel-accent"
                  >
                    {prettyUrl(labs.website)}
                    <ArrowUpRight aria-hidden className="size-3.5" />
                  </SmartLink>
                ) : (
                  <Placeholder tone="panel" />
                )}
              </ProfileField>
              <ProfileField label="GitHub">
                {labs.github ? (
                  <SmartLink
                    href={labs.github}
                    className="inline-flex items-center gap-2 hover:text-panel-accent"
                  >
                    <GitHubIcon size={15} />
                    {prettyUrl(labs.github).replace("github.com/", "")}
                  </SmartLink>
                ) : (
                  <Placeholder tone="panel" />
                )}
              </ProfileField>
              <ProfileField label="Contact">
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex max-w-full items-center gap-2 break-all hover:text-panel-accent"
                >
                  <Mail aria-hidden className="size-4 shrink-0" />
                  {contactEmail}
                </a>
              </ProfileField>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { ArrowUpRight } from "lucide-react";
import { socialIcons } from "@/components/icons";
import { CopyButton } from "@/components/ui/copy-button";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { SmartLink } from "@/components/ui/smart-link";
import { contact, person, sections, socials } from "@/data/portfolio";

export function Contact() {
  return (
    <Section meta={sections.contact} className="isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[36rem] bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_100%,black,transparent_70%)]"
      />

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <SectionHeading meta={sections.contact} spacing="tight" />
          <Reveal>
            <p className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{contact.text}</p>
          </Reveal>

          <Reveal delay={0.08} className="mt-10">
            <p className="eyebrow text-faint">Primary contact</p>
            <a
              href={`mailto:${person.email}`}
              className="group/email mt-3 inline-flex max-w-full items-center gap-3 font-serif text-[clamp(1.625rem,5.4vw,3.5rem)] leading-tight tracking-[-0.01em] text-fg"
            >
              <span className="break-all underline decoration-line-strong decoration-1 underline-offset-[0.2em] transition-colors duration-300 group-hover/email:decoration-accent">
                {person.email}
              </span>
              <ArrowUpRight
                aria-hidden
                className="size-[0.6em] shrink-0 text-accent transition-transform duration-300 ease-smooth group-hover/email:-translate-y-1 group-hover/email:translate-x-1"
                strokeWidth={1.5}
              />
            </a>
            <div className="mt-5">
              <CopyButton value={person.email} label="Copy email" />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:pt-8">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {socials.map((social, index) => {
              const Icon = socialIcons[social.id];
              return (
                <Reveal as="li" key={social.id} delay={index * 0.06}>
                  <SmartLink
                    href={social.href}
                    className="group/social flex items-center gap-4 rounded-2xl border border-line bg-elevated p-4 shadow-card transition-[border-color,box-shadow,transform] duration-500 ease-smooth hover:-translate-y-0.5 hover:border-line-strong hover:shadow-float sm:p-5"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-line bg-bg text-fg transition-colors duration-500 group-hover/social:text-accent">
                      <Icon size={18} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.9375rem] font-medium text-fg">
                        {social.label}
                      </span>
                      <span className="block truncate font-mono text-xs text-faint">
                        {social.handle}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 shrink-0 text-faint transition-all duration-300 ease-smooth group-hover/social:-translate-y-0.5 group-hover/social:translate-x-0.5 group-hover/social:text-fg"
                    />
                  </SmartLink>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}

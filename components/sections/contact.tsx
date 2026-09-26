import { ArrowUpRight } from "lucide-react";
import { socialIcons } from "@/components/icons";
import { CopyButton } from "@/components/ui/copy-button";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { SmartLink } from "@/components/ui/smart-link";
import { contact, person, sections, socialGroups, socials } from "@/data/portfolio";
import type { SocialGroup, SocialLink } from "@/lib/types";
import { cn } from "@/lib/utils";

const card = "flex items-center gap-4 rounded-2xl border border-line bg-elevated p-4 shadow-card";

function SocialCard({ social }: { social: SocialLink }) {
  const Icon = socialIcons[social.id];
  const icon = (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-line bg-bg text-fg transition-colors duration-500 group-hover/social:text-accent">
      <Icon size={18} />
    </span>
  );

  // No public link (e.g. a WhatsApp username): show the handle with a copy button.
  if (!social.href) {
    return (
      <div className={card}>
        {icon}
        <span className="min-w-0 flex-1">
          <span className="block text-[0.9375rem] font-medium text-fg">{social.label}</span>
          <span className="block truncate text-xs text-faint">Username: {social.handle}</span>
        </span>
        <CopyButton value={social.handle} label={`Copy ${social.label} username`} iconOnly />
      </div>
    );
  }

  return (
    <SmartLink
      href={social.href}
      className={cn(
        card,
        "group/social transition-[border-color,box-shadow,transform] duration-500 ease-smooth hover:-translate-y-0.5 hover:border-line-strong hover:shadow-float",
      )}
    >
      {icon}
      <span className="min-w-0 flex-1">
        <span className="block text-[0.9375rem] font-medium text-fg">{social.label}</span>
        <span className="block truncate text-xs text-faint">{social.handle}</span>
      </span>
      <ArrowUpRight
        aria-hidden
        className="size-4 shrink-0 text-faint transition-all duration-300 ease-smooth group-hover/social:-translate-y-0.5 group-hover/social:translate-x-0.5 group-hover/social:text-fg"
      />
    </SmartLink>
  );
}

function SocialGroupList({ id, className }: { id: SocialGroup; className?: string }) {
  const group = socialGroups.find((item) => item.id === id);
  const links = socials.filter((social) => social.group === id);
  if (!group || links.length === 0) return null;

  return (
    <div>
      <h3 id={`contact-${id}`} className="eyebrow text-faint">
        {group.label}
      </h3>
      <ul
        aria-labelledby={`contact-${id}`}
        className={cn("mt-4 grid grid-cols-1 gap-3", className)}
      >
        {links.map((social, index) => (
          <Reveal as="li" key={social.id} delay={index * 0.06}>
            <SocialCard social={social} />
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

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
              className="group/email mt-3 inline-flex max-w-full items-center gap-3 text-[clamp(1.5rem,4.8vw,3rem)] font-semibold leading-tight tracking-[-0.035em] text-fg lg:text-[clamp(2rem,4vw,3rem)]"
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

        {/* Spans both rows on large screens so the social links sit under the email. */}
        <div className="space-y-10 lg:col-span-5 lg:row-span-2 lg:pt-8">
          <SocialGroupList id="research" className="sm:grid-cols-2 lg:grid-cols-1" />
          <SocialGroupList id="professional" className="sm:grid-cols-2 lg:grid-cols-1" />
        </div>

        <div className="lg:col-span-7">
          <SocialGroupList id="social" className="sm:grid-cols-2" />
        </div>
      </div>
    </Section>
  );
}

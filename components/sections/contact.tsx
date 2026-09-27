import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { socialIcons } from "@/components/icons";
import { CopyButton } from "@/components/ui/copy-button";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { SmartLink } from "@/components/ui/smart-link";
import { contact, person, sections, socialGroups, socials } from "@/data/portfolio";
import type { SocialGroup, SocialLink } from "@/lib/types";
import { cn, isExternalHref } from "@/lib/utils";

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
      {...(isExternalHref(social.href) ? { rel: "me noopener noreferrer" } : {})}
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

function SocialGroupList({
  id,
  className,
  headingLevel: Heading,
}: {
  id: SocialGroup;
  className?: string;
  headingLevel: "h2" | "h3";
}) {
  const group = socialGroups.find((item) => item.id === id);
  const links = socials.filter((social) => social.group === id);
  if (!group || links.length === 0) return null;

  return (
    <div>
      <Heading id={`contact-${id}`} className="eyebrow text-faint">
        {group.label}
      </Heading>
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

/**
 * Email and every other channel, grouped. Shared by the homepage section
 * (with its heading) and the Contact page.
 */
export function ContactBody({
  heading,
  groupHeading = "h3",
}: {
  heading?: ReactNode;
  groupHeading?: "h2" | "h3";
}) {
  return (
    <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        {heading}
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
      <div className={cn("space-y-10 lg:col-span-5 lg:row-span-2", heading ? "lg:pt-8" : "")}>
        <SocialGroupList
          id="research"
          headingLevel={groupHeading}
          className="sm:grid-cols-2 lg:grid-cols-1"
        />
        <SocialGroupList
          id="professional"
          headingLevel={groupHeading}
          className="sm:grid-cols-2 lg:grid-cols-1"
        />
      </div>

      <div className="lg:col-span-7">
        <SocialGroupList id="social" headingLevel={groupHeading} className="sm:grid-cols-2" />
      </div>
    </div>
  );
}

/** Homepage section. */
export function Contact() {
  return (
    <Section meta={sections.contact} className="isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[36rem] bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_100%,black,transparent_70%)]"
      />
      <ContactBody heading={<SectionHeading meta={sections.contact} spacing="tight" />} />
    </Section>
  );
}

/** What people usually get in touch about, each linking to more. */
export function ContactTopics() {
  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {contact.topics.map((topic, index) => (
        <Reveal as="li" key={topic.title} delay={index * 0.06} className="flex">
          <article className="flex w-full flex-col rounded-3xl border border-line bg-elevated p-6 shadow-card sm:p-7">
            <h3 className="text-lg font-semibold tracking-[-0.015em] text-fg">{topic.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{topic.description}</p>
            <div className="mt-auto pt-6">
              <SmartLink
                href={topic.link.href}
                className="group/more inline-flex items-center gap-2 text-sm font-medium text-fg hover:text-accent"
              >
                {topic.link.label}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover/more:translate-x-0.5"
                />
              </SmartLink>
            </div>
          </article>
        </Reveal>
      ))}
    </ul>
  );
}

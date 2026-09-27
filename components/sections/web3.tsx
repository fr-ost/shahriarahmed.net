import { ArrowUpRight, Blocks, Handshake, Target } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import { ComingSoonCard } from "@/components/ui/coming-soon";
import { Reveal } from "@/components/ui/reveal";
import { SmartLink } from "@/components/ui/smart-link";
import { collaborations, skillGroups, uniqueLabs } from "@/data/portfolio";

const blockchainSkills = skillGroups.find((group) => group.id === "blockchain");

/** Blockchain skills and Unique Labs focus areas beside the Web3 timeline. */
export function Web3Aside() {
  return (
    <aside aria-label="Web3 skills and focus">
      <div className="space-y-6 lg:sticky lg:top-28">
        {blockchainSkills ? (
          <Reveal className="rounded-3xl border border-line bg-elevated p-6 shadow-card sm:p-7">
            <p className="eyebrow flex items-center gap-2 text-faint">
              <Blocks aria-hidden className="size-4 text-accent" strokeWidth={1.75} />
              {blockchainSkills.title}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {blockchainSkills.skills.map((skill) => (
                <li key={skill}>
                  <Chip>{skill}</Chip>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        <Reveal delay={0.08} className="rounded-3xl border border-line p-6 sm:p-7">
          <p className="eyebrow flex items-center gap-2 text-faint">
            <Target aria-hidden className="size-4 text-accent" strokeWidth={1.75} />
            {uniqueLabs.name} focus
          </p>
          <ul className="mt-4 divide-y divide-line">
            {uniqueLabs.focusAreas.map((area) => (
              <li key={area} className="py-3 text-sm text-fg">
                {area}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </aside>
  );
}

/** Past collaborations, or a placeholder until the list is added. */
export function CollaborationList() {
  if (collaborations.length === 0) {
    return (
      <ComingSoonCard
        eyebrow="Collaborations"
        icon={Handshake}
        text="Past collaborations will be listed here soon."
      />
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {collaborations.map((item, index) => (
        <Reveal as="li" key={item.id} delay={index * 0.05} className="flex">
          <article className="flex w-full flex-col rounded-3xl border border-line bg-elevated p-6 shadow-card sm:p-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {item.type ? <p className="eyebrow text-accent">{item.type}</p> : null}
              {item.period ? <p className="eyebrow text-faint">{item.period}</p> : null}
            </div>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg">{item.name}</h3>
            {item.description ? (
              <p className="mt-2 leading-relaxed text-muted">{item.description}</p>
            ) : null}
            {item.href ? (
              <div className="mt-auto pt-6">
                <SmartLink
                  href={item.href}
                  className="group/link inline-flex items-center gap-2 text-sm font-medium text-fg hover:text-accent"
                >
                  Visit
                  <ArrowUpRight
                    aria-hidden
                    className="size-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  />
                  <span className="sr-only"> {item.name}</span>
                </SmartLink>
              </div>
            ) : null}
          </article>
        </Reveal>
      ))}
    </ul>
  );
}

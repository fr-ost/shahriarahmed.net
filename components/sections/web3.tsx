import { ArrowUpRight, Blocks, Target } from "lucide-react";
import { Chip } from "@/components/ui/chip";
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

/** Past collaborations. */
/** Collaborations as a dense grid of small tiles: name, type and X account. */
export function CollaborationList() {
  return (
    <Reveal>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {collaborations.map((item) => (
          <li
            key={item.id}
            className="flex min-w-0 flex-col rounded-2xl border border-line bg-elevated/70 px-4 py-3.5 transition-colors duration-300 hover:border-line-strong"
          >
            {item.type || item.period ? (
              <p className="eyebrow truncate text-accent">
                {[item.type, item.period].filter(Boolean).join(" · ")}
              </p>
            ) : null}
            <h3 className="text-[0.9375rem] font-semibold leading-snug tracking-tight text-fg">
              {item.name}
            </h3>
            {item.description ? (
              <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
            ) : null}
            {item.handle ? (
              <a
                href={`https://x.com/${item.handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="tap group/link mt-auto flex min-w-0 items-center gap-1 pt-1.5 text-xs font-medium text-muted transition-colors hover:text-accent"
              >
                <span className="truncate">@{item.handle}</span>
                <ArrowUpRight
                  aria-hidden
                  className="size-3 shrink-0 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                />
                <span className="sr-only"> — {item.name} on X (opens in a new tab)</span>
              </a>
            ) : item.href ? (
              <SmartLink
                href={item.href}
                className="tap mt-auto pt-1.5 text-xs font-medium text-muted hover:text-accent"
              >
                Website<span className="sr-only"> of {item.name}</span>
              </SmartLink>
            ) : null}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

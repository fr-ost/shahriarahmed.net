import { ArrowUpRight, Blocks, Target } from "lucide-react";
import Image from "next/image";
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
/** Two letters for a logo placeholder, e.g. "0G Labs" → "0L", "Bitget" → "BI". */
function initials(name: string) {
  const words = name.split(/[\s/-]+/).filter(Boolean);
  return (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)).toUpperCase();
}

/** Collaborations as a dense grid of small tiles: logo, name, type, period, X account. */
export function CollaborationList() {
  return (
    <Reveal>
      <ul className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
        {collaborations.map((item) => (
          <li
            key={item.id}
            className="flex min-w-0 flex-col gap-2.5 rounded-2xl border border-line bg-elevated/70 p-3.5 transition-colors duration-300 hover:border-line-strong sm:flex-row sm:items-start sm:gap-3"
          >
            {item.logo ? (
              <Image
                src={item.logo}
                alt=""
                width={40}
                height={40}
                className="size-10 shrink-0 rounded-full border border-line bg-bg object-cover"
              />
            ) : (
              <span
                aria-hidden
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-bg text-xs font-semibold tracking-tight text-muted"
              >
                {initials(item.name)}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[0.9375rem] font-semibold leading-snug tracking-tight text-fg">
                {item.name}
              </h3>
              {item.type ? (
                <p className="mt-0.5 truncate text-xs font-medium text-accent">{item.type}</p>
              ) : null}
              {item.period ? (
                <p className="mt-0.5 text-xs text-faint">
                  <time>{item.period}</time>
                </p>
              ) : null}
              {item.description ? (
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
              ) : null}
              {item.handle ? (
                <a
                  href={`https://x.com/${item.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap group/link mt-1 flex min-w-0 items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-accent"
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
                  className="tap mt-1 block text-xs font-medium text-muted hover:text-accent"
                >
                  Website<span className="sr-only"> of {item.name}</span>
                </SmartLink>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

import { Blocks, Target } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { skillGroups, uniqueLabs } from "@/data/portfolio";

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

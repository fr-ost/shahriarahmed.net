import { contentIcons } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { sections, skillGroups } from "@/data/portfolio";
import { pad2 } from "@/lib/utils";

export function Skills() {
  return (
    <Section meta={sections.skills}>
      <SectionHeading meta={sections.skills} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {skillGroups.map((group, groupIndex) => {
          const Icon = contentIcons[group.icon];
          return (
            <Reveal
              key={group.id}
              delay={groupIndex * 0.08}
              className="flex flex-col rounded-3xl border border-line bg-elevated p-6 shadow-card sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-line bg-bg text-accent">
                  <Icon aria-hidden className="size-5" strokeWidth={1.6} />
                </span>
                <span className="eyebrow text-faint">{pad2(group.skills.length)} items</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-fg">{group.title}</h3>
              <p className="eyebrow mt-1.5 text-faint">{group.description}</p>

              <ul className="mt-6 border-t border-line">
                {group.skills.map((skill, index) => (
                  <li
                    key={skill}
                    className="group/skill flex items-baseline gap-4 border-b border-line py-3 last:border-b-0"
                  >
                    <span className="font-mono text-[0.6875rem] text-faint transition-colors duration-300 group-hover/skill:text-accent">
                      {pad2(index + 1)}
                    </span>
                    <span className="text-[0.9375rem] text-fg transition-transform duration-300 ease-smooth group-hover/skill:translate-x-0.5">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

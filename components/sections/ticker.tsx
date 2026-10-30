import { Marquee } from "@/components/fx/marquee";
import { about, skillGroups, uniqueLabs } from "@/data/portfolio";

/** Unique entries, ignoring case ("AI & automation" vs "AI & Automation"). */
function unique(items: string[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Two counter-scrolling rows: focus areas and services, then skills and methods. */
export function Ticker() {
  const focus = unique([
    ...about.focusAreas,
    ...uniqueLabs.whatWeBuild.map((service) => service.title),
  ]);
  const skills = unique(skillGroups.flatMap((group) => group.skills));

  return (
    <section
      aria-label="Focus areas and skills"
      className="relative overflow-hidden border-y border-line bg-elevated/50 py-7 sm:py-9"
    >
      <Marquee
        items={focus}
        label="Focus areas"
        duration={46}
        className="[--marquee-gap:2rem] sm:[--marquee-gap:3rem]"
        itemClassName="text-[clamp(1.5rem,3.4vw,2.5rem)] font-semibold leading-tight tracking-[-0.035em] text-fg"
      />
      <Marquee
        items={skills}
        label="Skills and methods"
        reverse
        duration={58}
        className="mt-4 [--marquee-gap:1.75rem] sm:mt-5"
        itemClassName="text-base text-muted sm:text-lg"
      />
    </section>
  );
}

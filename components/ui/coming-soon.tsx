import type { LucideIcon } from "lucide-react";
import { Rings } from "@/components/visuals/rings";
import { Reveal } from "./reveal";

interface ComingSoonCardProps {
  eyebrow: string;
  icon: LucideIcon;
  text: string;
  /** Heading level of the "Coming soon" title. */
  as?: "h2" | "h3";
}

/** Placeholder card for a list that has no entries yet. */
export function ComingSoonCard({
  eyebrow,
  icon: Icon,
  text,
  as: Heading = "h3",
}: ComingSoonCardProps) {
  return (
    <Reveal>
      <div className="relative isolate overflow-hidden rounded-[2rem] border border-dashed border-line-strong p-6 sm:p-10 lg:p-14">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Rings />
        </div>
        <p className="eyebrow flex items-center gap-2 text-accent">
          <Icon aria-hidden className="size-4" strokeWidth={1.75} />
          {eyebrow}
        </p>
        <Heading className="mt-5 text-[clamp(2.25rem,6vw,3.75rem)] font-semibold leading-none tracking-[-0.045em] text-fg">
          Coming soon
        </Heading>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{text}</p>
      </div>
    </Reveal>
  );
}

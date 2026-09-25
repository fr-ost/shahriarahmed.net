import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ChipTone = "default" | "accent" | "muted" | "panel";

const tones: Record<ChipTone, string> = {
  default: "border-line bg-elevated text-muted",
  accent: "border-accent/25 bg-accent/[0.07] text-accent",
  muted: "border-transparent bg-subtle text-muted",
  panel: "border-panel-line bg-white/[0.03] text-panel-muted",
};

interface ChipProps {
  children: ReactNode;
  tone?: ChipTone;
  className?: string;
}

export function Chip({ children, tone = "default", className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.8125rem] leading-5",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Small status indicator, e.g. "Ongoing" or "Current". */
export function StatusDot({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("relative inline-flex size-2", className)}>
      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-bright" />
      <span className="relative inline-flex size-2 rounded-full bg-accent-bright" />
    </span>
  );
}

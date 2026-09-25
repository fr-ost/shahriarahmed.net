import { cn } from "@/lib/utils";

interface PlaceholderProps {
  children?: string;
  className?: string;
  tone?: "default" | "panel";
}

/**
 * Consistent marker for content that has not been provided yet
 * (any `null` field in data/portfolio.ts).
 */
export function Placeholder({
  children = "Coming soon",
  className,
  tone = "default",
}: PlaceholderProps) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2 rounded-full border border-dashed px-2.5 py-1 tracking-[0.1em]",
        tone === "panel" ? "border-panel-line text-panel-muted" : "border-line-strong text-faint",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("size-1 rounded-full", tone === "panel" ? "bg-panel-muted" : "bg-faint")}
      />
      {children}
    </span>
  );
}

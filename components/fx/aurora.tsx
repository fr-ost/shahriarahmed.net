import { cn } from "@/lib/utils";

interface AuroraProps {
  className?: string;
  /** Fade out towards the bottom edge, so a section can end without a seam. */
  fade?: boolean;
}

/**
 * Soft fields of teal, sky and violet light behind a section. Decorative,
 * CSS-only and still (see `.aurora-blob` in styles/globals.css), so it costs
 * nothing once painted.
 */
export function Aurora({ className, fade = false }: AuroraProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        fade && "[mask-image:linear-gradient(to_bottom,black_45%,transparent)]",
        className,
      )}
    >
      <span className="aurora-blob aurora-blob-a" />
      <span className="aurora-blob aurora-blob-b" />
      <span className="aurora-blob aurora-blob-c" />
    </div>
  );
}

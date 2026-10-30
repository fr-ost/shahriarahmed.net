import { cn } from "@/lib/utils";

interface AuroraProps {
  className?: string;
  /** Fine film grain over the colour, for depth. */
  grain?: boolean;
  /** Fade out towards the bottom edge, so a section can end without a seam. */
  fade?: boolean;
}

/**
 * Slowly drifting fields of teal, sky and violet light behind a section.
 * Decorative and CSS-only (see `.aurora-blob` in styles/globals.css); it
 * holds still for visitors who prefer reduced motion.
 */
export function Aurora({ className, grain = true, fade = false }: AuroraProps) {
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
      {grain ? (
        <span className="absolute inset-0 bg-noise opacity-40 mix-blend-soft-light" />
      ) : null}
    </div>
  );
}

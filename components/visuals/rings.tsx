import { cn } from "@/lib/utils";

/** Slowly turning concentric rings — a quiet medal motif behind cards. */
export function Rings({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-100 -100 200 200"
      aria-hidden
      className={cn(
        "absolute -right-44 top-1/2 size-[26rem] -translate-y-1/2 animate-spin-slower text-line-strong opacity-70 sm:-right-40 lg:-right-36",
        className,
      )}
    >
      {[92, 74, 56].map((r, i) => (
        <circle
          key={r}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeDasharray={i === 0 ? "0.6 3" : i === 1 ? undefined : "4 3"}
        />
      ))}
      <circle cx="0" cy="-92" r="2.4" className="fill-accent-bright" />
    </svg>
  );
}

import { cn } from "@/lib/utils";

/**
 * Personal mark: a hexagonal ring (molecular motif) with one highlighted
 * node. Also used to generate the favicon (see scripts/generate-icons.mjs).
 */
export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
    >
      <path
        d="M16 5.5 25.093 10.75v10.5L16 26.5l-9.093-5.25v-10.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16" r="2.1" fill="currentColor" />
      <circle cx="25.093" cy="10.75" r="3.4" className="fill-accent-bright" />
    </svg>
  );
}

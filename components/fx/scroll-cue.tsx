interface ScrollCueProps {
  /** In-page anchor to the next section, e.g. "#about". */
  href: string;
}

/** A small animated mouse that invites scrolling to the next section. */
export function ScrollCue({ href }: ScrollCueProps) {
  return (
    <a
      href={href}
      className="group/cue inline-flex flex-col items-center gap-2.5 rounded-full text-faint transition-colors duration-300 hover:text-fg"
    >
      <span
        aria-hidden
        className="flex h-9 w-[1.375rem] justify-center rounded-full border border-line-strong pt-2 transition-colors duration-300 group-hover/cue:border-fg/40"
      >
        <span className="h-1.5 w-[3px] rounded-full bg-current animate-scroll-dot" />
      </span>
      <span className="eyebrow">Scroll</span>
    </a>
  );
}

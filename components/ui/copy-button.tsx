"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  label: string;
  className?: string;
  tone?: "default" | "panel";
  /** Round icon-only button; `label` becomes its accessible name and tooltip. */
  iconOnly?: boolean;
}

/** Copies text to the clipboard with an accessible confirmation. */
export function CopyButton({
  value,
  label,
  className,
  tone = "default",
  iconOnly = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard access can be blocked; the value remains visible to copy manually.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      {...(iconOnly ? { "aria-label": label, title: copied ? "Copied" : label } : {})}
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-2 rounded-full border text-sm transition-colors duration-300",
        iconOnly ? "w-9 justify-center" : "px-3.5",
        tone === "panel"
          ? "border-panel-line text-panel-muted hover:text-panel-fg"
          : "border-line text-muted hover:border-line-strong hover:text-fg",
        className,
      )}
    >
      {copied ? (
        <Check aria-hidden className="size-3.5 text-accent" />
      ) : (
        <Copy aria-hidden className="size-3.5" />
      )}
      {iconOnly ? null : <span>{copied ? "Copied" : label}</span>}
      <span className="sr-only" role="status">
        {copied ? `${label}: copied to clipboard` : ""}
      </span>
    </button>
  );
}

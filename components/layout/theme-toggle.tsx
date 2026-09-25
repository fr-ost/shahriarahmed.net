"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect } from "react";
import { applyTheme, readStoredTheme, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

function currentTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export function ThemeToggle({ className }: { className?: string }) {
  // Re-apply the saved theme before paint: React resets <html> attributes when
  // Strict Mode remounts in development, and the theme-color <meta> may not
  // have existed yet when the inline head script ran.
  useLayoutEffect(() => {
    applyTheme(readStoredTheme(), false);
  }, []);

  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduceMotion && typeof document.startViewTransition === "function") {
      document.startViewTransition(() => applyTheme(next));
    } else {
      applyTheme(next);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title="Toggle theme"
      className={cn(
        "group/theme relative inline-flex size-10 items-center justify-center rounded-full text-muted transition-colors duration-300 hover:bg-subtle hover:text-fg",
        className,
      )}
    >
      {/* Label and icon follow `data-theme` through CSS, so they are correct
          from the first paint — before React hydrates. */}
      <span className="sr-only dark:hidden">Switch to dark theme</span>
      <span className="sr-only hidden dark:inline">Switch to light theme</span>
      <Sun
        aria-hidden
        className="size-[1.125rem] rotate-90 scale-0 opacity-0 transition-all duration-500 ease-smooth dark:rotate-0 dark:scale-100 dark:opacity-100"
        strokeWidth={1.75}
      />
      <Moon
        aria-hidden
        className="absolute size-[1.125rem] rotate-0 scale-100 opacity-100 transition-all duration-500 ease-smooth dark:-rotate-90 dark:scale-0 dark:opacity-0"
        strokeWidth={1.75}
      />
    </button>
  );
}

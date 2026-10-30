export type Theme = "light" | "dark";

/** Browser UI colours; keep in sync with `--bg` in styles/globals.css. */
export const THEME_COLORS: Record<Theme, string> = {
  light: "#f7f7f4",
  dark: "#0a0b0b",
};

export const THEME_STORAGE_KEY = "theme";

/**
 * Runs in <head> before first paint so the theme is applied without a flash.
 * A saved choice wins; otherwise the theme follows the system setting.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="dark"&&t!=="light")t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";var d=document.documentElement;d.setAttribute("data-theme",t);d.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?"${THEME_COLORS.dark}":"${THEME_COLORS.light}")}catch(e){}})()`;

/** The theme the visitor chose, if any. */
export function readSavedTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === "dark" || saved === "light" ? saved : null;
  } catch {
    return null;
  }
}

/** The system's colour scheme. */
export function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** The saved choice, or the system setting when nothing is saved. */
export function readStoredTheme(): Theme {
  return readSavedTheme() ?? systemTheme();
}

/** Apply a theme to the document and remember it. */
export function applyTheme(theme: Theme, persist = true) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);

  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies.
    }
  }
}

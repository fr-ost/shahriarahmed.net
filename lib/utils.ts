/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** True for links that leave the site (http/https URLs). */
export function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}

/** Pad a number to two digits, e.g. 3 → "03". */
export function pad2(value: number): string {
  return value.toString().padStart(2, "0");
}

/** Build a mailto: link with an optional subject line. */
export function mailto(email: string, subject?: string): string {
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
}

/** URL without the protocol or trailing slash, e.g. "example.com/path". */
export function prettyUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

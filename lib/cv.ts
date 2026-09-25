import { existsSync } from "node:fs";
import { join } from "node:path";
import { cv, person } from "@/data/portfolio";
import { mailto } from "./utils";

export interface CvLink {
  available: boolean;
  href: string;
  label: string;
}

/**
 * Resolves the CV link at build time. When /public/Shahriar-Ahmed-CV.pdf
 * exists the link downloads it; otherwise it falls back to an email request,
 * so the site never links to a missing file.
 */
export function getCvLink(): CvLink {
  const available = existsSync(join(process.cwd(), "public", cv.fileName));
  return available
    ? { available, href: cv.href, label: "Download CV" }
    : { available, href: mailto(person.email, cv.requestSubject), label: "Request CV" };
}

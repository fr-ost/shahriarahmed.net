import Link from "next/link";
import { Fragment, type ReactNode } from "react";

/**
 * Renders the small Markdown subset used in product descriptions:
 * paragraphs, ### headings, - and 1. lists, **bold** and [links](url).
 * Server-only, no dependency, and no HTML is injected.
 */
const linkClass =
  "font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent";

function inline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1])
      parts.push(
        <strong key={match.index} className="font-semibold text-fg">
          {match[1]}
        </strong>,
      );
    else if (match[3].startsWith("/"))
      parts.push(
        <Link key={match.index} href={match[3]} className={linkClass}>
          {match[2]}
        </Link>,
      );
    else
      parts.push(
        <a
          key={match.index}
          href={match[3]}
          className={linkClass}
          {...(/^https?:/.test(match[3]) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {match[2]}
          {/^https?:/.test(match[3]) ? (
            <span className="sr-only"> (opens in a new tab)</span>
          ) : null}
        </a>,
      );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

type Block =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; ordered: boolean; items: string[] };

function parse(markdown: string): Block[] {
  const blocks: Block[] = [];
  for (const chunk of markdown.trim().split(/\n\s*\n/)) {
    const lines = chunk
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    if (lines.length === 0) continue;
    if (/^#{1,6} /.test(lines[0]) && lines.length === 1) {
      blocks.push({ kind: "heading", text: lines[0].replace(/^#{1,6} /, "") });
    } else if (lines.every((line) => /^[-*] /.test(line))) {
      blocks.push({ kind: "list", ordered: false, items: lines.map((line) => line.slice(2)) });
    } else if (lines.every((line) => /^\d+\. /.test(line))) {
      blocks.push({
        kind: "list",
        ordered: true,
        items: lines.map((line) => line.replace(/^\d+\. /, "")),
      });
    } else {
      blocks.push({ kind: "paragraph", text: lines.join(" ") });
    }
  }
  return blocks;
}

export function Markdown({
  text,
  headingLevel = "h3",
}: {
  text: string;
  /** Every heading renders at this level, whatever its number of #. */
  headingLevel?: "h2" | "h3" | "h4";
}) {
  const Heading = headingLevel;
  return (
    <div className="space-y-4 leading-relaxed text-muted">
      {parse(text).map((block, index) => (
        <Fragment key={index}>
          {block.kind === "heading" ? (
            <Heading className="pt-4 text-xl font-semibold tracking-tight text-fg">
              {block.text}
            </Heading>
          ) : block.kind === "paragraph" ? (
            <p>{inline(block.text)}</p>
          ) : block.ordered ? (
            <ol className="list-decimal space-y-2 pl-6 marker:text-faint">
              {block.items.map((item, i) => (
                <li key={i}>{inline(item)}</li>
              ))}
            </ol>
          ) : (
            <ul className="list-disc space-y-2 pl-6 marker:text-accent">
              {block.items.map((item, i) => (
                <li key={i}>{inline(item)}</li>
              ))}
            </ul>
          )}
        </Fragment>
      ))}
    </div>
  );
}

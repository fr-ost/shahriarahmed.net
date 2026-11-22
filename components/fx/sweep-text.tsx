import { Fragment, type CSSProperties } from "react";

interface SweepTextProps {
  text: string;
  className?: string;
}

/**
 * A statement whose words brighten one after another when it scrolls into
 * view (see `.sweep-word`; the page's one observer in lib/reveal.ts sets
 * `data-shown`). The text is ordinary, selectable copy.
 */
export function SweepText({ text, className }: SweepTextProps) {
  const words = text.split(" ");

  return (
    <p data-sweep="" className={className}>
      {words.map((word, index) => (
        <Fragment key={index}>
          <span className="sweep-word" style={{ "--i": index } as CSSProperties}>
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </p>
  );
}

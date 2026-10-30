"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";

interface SweepTextProps {
  text: string;
  className?: string;
}

/**
 * A statement whose words brighten one after another when it scrolls into
 * view (see `.sweep-word`). The text is ordinary, selectable copy.
 */
export function SweepText({ text, className }: SweepTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <p ref={ref} data-sweep={on ? "on" : undefined} className={className}>
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

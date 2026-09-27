import { Fragment } from "react";
import { person } from "@/data/portfolio";
import type { LegalSection } from "@/lib/types";
import { SmartLink } from "./smart-link";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Text with the contact email turned into a mailto link. */
function WithEmail({ text }: { text: string }) {
  const parts = text.split(person.email);
  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {index > 0 ? (
            <a
              href={`mailto:${person.email}`}
              className="font-medium text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
            >
              {person.email}
            </a>
          ) : null}
          {part}
        </Fragment>
      ))}
    </>
  );
}

interface LegalDocumentProps {
  sections: LegalSection[];
  updated: { label: string; dateTime: string };
}

/** Policy text with a "last updated" note and, on large screens, a contents list. */
export function LegalDocument({ sections, updated }: LegalDocumentProps) {
  const items = sections.map((section) => ({ ...section, id: slugify(section.heading) }));

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
      <aside className="lg:col-span-4">
        <div className="rounded-3xl border border-line p-6 lg:sticky lg:top-28">
          <p className="eyebrow text-faint">Last updated</p>
          <p className="mt-2 text-fg">
            <time dateTime={updated.dateTime}>{updated.label}</time>
          </p>
          <nav aria-label="On this page" className="mt-6 hidden border-t border-line pt-6 lg:block">
            <p className="eyebrow text-faint">On this page</p>
            <ol className="mt-4 space-y-2.5 text-sm">
              {items.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-muted transition-colors hover:text-fg">
                    {item.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </aside>

      <article className="max-w-2xl lg:col-span-8">
        {items.map((item) => (
          <section
            key={item.id}
            id={item.id}
            aria-labelledby={`${item.id}-title`}
            className="border-t border-line py-8 first:border-t-0 first:pt-0 sm:py-10"
          >
            <h2
              id={`${item.id}-title`}
              className="text-2xl font-semibold tracking-[-0.02em] text-fg"
            >
              {item.heading}
            </h2>
            {item.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-[1.0625rem] leading-relaxed text-muted">
                <WithEmail text={paragraph} />
              </p>
            ))}
            {item.list ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[1.0625rem] leading-relaxed text-muted marker:text-accent">
                {item.list.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            ) : null}
            {item.links ? (
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {item.links.map((link) => (
                  <li key={link.href}>
                    <SmartLink
                      href={link.href}
                      className="font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
                    >
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </article>
    </div>
  );
}

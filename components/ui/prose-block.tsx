import { BlockHeading } from "@/components/ui/block-heading";
import { Markdown } from "@/components/ui/markdown";
import type { ProseCopy } from "@/lib/types";

/**
 * A titled block of running text, with an optional list of terms. The
 * paragraphs accept the Markdown subset of components/ui/markdown.tsx, so
 * they can link to other pages.
 */
export function ProseBlock({ id, copy }: { id: string; copy: ProseCopy }) {
  return (
    <section aria-labelledby={id} className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <BlockHeading id={id} eyebrow={copy.eyebrow} title={copy.title} />
        <div className="text-[1.0625rem] [&_p]:leading-relaxed">
          <Markdown text={copy.paragraphs.join("\n\n")} />
        </div>
      </div>
      {copy.terms?.length ? (
        <div className="lg:col-span-5">
          {copy.termsTitle ? (
            <h3 className="eyebrow text-faint lg:mt-3">{copy.termsTitle}</h3>
          ) : null}
          <dl className="mt-5 divide-y divide-line border-y border-line">
            {copy.terms.map((term) => (
              <div key={term.term} className="py-3.5">
                <dt className="font-semibold tracking-tight text-fg">{term.term}</dt>
                <dd className="mt-1 text-[0.9375rem] leading-relaxed text-muted">
                  {term.definition}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </section>
  );
}

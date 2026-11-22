import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { KeepExploring } from "@/components/sections/explore";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { pages, person, projects } from "@/data/portfolio";
import { absolute, buildPageJsonLd, ids } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

/** Newspaper Brief Daily for BCS, a Telegram bot. */

const page = pages.bcsBot;
const bot = projects
  .find((project) => project.id === "telegram-bots")
  ?.items?.find((item) => item.slug === "bcs-newspaper-brief");

/** The bot's own description, in Bangla, as written by its author. */
const banglaDescription =
  "বিসিএস প্রস্তুতির দৈনিক কারেন্ট অ্যাফেয়ার্স: বাংলা নোট + ৩টি MCQ, প্রতিদিন সকাল ৮টায়।";

export const metadata: Metadata = pageMetadata(page);

const steps = [
  { title: "Open the bot", text: "Open @BCSNWZ_bot in Telegram, on your phone or computer." },
  { title: "Tap Start", text: "Start the bot to subscribe to the daily brief." },
  {
    title: "Read and practise",
    text: "Every day at 8 AM a new brief arrives: current affairs notes in Bangla, then three MCQs.",
  },
];

export default function BcsBotPage() {
  const href = bot?.href ?? "https://t.me/BCSNWZ_bot";
  const softwareId = `${absolute(page.href)}#software`;
  const software = {
    "@type": "SoftwareApplication",
    "@id": softwareId,
    name: page.label,
    alternateName: "@BCSNWZ_bot",
    description: page.description,
    url: href,
    sameAs: href,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Telegram",
    inLanguage: ["bn", "en"],
    audience: { "@type": "Audience", audienceType: "BCS exam candidates" },
    ...(bot?.icon ? { image: absolute(bot.icon) } : {}),
    author: { "@id": ids.person },
    creator: { "@id": ids.person },
  };

  return (
    <>
      <JsonLd
        data={buildPageJsonLd({
          page,
          parents: [pages.projects],
          type: "ItemPage",
          about: { "@id": softwareId },
          mainEntity: { "@id": softwareId },
          nodes: [software],
        })}
      />
      <PageHeader page={page} parents={[pages.projects]}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {bot?.icon ? (
            <Image
              src={bot.icon}
              alt=""
              width={48}
              height={48}
              className="mr-1 size-12 rounded-xl"
            />
          ) : null}
          <ButtonLink href={href}>Open @BCSNWZ_bot in Telegram</ButtonLink>
        </div>
      </PageHeader>

      <div className="container-page pb-24 sm:pb-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <article className="min-w-0 space-y-14 lg:col-span-8">
            <section aria-labelledby="what-title">
              <h2 id="what-title" className="text-3xl font-semibold tracking-tight text-fg">
                What it is
              </h2>
              <div className="mt-5 space-y-4 text-[1.0625rem] leading-relaxed text-muted">
                <p>
                  Newspaper Brief Daily for BCS is a Telegram bot for people preparing for the
                  Bangladesh Civil Service (BCS) exam. Each morning it sends a brief of the day’s
                  current affairs, written as notes in Bangla, followed by three multiple-choice
                  questions (MCQs) to practise with.
                </p>
                <p>
                  It runs inside Telegram, so there is nothing to install beyond the app. It is
                  built and run by{" "}
                  <Link
                    href={pages.about.href}
                    className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
                  >
                    {person.name}
                  </Link>
                  .
                </p>
              </div>
            </section>

            <section aria-labelledby="bangla-title" lang="bn">
              <h2 id="bangla-title" className="text-3xl font-semibold tracking-tight text-fg">
                বাংলায়
              </h2>
              <p className="mt-5 rounded-3xl border border-line bg-elevated p-6 text-xl leading-relaxed text-fg shadow-card sm:p-8">
                {banglaDescription}
              </p>
            </section>

            <section aria-labelledby="how-title">
              <h2 id="how-title" className="text-3xl font-semibold tracking-tight text-fg">
                How to use it
              </h2>
              <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {steps.map((step, index) => (
                  <li
                    key={step.title}
                    className="rounded-2xl border border-line bg-elevated p-5 shadow-card"
                  >
                    <p className="eyebrow text-accent">Step {index + 1}</p>
                    <h3 className="mt-2 font-semibold tracking-tight text-fg">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.text}</p>
                  </li>
                ))}
              </ol>
            </section>
          </article>

          <aside aria-label="The bot at a glance" className="lg:col-span-4">
            <dl className="divide-y divide-line rounded-3xl border border-line bg-elevated shadow-card lg:sticky lg:top-28">
              {[
                { label: "Platform", value: "Telegram" },
                { label: "Username", value: "@BCSNWZ_bot" },
                { label: "Language", value: "Bangla" },
                { label: "Schedule", value: "Every day, 8 AM" },
                { label: "Each brief", value: "Notes + 3 MCQs" },
                { label: "For", value: "BCS exam candidates" },
              ].map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-4 px-5 py-3.5"
                >
                  <dt className="eyebrow text-faint">{fact.label}</dt>
                  <dd className="text-right text-sm font-medium text-fg">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
      <KeepExploring current={pages.projects.href} />
    </>
  );
}

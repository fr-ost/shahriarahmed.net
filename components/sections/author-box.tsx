import Image from "next/image";
import Link from "next/link";
import portrait from "@/public/images/shahriar-ahmed.webp";
import { pages, person } from "@/data/portfolio";

/** "About the author", under every post. */
export function AuthorBox() {
  return (
    <aside
      aria-label="About the author"
      className="flex flex-col gap-5 rounded-3xl border border-line bg-elevated p-6 shadow-card sm:flex-row sm:items-center"
    >
      <Image
        src={portrait}
        alt={person.portrait.alt}
        sizes="80px"
        className="size-20 shrink-0 rounded-2xl object-cover"
      />
      <div>
        <p className="eyebrow text-faint">About the author</p>
        <p className="mt-2 font-semibold tracking-tight text-fg">
          <Link href={pages.about.href} className="hover:text-accent">
            {person.name}
          </Link>{" "}
          <span className="font-normal text-muted">({person.fullName})</span>
        </p>
        <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">
          {person.field} researcher at the {person.institution} and {person.title}. Based in{" "}
          {person.location.city}, {person.location.country}.
        </p>
      </div>
    </aside>
  );
}

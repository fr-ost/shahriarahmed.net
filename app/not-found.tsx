import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section
      id="top"
      aria-labelledby="not-found-title"
      className="relative isolate flex min-h-[80dvh] items-center overflow-hidden pb-24 pt-40"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_45%,black,transparent_75%)]"
      />
      <div className="container-page">
        <p className="eyebrow text-accent">Error 404</p>
        <h1
          id="not-found-title"
          className="mt-6 font-serif text-[clamp(3rem,10vw,7rem)] leading-[0.9] tracking-[-0.03em] text-fg"
        >
          Nothing to see <em className="italic text-accent">here</em>.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
          The page you were looking for does not exist or has moved.
        </p>
        <div className="mt-10">
          <ButtonLink href="/" size="lg" icon="arrow-right">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

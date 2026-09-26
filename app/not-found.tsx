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
          className="mt-6 text-[clamp(2.75rem,9vw,6rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-fg"
        >
          Nothing to see <span className="text-accent">here</span>.
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

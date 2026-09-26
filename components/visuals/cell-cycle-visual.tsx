/**
 * Schematic of the eukaryotic cell cycle (G1 → S → G2 → M) with the major
 * checkpoints and an apoptosis exit — a general cancer-biology motif for the
 * research section. Phase proportions are approximate and not to scale.
 */

const R = 128;

type Phase = { id: string; label: string; start: number; end: number; className: string };

// Angles in degrees, clockwise, 0° = 3 o'clock. M is centred at the top.
const phases: Phase[] = [
  { id: "m", label: "M", start: -108, end: -72, className: "stroke-fg" },
  { id: "g1", label: "G1", start: -72, end: 86, className: "stroke-accent-bright/35" },
  { id: "s", label: "S", start: 86, end: 194, className: "stroke-accent-bright" },
  { id: "g2", label: "G2", start: 194, end: 252, className: "stroke-accent/60" },
];

const checkpoints = [
  { angle: 86, label: "G1/S" },
  { angle: 252, label: "G2/M" },
  { angle: -90, label: "Spindle" },
];

const toRad = (deg: number) => (deg * Math.PI) / 180;
const r1 = (value: number) => Math.round(value * 10) / 10;
const polar = (deg: number, radius: number) => ({
  x: r1(Math.cos(toRad(deg)) * radius),
  y: r1(Math.sin(toRad(deg)) * radius),
});

function arc(start: number, end: number, radius: number) {
  const gap = 1.6;
  const a = polar(start + gap, radius);
  const b = polar(end - gap, radius);
  const large = end - start - gap * 2 > 180 ? 1 : 0;
  return `M ${a.x} ${a.y} A ${radius} ${radius} 0 ${large} 1 ${b.x} ${b.y}`;
}

/** Evenly spaced tick marks drawn as a single dashed circle. */
function tickRing(radius: number, count: number, dash: number) {
  const gap = (2 * Math.PI * radius) / count - dash;
  return {
    r: radius,
    strokeDasharray: `${dash} ${Math.round(gap * 100) / 100}`,
    strokeDashoffset: dash / 2,
  };
}

const minorTicks = tickRing(163, 48, 0.9);
const majorTicks = tickRing(161.5, 12, 1.1);

// Apoptosis exit from the G1/S checkpoint.
const exitStart = polar(86, R + 14);
const exitEnd = polar(86, R + 56);

export function CellCycleVisual({ className }: { className?: string }) {
  return (
    <figure className={className}>
      <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
        <svg
          viewBox="-200 -200 400 400"
          aria-hidden
          className="absolute inset-0 size-full overflow-visible"
        >
          <g className="fill-none stroke-faint">
            <circle {...minorTicks} strokeWidth="4" opacity="0.3" />
            <circle {...majorTicks} strokeWidth="7" opacity="0.7" />
          </g>
          <g className="vfx">
            <circle
              r="78"
              className="fill-none stroke-line-strong"
              strokeWidth="1"
              strokeDasharray="2 5"
            />
          </g>

          {phases.map((phase) => (
            <path
              key={phase.id}
              d={arc(phase.start, phase.end, R)}
              className={`fill-none ${phase.className}`}
              strokeWidth="16"
            />
          ))}

          <g className="vfx stroke-fg" strokeWidth="2" strokeLinecap="round">
            {checkpoints.map((checkpoint) => {
              const a = polar(checkpoint.angle, R - 15);
              const b = polar(checkpoint.angle, R + 15);
              return <line key={checkpoint.label} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />;
            })}
          </g>

          {phases.map((phase) => {
            const mid = (phase.start + phase.end) / 2;
            const p = polar(mid, R - 28);
            return (
              <text
                key={phase.id}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-fg font-sans text-[13px] font-semibold tracking-[0.04em]"
              >
                {phase.label}
              </text>
            );
          })}

          {/* Apoptosis exit */}
          <g className="vfx">
            <line
              x1={exitStart.x}
              y1={exitStart.y}
              x2={exitEnd.x}
              y2={exitEnd.y - 8}
              className="stroke-faint"
              strokeWidth="1.2"
              strokeDasharray="3 4"
            />
          </g>
          <g transform={`translate(${exitEnd.x} ${exitEnd.y + 6})`}>
            <g className="vfx">
              <circle
                r="11"
                className="fill-bg stroke-faint"
                strokeWidth="1.2"
                strokeDasharray="2.5 2.5"
              />
            </g>
            {[20, 110, 200, 290].map((deg) => {
              const p = polar(deg, 13);
              return <circle key={deg} cx={p.x} cy={p.y} r="2.6" className="fill-faint" />;
            })}
            <text
              x="24"
              y="0"
              dominantBaseline="central"
              className="fill-faint font-sans text-[10px] font-semibold uppercase tracking-[0.1em]"
            >
              Apoptosis
            </text>
          </g>

          <text
            x="0"
            y="-4"
            textAnchor="middle"
            className="fill-fg font-sans text-[26px] font-semibold tracking-[-0.02em]"
          >
            Cell cycle
          </text>
          <text
            x="0"
            y="20"
            textAnchor="middle"
            className="fill-faint font-sans text-[10px] font-semibold uppercase tracking-[0.1em]"
          >
            G1 · S · G2 · M
          </text>
        </svg>

        {/* Progress marker travelling around the cycle */}
        <svg
          viewBox="-200 -200 400 400"
          aria-hidden
          className="absolute inset-0 size-full animate-orbit will-change-transform"
        >
          <g className="vfx">
            <circle cx="0" cy={-R} r="7" className="fill-bg stroke-fg" strokeWidth="2" />
          </g>
        </svg>

        <div
          aria-hidden
          className="eyebrow pointer-events-none absolute inset-0 text-[0.625rem] text-faint"
        >
          <span className="absolute left-0 top-0">Fig. 02</span>
          <span className="absolute right-0 top-0">Cell-cycle phases</span>
        </div>
      </div>
      <figcaption className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-faint">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="h-3 w-0.5 rounded-full bg-fg" />
          Checkpoints
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="size-2.5 rounded-full border border-dashed border-faint" />
          Apoptotic exit
        </span>
        <span>Schematic · not to scale</span>
      </figcaption>
    </figure>
  );
}

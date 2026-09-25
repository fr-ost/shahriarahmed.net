/**
 * Unique Labs visual: three overlapping fields — technology, AI and
 * experimentation — with the company at their intersection. Each field has a
 * node orbiting its boundary; every moving part is a separately composited
 * layer rotated by CSS.
 */

interface Field {
  label: string;
  cx: number;
  cy: number;
  /** Label anchor position and alignment. */
  label_x: number;
  label_y: number;
  anchor: "start" | "middle" | "end";
  orbit: string;
}

const RADIUS = 108;
const SIZE = 440; // viewBox is -220..220

const fields: Field[] = [
  {
    label: "Technology",
    cx: 0,
    cy: -60,
    label_x: 0,
    label_y: -184,
    anchor: "middle",
    orbit: "animate-orbit-a",
  },
  {
    label: "AI",
    cx: -52,
    cy: 30,
    label_x: -176,
    label_y: 150,
    anchor: "start",
    orbit: "animate-orbit-b",
  },
  {
    label: "Experimentation",
    cx: 52,
    cy: 30,
    label_x: 176,
    label_y: 150,
    anchor: "end",
    orbit: "animate-orbit-c",
  },
];

/** Position a square layer centred on a field, as percentages of the frame. */
function layerStyle(field: Field) {
  const diameter = RADIUS * 2;
  return {
    left: `${((field.cx - RADIUS + SIZE / 2) / SIZE) * 100}%`,
    top: `${((field.cy - RADIUS + SIZE / 2) / SIZE) * 100}%`,
    width: `${(diameter / SIZE) * 100}%`,
    height: `${(diameter / SIZE) * 100}%`,
  };
}

export function VennVisual({ name, className }: { name: string; className?: string }) {
  return (
    <figure className={className}>
      <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
        <div
          aria-hidden
          className="absolute inset-[18%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--panel-accent)_22%,transparent),transparent)]"
        />

        {/* Outer rotating orbit */}
        <svg
          viewBox="-220 -220 440 440"
          aria-hidden
          className="absolute inset-0 size-full animate-spin-slower will-change-transform"
        >
          <g className="vfx">
            <circle
              r="206"
              className="fill-none stroke-panel-line"
              strokeWidth="1"
              strokeDasharray="1 6"
            />
          </g>
          {[40, 170, 290].map((deg, i) => {
            const a = (deg * Math.PI) / 180;
            return (
              <circle
                key={deg}
                cx={Math.round(Math.cos(a) * 2060) / 10}
                cy={Math.round(Math.sin(a) * 2060) / 10}
                r={i === 0 ? 4 : 2.5}
                className={i === 0 ? "fill-panel-accent" : "fill-panel-muted"}
              />
            );
          })}
        </svg>

        {/* Fields */}
        <svg viewBox="-220 -220 440 440" aria-hidden className="absolute inset-0 size-full">
          <g className="vfx fill-panel-accent/[0.06] stroke-panel-fg/30" strokeWidth="1">
            {fields.map((field) => (
              <circle key={field.label} cx={field.cx} cy={field.cy} r={RADIUS} />
            ))}
          </g>
          {fields.map((field) => (
            <text
              key={field.label}
              x={field.label_x}
              y={field.label_y}
              textAnchor={field.anchor}
              className="fill-panel-muted font-mono text-[11px] uppercase tracking-[0.18em]"
            >
              {field.label}
            </text>
          ))}

          {/* Intersection */}
          <g className="vfx">
            <line
              x1="0"
              y1="0"
              x2="150"
              y2="-118"
              className="stroke-panel-accent/60"
              strokeWidth="1"
            />
          </g>
          <circle cx="150" cy="-118" r="2.5" className="fill-panel-accent" />
          <text
            x="150"
            y="-132"
            textAnchor="middle"
            className="fill-panel-fg font-mono text-[11px] uppercase tracking-[0.18em]"
          >
            {name}
          </text>
        </svg>

        {/* Nodes orbiting each field's boundary */}
        {fields.map((field) => (
          <svg
            key={field.label}
            viewBox={`${-RADIUS} ${-RADIUS} ${RADIUS * 2} ${RADIUS * 2}`}
            aria-hidden
            className={`absolute overflow-visible will-change-transform ${field.orbit}`}
            style={layerStyle(field)}
          >
            <circle cx="0" cy={-RADIUS} r="3.5" className="fill-panel-fg" />
          </svg>
        ))}

        {/* Centre node */}
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 flex size-3 -translate-x-1/2 -translate-y-1/2"
        >
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-panel-accent" />
          <span className="relative size-3 rounded-full bg-panel-accent shadow-[0_0_24px_4px_color-mix(in_oklab,var(--panel-accent)_45%,transparent)]" />
        </span>
      </div>
      <figcaption className="sr-only">
        Diagram of three overlapping fields — technology, AI and experimentation — with {name} at
        their intersection.
      </figcaption>
    </figure>
  );
}

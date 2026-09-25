/**
 * Hero visual: an instrument-style reticle framing an abstract molecular
 * network (a fused hexagonal ring system with side chains and an outer
 * interaction network). Pure SVG rendered on the server; each moving layer
 * is its own element rotated with a compositor-friendly CSS transform.
 */

type Point = { x: number; y: number };

const BOND = 40;
const SQRT3 = Math.sqrt(3);

/** One decimal is plenty at this scale and keeps the markup small. */
const r1 = (value: number) => Math.round(value * 10) / 10;
const key = (point: Point) => `${r1(point.x)},${r1(point.y)}`;

function hexagon(center: Point): Point[] {
  return Array.from({ length: 6 }, (_, k) => {
    const angle = ((-90 + 60 * k) * Math.PI) / 180;
    return { x: center.x + BOND * Math.cos(angle), y: center.y + BOND * Math.sin(angle) };
  });
}

function rotate(vector: Point, degrees: number): Point {
  const r = (degrees * Math.PI) / 180;
  return {
    x: vector.x * Math.cos(r) - vector.y * Math.sin(r),
    y: vector.x * Math.sin(r) + vector.y * Math.cos(r),
  };
}

/* Deterministic pseudo-random numbers so server output is stable. */
function mulberry32(seed: number) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function round(point: Point): Point {
  return { x: r1(point.x), y: r1(point.y) };
}

function buildMolecule() {
  // Fused ring centres on a pointy-top hexagonal lattice.
  const centres: Point[] = [
    { x: 0, y: 0 },
    { x: SQRT3 * BOND, y: 0 },
    { x: (SQRT3 * BOND) / 2, y: 1.5 * BOND },
    { x: -(SQRT3 * BOND) / 2, y: -1.5 * BOND },
    { x: 1.5 * SQRT3 * BOND, y: -1.5 * BOND },
  ];

  const atoms = new Map<string, Point>();
  const bonds = new Map<string, [string, string]>();

  for (const centre of centres) {
    const ring = hexagon(centre);
    ring.forEach((point, index) => {
      const a = key(point);
      const b = key(ring[(index + 1) % 6]);
      atoms.set(a, point);
      bonds.set([a, b].sort().join("|"), [a, b]);
    });
  }

  // Centre the ring system on the origin so it rotates in place.
  const all = [...atoms.values()];
  const cx = all.reduce((sum, p) => sum + p.x, 0) / all.length;
  const cy = all.reduce((sum, p) => sum + p.y, 0) / all.length;
  const shift = (p: Point): Point => ({ x: p.x - cx, y: p.y - cy });

  const degree = new Map<string, number>();
  for (const [a, b] of bonds.values()) {
    degree.set(a, (degree.get(a) ?? 0) + 1);
    degree.set(b, (degree.get(b) ?? 0) + 1);
  }

  const ringAtoms = [...atoms.entries()].map(([id, p]) => ({ id, ...round(shift(p)) }));
  const ringBondPath = [...bonds.values()]
    .map(([a, b]) => {
      const p = round(shift(atoms.get(a)!));
      const q = round(shift(atoms.get(b)!));
      return `M${p.x} ${p.y}L${q.x} ${q.y}`;
    })
    .join("");

  // Side chains grow from outer atoms along the free lattice direction.
  const outer = [...atoms.entries()]
    .filter(([id]) => degree.get(id) === 2)
    .map(([id, p]) => {
      const neighbours = [...bonds.values()]
        .filter(([a, b]) => a === id || b === id)
        .map(([a, b]) => atoms.get(a === id ? b : a)!);
      const out = {
        x: 2 * p.x - neighbours[0].x - neighbours[1].x,
        y: 2 * p.y - neighbours[0].y - neighbours[1].y,
      };
      const length = Math.hypot(out.x, out.y);
      const origin = shift(p);
      return {
        origin,
        direction: { x: out.x / length, y: out.y / length },
        angle: Math.atan2(origin.y, origin.x),
      };
    })
    .sort((a, b) => a.angle - b.angle);

  const chains = [0, 3, 6, 9, 11]
    .filter((index) => index < outer.length)
    .map((index, i) => {
      const { origin, direction } = outer[index];
      const first = { x: origin.x + direction.x * BOND, y: origin.y + direction.y * BOND };
      const turn = rotate(direction, i % 2 === 0 ? 60 : -60);
      const second = { x: first.x + turn.x * BOND, y: first.y + turn.y * BOND };
      return { points: [origin, first, second].map(round), accent: i % 2 === 0 };
    });

  // Outer interaction network: nodes on a loose orbit, linked to chain ends.
  const random = mulberry32(7);
  const orbit = Array.from({ length: 11 }, (_, i) => {
    const angle = (i / 11) * Math.PI * 2 + random() * 0.35;
    const radius = 188 + random() * 34;
    return {
      ...round({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }),
      size: random() > 0.7 ? 4.5 : 2.6,
      hollow: random() > 0.55,
    };
  });

  const links: Array<readonly [Point, Point]> = [];
  for (const chain of chains) {
    const end = chain.points[2];
    const nearest = [...orbit].sort(
      (a, b) => Math.hypot(a.x - end.x, a.y - end.y) - Math.hypot(b.x - end.x, b.y - end.y),
    );
    links.push([end, nearest[0]]);
    if (chain.accent) links.push([end, nearest[1]]);
  }
  orbit.forEach((node, i) => {
    if (i % 3 !== 0) links.push([node, orbit[(i + 1) % orbit.length]]);
  });
  const linkPath = links.map(([a, b]) => `M${a.x} ${a.y}L${b.x} ${b.y}`).join("");

  return { ringAtoms, ringBondPath, chains, orbit, linkPath };
}

const molecule = buildMolecule();

/** Evenly spaced tick marks drawn as a single dashed circle. */
function tickRing(radius: number, count: number, dash: number) {
  const gap = (2 * Math.PI * radius) / count - dash;
  return {
    r: radius,
    strokeDasharray: `${dash} ${r1(gap * 100) / 100}`,
    strokeDashoffset: dash / 2,
  };
}

const minorTicks = tickRing(285.5, 120, 1);
const majorTicks = tickRing(281, 12, 1.4);

const satellites = [18, 146, 262].map((deg) => {
  const a = (deg * Math.PI) / 180;
  return round({ x: Math.cos(a) * 258, y: Math.sin(a) * 258 });
});

export function MolecularVisual({ className }: { className?: string }) {
  return (
    <figure className={className}>
      <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
        {/* Soft halo */}
        <div
          aria-hidden
          className="absolute inset-[12%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent-bright)_16%,transparent),transparent)]"
        />

        {/* Static reticle */}
        <svg viewBox="-300 -300 600 600" aria-hidden className="absolute inset-0 size-full">
          <g className="vfx fill-none" strokeWidth="1">
            <circle r="290" className="stroke-line-strong" />
            <circle r="238" className="stroke-line" />
            <path d="M-238 0H238M0-238V238" className="stroke-line-strong" strokeDasharray="2 6" />
          </g>
          <g className="fill-none stroke-faint">
            <circle {...minorTicks} strokeWidth="9" opacity="0.35" />
            <circle {...majorTicks} strokeWidth="18" opacity="0.8" />
          </g>
        </svg>

        {/* Counter-rotating dashed orbit with satellites */}
        <svg
          viewBox="-300 -300 600 600"
          aria-hidden
          className="absolute inset-0 size-full animate-spin-reverse will-change-transform"
        >
          <g className="vfx">
            <circle
              r="258"
              className="fill-none stroke-line-strong"
              strokeWidth="1"
              strokeDasharray="1 7"
            />
          </g>
          {satellites.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={i === 0 ? 5 : 3.5}
              className={i === 0 ? "fill-accent-bright" : "fill-fg"}
            />
          ))}
        </svg>

        {/* Rotating molecular network */}
        <svg
          viewBox="-300 -300 600 600"
          aria-hidden
          className="absolute inset-0 size-full animate-spin-slow will-change-transform"
        >
          <g className="vfx">
            <path
              d={molecule.linkPath}
              className="fill-none stroke-line-strong"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
            <g className="fill-none stroke-muted" strokeWidth="1.4" strokeLinecap="round">
              <path d={molecule.ringBondPath} />
              {molecule.chains.map((chain, i) => (
                <polyline key={i} points={chain.points.map((p) => `${p.x},${p.y}`).join(" ")} />
              ))}
            </g>

            {molecule.orbit.map((node, i) => (
              <circle
                key={i}
                cx={node.x}
                cy={node.y}
                r={node.size}
                strokeWidth="1.2"
                className={node.hollow ? "fill-bg stroke-faint" : "fill-faint"}
              />
            ))}

            <g className="fill-bg stroke-fg" strokeWidth="1.4">
              {molecule.ringAtoms.map((atom) => (
                <circle key={atom.id} cx={atom.x} cy={atom.y} r="3.4" />
              ))}
              {molecule.chains.map((chain, i) => (
                <circle key={i} cx={chain.points[1].x} cy={chain.points[1].y} r="3.4" />
              ))}
            </g>

            {molecule.chains.map((chain, i) => {
              const end = chain.points[2];
              return chain.accent ? (
                <g key={i} className="fill-accent-bright">
                  <circle cx={end.x} cy={end.y} r="13" opacity="0.15" />
                  <circle cx={end.x} cy={end.y} r="5.5" />
                </g>
              ) : (
                <circle key={i} cx={end.x} cy={end.y} r="4.5" className="fill-fg" />
              );
            })}
          </g>
        </svg>

        {/* Instrument labels */}
        <div
          aria-hidden
          className="eyebrow pointer-events-none absolute inset-0 text-[0.625rem] text-faint"
        >
          <span className="absolute left-0 top-[4%] flex items-center gap-2">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-bright" />
              <span className="relative size-1.5 rounded-full bg-accent-bright" />
            </span>
            Fig. 01
          </span>
          <span className="absolute right-0 top-[4%]">Molecular network</span>
          <span className="absolute bottom-[4%] left-0">Research</span>
          <span className="absolute bottom-[4%] right-0">× Computation</span>
        </div>
      </div>
      <figcaption className="sr-only">
        Abstract, slowly rotating illustration of a molecular structure connected to a wider network
        — a visual nod to research meeting computation.
      </figcaption>
    </figure>
  );
}

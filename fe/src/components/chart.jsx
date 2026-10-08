import { geometry as g } from "./chartGeometry";

// Halo behind each contour label matches the water band it sits in.
const LABEL_HALO = {
  5: "var(--color-shallow)",
  10: "var(--color-sea)",
  20: "var(--color-paper)",
  30: "var(--color-paper)",
};
// Ship's track: straight legs between position fixes (keep in sync with scripts/gen-chart.mjs).
const TRACK = [
  [40, 640],
  [70, 600],
  [158, 476],
  [262, 340],
  [326, 258],
];
const TICKS = Array.from({ length: 36 }, (_, i) => i * 10);

// The track is drawn at constant speed, so each fix appears when the line reaches it.
const DRAW_DELAY = 0.3;
const DRAW_TIME = 1.6;
const legs = TRACK.slice(1).map(([x, y], i) => Math.hypot(x - TRACK[i][0], y - TRACK[i][1]));
const trackLength = legs.reduce((sum, leg) => sum + leg, 0);
const fixDelays = legs.map(
  (_, i) => DRAW_DELAY + (DRAW_TIME * legs.slice(0, i + 1).reduce((s, l) => s + l, 0)) / trackLength,
);

function RoseMarks() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <circle r="58" />
      <circle r="47" />
      {TICKS.map((deg) => (
        <line key={deg} y1="-47" y2={deg % 90 === 0 ? -58 : deg % 30 === 0 ? -54 : -50} transform={`rotate(${deg})`} />
      ))}
      <path d="M0-42 6-6 42 0 6 6 0 42-6 6-42 0-6-6Z" />
      <path d="M0-42 6-6 0 0ZM42 0 6 6 0 0ZM0 42-6 6 0 0ZM-42 0-6-6 0 0Z" fill="currentColor" stroke="none" />
    </g>
  );
}

export function CompassRose({ className }) {
  return (
    <svg viewBox="-60 -60 120 120" className={className} aria-hidden="true">
      <RoseMarks />
    </svg>
  );
}

export function HeroChart({ children }) {
  return (
    <div className="relative border border-ink">
      <svg viewBox="0 0 560 640" className="block h-auto w-full" aria-hidden="true">
        <path d={g.sea} fill="var(--color-sea)" />
        <path d={g.shallow} fill="var(--color-shallow)" />
        <path d={g.shoal} fill="var(--color-shoal)" />
        <g fill="none" stroke="var(--color-contour)">
          {g.contours.map((c) => (
            <path key={c.label} d={c.d} />
          ))}
        </g>
        <path d={g.land} fill="var(--color-land)" />
        <path d={g.coast} fill="none" stroke="var(--color-ink)" strokeWidth="1.5" />
        <g className="font-serif italic" fontSize="15" textAnchor="middle">
          {g.contours.map((c) => (
            <text
              key={c.label}
              x={c.at[0]}
              y={c.at[1] + 5}
              fill="var(--color-contour)"
              stroke={LABEL_HALO[c.label]}
              strokeWidth="6"
              paintOrder="stroke"
            >
              {c.label}
            </text>
          ))}
          {g.soundings.map((s, i) => (
            <text key={`${s.x}-${s.y}`} x={s.x} y={s.y} className="sounding" style={{ "--i": i }}>
              {s.v}
            </text>
          ))}
        </g>
        <g transform="translate(104 404)" className="text-purple">
          <g className="rose-settle">
            <RoseMarks />
          </g>
        </g>
      </svg>
      <svg viewBox="0 0 560 640" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <mask id="track-reveal" maskUnits="userSpaceOnUse">
          <polyline
            points={TRACK.join(" ")}
            className="track-draw"
            fill="none"
            stroke="#fff"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            strokeDasharray="1"
          />
        </mask>
        <polyline
          points={TRACK.join(" ")}
          mask="url(#track-reveal)"
          fill="none"
          stroke="var(--color-pencil)"
          strokeWidth="1.5"
          strokeDasharray="7 5"
        />
        {TRACK.slice(1).map(([x, y], i) => (
          <g key={x} className="fix-pop" style={{ "--d": `${fixDelays[i].toFixed(2)}s` }}>
            <circle cx={x} cy={y} r="6.5" fill="var(--color-paper)" stroke="var(--color-pencil)" strokeWidth="1.5" />
            <circle cx={x} cy={y} r="1.5" fill="var(--color-pencil)" />
          </g>
        ))}
        <circle
          cx={TRACK.at(-1)[0]}
          cy={TRACK.at(-1)[1]}
          r="6.5"
          className="ping"
          style={{ "--d": `${fixDelays.at(-1).toFixed(2)}s` }}
          fill="none"
          stroke="var(--color-purple)"
          strokeWidth="1.5"
        />
      </svg>
      {children}
    </div>
  );
}

export function PageHead({ title, intro }) {
  return (
    <header className="sheet pb-12 pt-12 lg:pt-16">
      <h1 className="font-serif text-[clamp(2.75rem,7vw,4.75rem)] italic leading-none tracking-tight">{title}</h1>
      {intro && <p className="mt-6 max-w-[54ch] text-xl">{intro}</p>}
      <svg viewBox="0 0 1000 12" preserveAspectRatio="none" className="mt-10 block h-3 w-full" aria-hidden="true">
        <path
          d="M0 7C90 3 170 10 260 6S430 2 520 7 700 11 790 6 930 3 1000 7"
          fill="none"
          stroke="var(--color-contour)"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </header>
  );
}

"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useState } from "react";

// "Plot a course": buoys on the hero chart stand for real results. Picking one sends the boat
// there, draws the new leg and reads out course, distance and what happened at that buoy.
// Coordinates are in the chart's viewBox (560 x 640). Without JavaScript the buoys are plain links.
const VIEW = { w: 560, h: 640 };
const START = [326, 258]; // where the plotted track ends (chart.jsx)
const NM_PER_UNIT = 0.0028; // chart scale, for the distance readout
const KNOTS = 6;

const bearing = ([x1, y1], [x2, y2]) =>
  ((Math.atan2(x2 - x1, y1 - y2) * 180) / Math.PI + 360) % 360;
const pad3 = (n) => String(Math.round(n) % 360).padStart(3, "0");

export default function Helm({ stops }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(START[0]);
  const y = useMotionValue(START[1]);
  const rotate = useMotionValue(bearing([40, 640], START) - 90);
  const [here, setHere] = useState(START);
  const [legs, setLegs] = useState([]);
  const [log, setLog] = useState(null);

  function sail(event, stop) {
    event.preventDefault();
    const buoy = [stop.x, stop.y];
    const course = bearing(here, buoy);
    const full = Math.hypot(buoy[0] - here[0], buoy[1] - here[1]);
    if (full < 30) return;
    // Heave to just short of the buoy, so both stay visible.
    const units = full - 22;
    const to = [
      here[0] + ((buoy[0] - here[0]) * units) / full,
      here[1] + ((buoy[1] - here[1]) * units) / full,
    ];
    const nm = units * NM_PER_UNIT;
    const seconds = reduce ? 0 : Math.min(2.4, 0.6 + units / 260);

    rotate.set(course - 90);
    animate(x, to[0], { duration: seconds, ease: [0.45, 0, 0.25, 1] });
    animate(y, to[1], { duration: seconds, ease: [0.45, 0, 0.25, 1] });
    setLegs((done) => [...done.slice(-3), [here, to]]);
    setHere(to);
    setLog({ ...stop, course, nm, minutes: (nm / KNOTS) * 60 });
  }

  return (
    <div className="helm absolute inset-0" data-active={log ? "" : undefined}>
      {/* buoys first, so the boat (in the SVG below) is drawn over them */}
      {stops.map((stop) => (
        <a
          key={stop.title}
          href={stop.href}
          onClick={(event) => sail(event, stop)}
          aria-label={`Sail to: ${stop.title}`}
          aria-current={log?.title === stop.title ? "location" : undefined}
          className="buoy"
          style={{
            left: `${(stop.x / VIEW.w) * 100}%`,
            top: `${(stop.y / VIEW.h) * 100}%`,
          }}
        >
          <span aria-hidden="true" />
        </a>
      ))}
      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        className="pointer-events-none absolute inset-0 size-full"
        aria-hidden="true"
      >
        {legs.map(([from, to], i) => (
          <line
            key={`${from}-${to}-${i}`}
            className="helm-leg"
            x1={from[0]}
            y1={from[1]}
            x2={to[0]}
            y2={to[1]}
            stroke="var(--color-purple)"
            strokeWidth="2"
            strokeDasharray="7 5"
          />
        ))}
        {log && (
          <motion.g style={{ x, y }}>
            <motion.path
              d="M16 0 5-9H-13V9H5Z"
              style={{ rotate }}
              fill="var(--color-purple)"
              stroke="var(--color-paper)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </motion.g>
        )}
      </svg>

      <div
        className="absolute inset-x-0 bottom-0 bg-paper px-4 py-3 font-sans text-sm"
        aria-live="polite"
      >
        {log ? (
          <p>
            <span className="text-pencil">
              Course {pad3(log.course)}°, {log.nm.toFixed(2)} nm,{" "}
              {Math.max(1, Math.round(log.minutes))} min at {KNOTS} knots.
            </span>{" "}
            <a href={log.href}>{log.title}</a>, {log.detail}
          </p>
        ) : (
          <p>Pick a buoy and the boat sails to one of my results.</p>
        )}
      </div>
    </div>
  );
}

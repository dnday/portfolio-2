"use client";

// Motion (Framer Motion) effects: parallax, tilt, magnetic buttons, cursor, scroll-linked pieces.
// Every scroll- or pointer-driven effect is skipped under prefers-reduced-motion.
import {
  MotionConfig,
  motion,
  motionValue,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { Children, Fragment, useEffect, useRef } from "react";

const EASE = [0.16, 1, 0.3, 1];
const SPRING = { stiffness: 120, damping: 20, mass: 0.6 };
const TAGS = {
  div: motion.div,
  li: motion.li,
  h2: motion.h2,
  p: motion.p,
  figure: motion.figure,
  span: motion.span,
  g: motion.g,
};

// Pointer position across the window, -0.5 to 0.5, shared by every Depth layer.
const pointerX = motionValue(0);
const pointerY = motionValue(0);

export function MotionProvider({ children }) {
  useEffect(() => {
    const move = (e) => {
      pointerX.set(e.clientX / innerWidth - 0.5);
      pointerY.set(e.clientY / innerHeight - 0.5);
    };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, []);
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

// Drifts against the pointer by up to x/y px and tilts by up to `tilt` degrees: hero parallax.
export function Depth({ x = 0, y = 0, tilt = 0, className, children }) {
  const reduce = useReducedMotion();
  const dx = useSpring(
    useTransform(pointerX, (v) => v * x),
    SPRING,
  );
  const dy = useSpring(
    useTransform(pointerY, (v) => v * y),
    SPRING,
  );
  const rx = useSpring(
    useTransform(pointerY, (v) => -v * tilt * 2),
    SPRING,
  );
  const ry = useSpring(
    useTransform(pointerX, (v) => v * tilt * 2),
    SPRING,
  );
  const style = {
    x: dx,
    y: dy,
    rotateX: rx,
    rotateY: ry,
    transformPerspective: 1200,
  };
  return (
    <motion.div className={className} style={reduce ? undefined : style}>
      {children}
    </motion.div>
  );
}

// Moves with the page scroll at `speed` (0.2 = 20% of the scroll distance).
export function Drift({ speed = 0.15, className, children }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => v * speed);
  return (
    <motion.div className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}

// Parallax inside a frame: the child slides from +range to -range px while the frame crosses the viewport.
export function Parallax({ range = 60, className, children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { y }}
    >
      {children}
    </motion.div>
  );
}

// 3D tilt toward the pointer while hovered.
export function Tilt({ max = 7, className, children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const rx = useSpring(0, SPRING);
  const ry = useSpring(0, SPRING);

  function move(e) {
    if (reduce) return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
  }

  function leave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

// Pulls its child toward the pointer, then springs back.
export function Magnetic({ strength = 0.35, children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  function move(e) {
    if (reduce) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  }

  function leave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ x, y }}
    >
      {children}
    </motion.span>
  );
}

const FROM = {
  up: { y: 70 },
  left: { x: -90 },
  right: { x: 90 },
  scale: { scale: 0.85 },
};

// Slides, fades and un-blurs in once when scrolled into view.
export function Reveal({
  as = "div",
  from = "up",
  delay = 0,
  children,
  ...rest
}) {
  const Tag = TAGS[as];
  return (
    <Tag
      initial={{ opacity: 0, filter: "blur(6px)", ...FROM[from] }}
      whileInView={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const LIST = { hidden: {}, shown: { transition: { staggerChildren: 0.06 } } };
const ITEM = {
  hidden: { opacity: 0, y: 24, scale: 0.85 },
  shown: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

// Items pop in one after another when the list comes into view.
export function StaggerList({ items, className }) {
  return (
    <motion.ul
      className={className}
      variants={LIST}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {items.map((item) => (
        <motion.li key={item} variants={ITEM}>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}

// Turns with the page scroll: compass roses.
export function ScrollSpin({ as = "g", turn = 0.2, className, children }) {
  const Tag = TAGS[as];
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, (v) => v * turn);
  const style = {
    rotate,
    transformBox: "fill-box",
    originX: "50%",
    originY: "50%",
  };
  return (
    <Tag className={className} style={reduce ? undefined : style}>
      {children}
    </Tag>
  );
}

// About: the experience track line is drawn as you scroll through it.
export function TrackLine() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      className="track-line"
      style={reduce ? undefined : { scaleY, originY: 0 }}
    />
  );
}

// Oversized text that slides sideways as the page scrolls to the end: the footer.
export function DriftText({ className, children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["30%", "-8%"]);
  return (
    <div ref={ref} className="overflow-hidden" aria-hidden="true">
      <motion.p className={className} style={reduce ? undefined : { x }}>
        {children}
      </motion.p>
    </div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-purple"
      style={{ scaleX }}
    />
  );
}

// A ring that trails the mouse and grows over anything clickable. Mouse only.
export function Cursor() {
  const reduce = useReducedMotion();
  const x = useSpring(-100, { stiffness: 500, damping: 40 });
  const y = useSpring(-100, { stiffness: 500, damping: 40 });
  const scale = useSpring(1, SPRING);

  useEffect(() => {
    if (reduce || !matchMedia("(pointer: fine)").matches) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      scale.set(e.target.closest?.("a, button, input, textarea") ? 2.2 : 1);
    };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, [reduce, x, y, scale]);

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-ring"
      style={{ x, y, scale }}
    />
  );
}

const wrap = (min, max, v) =>
  ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min;

// Endless row of words that drifts sideways, speeds up with scroll velocity and turns with
// the scroll direction. Hovering pauses it.
export function Marquee({ items, speed = 2.5 }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), {
    damping: 50,
    stiffness: 400,
  });
  const boost = useTransform(velocity, [-1000, 0, 1000], [-5, 0, 5], {
    clamp: false,
  });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(-1);
  const paused = useRef(false);

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current) return;
    const b = boost.get();
    if (b < 0) direction.current = 1;
    else if (b > 0) direction.current = -1;
    baseX.set(
      baseX.get() +
        direction.current * speed * (delta / 1000) * (1 + Math.abs(b)),
    );
  });

  const row = items.map((item) => (
    <Fragment key={item}>
      <span>{item}</span>
      <svg
        viewBox="-10 -10 20 20"
        className="size-[0.45em] shrink-0 text-purple"
        aria-hidden="true"
      >
        <path
          d="M0-10 2.5-2.5 10 0 2.5 2.5 0 10-2.5 2.5-10 0-2.5-2.5Z"
          fill="currentColor"
        />
      </svg>
    </Fragment>
  ));

  return (
    <div
      className="marquee overflow-hidden border-y border-ink py-5"
      aria-hidden="true"
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
    >
      <motion.div
        className="flex w-max items-center gap-[0.6em] whitespace-nowrap"
        style={{ x }}
      >
        {row}
        {row}
      </motion.div>
    </div>
  );
}

// Cards that pin under the header one after another; earlier cards shrink back as the next
// slides over them, like chart sheets stacked on a table. Desktop only.
export function Stack({ children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const cards = Children.toArray(children);
  return (
    <div ref={ref}>
      {cards.map((card, i) => (
        <StackCard
          key={card.key ?? i}
          i={i}
          total={cards.length}
          progress={scrollYProgress}
          reduce={reduce}
        >
          {card}
        </StackCard>
      ))}
    </div>
  );
}

function StackCard({ i, total, progress, reduce, children }) {
  const scale = useTransform(
    progress,
    [i / total, 1],
    [1, 1 - (total - 1 - i) * 0.05],
  );
  const last = i === total - 1;
  return (
    <div
      className={`lg:sticky ${last ? "" : "mb-16 lg:mb-[35vh]"}`}
      style={{ top: 88 + i * 28 }}
    >
      <motion.div
        className="max-lg:transform-none!"
        style={reduce ? undefined : { scale, originY: 0 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { useRef, useSyncExternalStore } from "react";

// An anchor hanging from the top of the page on its rope. Pull it down and let go (or click it)
// to switch between the day and night chart. The new theme spreads out from the anchor.
const PULL = 60;
const ROPE = 200;

function subscribe(onChange) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const isDark = () => document.documentElement.dataset.theme === "dark";

function switchTheme(origin) {
  const root = document.documentElement;
  const next = isDark() ? "light" : "dark";
  const apply = () => {
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  if (
    !document.startViewTransition ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return apply();

  root.dataset.themeSwitch = "";
  const transition = document.startViewTransition(apply);
  transition.ready.then(() => {
    const { x, y } = origin;
    const r = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );
    root.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${r}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 900,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  });
  transition.finished.finally(() => delete root.dataset.themeSwitch);
}

export default function ThemeAnchor() {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);
  const y = useMotionValue(0);
  const rope = useTransform(y, (v) => ROPE + 8 + v);
  // When the drag ended, so the click that may follow a pull doesn't switch the theme twice.
  const draggedAt = useRef(0);
  const button = useRef(null);

  function originOf() {
    const r = button.current.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }

  return (
    <div className="relative order-2 h-11 w-8 sm:order-3">
      <motion.span
        aria-hidden="true"
        className="absolute left-1/2 w-[1.5px] -translate-x-1/2 bg-ink"
        style={{ top: -ROPE, height: rope }}
      />
      <motion.button
        ref={button}
        type="button"
        aria-label={
          dark
            ? "Switch to the day chart (light mode)"
            : "Switch to the night chart (dark mode)"
        }
        title="Pull the anchor"
        className="absolute left-0 top-0 block w-8 cursor-grab touch-none select-none text-purple active:cursor-grabbing"
        style={{ y, originY: 0 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 150 }}
        dragElastic={0.15}
        dragSnapToOrigin
        dragTransition={{ bounceStiffness: 500, bounceDamping: 12 }}
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 14, -10, 6, -3, 0] }}
        transition={{ delay: 3.2, duration: 2.2, ease: "easeInOut" }}
        whileHover={{
          rotate: [0, 10, -7, 4, 0],
          transition: { duration: 1.2 },
        }}
        onDragEnd={(_, info) => {
          draggedAt.current = Date.now();
          if (info.offset.y > PULL) switchTheme(originOf());
        }}
        onClick={() => {
          if (Date.now() - draggedAt.current < 400) return;
          switchTheme(originOf());
        }}
      >
        <svg
          viewBox="0 0 32 44"
          className="block w-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="16" cy="5" r="3.5" />
          <path d="M16 8.5V39M9 14h14" />
          <path d="M4.5 28C6 35 11 39 16 39s10-4 11.5-11" />
          <path d="M2 31l2.5-3.5L8 30M24 30l3.5-2.5L30 31" />
        </svg>
      </motion.button>
    </div>
  );
}

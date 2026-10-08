"use client";

import { useSyncExternalStore } from "react";

const clock = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  hour: "2-digit",
  minute: "2-digit",
});
const subscribe = (tick) => {
  const id = setInterval(tick, 15000);
  return () => clearInterval(id);
};

// The current time in Yogyakarta (WIB). Empty on the server, so the static HTML never shows a stale time.
export function LocalTime() {
  const time = useSyncExternalStore(
    subscribe,
    () => clock.format(new Date()),
    () => "",
  );
  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time ? `${time} WIB` : "WIB"}
    </span>
  );
}

export function BackToTop({ children }) {
  return (
    <button
      type="button"
      onClick={() => {
        const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
        scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="back-to-top flex items-center gap-2 font-sans text-sm"
    >
      {children}
    </button>
  );
}

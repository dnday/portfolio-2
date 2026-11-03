"use client";

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

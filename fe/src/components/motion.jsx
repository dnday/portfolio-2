"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Smooth wheel scrolling, plus the trigger for scroll reveals: elements with .reveal or
// .play-in-view get .in when they enter the viewport. The motion itself is CSS (app/globals.css).
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.08, stopInertiaOnNavigate: true });
    return () => lenis.destroy();
  }, []);

  // Re-run per page, since client navigation mounts new elements.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        // Elements that come into view together are staggered.
        let n = 0;
        for (const { isIntersecting, target } of entries) {
          if (!isIntersecting) continue;
          target.style.setProperty("--stagger", `${Math.min(n++, 6) * 90}ms`);
          target.classList.add("in");
          io.unobserve(target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of document.querySelectorAll(".reveal:not(.in), .play-in-view:not(.in)")) io.observe(el);
    return () => io.disconnect();
  }, [pathname]);

  return null;
}

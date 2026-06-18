"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Brief intro loader: "Pinace" rises into view behind a fill bar, then lifts away.
 * Skipped for reduced-motion and for in-page hash navigation (deep links).
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const skip =
        prefersReducedMotion() ||
        (typeof window !== "undefined" && window.location.hash.length > 1);
      if (skip) {
        setDone(true);
        return;
      }
      const tl = gsap.timeline({ onComplete: () => setDone(true) });
      tl.from("[data-loader-word] > span", {
        yPercent: 110,
        duration: 0.9,
        ease: "power4.out",
      })
        .fromTo(
          "[data-loader-bar] > i",
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: "power2.inOut" },
          0.1,
        )
        .to(root.current, { autoAlpha: 0, duration: 0.5, ease: "power2.inOut" }, "+=0.15");

      // Failsafe: never trap the page behind the loader.
      const t = window.setTimeout(() => setDone(true), 3000);
      return () => window.clearTimeout(t);
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-5 bg-black"
    >
      <div
        data-loader-word
        className="font-heading overflow-hidden text-[clamp(2.5rem,8vw,5.5rem)] font-semibold leading-[1.1] tracking-tight text-white"
      >
        <span className="inline-block">Pinace</span>
      </div>
      <div
        data-loader-bar
        className="h-[3px] w-40 overflow-hidden rounded-full bg-white/15"
      >
        <i className="block h-full origin-left scale-x-0 bg-pinace-blue" />
      </div>
    </div>
  );
}

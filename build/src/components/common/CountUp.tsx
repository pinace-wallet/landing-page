"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Number that counts up when scrolled into view (mirrors the reference's count-up). */
export function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion() || to === 0) {
        el.textContent = String(to);
        return;
      }
      const obj = { v: 0 };
      gsap.to(obj, {
        v: to,
        duration: 1,
        ease: "power2.out",
        snap: { v: 1 },
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          el.textContent = String(Math.round(obj.v));
        },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {to}
    </span>
  );
}

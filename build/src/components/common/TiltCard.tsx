"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, canHover } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const toneVar = {
  blue: "var(--pinace-blue)",
  teal: "var(--pinace-teal)",
  pink: "var(--pinace-pink)",
  violet: "var(--pinace-violet)",
  amber: "var(--pinace-amber)",
} as const;

/**
 * 3D pointer-tilt card with a cursor-following glow and a top accent bar,
 * rebuilt on GSAP (mirrors the reference's services tilt cards).
 */
export function TiltCard({
  tone = "blue",
  feature = false,
  className,
  children,
}: {
  tone?: keyof typeof toneVar;
  feature?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const card = ref.current;
      if (!card || prefersReducedMotion() || !canHover()) return;
      const maxR = feature ? 2.5 : 6;
      const rotX = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3" });
      const rotY = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3" });

      const onMove = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        rotY(px * maxR);
        rotX(-py * maxR);
        if (glowRef.current) {
          gsap.set(glowRef.current, { x: e.clientX - r.left, y: e.clientY - r.top });
        }
      };
      const enter = () => gsap.to(card, { y: -4, duration: 0.4, ease: "power3.out" });
      const leave = () => {
        rotX(0);
        rotY(0);
        gsap.to(card, { y: 0, duration: 0.5, ease: "power3.out" });
      };
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerenter", enter);
      card.addEventListener("pointerleave", leave);
      return () => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerenter", enter);
        card.removeEventListener("pointerleave", leave);
      };
    },
    { scope: ref },
  );

  return (
    <article
      ref={ref}
      data-cursor="grow"
      style={
        {
          "--gc": toneVar[tone],
          transformStyle: "preserve-3d",
        } as React.CSSProperties
      }
      className={cn(
        "group relative flex min-h-[300px] flex-col overflow-hidden border border-white/10 p-8 [will-change:transform]",
        feature
          ? "bg-[linear-gradient(140deg,color-mix(in_srgb,var(--gc)_16%,transparent),transparent)]"
          : "bg-[rgba(24,24,27,0.45)]",
        "transition-colors hover:border-white/25",
        className,
      )}
    >
      {/* cursor glow */}
      <span
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-40"
        style={{
          background: "radial-gradient(circle, var(--gc), transparent 68%)",
        }}
      />
      <div className="relative z-[1] flex flex-1 flex-col">{children}</div>
    </article>
  );
}

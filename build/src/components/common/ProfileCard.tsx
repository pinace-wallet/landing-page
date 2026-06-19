"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, canHover } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * ProfileCard — pointer-tilt + holographic profile card (in the spirit of
 * reactbits.dev/components/profile-card), rebuilt on our GSAP stack.
 */
export function ProfileCard({
  name,
  title,
  handle,
  avatar,
  accent,
}: {
  name: string;
  title: string;
  handle: string;
  avatar: string;
  accent: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion() || !canHover()) return;
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.4, ease: "power3" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 0.4, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry(px * 14);
        rx(-py * 14);
        if (shineRef.current) {
          gsap.set(shineRef.current, {
            background: `radial-gradient(circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgba(255,255,255,0.22), transparent 55%)`,
          });
        }
      };
      const leave = () => {
        rx(0);
        ry(0);
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: ref },
  );

  return (
    <div className="[perspective:1000px]">
      <div
        ref={ref}
        className="group relative overflow-hidden p-[1.5px] [transform-style:preserve-3d] [will-change:transform]"
      >
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-70", accent)} />
        <div className="relative overflow-hidden bg-[#070a14] p-7 text-center">
          <div
            ref={shineRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          <div
            className={cn(
              "mx-auto flex h-28 w-28 items-end justify-center overflow-hidden rounded-full bg-gradient-to-br p-[2px]",
              accent,
            )}
          >
            <div className="flex h-full w-full items-end justify-center overflow-hidden rounded-full bg-[#0c1222]">
              <Image
                src={avatar}
                alt={name}
                width={112}
                height={126}
                className="h-[88%] w-auto object-contain"
              />
            </div>
          </div>
          <h3 className="font-heading relative mt-5 text-xl font-semibold tracking-tight text-white">
            {name}
          </h3>
          <p className="relative mt-1.5 text-[13.5px] leading-relaxed text-white/55">
            {title}
          </p>
          <div className="relative mt-5 flex items-center justify-between rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
            <span className="onchain text-[12px] text-white/45">{handle}</span>
            <span className="onchain rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold text-pinace-blue-bright">
              Pinace
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

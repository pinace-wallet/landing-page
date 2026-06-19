"use client";

import { useRef } from "react";
import { gsap, useGSAP, canHover, prefersReducedMotion } from "@/lib/gsap";

/**
 * Ambient brand atmosphere (DESIGN.md → Motion):
 * drifting blue-led orb field + grain + lerp custom cursor + scroll progress.
 * All fixed, behind content, pointer-events:none (except nothing — purely visual).
 */
export function Atmosphere() {
  const root = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();

      // Reveal the field softly on mount (restrained so pure black dominates).
      gsap.to("[data-orbfield]", { opacity: reduced ? 0.32 : 0.42, duration: 1.2 });

      // Scroll progress bar.
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { scrub: 0.3, start: 0, end: "max" },
      });

      if (reduced) return;

      // Slow drifting orbs (infinite yoyo).
      gsap.utils.toArray<HTMLElement>("[data-orb]").forEach((orb, i) => {
        gsap.to(orb, {
          x: `+=${gsap.utils.random(-90, 90)}`,
          y: `+=${gsap.utils.random(-70, 70)}`,
          scale: gsap.utils.random(0.9, 1.2),
          duration: gsap.utils.random(16, 26),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.4,
        });
      });

      // Custom cursor + cursor-following orb (desktop pointers only).
      if (!canHover()) return;
      document.documentElement.classList.add("has-custom-cursor");

      const xTo = gsap.quickTo(cursorRef.current, "x", {
        duration: 0.25,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(cursorRef.current, "y", {
        duration: 0.25,
        ease: "power3.out",
      });
      const fxTo = gsap.quickTo(followRef.current, "x", {
        duration: 0.8,
        ease: "power3.out",
      });
      const fyTo = gsap.quickTo(followRef.current, "y", {
        duration: 0.8,
        ease: "power3.out",
      });

      const onMove = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
        fxTo(e.clientX);
        fyTo(e.clientY);
      };
      const grow = () =>
        gsap.to(cursorRef.current, { scale: 4, duration: 0.3, ease: "power3.out" });
      const shrink = () =>
        gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: "power3.out" });

      const targets = () =>
        document.querySelectorAll<HTMLElement>(
          "a, button, [data-cursor='grow']",
        );
      window.addEventListener("pointermove", onMove);
      targets().forEach((t) => {
        t.addEventListener("pointerenter", grow);
        t.addEventListener("pointerleave", shrink);
      });

      return () => {
        window.removeEventListener("pointermove", onMove);
        targets().forEach((t) => {
          t.removeEventListener("pointerenter", grow);
          t.removeEventListener("pointerleave", shrink);
        });
        document.documentElement.classList.remove("has-custom-cursor");
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="pointer-events-none">
      {/* drifting orb field */}
      <div
        data-orbfield
        className="fixed inset-0 z-0 opacity-0 [filter:blur(70px)_saturate(140%)] will-change-transform"
      >
        <Orb className="left-[-6%] top-[-8%] h-[46vw] w-[46vw] bg-[radial-gradient(circle,var(--pinace-blue),transparent_65%)]" />
        <Orb className="right-[-8%] top-[8%] h-[42vw] w-[42vw] bg-[radial-gradient(circle,var(--pinace-violet),transparent_65%)]" />
        <Orb className="bottom-[-10%] left-[16%] h-[40vw] w-[40vw] bg-[radial-gradient(circle,var(--pinace-pink),transparent_66%)]" />
        <Orb className="bottom-[6%] right-[12%] hidden h-[26vw] w-[26vw] bg-[radial-gradient(circle,var(--pinace-teal),transparent_66%)] md:block" />
      </div>

      {/* grain */}
      <div
        className="fixed inset-0 z-[1] opacity-[0.05] [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22120%22%20height=%22120%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%22.9%22%20numOctaves=%223%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23n)%22/%3E%3C/svg%3E')]"
      />

      {/* cursor-following soft orb */}
      <div
        ref={followRef}
        className="fixed left-0 top-0 z-[1] hidden h-[34vw] w-[34vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 mix-blend-screen [background:radial-gradient(circle,var(--pinace-blue-bright),transparent_60%)] [filter:blur(60px)] md:block"
      />

      {/* custom cursor dot */}
      <div
        ref={cursorRef}
        className="fixed left-0 top-0 z-[9999] hidden h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--pinace-blue-bright)] mix-blend-difference md:block"
      />

      {/* scroll progress */}
      <div className="fixed inset-x-0 top-0 z-[80] h-[3px]">
        <div
          ref={barRef}
          className="h-full origin-left scale-x-0 bg-[var(--pinace-blue)]"
        />
      </div>
    </div>
  );
}

function Orb({ className }: { className: string }) {
  return (
    <span
      data-orb
      className={`absolute block rounded-full mix-blend-screen will-change-transform ${className}`}
    />
  );
}

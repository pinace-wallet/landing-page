"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";
import { Section } from "@/components/common/Section";
import { SectionKicker } from "@/components/common/SectionKicker";
import { SplitHeading } from "@/components/common/SplitHeading";
import { gsap, useGSAP, canHover, prefersReducedMotion } from "@/lib/gsap";
import { useCases } from "@/lib/site";

const toneText = {
  blue: "group-hover:text-pinace-blue-bright",
  teal: "group-hover:text-pinace-teal",
  pink: "group-hover:text-pinace-pink",
} as const;

export default function UseCases() {
  const scope = useRef<HTMLDivElement>(null);
  const peekRef = useRef<HTMLDivElement>(null);
  const [peekImg, setPeekImg] = useState<string | null>(null);
  const [active, setActive] = useState<number | null>(null);

  // peek follows the cursor with a soft lerp (desktop pointers only)
  useGSAP(
    () => {
      if (!peekRef.current || prefersReducedMotion() || !canHover()) return;
      const xTo = gsap.quickTo(peekRef.current, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(peekRef.current, "y", { duration: 0.5, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };
      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope },
  );

  const onClose = useCallback(() => setActive(null), []);
  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, onClose]);

  const current = active !== null ? useCases[active] : null;

  return (
    <Section id="use-cases">
      <SectionKicker tone="pink">In action</SectionKicker>
      <SplitHeading
        text="Agents that run, bounded by"
        accent="policy."
        className="mt-6 text-[clamp(2rem,5vw,4rem)]"
      />

      <div ref={scope} className="mt-12 border-t border-white/10">
        {useCases.map((u, i) => (
          <button
            key={u.k}
            type="button"
            data-cursor="grow"
            onPointerEnter={() => canHover() && setPeekImg(u.img)}
            onPointerLeave={() => setPeekImg(null)}
            onClick={() => setActive(i)}
            className="group flex w-full items-center justify-between gap-6 border-b border-white/10 py-7 text-left transition-[padding] duration-300 hover:px-4 sm:py-8"
          >
            <span className="flex min-w-0 items-center gap-5">
              <Image
                src={u.avatar}
                alt={`${u.k} agent`}
                width={46}
                height={46}
                className="hidden h-11 w-11 flex-none rounded-full sm:block"
              />
              <span className="min-w-0">
                <span
                  className={`font-heading block truncate text-[clamp(1.5rem,4vw,2.6rem)] font-semibold tracking-tight text-white transition-colors ${toneText[u.tone]}`}
                >
                  {u.k}
                </span>
                <span className="mt-1 block truncate text-sm text-white/45">
                  {u.tag}
                </span>
              </span>
            </span>
            <span className="onchain hidden flex-none text-right text-[13px] text-white/40 md:block">
              {u.meta}
            </span>
          </button>
        ))}
      </div>

      {/* cursor-following peek */}
      <div
        ref={peekRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[50] hidden h-[240px] w-[330px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[18px] border border-white/10 shadow-2xl shadow-black/60 transition-opacity duration-300 md:block ${
          peekImg ? "opacity-100" : "opacity-0"
        }`}
      >
        {peekImg && (
          <Image
            src={peekImg}
            alt=""
            fill
            sizes="330px"
            className="object-cover object-top"
          />
        )}
      </div>

      {/* detail modal */}
      {current && (
        <div className="fixed inset-0 z-[9000] flex items-center justify-center p-5">
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />
          <div className="relative z-[2] max-h-[88vh] w-full max-w-[720px] overflow-auto rounded-[26px] border border-white/10 bg-[#0a0a0c]">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-[3] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white"
            >
              ✕
            </button>
            <div className="relative h-[230px] w-full overflow-hidden border-b border-white/10">
              <Image
                src={current.img}
                alt={`${current.k} in the Pinace wallet`}
                fill
                sizes="720px"
                className="object-cover object-top"
              />
            </div>
            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-4">
                <Image
                  src={current.avatar}
                  alt=""
                  width={44}
                  height={44}
                  className="rounded-full"
                />
                <h3 className="font-heading text-3xl font-semibold tracking-tight text-white">
                  {current.k}
                </h3>
              </div>
              <p className="mt-2 text-sm uppercase tracking-wide text-white/40">
                {current.tag}
              </p>
              <p className="mt-5 text-[16px] leading-relaxed text-white/70">
                {current.desc}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {current.tags.map((t) => (
                  <span
                    key={t}
                    className="onchain rounded-full border border-white/15 px-3 py-1 text-[12px] text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

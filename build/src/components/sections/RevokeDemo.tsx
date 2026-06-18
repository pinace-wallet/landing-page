"use client";

import { useRef, useState, useCallback } from "react";
import { Section } from "@/components/common/Section";
import { SectionKicker } from "@/components/common/SectionKicker";
import { SplitHeading } from "@/components/common/SplitHeading";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Phase = "idle" | "revoking" | "denied";

export default function RevokeDemo() {
  const scope = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const busy = phase !== "idle";

  const reset = useCallback(() => setPhase("idle"), []);

  const run = useCallback(() => {
    if (busy) return;
    setPhase("revoking");
    const reduced = prefersReducedMotion();

    window.setTimeout(() => {
      setPhase("denied");
      const overlay = overlayRef.current;
      if (overlay && !reduced) {
        gsap.fromTo(
          overlay,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.25, ease: "power2.out" },
        );
        gsap.fromTo(
          overlay.querySelector("[data-denied-card]"),
          { scale: 0.85, y: 12 },
          { scale: 1, y: 0, duration: 0.5, ease: "back.out(1.6)" },
        );
        gsap.fromTo(
          scope.current,
          { x: 0 },
          {
            keyframes: { x: [-8, 8, -6, 6, -3, 0] },
            duration: 0.5,
            ease: "power2.out",
          },
        );
      }
      window.setTimeout(reset, 2600);
    }, 900);
  }, [busy, reset]);

  return (
    <Section id="revoke">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionKicker tone="pink">The kill switch</SectionKicker>
          <SplitHeading
            text="Stop an agent, and the"
            accent="chain agrees."
            className="mt-6 text-[clamp(2rem,4.6vw,3.4rem)]"
          />
          <p className="mt-6 max-w-lg text-lg text-white/60">
            Revocation isn&rsquo;t a setting you trust — it&rsquo;s a transaction. Burn
            the agent&rsquo;s authority and its very next action reverts on-chain with{" "}
            <code className="onchain text-pinace-pink">E_REVOKED</code>. Try it.
          </p>
        </div>

        {/* interactive terminal */}
        <div
          ref={scope}
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/60 p-6 sm:p-8"
        >
          <div className="onchain space-y-2 text-[13.5px] leading-relaxed">
            <p className="text-white/45">
              <span className="text-pinace-blue-bright">›</span> agent.proposeAction(swap,
              100 SUI) <span className="text-pinace-green">✓</span>
            </p>
            <p className="text-white/45">
              <span className="text-pinace-blue-bright">›</span> settle(){" "}
              <span className="text-pinace-green">✓ 0x9f…a2</span>
            </p>
            {phase !== "idle" && (
              <p className="text-white/45">
                <span className="text-pinace-pink">›</span> revoke(policy){" "}
                <span className="text-pinace-pink">✓ authority burned</span>
              </p>
            )}
            {phase === "denied" && (
              <p className="text-white/45">
                <span className="text-pinace-pink">›</span> agent retries →{" "}
                <span className="text-pinace-pink">✗ E_REVOKED</span>
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={run}
            disabled={busy}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-pinace-pink/40 bg-pinace-pink/15 px-6 py-3 text-[15px] font-semibold text-[#ff7da6] transition-colors hover:bg-pinace-pink/25 disabled:opacity-60"
          >
            {phase === "idle" && "🛑 Revoke agent"}
            {phase === "revoking" && "Submitting revoke tx…"}
            {phase === "denied" && "Access revoked"}
          </button>

          {/* denied overlay */}
          {phase === "denied" && (
            <div
              ref={overlayRef}
              className="absolute inset-0 z-[5] flex items-center justify-center bg-black/55 [background-image:repeating-linear-gradient(0deg,rgba(243,18,96,0.06)_0,rgba(243,18,96,0.06)_1px,transparent_1px,transparent_4px)]"
            >
              <div
                data-denied-card
                className="flex flex-col items-center gap-2 rounded-2xl border border-pinace-pink bg-[rgba(30,6,14,0.92)] px-10 py-6 shadow-[0_0_60px_rgba(243,18,96,0.5)]"
              >
                <span className="onchain text-[clamp(22px,5vw,34px)] font-bold tracking-[0.14em] text-pinace-pink">
                  E_REVOKED
                </span>
                <span className="onchain text-[13px] tracking-wide text-[#ffb3c8]">
                  next transaction aborted on-chain
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

"use client";

import Image from "next/image";
import { useRef } from "react";
import { Container } from "@/components/common/Container";
import { buttonVariants } from "@/components/ui/button";
import { gsap, useGSAP, EASE_REVEAL, prefersReducedMotion } from "@/lib/gsap";
import { hero } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Hero() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>(".reveal-row > span");
      if (prefersReducedMotion()) {
        gsap.set(rows, { yPercent: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: EASE_REVEAL } });
      tl.from("[data-hero='badge']", { opacity: 0, y: 12, duration: 0.6 })
        .from(rows, { yPercent: 115, duration: 1, stagger: 0.08 }, "-=0.25")
        .from("[data-hero='sub']", { opacity: 0, y: 18, duration: 0.7 }, "-=0.55")
        .from(
          "[data-hero='cta'] > *",
          { opacity: 0, y: 16, duration: 0.6, stagger: 0.1 },
          "-=0.4",
        )
        .from(
          "[data-hero='mock']",
          { opacity: 0, y: 36, scale: 0.96, duration: 1.1 },
          "-=0.8",
        );

      // Safety net: if the rAF ticker is throttled (background tab, headless,
      // partial-JS crawler), force the timeline to its visible end state so the
      // hero never ships blank. setTimeout is not rAF-gated.
      const failsafe = window.setTimeout(() => tl.progress(1), 2600);
      return () => window.clearTimeout(failsafe);
    },
    { scope },
  );

  return (
    <section
      id="top"
      ref={scope}
      className="relative flex min-h-dvh items-center pb-20 pt-32"
    >
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* copy */}
        <div>
          <span
            data-hero="badge"
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[13px] font-medium text-white/70"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pinace-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-pinace-green" />
            </span>
            {hero.status}
          </span>

          <h1 className="font-heading text-[clamp(2.6rem,7.5vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-white">
            {hero.headlineRows.map((row) => (
              <span key={row} className="reveal-row">
                <span>{row}</span>
              </span>
            ))}
            <span className="reveal-row">
              <span className="bg-gradient-to-r from-pinace-blue-bright to-pinace-blue bg-clip-text text-transparent">
                {hero.headlineAccent}
              </span>
            </span>
          </h1>

          <p
            data-hero="sub"
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/60"
          >
            {hero.sub}
          </p>

          <div data-hero="cta" className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={hero.primaryCta.href}
              className={cn(
                buttonVariants(),
                "h-12 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground shadow-[0_8px_40px_-8px] shadow-primary/60 hover:bg-primary/90",
              )}
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 rounded-full border-white/15 bg-white/[0.02] px-7 text-base font-medium text-white hover:bg-white/[0.06]",
              )}
            >
              {hero.secondaryCta.label}
            </a>
            <span className="text-sm text-white/40">Mobile app — coming soon</span>
          </div>
        </div>

        {/* product mock — faithful to the extension UI */}
        <div data-hero="mock" className="relative mx-auto w-full max-w-[400px]">
          <div
            className="absolute -inset-10 -z-10 opacity-70 [background:radial-gradient(60%_60%_at_50%_40%,var(--pinace-blue),transparent_70%)] [filter:blur(40px)]"
            aria-hidden
          />
          <WalletMock />
        </div>
      </Container>
    </section>
  );
}

function WalletMock() {
  return (
    <div className="glass overflow-hidden rounded-[28px] p-5 shadow-2xl shadow-black/60">
      {/* balance card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black p-5">
        <div
          className="absolute inset-x-0 top-0 h-28 opacity-80 [background:radial-gradient(80%_120%_at_70%_0%,var(--pinace-blue),transparent_70%)]"
          aria-hidden
        />
        <p className="relative text-sm text-white/60">Total Balance</p>
        <p className="relative mt-1 font-heading text-4xl font-semibold text-white">
          $24.51
        </p>
        <p className="relative mt-1 text-sm font-medium text-pinace-green">+$2.47</p>
      </div>

      {/* agent row */}
      <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
        <Image
          src="/agents/deepage.svg"
          alt="DeepAge agent"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-white">DeepAge</span>
            <span className="rounded-full bg-pinace-amber/20 px-2 py-0.5 text-[11px] font-medium text-pinace-amber">
              Running
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/3 rounded-full bg-primary" />
          </div>
        </div>
      </div>

      {/* on-chain log teaser */}
      <div className="onchain mt-3 space-y-1.5 rounded-2xl border border-white/10 bg-black/60 p-3.5 text-[12.5px] leading-relaxed">
        <p className="text-white/50">
          <span className="text-pinace-blue-bright">›</span> propose_action(swap,
          100 SUI)
        </p>
        <p className="text-white/50">
          <span className="text-pinace-blue-bright">›</span> settle(){" "}
          <span className="text-pinace-green">✓ 0x9f…a2</span>
        </p>
        <p className="text-white/50">
          <span className="text-pinace-pink">›</span> revoke → next tx{" "}
          <span className="text-pinace-pink">✗ E_REVOKED</span>
        </p>
      </div>
    </div>
  );
}

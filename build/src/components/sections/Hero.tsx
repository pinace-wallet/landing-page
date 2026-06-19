"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { ParticleText } from "@/components/common/ParticleText";
import { buttonVariants } from "@/components/ui/button";
import { gsap, useGSAP, EASE_REVEAL, prefersReducedMotion } from "@/lib/gsap";
import { hero } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Hero() {
  const scope = useRef<HTMLDivElement>(null);
  const boatRef = useRef<HTMLImageElement>(null);
  const boatContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: EASE_REVEAL } });
      tl.from("[data-hero='badge']", { opacity: 0, y: 12, duration: 0.6 })
        .from(
          "[data-hero='brand']",
          { opacity: 0, y: 24, filter: "blur(8px)", duration: 0.9 },
          "-=0.2",
        )
        .from("[data-hero='sub']", { opacity: 0, y: 18, duration: 0.7 }, "-=0.5")
        .from(
          "[data-hero='cta']",
          { opacity: 0, y: 16, duration: 0.6 },
          "-=0.4",
        );

      if (boatContainerRef.current) {
        tl.from(boatContainerRef.current, { opacity: 0, y: 40, duration: 1.1 }, "-=0.6");
      }

      if (boatRef.current) {
        // Bobbing up-down
        gsap.to(boatRef.current, {
          y: 42,
          duration: 4.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // Tilting sway
        gsap.to(boatRef.current, {
          rotation: 10.5,
          duration: 5.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          transformOrigin: "50% 90%",
        });

        // Gentle horizontal drift
        gsap.to(boatRef.current, {
          x: 18,
          duration: 6.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      const failsafe = window.setTimeout(() => tl.progress(1), 2800);
      return () => window.clearTimeout(failsafe);
    },
    { scope },
  );

  return (
    <section
      id="top"
      ref={scope}
      className="relative min-h-[100dvh] overflow-x-clip px-0"
      style={{ paddingTop: 'clamp(180px, 22vh, 230px)', paddingBottom: '200px' }}
    >
      <Container>
        <div className="mx-auto w-[min(92vw,940px)] max-w-full">
          <h1 className="sr-only">Pinace. Delegate, don&apos;t trust.</h1>

          <div className="mb-2 flex flex-wrap items-center gap-3">
            <span
              data-hero="badge"
              className="inline-flex items-center gap-2.5 text-[13px] font-medium text-white/78"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pinace-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-pinace-green" />
              </span>
              {hero.status}
            </span>
          </div>

          <div
            data-hero="brand"
            className="relative w-[min(92vw,940px)] max-w-full"
          >
            <div className="pointer-events-none absolute -left-[8%] right-[6%] top-1/2 -z-10 h-44 -translate-y-1/2 rounded-full bg-pinace-blue/50 blur-[80px]" />
            <div className="pointer-events-none absolute left-[30%] right-[-6%] top-1/2 -z-10 h-36 -translate-y-1/3 rounded-full bg-pinace-violet/35 blur-[90px]" />
            <ParticleText
              text="Pinace"
              heightRatio={0.22}
              colors={["#ffffff", "#f7faff", "#dceaff", "#ffffff"]}
              align="left"
            />
          </div>

          <div data-hero="canvas" className="-mt-4 hidden w-[min(76vw,760px)] max-w-full md:block">
            <ParticleText text="Delegate, don't trust." heightRatio={0.18} align="left" />
          </div>

          <p className="font-heading mt-1 text-[clamp(2.6rem,15vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-white md:hidden">
            <span className="block">Pinace</span>
            <span className="mt-2 block text-pinace-blue-bright">Delegate, don&apos;t trust.</span>
          </p>

          <div
            className="mt-9 flex w-full max-w-full flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between md:gap-12"
          >
            <p
              data-hero="sub"
              className="max-w-[590px] text-left text-[1.04rem] leading-relaxed text-white/74 sm:text-[1.14rem]"
            >
              {hero.sub}
            </p>

            <div
              data-hero="cta"
              className="flex shrink-0 flex-col items-start gap-4 md:items-stretch"
            >
              <a
                href={hero.primaryCta.href}
                className={cn(
                  buttonVariants(),
                  "h-11 min-w-[150px] rounded-full bg-white px-5 text-[15px] font-semibold text-black shadow-[0_0_54px_-18px_rgba(90,166,255,0.95)] hover:bg-white/90",
                )}
              >
                <span>{hero.primaryCta.label}</span>
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </a>
              <a
                href={hero.secondaryCta.href}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-11 min-w-[150px] rounded-full border-white/18 bg-transparent px-5 text-[15px] font-medium text-white hover:border-white/32 hover:bg-white/[0.07]",
                )}
              >
                {hero.secondaryCta.label}
                <span aria-hidden className="ml-2 text-white/55">
                  ...
                </span>
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Boat: large mt creates gap below content; negative mb overlaps into next section */}
      <div
        ref={boatContainerRef}
        data-hero="logo"
        aria-hidden
        className="relative flex w-full justify-center px-4"
        style={{ marginTop: '130px', marginBottom: '0px' }}
      >
        <Image
          ref={boatRef}
          src="/brand/logo_boat.svg"
          alt=""
          width={460}
          height={510}
          priority
          className="h-auto w-[clamp(260px,30vw,420px)] opacity-[0.75] brightness-[1.1] contrast-[1.05] drop-shadow-[0_0_45px_rgba(0,111,238,0.35)] will-change-transform"
        />
      </div>
    </section>
  );
}

import Image from "next/image";
import { Section } from "@/components/common/Section";
import { SectionKicker } from "@/components/common/SectionKicker";
import { Reveal } from "@/components/common/Reveal";
import { suiPrimitives } from "@/lib/site";

export default function Ecosystem() {
  return (
    <Section id="ecosystem" className="py-[clamp(3rem,6vw,5rem)]">
      <div className="relative overflow-hidden border border-white/10 bg-[rgba(16,20,34,0.5)] p-8 sm:p-10">
        {/* Sui logo — full-bleed hidden watermark, centered, heavily blurred */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden">
          <Image
            src="/sui.png"
            alt=""
            aria-hidden
            width={1920}
            height={1080}
            className="h-auto min-h-full min-w-full w-auto object-cover opacity-[0.13] blur-[70px] scale-[2]"
          />
        </div>

        {/* Dark overlay above watermark, below text — keeps content legible */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgba(10,13,26,0.92)] via-[rgba(10,13,26,0.75)] to-transparent" aria-hidden />

        <div className="relative max-w-2xl">
          <SectionKicker tone="blue">Protocol-agnostic</SectionKicker>
          <h2 className="font-heading mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Built on Sui-native primitives
          </h2>
          <p className="mt-2 max-w-md text-[15px] text-white/55">
            No third-party runtime. Pinace gates any Sui Move call and builds on the parts
            of the Sui stack it actually uses:
          </p>
          <Reveal
            className="mt-7 flex flex-wrap gap-2.5"
            selector="[data-chip]"
            stagger={0.05}
            y={16}
          >
            {suiPrimitives.map((p) => (
              <span
                key={p}
                data-chip
                className="onchain rounded-full border border-white/14 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/80"
              >
                {p}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

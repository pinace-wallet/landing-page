import { Section } from "@/components/common/Section";
import { SectionKicker } from "@/components/common/SectionKicker";
import { Reveal } from "@/components/common/Reveal";
import { suiPrimitives } from "@/lib/site";

export default function Ecosystem() {
  return (
    <Section id="ecosystem" className="py-[clamp(3rem,6vw,5rem)]">
      <div className="rounded-[28px] border border-white/10 bg-[rgba(24,24,27,0.4)] p-8 sm:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <SectionKicker tone="blue">Protocol-agnostic</SectionKicker>
            <h2 className="font-heading mt-4 text-2xl font-semibold tracking-tight text-white">
              Built on Sui-native primitives
            </h2>
            <p className="mt-2 text-[15px] text-white/55">
              No third-party runtime. Pinace gates any Sui Move call and leans on the
              ecosystem&rsquo;s own building blocks.
            </p>
          </div>
          <Reveal
            className="flex flex-wrap gap-2.5 md:max-w-md md:justify-end"
            selector="[data-chip]"
            stagger={0.05}
            y={16}
          >
            {suiPrimitives.map((p) => (
              <span
                key={p}
                data-chip
                className="rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/75"
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

import { Section } from "@/components/common/Section";
import { SectionKicker } from "@/components/common/SectionKicker";
import { SplitHeading } from "@/components/common/SplitHeading";
import { Reveal } from "@/components/common/Reveal";
import { steps } from "@/lib/site";

export default function HowItWorks() {
  return (
    <Section id="how">
      <SectionKicker tone="blue">How it works</SectionKicker>
      <SplitHeading
        text="From deposit to"
        accent="revoke."
        className="mt-6 text-[clamp(2rem,5vw,4rem)]"
      />

      <Reveal className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4" stagger={0.1} y={32}>
        {steps.map((s) => (
          <div
            key={s.n}
            className="relative flex flex-col rounded-3xl border border-white/10 bg-[rgba(24,24,27,0.45)] p-7 transition-colors hover:border-white/20"
          >
            <span className="font-heading text-3xl font-bold leading-none text-pinace-blue-bright">
              {s.n}
            </span>
            <h3 className="font-heading mt-4 text-xl font-semibold tracking-tight text-white">
              {s.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-white/55">{s.body}</p>
          </div>
        ))}
      </Reveal>

      {/* atomic PTB strip — the propose → settle chain */}
      <Reveal className="mt-6">
        <div className="onchain flex flex-wrap items-center gap-x-3 gap-y-2 rounded-3xl border border-white/10 bg-black/50 p-6 text-[13.5px]">
          <span className="text-white/40">PTB</span>
          <span className="text-white/30">›</span>
          <span className="text-pinace-blue-bright">propose_action(value)</span>
          <span className="text-white/30">→</span>
          <span className="text-white/70">protocol::call(...)</span>
          <span className="text-white/30">→</span>
          <span className="text-pinace-green">settle()</span>
          <span className="ml-auto rounded-full bg-white/[0.06] px-3 py-1 text-[12px] text-white/50">
            atomic · all-or-nothing
          </span>
        </div>
      </Reveal>
    </Section>
  );
}

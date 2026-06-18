import { Section } from "@/components/common/Section";
import { SectionKicker } from "@/components/common/SectionKicker";
import { SplitHeading } from "@/components/common/SplitHeading";
import { Reveal } from "@/components/common/Reveal";
import { TiltCard } from "@/components/common/TiltCard";
import { featureCards } from "@/lib/site";

const toneText = {
  blue: "text-pinace-blue-bright",
  teal: "text-pinace-teal",
  pink: "text-pinace-pink",
  violet: "text-pinace-violet",
} as const;

export default function Features() {
  return (
    <Section id="features">
      <SectionKicker tone="blue">What you get</SectionKicker>
      <SplitHeading
        text="Control, enforced by"
        accent="the chain."
        className="mt-6 text-[clamp(2rem,5vw,4rem)]"
      />

      <Reveal
        className="mt-14 grid gap-5 md:grid-cols-2"
        selector="[data-feature]"
        stagger={0.1}
        y={32}
      >
        {featureCards.map((f) => {
          const isFeature = "feature" in f && f.feature === true;
          return (
          <div
            key={f.n}
            data-feature
            className={isFeature ? "md:col-span-2" : undefined}
          >
            <TiltCard tone={f.tone} feature={isFeature}>
              <div className="flex items-center gap-3">
                <span
                  className={`font-heading text-3xl font-bold leading-none ${toneText[f.tone]}`}
                >
                  {f.n}
                </span>
                <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-white/55">
                  {f.kicker}
                </span>
              </div>
              <h3 className="font-heading mt-5 text-[1.6rem] font-semibold tracking-tight text-white">
                {f.title}
              </h3>
              <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-white/55">
                {f.body}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {f.tags.map((t) => (
                  <span
                    key={t}
                    className="onchain rounded-full border border-white/15 px-3 py-1 text-[12px] text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </TiltCard>
          </div>
          );
        })}
      </Reveal>
    </Section>
  );
}

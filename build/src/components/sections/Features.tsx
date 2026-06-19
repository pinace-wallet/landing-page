import { Section } from "@/components/common/Section";
import { SectionKicker } from "@/components/common/SectionKicker";
import { SplitHeading } from "@/components/common/SplitHeading";
import { Reveal } from "@/components/common/Reveal";
import { DevNote } from "@/components/common/DevNote";
import { CardSwap, Card } from "@/components/common/CardSwap";
import { featureCards } from "@/lib/site";

function FeatureBody({ f }: { f: (typeof featureCards)[number] }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden p-7">
      <div className="flex items-center gap-3">
        <span className="font-heading text-3xl font-bold leading-none text-pinace-blue-bright">
          {f.n}
        </span>
        <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-white/55">
          {f.kicker}
        </span>
      </div>
      <h3 className="font-heading mt-5 text-[1.55rem] font-semibold tracking-tight text-white">
        {f.title}
      </h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-white/55">{f.body}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {f.tags.map((t) => (
          <span
            key={t}
            className="onchain rounded-full border border-white/15 px-2.5 py-1 text-[11.5px] text-white/70"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <Section id="features">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionKicker tone="blue">What you get</SectionKicker>
          <SplitHeading
            text="Control, enforced by"
            accent="the chain."
            className="mt-6 text-[clamp(2rem,4.6vw,3.4rem)]"
          />
          <Reveal className="mt-6" y={16}>
            <p className="max-w-md text-lg text-white/60">
              Four guarantees, baked into the protocol — not promised in a dashboard.
              Each one closes a way software could otherwise misuse your money.
            </p>
          </Reveal>

          {/* mobile fallback: simple list */}
          <Reveal className="mt-8 flex flex-col gap-3 lg:hidden" stagger={0.08} y={20}>
            {featureCards.map((f) => (
              <div
                key={f.n}
                className="border border-white/12 bg-[rgba(20,26,44,0.6)] p-5"
              >
                <h3 className="font-heading font-semibold text-white">
                  <span className="text-pinace-blue-bright">{f.n}</span> {f.title}
                </h3>
                <p className="mt-1.5 text-[14px] text-white/55">{f.body}</p>
              </div>
            ))}
          </Reveal>
        </div>

        {/* CardSwap (lg+) */}
        <div className="relative hidden h-[520px] items-center justify-center lg:flex">
          <DevNote>React Bits CardSwap — tune delay/distance to taste</DevNote>
          <CardSwap width={580} height={430} delay={4200}>
            {featureCards.map((f) => (
              <Card key={f.n}>
                <FeatureBody f={f} />
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </Section>
  );
}

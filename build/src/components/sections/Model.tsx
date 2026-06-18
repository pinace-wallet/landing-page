import Image from "next/image";
import { Section } from "@/components/common/Section";
import { SectionKicker } from "@/components/common/SectionKicker";
import { SplitHeading } from "@/components/common/SplitHeading";
import { CountUp } from "@/components/common/CountUp";
import { Reveal } from "@/components/common/Reveal";
import { modelStats } from "@/lib/site";

export default function Model() {
  return (
    <Section id="model" containerClassName="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      {/* app screenshot in a gradient frame */}
      <Reveal className="mx-auto w-full max-w-[320px]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(150deg,var(--pinace-violet),var(--pinace-pink)_55%,var(--pinace-blue))] p-[6px]">
          <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-black">
            <Image
              src="/agents/app-home.png"
              alt="Pinace wallet home — total balance, running agent, pool balance and success rate"
              fill
              sizes="(max-width: 1024px) 80vw, 320px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </Reveal>

      <div>
        <SectionKicker tone="violet">The model</SectionKicker>
        <SplitHeading
          text="Give agents a budget,"
          accent="not your keys."
          className="mt-6 text-[clamp(1.9rem,4.2vw,3.1rem)]"
        />
        <Reveal className="mt-6 space-y-4" stagger={0.12}>
          <p className="max-w-xl text-lg text-white/60">
            Sui has no &ldquo;approve&rdquo; like ERC-20, so Pinace uses an escrow you
            own: a <b className="font-semibold text-white">BalancePool</b>. You deposit
            once, attach a policy, and the agent works only inside those bounds.
          </p>
          <p className="max-w-xl text-lg text-white/60">
            Every move is a hot-potato PTB the chain validates before it settles. Break a
            rule and it reverts. Change your mind and you{" "}
            <b className="font-semibold text-white">revoke in one click</b> — the next
            transaction fails on-chain.
          </p>
        </Reveal>

        <dl className="mt-9 flex flex-wrap gap-x-12 gap-y-6">
          {modelStats.map((s) => (
            <div key={s.label}>
              <dd className="font-heading bg-gradient-to-br from-pinace-blue-bright to-pinace-blue bg-clip-text text-[2.6rem] font-bold leading-none text-transparent">
                <CountUp to={s.to} />
                {s.suffix}
              </dd>
              <dt className="mt-2 text-sm uppercase tracking-wide text-white/45">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

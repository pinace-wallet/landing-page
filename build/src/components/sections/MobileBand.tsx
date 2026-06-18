import { Section } from "@/components/common/Section";

export default function MobileBand() {
  return (
    <Section id="mobile" className="py-6">
      <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-white/10 bg-[linear-gradient(120deg,color-mix(in_srgb,var(--pinace-violet)_15%,transparent),color-mix(in_srgb,var(--pinace-blue)_10%,transparent)_60%,color-mix(in_srgb,var(--pinace-teal)_10%,transparent))] px-8 py-7">
        <div className="max-w-xl">
          <div className="font-heading flex items-center gap-3 text-[1.4rem] font-semibold tracking-tight text-white">
            Pinace on mobile
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/70">
              Coming soon
            </span>
          </div>
          <p className="mt-2 text-[15px] text-white/60">
            The extension is live today. The mobile app brings the same on-chain
            guardrails and one-click revoke to your pocket.
          </p>
        </div>
        <a
          href="#waitlist"
          className="flex-none rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-black transition-transform hover:-translate-y-0.5"
        >
          Join the waitlist →
        </a>
      </div>
    </Section>
  );
}

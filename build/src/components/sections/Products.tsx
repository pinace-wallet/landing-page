import { Section } from "@/components/common/Section";
import { SectionKicker } from "@/components/common/SectionKicker";
import { SplitHeading } from "@/components/common/SplitHeading";
import { Reveal } from "@/components/common/Reveal";
import { products } from "@/lib/site";
import { cn } from "@/lib/utils";

const toneText = {
  blue: "text-pinace-blue-bright",
  violet: "text-pinace-violet",
  teal: "text-pinace-teal",
} as const;

const toneGlow = {
  blue: "group-hover:shadow-[inset_3px_0_0_var(--pinace-blue)]",
  violet: "group-hover:shadow-[inset_3px_0_0_var(--pinace-violet)]",
  teal: "group-hover:shadow-[inset_3px_0_0_var(--pinace-teal)]",
} as const;

export default function Products() {
  return (
    <Section id="products">
      <SectionKicker tone="blue">Three products, one protocol</SectionKicker>
      <SplitHeading
        text="Wallet, Protocol,"
        accent="SDK."
        className="mt-6 text-[clamp(2rem,5vw,4rem)]"
      />
      <Reveal className="mt-5" y={16}>
        <p className="max-w-2xl text-lg text-white/60">
          One system, three surfaces — each removing a specific reason it used to be
          unsafe to let software touch your money.
        </p>
      </Reveal>

      <Reveal className="mt-14 border-t border-white/10" stagger={0.1} y={26}>
        {products.map((p, i) => (
          <div
            key={p.name}
            className={cn(
              "group grid gap-6 border-b border-white/10 py-9 transition-shadow lg:grid-cols-[0.9fr_1.05fr_1.05fr] lg:items-start lg:gap-12 lg:py-11",
              toneGlow[p.tone],
            )}
          >
            {/* index + name */}
            <div className="flex items-baseline gap-4">
              <span className="onchain text-sm text-white/30">0{i + 1}</span>
              <div>
                <h3 className="font-heading text-[2rem] font-semibold leading-none tracking-tight text-white lg:text-[2.6rem]">
                  {p.name}
                </h3>
                <span className={cn("onchain mt-2 block text-[12px]", toneText[p.tone])}>
                  {p.tag}
                </span>
              </div>
            </div>

            {/* problem */}
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/35">
                The problem
              </span>
              <p className="mt-2 text-[16px] leading-relaxed text-white/55">{p.pain}</p>
            </div>

            {/* what Pinace provides */}
            <div>
              <span
                className={cn(
                  "text-[12px] font-semibold uppercase tracking-[0.14em]",
                  toneText[p.tone],
                )}
              >
                What Pinace gives you
              </span>
              <p className="mt-2 text-[16px] leading-relaxed text-white/75">{p.give}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}

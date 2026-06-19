import Image from "next/image";
import { Section } from "@/components/common/Section";
import { SectionKicker } from "@/components/common/SectionKicker";
import { SplitHeading } from "@/components/common/SplitHeading";
import { Reveal } from "@/components/common/Reveal";
import { DevNote } from "@/components/common/DevNote";

export default function MobileBand() {
  return (
    <Section id="mobile">
      <div className="relative overflow-hidden border border-white/12 bg-[radial-gradient(120%_120%_at_15%_0%,color-mix(in_srgb,var(--pinace-violet)_18%,transparent),transparent_55%)]">
        <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:p-16">
          {/* copy */}
          <div>
            <SectionKicker tone="violet">Mobile</SectionKicker>
            <SplitHeading
              text="Pinace, in your"
              accent="pocket."
              className="mt-6 text-[clamp(2.2rem,5vw,3.6rem)]"
            />
            <Reveal className="mt-6" y={16}>
              <p className="max-w-md text-lg text-white/65">
                The same on-chain guardrails and one-click revoke, on the go. The mobile
                app is in the workshop — join the waitlist and we&rsquo;ll ping you the
                moment it ships.
              </p>
            </Reveal>
            <Reveal className="mt-8 flex flex-wrap items-center gap-4" y={14}>
              <a
                href="#waitlist"
                className="rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-black transition-transform hover:-translate-y-0.5"
              >
                Join the waitlist →
              </a>
              <span className="inline-flex items-center gap-2 text-sm text-white/45">
                <span className="h-1.5 w-1.5 rounded-full bg-pinace-amber" />
                Coming soon
              </span>
            </Reveal>
          </div>

          {/* phone mockup with a deliberately blurred teaser screen */}
          <Reveal className="relative mx-auto w-full max-w-[300px]">
            <div className="absolute -inset-10 -z-10 opacity-70 [background:radial-gradient(60%_60%_at_50%_50%,var(--pinace-violet),transparent_70%)] [filter:blur(50px)]" aria-hidden />
            <div className="relative mx-auto aspect-[9/19] w-[260px] rounded-[2.6rem] border border-white/15 bg-[#0b0f1d] p-2.5 shadow-2xl shadow-black/60">
              <DevNote>Phone screen — drop real Figma/app frame here</DevNote>
              {/* notch */}
              <div className="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black/80" />
              {/* screen */}
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black">
                <Image
                  src="/agents/app-home.png"
                  alt="Pinace mobile app preview (coming soon)"
                  fill
                  sizes="260px"
                  className="object-cover object-top opacity-80 [filter:blur(5px)_saturate(120%)] [transform:scale(1.08)]"
                />
                {/* frost + coming-soon label */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
                  <span className="rounded-full border border-white/20 bg-black/50 px-4 py-2 text-[13px] font-semibold uppercase tracking-wide text-white/85">
                    Coming soon
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

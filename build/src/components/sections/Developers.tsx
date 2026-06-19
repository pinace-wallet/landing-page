import { Section } from "@/components/common/Section";
import { SectionKicker } from "@/components/common/SectionKicker";
import { SplitHeading } from "@/components/common/SplitHeading";
import { Reveal } from "@/components/common/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { sdkSnippet, sdkTiers, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Developers() {
  return (
    <Section id="developers">
      <SectionKicker tone="violet">For developers</SectionKicker>
      <SplitHeading
        text="Bounded actions in a few"
        accent="lines."
        className="mt-6 text-[clamp(2rem,5vw,4rem)]"
      />

      <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        {/* code */}
        <Reveal className="flex h-full flex-col overflow-hidden border border-white/10 bg-black/60">
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-pinace-pink/70" />
            <span className="h-3 w-3 rounded-full bg-pinace-amber/70" />
            <span className="h-3 w-3 rounded-full bg-pinace-green/70" />
            <span className="onchain ml-2 text-[12px] text-white/40">
              agent.ts — @pinace/agent-sdk
            </span>
          </div>
          <pre className="onchain w-full min-h-0 flex-1 whitespace-pre-wrap break-words p-6 text-[12.5px] leading-relaxed text-white/80">
            <code>{sdkSnippet}</code>
          </pre>
        </Reveal>

        {/* tiers + CTA */}
        <div className="flex h-full flex-col gap-5">
          <Reveal className="flex flex-col gap-3" stagger={0.08}>
            {sdkTiers.map((t) => (
              <div
                key={t.pkg}
                className="border border-white/10 bg-[rgba(24,24,27,0.45)] p-5 transition-colors hover:border-white/20"
              >
                <p className="onchain text-[14px] font-medium text-pinace-blue-bright">
                  {t.pkg}
                </p>
                <p className="mt-1 text-[14px] text-white/55">{t.who}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="relative flex flex-1 flex-col justify-center overflow-hidden border border-white/10 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--pinace-violet)_18%,transparent),color-mix(in_srgb,var(--pinace-blue)_12%,transparent))] p-7">
            <h3 className="font-heading text-xl font-semibold tracking-tight text-white">
              Publish a policy to the marketplace
            </h3>
            <p className="mt-2 text-[15px] text-white/65">
              Write a Move policy against the standard interface, deploy, and list it for
              every Pinace user.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={site.docsUrl}
                className={cn(
                  buttonVariants(),
                  "h-11 rounded-full bg-white px-6 font-medium text-black hover:bg-white/90",
                )}
              >
                Read the docs →
              </a>
              <a
                href={site.githubUrl}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-11 rounded-full border-white/20 bg-white/[0.03] px-6 font-medium text-white hover:bg-white/[0.08]",
                )}
              >
                GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

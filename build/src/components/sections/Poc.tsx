import { Section } from "@/components/common/Section";
import { SectionKicker } from "@/components/common/SectionKicker";
import { SplitHeading } from "@/components/common/SplitHeading";
import { Reveal } from "@/components/common/Reveal";
import { DevNote } from "@/components/common/DevNote";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// The POC "Pinace Agent": a Next.js + AI SDK chat app. The LLM runs a tool loop —
// quote on DeepBook v3, mirror the 4 on-chain policies, take a signed intent receipt
// from the pool owner (AP2), then submit one atomic 6-call PTB. (see ../../../pinace-agent)
const flow = [
  { k: "Intent", v: "Chat an order — the AI SDK tool loop parses it" },
  { k: "Quote", v: "DeepBook v3 devInspect prices it, read-only" },
  { k: "Pre-flight", v: "4 policies checked off-chain, mirroring on-chain prove" },
  { k: "Sign", v: "You sign an intent receipt in your wallet (AP2)" },
  { k: "Execute", v: "One atomic PTB: propose → prove → authorize → take → swap → return" },
];

const stack = ["Next.js 16", "Vercel AI SDK 6", "OpenAI", "DeepBook v3", "@pinace/core"];

export default function Poc() {
  return (
    <Section id="poc">
      <div className="relative overflow-hidden border border-white/12 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--pinace-blue)_16%,transparent),color-mix(in_srgb,var(--pinace-violet)_10%,transparent)_55%,color-mix(in_srgb,var(--pinace-teal)_12%,transparent))] p-7 sm:p-10 lg:p-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionKicker tone="teal">Proof of concept · Pinace Agent</SectionKicker>
            <SplitHeading
              text="Conversational trading on"
              accent="DeepBook v3."
              className="mt-6 text-[clamp(1.9rem,4.4vw,3.2rem)]"
            />
            <Reveal className="mt-6" y={16}>
              <p className="max-w-xl text-lg text-white/65">
                The Pinace Agent is a chat app where an LLM trades for you. It runs
                autonomously with its own keypair — but every swap needs an{" "}
                <span className="text-white">intent receipt you sign</span>, and a single
                atomic PTB enforces all four policies on-chain. Revoke, and the next call
                reverts with{" "}
                <code className="onchain text-pinace-pink">E_AGENT_REVOKED</code>.
              </p>
            </Reveal>

            <Reveal className="mt-5 flex flex-wrap gap-2" selector="[data-chip]" stagger={0.05} y={12}>
              {stack.map((s) => (
                <span
                  key={s}
                  data-chip
                  className="onchain rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[12px] text-white/65"
                >
                  {s}
                </span>
              ))}
            </Reveal>

            {/* chat intent */}
            <Reveal className="mt-7 max-w-xl">
              <div className="rounded-2xl border border-white/12 bg-black/40 p-5">
                <p className="text-[15px] leading-relaxed text-white">
                  <span className="text-white/45">&ldquo;</span>Swap 100 SUI to USDC at the
                  best price, max{" "}
                  <span className="text-pinace-blue-bright">12% slippage</span>, over{" "}
                  <span className="text-pinace-blue-bright">1 day</span>.
                  <span className="text-white/45">&rdquo;</span>
                </p>
              </div>
            </Reveal>

            <Reveal className="mt-6 flex flex-col gap-2.5" stagger={0.08} y={14}>
              {flow.map((f, i) => (
                <div key={f.k} className="flex items-center gap-3 text-[14.5px]">
                  <span className="onchain flex h-6 w-6 flex-none items-center justify-center rounded-full bg-white/10 text-[12px] text-pinace-blue-bright">
                    {i + 1}
                  </span>
                  <span className="font-medium text-white">{f.k}</span>
                  <span className="text-white/30">—</span>
                  <span className="text-white/60">{f.v}</span>
                </div>
              ))}
            </Reveal>

            {/* launch CTA — the agent will be deployed */}
            <Reveal className="mt-8 flex flex-wrap items-center gap-4" y={14}>
              <a
                href={site.pocAgentUrl}
                {...(site.pocAgentLive
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={cn(
                  buttonVariants(),
                  "h-12 rounded-full bg-white px-7 text-base font-medium text-black glow-blue hover:bg-white/90",
                )}
              >
                Launch the agent ↗
              </a>
              <span className="text-sm text-white/45">
                {site.pocAgentLive ? "Live on mainnet" : "Deploying soon"}
              </span>
            </Reveal>
          </div>

          {/* POC media — placeholder until the team drops real screenshots/recording */}
          <Reveal className="relative mx-auto w-full max-w-[360px]">
            <div className="glow-blue relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden border border-dashed border-white/20 bg-black/30 text-center">
              <DevNote>POC media slot — drop screenshots / screen-recording here</DevNote>
              <span className="text-4xl opacity-60">🪙</span>
              <p className="onchain mt-4 px-8 text-[13px] text-white/45">
                Dex Agent preview
                <br />
                <span className="text-white/30">image / video coming</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

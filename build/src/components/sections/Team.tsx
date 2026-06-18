import { Section } from "@/components/common/Section";
import { SectionKicker } from "@/components/common/SectionKicker";
import { SplitHeading } from "@/components/common/SplitHeading";
import { Reveal } from "@/components/common/Reveal";
import { team } from "@/lib/site";

// Avatar gradient per member — distinct, on-palette.
const tones = [
  "from-pinace-pink to-pinace-violet",
  "from-pinace-blue to-pinace-teal",
  "from-pinace-violet to-pinace-blue",
  "from-pinace-amber to-pinace-pink",
];

export default function Team() {
  return (
    <Section id="team">
      <SectionKicker tone="teal">The team</SectionKicker>
      <SplitHeading
        text="Four builders behind"
        accent="Pinace."
        className="mt-6 text-[clamp(2rem,5vw,4rem)]"
      />

      <Reveal
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        stagger={0.09}
        y={28}
      >
        {team.map((m, i) => (
          <div
            key={m.name}
            className="group flex flex-col items-start rounded-3xl border border-white/10 bg-[rgba(24,24,27,0.45)] p-7 transition-colors hover:border-white/20"
          >
            <span
              className={`font-heading flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl font-bold text-white ${tones[i % tones.length]}`}
            >
              {m.name[0]}
            </span>
            <h3 className="font-heading mt-5 text-xl font-semibold tracking-tight text-white">
              {m.name}
            </h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-white/50">{m.role}</p>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}

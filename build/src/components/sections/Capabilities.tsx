import { Section } from "@/components/common/Section";
import { SectionKicker } from "@/components/common/SectionKicker";
import { SplitHeading } from "@/components/common/SplitHeading";
import { Reveal } from "@/components/common/Reveal";
import { capabilities } from "@/lib/site";
import { cn } from "@/lib/utils";

const toneDot = {
  blue: "bg-pinace-blue",
  teal: "bg-pinace-teal",
  pink: "bg-pinace-pink",
} as const;

export default function Capabilities() {
  return (
    <Section id="capabilities">
      <SectionKicker tone="teal">Scope of delegation</SectionKicker>
      <SplitHeading
        text="What an agent can — and"
        accent="can't — do."
        className="mt-6 text-[clamp(2rem,5vw,4rem)]"
      />

      <Reveal className="mt-14 grid gap-5 md:grid-cols-3" stagger={0.1} y={32}>
        {capabilities.map((col) => (
          <div
            key={col.title}
            className="rounded-3xl border border-white/10 bg-[rgba(24,24,27,0.45)] p-8 transition-colors hover:border-white/20"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className={cn("h-2.5 w-2.5 rounded-full", toneDot[col.tone])} />
              <h3 className="font-heading text-xl font-semibold tracking-tight text-white">
                {col.title}
              </h3>
            </div>
            <ul className="flex flex-col gap-3">
              {col.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[15px] text-white/55"
                >
                  <span
                    className={cn(
                      "mt-[7px] h-1.5 w-1.5 flex-none rounded-full opacity-80",
                      toneDot[col.tone],
                    )}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}

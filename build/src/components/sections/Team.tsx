import { Section } from "@/components/common/Section";
import { SectionKicker } from "@/components/common/SectionKicker";
import { SplitHeading } from "@/components/common/SplitHeading";
import { Reveal } from "@/components/common/Reveal";
import { DevNote } from "@/components/common/DevNote";
import { ProfileCard } from "@/components/common/ProfileCard";
import { team } from "@/lib/site";

const accents = [
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

      <div className="relative mt-14">
        <DevNote inline className="mb-3">
          React Bits ProfileCard · anon avatars — drop real member photos later
        </DevNote>
        <Reveal
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          selector="[data-member]"
          stagger={0.1}
          y={28}
        >
          {team.map((m, i) => (
            <div key={m.name} data-member>
              <ProfileCard
                name={m.name}
                title={m.role}
                handle={`@${m.name.toLowerCase()}`}
                avatar="/brand/avatar-anon.svg"
                accent={accents[i % accents.length]}
              />
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

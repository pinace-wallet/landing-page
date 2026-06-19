import { Section } from "@/components/common/Section";
import { SectionKicker } from "@/components/common/SectionKicker";
import { SplitHeading } from "@/components/common/SplitHeading";
import { Reveal } from "@/components/common/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/site";

export default function Faq() {
  return (
    <Section id="faq">
      <SectionKicker tone="amber">Questions</SectionKicker>
      <SplitHeading
        text="You might be"
        accent="wondering."
        className="mt-6 text-[clamp(2rem,5vw,4rem)]"
      />

      <Reveal className="mt-12" y={20}>
        <Accordion multiple={false} className="grid gap-3 md:grid-cols-2">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`faq-${i}`}
              className="border border-white/10 bg-[rgba(24,24,27,0.45)] px-5 transition-colors hover:border-white/20"
            >
              <AccordionTrigger className="font-heading py-5 text-left text-[17px] font-semibold tracking-tight text-white hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[15px] leading-relaxed text-white/60">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}

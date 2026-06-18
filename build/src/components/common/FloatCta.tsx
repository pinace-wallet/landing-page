"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { site } from "@/lib/site";

/** Floating install CTA that appears after the hero and hides over the final CTA. */
export function FloatCta() {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { autoAlpha: 0, y: 20 });
    const show = () => gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" });
    const hide = () => gsap.to(el, { autoAlpha: 0, y: 20, duration: 0.4, ease: "power3.out" });

    const st = ScrollTrigger.create({
      start: "top top-=600",
      end: "max",
      onUpdate: (self) => (self.progress > 0 ? show() : hide()),
    });
    // Hide while the final CTA / footer is on screen.
    const tail = ScrollTrigger.create({
      trigger: "#waitlist",
      start: "top bottom",
      onToggle: (self) => (self.isActive ? hide() : show()),
    });
    return () => {
      st.kill();
      tail.kill();
    };
  });

  return (
    <a
      ref={ref}
      href={site.chromeStoreUrl}
      className="fixed bottom-6 right-6 z-[55] rounded-full bg-primary px-6 py-3.5 text-[15px] font-semibold text-primary-foreground shadow-[0_12px_34px_rgba(0,0,0,0.4)] transition-transform hover:-translate-y-0.5 max-sm:left-4 max-sm:right-4 max-sm:text-center"
    >
      Add Pinace to Chrome
    </a>
  );
}

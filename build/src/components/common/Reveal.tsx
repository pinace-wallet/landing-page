"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE_REVEAL, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered reveal that ENHANCES already-visible content (DESIGN.md/AGENTS.md §5).
 * No-JS and reduced-motion users see the content immediately — visibility is never gated.
 * Animates direct children (or `selector` matches) with a stagger fit to the block.
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  y = 28,
  stagger = 0.09,
  selector,
  start = "top 82%",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "section";
  y?: number;
  stagger?: number;
  selector?: string;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const items = selector
        ? ref.current.querySelectorAll(selector)
        : (ref.current.children as unknown as Element[]);
      gsap.from(items, {
        opacity: 0,
        y,
        duration: 0.9,
        ease: EASE_REVEAL,
        stagger,
        // Don't pre-hide on mount: the start state is only applied when the
        // trigger activates, so content is never gated/blank for crawlers,
        // headless renderers, or a stalled ticker (AGENTS.md §5 / DESIGN.md).
        immediateRender: false,
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    },
    { scope: ref },
  );

  return (
    // @ts-expect-error — ref typing across the small union of tags is fine at runtime.
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}

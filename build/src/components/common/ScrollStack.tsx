"use client";

import React, { Children, useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export interface ScrollStackItemProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  className,
}) => (
  <div
    className={cn(
      "scroll-stack-card origin-top overflow-hidden border border-white/12 bg-[rgba(10,12,22,0.95)] backdrop-blur-md shadow-[0_12px_40px_-12px_rgba(0,0,0,0.85)] [will-change:transform,opacity]",
      className
    )}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d'
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  topOffset?: string;
  step?: number;
}

export const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className,
  topOffset = "16vh",
  step = 16,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(".scroll-stack-card", ref.current);
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        // Animate the card to scale down and fade out exactly as the next card covers it.
        gsap.to(card, {
          scale: 0.95 - (cards.length - 1 - i) * 0.015,
          opacity: 0.5,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top 25%", // Starts scaling as the next card approaches
            end: "top 17%",   // Finishes scaling as the next card overlaps
            scrub: true,
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("relative flex flex-col gap-6", className)}>
      {items.map((child, i) => (
        <div
          key={i}
          className="sticky"
          style={{ top: `calc(${topOffset} + ${i * step}px)` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default ScrollStack;

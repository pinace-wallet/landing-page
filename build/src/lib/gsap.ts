// Single place that registers GSAP plugins (AGENTS.md §5).
// Import { gsap, ScrollTrigger, useGSAP } from here — never register elsewhere.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// Signature easing — exponential ease-out (DESIGN.md). No bounce/elastic.
export const EASE = "expo.out";
export const EASE_REVEAL = "power4.out";

export { gsap, ScrollTrigger, useGSAP };

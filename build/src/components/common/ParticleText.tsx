"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

type Particle = { x: number; y: number; tx: number; ty: number; vx: number; vy: number; c: string };

/**
 * Magical particle headline (mirrors the reference's hero particle canvas),
 * rebuilt dep-free on 2D canvas. Text assembles from scattered particles and
 * repels the pointer. A visually-hidden real heading keeps it accessible/SEO-safe.
 */
export function ParticleText({
  text,
  className,
  heightRatio = 0.42,
  colors = ["#5aa6ff", "#a974ff", "#2ee6b6", "#2b8bff"],
  lineColors,
  align = "center",
}: {
  text: string;
  className?: string;
  heightRatio?: number;
  colors?: string[];
  lineColors?: string[][];
  align?: "left" | "center";
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999 };
    const reduced = prefersReducedMotion();

    function build() {
      const w = wrap!.clientWidth;
      const h = Math.max(120, Math.round(w * heightRatio));
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // draw text to sample
      ctx!.clearRect(0, 0, w, h);
      const lines = text.split("\n");
      const longest = lines.reduce((max, line) => Math.max(max, line.length), 1);
      const fontSize = Math.min(w / (longest * 0.52), h / (lines.length * 1.05));
      const lineHeight = fontSize * 0.95;
      const firstY = h / 2 - ((lines.length - 1) * lineHeight) / 2;
      ctx!.fillStyle = "#fff";
      ctx!.textAlign = align;
      ctx!.textBaseline = "middle";
      ctx!.font = `600 ${fontSize}px "Clash Display", sans-serif`;
      lines.forEach((line, index) => {
        ctx!.fillText(line, align === "left" ? 0 : w / 2, firstY + index * lineHeight);
      });

      const img = ctx!.getImageData(0, 0, w * dpr, h * dpr).data;
      ctx!.clearRect(0, 0, w, h);
      const gap = Math.max(3, Math.round(4 * dpr));
      const next: Particle[] = [];
      for (let y = 0; y < h * dpr; y += gap) {
        for (let x = 0; x < w * dpr; x += gap) {
          const alpha = img[(y * w * dpr + x) * 4 + 3];
          if (alpha > 128) {
            const tx = x / dpr;
            const ty = y / dpr;
            const lineIndex = Math.max(0, Math.min(lines.length - 1, Math.round((ty - firstY) / lineHeight)));
            const palette = lineColors?.[lineIndex] || colors;
            next.push({
              x: reduced ? tx : Math.random() * w,
              y: reduced ? ty : Math.random() * h,
              tx,
              ty,
              vx: 0,
              vy: 0,
              c: palette[((x / dpr) / w * palette.length) | 0] || palette[0] || "#ffffff",
            });
          }
        }
      }
      particles = next;
    }

    function frame() {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      ctx!.clearRect(0, 0, w, h);
      for (const p of particles) {
        // spring to target
        p.vx += (p.tx - p.x) * 0.06;
        p.vy += (p.ty - p.y) * 0.06;
        // pointer repulsion
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 2600) {
          const f = (2600 - d2) / 2600;
          const d = Math.sqrt(d2) || 1;
          p.vx += (dx / d) * f * 4;
          p.vy += (dy / d) * f * 4;
        }
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;
        ctx!.fillStyle = p.c;
        ctx!.fillRect(p.x, p.y, 1.6, 1.6);
      }
      raf = requestAnimationFrame(frame);
    }

    let resizeT: number;
    const onResize = () => {
      window.clearTimeout(resizeT);
      resizeT = window.setTimeout(build, 200);
    };
    const onMove = (e: PointerEvent) => {
      const r = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    // wait for the display font, then build + animate
    const start = () => {
      build();
      if (reduced) {
        // draw once, static
        ctx!.clearRect(0, 0, canvas!.clientWidth, canvas!.clientHeight);
        for (const p of particles) {
          ctx!.fillStyle = p.c;
          ctx!.fillRect(p.tx, p.ty, 1.6, 1.6);
        }
      } else {
        raf = requestAnimationFrame(frame);
      }
    };
    if (document.fonts && "ready" in document.fonts) {
      document.fonts.load('600 48px "Clash Display"').then(start).catch(start);
    } else {
      start();
    }

    window.addEventListener("resize", onResize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeT);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [text, heightRatio, colors, lineColors, align]);

  return (
    <div ref={wrapRef} className={className}>
      <span className="sr-only">{text}</span>
      <canvas ref={canvasRef} aria-hidden className="block w-full" />
    </div>
  );
}

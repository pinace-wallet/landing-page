import { cn } from "@/lib/utils";

const toneMap = {
  blue: "bg-pinace-blue",
  teal: "bg-pinace-teal",
  pink: "bg-pinace-pink",
  violet: "bg-pinace-violet",
  amber: "bg-pinace-amber",
} as const;

/**
 * Deliberate branded kicker (dot + mono label) used as a consistent system —
 * not a per-section uppercase eyebrow (which Impeccable flags as AI grammar).
 */
export function SectionKicker({
  children,
  tone = "blue",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof toneMap;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "onchain inline-flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.18em] text-white/55",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", toneMap[tone])} />
      {children}
    </span>
  );
}

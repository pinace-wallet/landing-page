import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-heading inline-flex items-baseline gap-2 text-[24px] font-semibold tracking-[-0.035em] text-white",
        className,
      )}
    >
      <span>Pinace</span>
      <span className="text-white/68">Wallet</span>
    </span>
  );
}

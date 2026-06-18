import { cn } from "@/lib/utils";

/** Shared max-width container (AGENTS.md §4). Define once, reuse everywhere. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

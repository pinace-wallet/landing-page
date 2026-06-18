import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/brand/pinace-logo.svg"
        alt="Pinace logo"
        width={28}
        height={28}
        className="rounded-[8px]"
        priority
      />
      {showWordmark && (
        <span className="font-heading text-lg font-semibold tracking-tight text-white">
          Pinace
        </span>
      )}
    </span>
  );
}

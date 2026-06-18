import { cn } from "@/lib/utils";
import { Container } from "./Container";

/** Shared section shell with consistent vertical rhythm (AGENTS.md §4). */
export function Section({
  id,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-[clamp(4rem,9vw,8rem)]",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

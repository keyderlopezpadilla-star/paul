import { cn } from "@/lib/utils";

/**
 * Small uppercase label used above section headings.
 */
export function Eyebrow({
  children,
  className,
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em]",
        dark ? "text-accent-400" : "text-accent-600",
        className,
      )}
    >
      <span className={cn("h-px w-8", dark ? "bg-accent-400/50" : "bg-accent-600/40")} />
      {children}
    </span>
  );
}

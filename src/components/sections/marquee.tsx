/**
 * Infinite, CSS-driven marquee of partner names. Duplicated track for a
 * seamless loop; pauses on hover.
 */
export function Marquee({ partners }: { partners: string[] }) {
  const items = [...partners, ...partners];
  return (
    <section className="border-y border-forest-900/10 bg-paper py-8" aria-label="Colaboradores">
      <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div
          className="flex shrink-0 animate-marquee items-center gap-16 pr-16 group-hover:[animation-play-state:paused]"
          style={{ ["--marquee-duration" as string]: "38s" }}
        >
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap font-display text-xl font-medium tracking-tight text-forest-900/35 transition-colors hover:text-forest-900/70"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

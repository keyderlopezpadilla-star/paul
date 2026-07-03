import Image from "next/image";
import type { PublicPartner } from "@/lib/data";

/**
 * Infinite, CSS-driven marquee of partners. Shows the logo when available,
 * otherwise the name. Duplicated track for a seamless loop; pauses on hover.
 */
export function Marquee({ partners }: { partners: PublicPartner[] }) {
  if (partners.length === 0) return null;
  const items = [...partners, ...partners];
  return (
    <section className="border-y border-forest-900/10 bg-paper py-8" aria-label="Colaboradores">
      <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div
          className="flex shrink-0 animate-marquee items-center gap-16 pr-16 group-hover:[animation-play-state:paused]"
          style={{ ["--marquee-duration" as string]: "38s" }}
        >
          {items.map((partner, i) =>
            partner.logo ? (
              <Image
                key={`${partner.name}-${i}`}
                src={partner.logo}
                alt={partner.name}
                width={140}
                height={44}
                className="h-11 w-auto object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-90 hover:grayscale-0"
              />
            ) : (
              <span
                key={`${partner.name}-${i}`}
                className="whitespace-nowrap font-display text-xl font-medium tracking-tight text-forest-900/35 transition-colors hover:text-forest-900/70"
              >
                {partner.name}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

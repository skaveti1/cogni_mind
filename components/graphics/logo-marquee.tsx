import Image from "next/image";
import type { Brand } from "@/lib/content";

function Row({ brands, copy }: { brands: readonly Brand[]; copy: number }) {
  return (
    <ul className="marquee-list" data-copy={copy} aria-hidden={copy === 1}>
      {brands.map((brand) => (
        <li key={brand.name} className="marquee-item">
          {brand.logo ? (
            <Image
              src={brand.logo}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 rounded-[5px] object-contain"
            />
          ) : (
            <span className="marquee-mono" aria-hidden="true">
              {brand.name.slice(0, 2).toUpperCase()}
            </span>
          )}
          <span className="font-mono text-sm uppercase tracking-[0.14em] text-ink-soft">
            {brand.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function LogoMarquee({ brands }: { brands: readonly Brand[] }) {
  return (
    <>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <Row brands={brands} copy={0} />
          <Row brands={brands} copy={1} />
        </div>
      </div>

      <ul className="sr-only">
        {brands.map((brand) => (
          <li key={brand.name}>{brand.name}</li>
        ))}
      </ul>
    </>
  );
}

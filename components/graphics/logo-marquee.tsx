import Image from "next/image";
import type { Brand } from "@/lib/content";

type MarqueeTone = "default" | "onDark";

function Row({
  brands,
  copy,
  tone,
}: {
  brands: readonly Brand[];
  copy: number;
  tone: MarqueeTone;
}) {
  return (
    <ul className="marquee-list" data-copy={copy} aria-hidden={copy === 1}>
      {brands.map((brand) => (
        <li key={brand.name} className="marquee-item">
          {brand.logo ? (
            <Image
              src={
                tone === "onDark"
                  ? brand.logoWhite ?? brand.logo
                  : brand.logo
              }
              alt=""
              width={80}
              height={32}
              className="h-8 w-auto max-w-[10rem] object-contain"
            />
          ) : (
            <span className="marquee-mono" aria-hidden="true">
              {brand.name.slice(0, 2).toUpperCase()}
            </span>
          )}
          <span
            className={`font-mono text-sm uppercase tracking-[0.14em] ${
              tone === "onDark" ? "text-white/75" : "text-ink-soft"
            }`}
          >
            {brand.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function LogoMarquee({
  brands,
  tone = "default",
}: {
  brands: readonly Brand[];
  tone?: MarqueeTone;
}) {
  return (
    <>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <Row brands={brands} copy={0} tone={tone} />
          <Row brands={brands} copy={1} tone={tone} />
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

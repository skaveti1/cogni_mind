import { Button, Scene } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { TableMerge } from "@/components/graphics/table-merge";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <Scene id="top" tone="solid" className="scene-hero">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="text-center lg:text-left">
          <Reveal direction="none">
            <p className="font-sans text-base font-bold uppercase tracking-[0.04em] text-gold sm:text-lg md:text-xl">
              {hero.eyebrow}
            </p>
          </Reveal>

          <Reveal>
            <h1 className="mt-4 font-serif text-[2.15rem] leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl md:text-[2.9rem]">
              {hero.title}
            </h1>
          </Reveal>

          <Reveal delay={80}>
            <p className="mx-auto mt-3 font-serif text-lg italic leading-snug text-ink-soft sm:text-lg lg:mx-0">
              {hero.statement}
            </p>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-2 max-w-xl text-[0.9rem] leading-relaxed text-muted sm:text-[0.95rem] lg:mx-0">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
              {hero.actions.map((action) => (
                <Button key={action.label} href={action.href} variant={action.variant}>
                  {action.label}
                </Button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mx-auto w-full max-w-[320px] lg:max-w-[380px]">
          <Reveal direction="none">
            <TableMerge />
          </Reveal>
        </div>
      </div>
    </Scene>
  );
}

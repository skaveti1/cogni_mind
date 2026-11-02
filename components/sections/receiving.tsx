import Image from "next/image";
import { Eyebrow, Scene, SectionTitle } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { TableMerge } from "@/components/graphics/table-merge";
import { receiving } from "@/lib/content";

export function Receiving() {
  return (
    <Scene id="receiving" tone="media">
      <Reveal>
        <div className="max-w-3xl">
          <Eyebrow>{receiving.eyebrow}</Eyebrow>
          <SectionTitle>{receiving.title}</SectionTitle>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            {receiving.body}
          </p>
        </div>
      </Reveal>

      <Reveal delay={140} className="mt-10">
        <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <div className="mx-auto w-full max-w-[320px]">
            <TableMerge />
            <p className="mt-3 text-center font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/60">
              Every source, one table
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-line shadow-[0_1px_2px_rgba(0,0,0,0.2),0_30px_60px_-30px_rgba(0,0,0,0.6)]">
            <Image
              src={receiving.image}
              alt={receiving.imageAlt}
              width={1512}
              height={726}
              className="h-auto w-full"
            />
          </div>
        </div>
      </Reveal>
    </Scene>
  );
}

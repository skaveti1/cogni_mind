import { Eyebrow, Scene, SectionTitle } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { problem } from "@/lib/content";

export function Problem() {
  return (
    <Scene id="problem" tone="raised">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow index="02">{problem.eyebrow}</Eyebrow>
          <SectionTitle>{problem.title}</SectionTitle>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {problem.lead}
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-14">
        {problem.columns.map((column, index) => (
          <Reveal
            key={column.label}
            direction={index === 0 ? "left" : "right"}
            delay={index * 80}
          >
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
              {column.label}
            </h3>
            <ul className="mt-6 space-y-4">
              {column.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3.5 text-[0.95rem] leading-relaxed text-ink-soft"
                >
                  <span
                    aria-hidden="true"
                    className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                      column.tone === "warn" ? "bg-amber" : "bg-ink/30"
                    }`}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Scene>
  );
}

import type { CSSProperties } from "react";
import Image from "next/image";
import { Eyebrow, Scene, SectionTitle } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { team } from "@/lib/content";

export function Team() {
  return (
    <Scene id="team" tone="solid">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow index="07">{team.eyebrow}</Eyebrow>
          <SectionTitle>{team.title}</SectionTitle>
        </div>
      </Reveal>

      <Stagger className="mt-14 grid gap-8 md:grid-cols-2">
        {team.members.map((member, index) => (
          <article
            key={member.name}
            className="stagger-item lift overflow-hidden rounded-2xl border border-line bg-surface"
            style={{ "--i": index } as CSSProperties}
          >
            <div className="flex items-center gap-5 border-b border-line p-7">
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={80}
                  height={80}
                  className="h-20 w-20 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-accent-soft font-serif text-2xl text-accent"
                  aria-hidden="true"
                >
                  {member.initials}
                </span>
              )}
              <div>
                <h3 className="font-serif text-2xl text-ink">{member.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {member.role}
                </p>
              </div>
            </div>

            <ul className="space-y-3.5 p-7">
              {member.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3.5 text-[0.95rem] leading-relaxed text-ink-soft"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </Stagger>
    </Scene>
  );
}

import { Eyebrow, Scene, SectionTitle } from "@/components/ui";
import { SceneBackdrop } from "@/components/background/scene-backdrop";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { contact } from "@/lib/content";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <Scene
      id="contact"
      tone="media"
      backdrop={<SceneBackdrop src="/scenes/parts.jpg" />}
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow index="04">{contact.eyebrow}</Eyebrow>
          <SectionTitle>{contact.title}</SectionTitle>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
            {contact.body}
          </p>

          <dl className="mt-10 max-w-md space-y-5">
            {contact.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-baseline gap-4 border-b border-line pb-5"
              >
                <dt className="w-16 shrink-0 font-serif text-3xl text-ink">
                  {stat.value}
                </dt>
                <dd className="text-sm leading-relaxed text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-sm text-muted">{contact.emailLabel}</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-1 inline-block font-medium text-accent transition-colors hover:text-accent-hover"
          >
            {site.email}
          </a>
        </Reveal>

        <Reveal direction="right" delay={100}>
          <div className="theme-light">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Scene>
  );
}

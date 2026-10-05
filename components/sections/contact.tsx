import { Eyebrow, Scene, SectionTitle } from "@/components/ui";
import { SceneBackdrop } from "@/components/background/scene-backdrop";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { LogoMarquee } from "@/components/graphics/logo-marquee";
import { brands, contact } from "@/lib/content";
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

          <p className="mt-10 text-sm text-muted">{contact.emailLabel}</p>
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

      <Reveal delay={160} className="mt-16">
        <div className="rounded-2xl border border-line bg-black/30 px-5 py-6 backdrop-blur-md sm:px-8">
          <LogoMarquee brands={brands.items} tone="onDark" />
        </div>
      </Reveal>
    </Scene>
  );
}

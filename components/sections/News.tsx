import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { NEWS } from "@/data/news";

export function News() {
  return (
    <section className="bg-surface-2">
      <div className="container-page section-pad">
        <SectionHeading
          title="Новости ПИК"
          action={
            <ButtonLink href="/about" variant="outline">
              Все новости
            </ButtonLink>
          }
        />

        <div className="grid gap-4 lg:grid-cols-3 xl:gap-6">
          {NEWS.map((n, i) => (
            <Reveal key={n.slug} delay={i * 70}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-colors duration-300 hover:border-pik/40">
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-3">
                  <SafeImage
                    src={n.image}
                    alt={n.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <time className="text-xs font-semibold tracking-wide text-ink-3 uppercase">{n.date}</time>
                  <h3 className="mt-2.5 text-base leading-snug font-bold tracking-[-0.02em] text-ink transition-colors group-hover:text-pik md:text-lg">
                    {n.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-3">{n.excerpt}</p>
                  <span className="mt-auto pt-4 text-sm font-semibold text-pik">
                    Читать <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

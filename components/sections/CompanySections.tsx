import Image from "next/image";
import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { DIRECTIONS, COMPANY_STATS, SCHOOLS, INFRA_NUMBERS } from "@/data/company";

/** 4 направления деятельности */
export function Directions() {
  return (
    <section className="bg-surface-2">
      <div className="container-page section-pad">
        <SectionHeading
          title="Полный цикл: от проекта до заселённого двора"
          description="ПИК строит жильё, благоустраивает территории, возводит школы и сады и развивает коммерческую недвижимость."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
          {DIRECTIONS.map((d, i) => (
            <Reveal key={d.title} delay={i * 70}>
              <Link
                href={d.href}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-colors duration-300 hover:border-pik/40"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-surface-3">
                  <SafeImage
                    src={d.image}
                    alt={d.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base leading-snug font-bold tracking-[-0.02em] text-ink transition-colors group-hover:text-pik">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-3">{d.description}</p>
                  <span className="mt-4 text-sm font-semibold text-pik opacity-0 transition-opacity group-hover:opacity-100">
                    Подробнее →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Цифры компании */}
        <div className="mt-6 grid gap-4 rounded-[var(--radius-card)] border border-line bg-white p-6 sm:grid-cols-2 lg:grid-cols-5 md:p-8">
          {COMPANY_STATS.map((s) => (
            <div key={s.label} className="px-2 py-2">
              <p className="text-[1.75rem] leading-none font-bold tracking-[-0.03em] text-pik md:text-[2rem]">
                {s.value}
              </p>
              <p className="mt-2 text-sm leading-snug text-ink-3">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Социальная инфраструктура: цифры + школы */
export function Infrastructure() {
  return (
    <section id="infrastruktura" className="container-page section-pad scroll-mt-24">
      <SectionHeading
        title="Школы и сады — внутри квартала"
        description="ПИК строит объекты социальной инфраструктуры и передаёт их регионам. Более 170 объектов уже работают, более 200 находятся в работе."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {INFRA_NUMBERS.map((n) => (
          <div key={n.label} className="rounded-[var(--radius-card)] bg-surface-2 p-5 md:p-6">
            <p className="text-3xl leading-none font-bold tracking-[-0.03em] text-ink md:text-[2.5rem]">
              {n.value}
            </p>
            <p className="mt-2 text-sm text-ink-3">{n.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
        {SCHOOLS.map((s, i) => (
          <Reveal key={s.title} delay={i * 70}>
            <article className="group h-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-colors duration-300 hover:border-pik/40">
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-3">
                <SafeImage
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base leading-snug font-bold tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-3">{s.text}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Баннер */}
      <div className="relative mt-6 overflow-hidden rounded-[var(--radius-card)] bg-ink">
        <Image
          src="/media/content/social.jpg"
          alt="Благоустройство кварталов ПИК"
          fill
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="relative flex flex-col items-start gap-4 p-7 md:flex-row md:items-end md:justify-between md:p-12">
          <div className="max-w-xl">
            <h3 className="headline text-[1.75rem] text-white md:text-[2.5rem]">
              Дворы, в которые хочется возвращаться
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70 md:text-base">
              Прогулочные аллеи без машин, площадки для каждого возраста, спортзоны и озеленение по
              авторским проектам ландшафтных архитекторов.
            </p>
          </div>
          <a
            href="/about#infrastruktura"
            className="inline-flex h-12 shrink-0 items-center rounded-2xl bg-white px-6 text-sm font-semibold text-ink transition-colors hover:bg-pik hover:text-white"
          >
            Узнать больше
          </a>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CallbackForm } from "@/components/CallbackForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  COMPANY_DOCUMENTS,
  COMPANY_STATS,
  DIRECTIONS,
  HISTORY,
  INFRA_NUMBERS,
  SCHOOLS,
} from "@/data/company";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "ПИК — крупнейший девелопер России: более 150 жилых кварталов в 13 регионах, 37 млн м² введённой площади, более 650 тысяч семей. История с 1994 года.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Герой */}
      <section className="relative overflow-hidden bg-ink">
        <Image
          src="/media/company/hero.jpg"
          alt="Жилые кварталы ПИК"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="container-page relative py-16 md:py-24">
          <div className="max-w-3xl text-white">
            <h1 className="headline text-[2.5rem] leading-[1.03] md:text-[4rem]">
              Строим кварталы,
              <br />в которые хочется возвращаться
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              ПИК — крупнейший девелопер России. С 1994 года мы прошли путь от ипотечной компании до
              группы, которая вводит жильё, благоустраивает территории и строит школы с садами.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
              {COMPANY_STATS.map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/8 p-4 backdrop-blur">
                  <p className="text-xl leading-none font-bold tracking-[-0.03em] text-pik md:text-2xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-xs leading-snug text-white/70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Направления */}
      <section id="napravleniya" className="container-page section-pad scroll-mt-24">
        <SectionHeading
          title="Полный цикл девелопмента"
          description="Проектируем, строим, благоустраиваем и эксплуатируем — от первой линии квартала до детского сада во дворе."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
          {DIRECTIONS.map((d, i) => (
            <Reveal key={d.title} delay={i * 70}>
              <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
                <div className="relative aspect-[4/5] bg-surface-3">
                  <SafeImage
                    src={d.image}
                    alt={d.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base leading-snug font-bold tracking-[-0.02em]">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-3">{d.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* История */}
      <section id="istoriya" className="bg-surface-2">
        <div className="container-page section-pad scroll-mt-24">
          <SectionHeading
            title="От 1994 года до сегодня"
            description="Три десятилетия развития: от первой ипотечной компании до крупнейшего застройщика страны."
          />

          <ol className="relative grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            <span
              className="absolute top-[9px] right-0 left-0 hidden h-px bg-line-strong lg:block"
              aria-hidden="true"
            />
            {HISTORY.map((h, i) => (
              <Reveal key={h.year} delay={i * 60}>
                <li className="relative h-full lg:pr-4">
                  <span
                    className="relative z-10 mb-4 block h-[18px] w-[18px] rounded-full border-[5px] border-pik bg-white"
                    aria-hidden="true"
                  />
                  <p className="text-2xl leading-none font-bold tracking-[-0.03em] text-pik">{h.year}</p>
                  <h3 className="mt-2 text-sm leading-snug font-bold text-ink">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-3">{h.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Инфраструктура */}
      <section id="infrastruktura" className="container-page section-pad scroll-mt-24">
        <SectionHeading
          title="Школы, сады и поликлиники"
          description="ПИК передаёт объекты социальной инфраструктуры регионам. Уже работают более 170 объектов, ещё более 200 — в работе."
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
              <article className="h-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
                <div className="relative aspect-[4/3] bg-surface-3">
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

        <div className="relative mt-6 overflow-hidden rounded-[var(--radius-card)] bg-ink">
          <Image
            src="/media/content/banner-salarevo.jpg"
            alt="Благоустройство кварталов ПИК"
            fill
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div className="relative flex flex-col items-start gap-5 p-7 md:flex-row md:items-end md:justify-between md:p-12">
            <div className="max-w-xl">
              <h3 className="headline text-[1.75rem] text-white md:text-[2.5rem]">
                Благоустройство по авторским проектам
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70 md:text-base">
                Дворы без машин, прогулочные аллеи, площадки для всех возрастов и многоуровневое
                озеленение — в каждом квартале ПИК.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex h-12 shrink-0 items-center rounded-2xl bg-white px-6 text-sm font-semibold text-ink transition-colors hover:bg-pik hover:text-white"
            >
              Смотреть проекты
            </Link>
          </div>
        </div>
      </section>

      {/* Документы */}
      <section id="dokumenty" className="bg-surface-2">
        <div className="container-page section-pad scroll-mt-24">
          <SectionHeading title="Документы и раскрытие информации" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {COMPANY_DOCUMENTS.map((d) => (
              <a
                key={d.title}
                href="https://наш.дом.рф"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-[var(--radius-card)] border border-line bg-white p-5 transition-colors hover:border-pik/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-ink-2 transition-colors group-hover:bg-pik-soft group-hover:text-pik">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path d="M14 3v5h5M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="mt-6 block">
                  <span className="block text-sm font-bold text-ink transition-colors group-hover:text-pik">
                    {d.title}
                  </span>
                  <span className="mt-1 block text-xs text-ink-3">{d.note}</span>
                </span>
              </a>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-ink-3">{SITE.legal}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page section-pad">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="headline text-[2rem] md:text-[2.75rem]">Хотите жить в квартале ПИК?</h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-3">
              Оставьте номер — подберём квартиру под ваш бюджет, покажем планировки и рассчитаем
              ипотеку. Бесплатно по всей России.
            </p>
            <a
              href={SITE.phoneHref}
              className="mt-6 inline-block text-2xl font-bold tracking-[-0.02em] text-ink hover:text-pik"
            >
              {SITE.phone}
            </a>
          </div>
          <CallbackForm title="Свяжитесь с нами" subtitle="Ответим на вопросы о проектах и условиях покупки." />
        </div>
      </section>
    </>
  );
}

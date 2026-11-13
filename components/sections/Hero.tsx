import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { HeroVideoShow } from "@/components/sections/HeroVideoShow";
import { FEATURED_PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";

const QUICK_LINKS = [
  { label: "Студии", href: "/projects?klass=studio" },
  { label: "1-комнатные", href: "/projects?klass=1" },
  { label: "2-комнатные", href: "/projects?klass=2" },
  { label: "3-комнатные", href: "/projects?klass=3" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/* Фоновое видео-слайд-шоу (без звука, кроссфейд) */}
      <HeroVideoShow poster={FEATURED_PROJECTS[0].images[0]} />
      {/* Скрим для читаемости текста */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
      </div>

      <div className="container-page relative">
        <div className="flex min-h-[85svh] items-center py-16 md:py-20">
          {/* Текст */}
          <div className="animate-fade-up max-w-2xl">
            <h1 className="headline text-[2.5rem] leading-[1.02] text-white sm:text-[3.25rem] lg:text-[4rem]">
              Квартиры
              <br />
              в новостройках
              <br />
              <span className="text-pik">от ПИК</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
              Более 150 жилых кварталов с благоустроенными дворами без машин, детскими садами и
              школами рядом. Отделка от застройщика и ипотека от 5%.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/projects" size="lg">
                Выбрать квартиру
              </ButtonLink>
              <Link
                href="/mortgage"
                className="inline-flex h-[52px] items-center rounded-2xl border border-white/30 px-7 text-base font-semibold text-white backdrop-blur transition-colors hover:border-white hover:bg-white hover:text-ink"
              >
                Рассчитать ипотеку
              </Link>
            </div>

            {/* Быстрый выбор */}
            <div className="mt-9 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-sm text-white/60">Квартиры:</span>
              {QUICK_LINKS.map((q) => (
                <Link
                  key={q.href}
                  href={q.href}
                  className="rounded-xl border border-white/25 px-3.5 py-2 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white hover:bg-white hover:text-ink"
                >
                  {q.label}
                </Link>
              ))}
            </div>

            <p className="mt-7 flex items-center gap-2 text-sm text-white/60">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6.6 3.5h3l1.5 4-2 1.4a12 12 0 0 0 6 6l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
              Бесплатно по России:{" "}
              <a href={SITE.phoneHref} className="font-semibold text-white hover:text-pik">
                {SITE.phone}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Бегущая строка фактов */}
      <div className="relative border-t border-line bg-white">
        <div className="container-page">
          <dl className="grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
            {[
              ["37 млн м²", "введено жилья"],
              ["650 тыс.", "семей живут в домах ПИК"],
              ["170+", "объектов инфраструктуры"],
              ["с 1994", "года на рынке"],
            ].map(([value, label], i) => (
              <div key={label} className={`px-4 py-5 md:px-8 ${i < 2 ? "border-b border-line md:border-b-0" : ""}`}>
                <dt className="text-xl font-bold tracking-[-0.02em] text-ink md:text-2xl">{value}</dt>
                <dd className="mt-1 text-xs text-ink-3 md:text-sm">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

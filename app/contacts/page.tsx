import type { Metadata } from "next";
import { CallbackForm } from "@/components/CallbackForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Контакты — отделы продаж ПИК",
  description:
    "Контакты ПИК: бесплатный телефон 8 800 500-00-20, офис на Баррикадной 19, адреса отделов продаж в жилых кварталах, обратная связь.",
  alternates: { canonical: "/contacts" },
};

/** Отделы продаж — курируемая выборка проектов */
const SALES_OFFICES = projects
  .filter((p) =>
    [
      "strogino-360", "ilinskie-luga", "kvartal-mit", "lyublinskiy-park",
      "matveevskiy-park", "yauza-park", "kavkazskiy-bulvar-51", "kronshtadtskiy-9",
    ].includes(p.slug),
  )
  .map((p) => ({
    slug: p.slug,
    name: p.name,
    location: p.location,
    metro: p.metro,
    walkMin: p.walkMin,
    schedule: "Ежедневно 9:00 — 21:00",
  }));

const CONTACT_CHANNELS = [
  {
    title: "Единый номер",
    value: SITE.phone,
    href: SITE.phoneHref,
    note: "Бесплатно по России, ежедневно 9:00 — 21:00",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6.6 3.5h3l1.5 4-2 1.4a12 12 0 0 0 6 6l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Москва",
    value: SITE.phoneMoscow,
    href: SITE.phoneMoscowHref,
    note: "Многоканальный, ежедневно 9:00 — 21:00",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 20V9l8-5 8 5v11" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Обратная связь",
    value: SITE.email,
    href: SITE.emailHref,
    note: "Форма на сайте — ответим в течение дня",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Для прессы",
    value: SITE.pressEmail,
    href: `mailto:${SITE.pressEmail}`,
    note: "Медиа-запросы и комментарии экспертов",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 6h13v12H6a2 2 0 0 1-2-2V6Zm13 3h3a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-3M7 9h7M7 12h7M7 15h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function ContactsPage() {
  return (
    <>
      {/* Заголовок */}
      <div className="border-b border-line bg-surface-2">
        <div className="container-page py-12 md:py-16">
          <h1 className="headline text-[2.25rem] md:text-[3.5rem]">Свяжитесь с ПИК</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-3 md:text-lg">
            Единый бесплатный номер, офис на Баррикадной и отделы продаж в жилых кварталах —
            выберите удобный способ связи.
          </p>
        </div>
      </div>

      {/* Каналы связи */}
      <section className="container-page section-pad">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
          {CONTACT_CHANNELS.map((c, i) => (
            <Reveal key={c.title} delay={i * 60}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 transition-colors duration-300 hover:border-pik/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-pik-soft text-pik">
                  {c.icon}
                </span>
                <span className="mt-5 block text-sm text-ink-3">{c.title}</span>
                <span className="mt-1 block text-lg font-bold tracking-[-0.02em] text-ink transition-colors group-hover:text-pik">
                  {c.value}
                </span>
                <span className="mt-2 block text-xs leading-relaxed text-ink-3">{c.note}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Офис + карта-заглушка */}
      <section className="bg-surface-2">
        <div className="container-page section-pad">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[var(--radius-card)] border border-line bg-white p-6 md:p-8">
              <SectionHeading title="ПАО «ПИК СЗ»" />
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="text-ink-3">Адрес</dt>
                  <dd className="mt-1 text-base leading-relaxed font-semibold text-ink">{SITE.address}</dd>
                </div>
                <div>
                  <dt className="text-ink-3">Телефон</dt>
                  <dd className="mt-1">
                    <a href={SITE.phoneHref} className="text-base font-semibold text-ink hover:text-pik">
                      {SITE.phone}
                    </a>
                    <span className="ml-2 text-ink-3">/</span>
                    <a
                      href={SITE.phoneMoscowHref}
                      className="ml-2 text-base font-semibold text-ink hover:text-pik"
                    >
                      {SITE.phoneMoscow}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-3">Реквизиты</dt>
                  <dd className="mt-1 text-base font-semibold text-ink">{SITE.copyright}</dd>
                </div>
                <div>
                  <dt className="text-ink-3">Карьера в ПИК</dt>
                  <dd className="mt-1">
                    <a
                      href={SITE.jobHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-pik hover:opacity-75"
                    >
                      {SITE.job} →
                    </a>
                  </dd>
                </div>
              </dl>

              {/* Схематичная «карта» */}
              <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface-2">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-white px-6 py-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pik text-white">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                        <circle cx="12" cy="10" r="2.4" fill="currentColor" />
                      </svg>
                    </span>
                    <p className="text-sm font-bold text-ink">ул. Баррикадная, 19с1</p>
                    <p className="text-xs text-ink-3">м. Баррикадная · 7 минут пешком</p>
                  </div>
                </div>
              </div>
            </div>

            <CallbackForm
              title="Напишите нам"
              subtitle="Ответим на вопросы о проектах, условиях покупки и ипотеке."
            />
          </div>
        </div>
      </section>

      {/* Отделы продаж */}
      <section className="container-page section-pad">
        <SectionHeading
          title="Приезжайте в квартал"
          description="Отделы продаж работают ежедневно. Предварительная запись не обязательна, но поможет сэкономить время."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
          {SALES_OFFICES.map((o, i) => (
            <Reveal key={o.slug} delay={i * 50}>
              <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-5 transition-colors hover:border-pik/40">
                <h3 className="text-base leading-snug font-bold tracking-[-0.02em]">
                  <a href={`/projects/${o.slug}`} className="transition-colors hover:text-pik">
                    {o.name}
                  </a>
                </h3>
                <p className="mt-2 text-sm text-ink-3">{o.location}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
                    <rect x="5" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                  {o.metro} · {o.walkMin} мин
                </p>
                <p className="mt-auto pt-4 text-xs text-ink-3">{o.schedule}</p>
                <a
                  href={SITE.phoneHref}
                  className="mt-3 inline-flex h-10 items-center justify-center rounded-xl border border-line-strong text-sm font-semibold text-ink transition-colors hover:border-pik hover:bg-pik hover:text-white"
                >
                  Позвонить
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-ink-3">{SITE.legal}</p>
      </section>
    </>
  );
}

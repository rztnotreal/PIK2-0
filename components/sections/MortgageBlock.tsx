import { CallbackForm } from "@/components/CallbackForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MORTGAGE_PROGRAMS } from "@/data/mortgage";
import { REGIONS } from "@/data/site";
import Link from "next/link";

/** Ипотечный блок на главной: программы + заявка */
export function MortgageBlock() {
  return (
    <section className="bg-surface-2">
      <div className="container-page section-pad">
        <SectionHeading
          title="Программы с господдержкой"
          description="Семейная ипотека, IT-ипотека и специальные ставки от ПИК. Ставки и условия уточняйте в банках-партнёрах."
          action={
            <Link
              href="/mortgage"
              className="inline-flex h-12 items-center rounded-2xl border border-line-strong bg-white px-6 text-sm font-semibold text-ink transition-colors hover:border-ink"
            >
              Калькулятор →
            </Link>
          }
        />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Программы */}
          <div className="grid gap-3 sm:auto-rows-fr sm:grid-cols-2">
            {MORTGAGE_PROGRAMS.slice(0, 4).map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <Link
                  href={`/mortgage#${p.slug}`}
                  className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-5 transition-colors duration-300 hover:border-pik/40 md:p-6"
                >
                  <p className="text-[2.5rem] leading-none font-bold tracking-[-0.04em] text-pik">
                    от {p.rate}%
                  </p>
                  <h3 className="mt-3 text-base font-bold tracking-[-0.02em] text-ink transition-colors group-hover:text-pik">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-3">{p.description}</p>
                  <dl className="mt-auto flex gap-6 pt-4 text-xs text-ink-3">
                    <div>
                      <dt>Взнос от</dt>
                      <dd className="mt-0.5 font-bold text-ink">{p.downPayment}%</dd>
                    </div>
                    <div>
                      <dt>Срок до</dt>
                      <dd className="mt-0.5 font-bold text-ink">{p.termYears} лет</dd>
                    </div>
                  </dl>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Заявка */}
          <Reveal delay={120} className="h-full">
            <CallbackForm
              title="Подберём ипотеку"
              subtitle="Оставьте номер — менеджер рассчитает платёж и подскажет, какие программы вам подходят."
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Финальный CTA с картой регионов */
export function RegionsCta() {
  return (
    <section className="container-page section-pad">
      <div className="grid items-center gap-8 rounded-[28px] bg-ink p-7 text-white md:p-12 lg:grid-cols-2 lg:p-16">
        <div>
          <h2 className="headline text-[2rem] text-white md:text-[2.75rem]">
            Строим в {REGIONS.length} регионах России
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/65 md:text-base">
            От Санкт-Петербурга до Владивостока: каждый квартал ПИК — с благоустройством, детскими
            садами и школами рядом.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex h-[52px] items-center rounded-2xl bg-pik px-7 text-base font-semibold text-white transition-colors hover:bg-pik-dark"
            >
              Выбрать квартиру
            </Link>
            <Link
              href="/contacts"
              className="inline-flex h-[52px] items-center rounded-2xl border border-white/20 px-7 text-base font-semibold text-white transition-colors hover:border-white"
            >
              Отделы продаж
            </Link>
          </div>
        </div>

        {/* Регионы присутствия */}
        <div className="flex flex-col overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03] p-7 md:p-10">
          <p className="text-[3rem] leading-none font-bold tracking-[-0.04em] text-white md:text-[4.5rem]">
            {REGIONS.length}
          </p>
          <p className="mt-2 text-sm font-semibold tracking-wide text-white/50 uppercase">
            регионов присутствия
          </p>
          <ul className="mt-7 grid flex-1 grid-cols-1 gap-x-8 gap-y-2.5 border-t border-white/10 pt-7 text-sm text-white/70 sm:grid-cols-2">
            {REGIONS.map((r) => (
              <li key={r.name} className="truncate">
                {r.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

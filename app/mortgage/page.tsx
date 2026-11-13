import type { Metadata } from "next";
import { CallbackForm } from "@/components/CallbackForm";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MORTGAGE_DISCLAIMER, MORTGAGE_PROGRAMS } from "@/data/mortgage";

export const metadata: Metadata = {
  title: "Ипотека на новостройки — программы и расчёт платежа",
  description:
    "Ипотечные программы ПИК: семейная ипотека, IT-ипотека, льготная ставка на первые 2 года. Онлайн-калькулятор платежа и заявка в банки-партнёры.",
  alternates: { canonical: "/mortgage" },
};

const STEPS = [
  {
    n: "01",
    title: "Выбираете квартиру",
    text: "Подберите проект и планировку в каталоге или с менеджером отдела продаж.",
  },
  {
    n: "02",
    title: "Подаёте заявку",
    text: "Заявка уходит сразу в несколько банков-партнёров — шанс одобрения выше.",
  },
  {
    n: "03",
    title: "Получаете одобрение",
    text: "Банк рассматривает заявку и присылает индивидуальные условия по ставке.",
  },
  {
    n: "04",
    title: "Заключаете договор",
    text: "Подписываете ДДУ и кредитный договор, оформляете страховку и получаете ключи.",
  },
];

export default function MortgagePage() {
  return (
    <>
      {/* Заголовок */}
      <div className="border-b border-line bg-surface-2">
        <div className="container-page py-12 md:py-16">
          <h1 className="headline max-w-3xl text-[2.25rem] md:text-[3.5rem]">
            Ипотека на квартиру в новостройке
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-3 md:text-lg">
            Рассчитайте ежемесячный платёж и узнайте, какие льготные программы доступны. Заявка
            уходит сразу в несколько банков-партнёров ПИК.
          </p>
        </div>
      </div>

      {/* Калькулятор */}
      <section id="calc" className="container-page section-pad scroll-mt-24">
        <MortgageCalculator />
      </section>

      {/* Программы */}
      <section className="bg-surface-2">
        <div className="container-page section-pad">
          <SectionHeading
            title="Льготные и стандартные условия"
            description="Условия определяют банки-партнёры и государство. Ниже — обзор доступных программ."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:gap-6">
            {MORTGAGE_PROGRAMS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <article
                  id={p.slug}
                  className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 scroll-mt-24 md:p-8"
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl leading-snug font-bold tracking-[-0.02em]">{p.name}</h2>
                    <p>
                      <span className="block text-[2.25rem] leading-none font-bold tracking-[-0.04em] text-pik">
                        от {p.rate}%
                      </span>
                      <span className="mt-1 block text-xs text-ink-3">{p.rateNote}</span>
                    </p>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-ink-2">{p.description}</p>

                  <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5 text-center">
                    <div>
                      <dt className="text-xs text-ink-3">Взнос от</dt>
                      <dd className="mt-1 text-lg font-bold text-ink">{p.downPayment}%</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-ink-3">Срок до</dt>
                      <dd className="mt-1 text-lg font-bold text-ink">{p.termYears} лет</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-ink-3">Тип</dt>
                      <dd className="mt-1 text-lg font-bold text-ink">
                        {p.rate <= 6 ? "Льготная" : "Рыночная"}
                      </dd>
                    </div>
                  </dl>

                  <a
                    href="#calc"
                    className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-line-strong text-sm font-semibold text-ink transition-colors hover:border-pik hover:bg-pik hover:text-white"
                  >
                    Рассчитать платёж
                  </a>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-ink-3">{MORTGAGE_DISCLAIMER}</p>
        </div>
      </section>

      {/* Как оформить */}
      <section className="container-page section-pad">
        <SectionHeading title="4 шага до своих ключей" />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 60}>
              <li className="h-full rounded-[var(--radius-card)] border border-line bg-white p-6">
                <p className="text-[2.5rem] leading-none font-bold tracking-[-0.04em] text-pik/25">{s.n}</p>
                <h3 className="mt-4 text-base font-bold tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-3">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Заявка */}
      <section className="bg-surface-2">
        <div className="container-page section-pad">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="headline text-[2rem] md:text-[2.75rem]">
                Получите индивидуальный расчёт
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-3">
                Менеджер соберёт заявки в несколько банков, сравнит условия и поможет выбрать
                программу с минимальным платежом.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Ответ в течение 15 минут в рабочее время",
                  "Заявки сразу в несколько банков-партнёров",
                  "Помощь с документами и страхованием",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-ink-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pik-soft text-[11px] font-bold text-pik">
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <CallbackForm
              title="Заявка на ипотеку"
              subtitle="Перезвоним, уточним параметры и подберём лучшие условия."
            />
          </div>
        </div>
      </section>
    </>
  );
}

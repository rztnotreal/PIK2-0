"use client";

import { useMemo, useState } from "react";
import {
  CALCULATOR_DEFAULT_DOWN_SHARE,
  CALCULATOR_DEFAULT_PRICE,
  CALCULATOR_DEFAULT_RATE,
  CALCULATOR_DEFAULT_YEARS,
} from "@/data/mortgage";

/** Аннуитетный ежемесячный платёж */
export function annuityPayment(principal: number, annualRate: number, years: number): number {
  if (principal <= 0 || years <= 0) return 0;
  const r = annualRate / 1200;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

function formatRub(v: number): string {
  return `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.round(v))} ₽`;
}

const RATE_OPTIONS = [
  { rate: 5, label: "5%" },
  { rate: 6, label: "6%" },
  { rate: 16, label: "16%" },
];

export function MortgageCalculator() {
  const [price, setPrice] = useState(CALCULATOR_DEFAULT_PRICE);
  const [downShare, setDownShare] = useState(CALCULATOR_DEFAULT_DOWN_SHARE);
  const [rate, setRate] = useState(CALCULATOR_DEFAULT_RATE);
  const [years, setYears] = useState(CALCULATOR_DEFAULT_YEARS);

  const down = Math.round(price * downShare);
  const loan = Math.max(0, price - down);
  const monthly = useMemo(() => annuityPayment(loan, rate, years), [loan, rate, years]);
  const total = monthly * years * 12;

  const pricePct = ((price - 1_000_000) / (30_000_000 - 1_000_000)) * 100;
  const yearsPct = ((years - 5) / (30 - 5)) * 100;

  return (
    <div className="grid overflow-hidden rounded-[var(--radius-card)] border border-line bg-white lg:grid-cols-2">
      {/* Ввод */}
      <div className="space-y-7 p-6 md:p-8">
        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="calc-price" className="text-sm font-semibold text-ink-2">
              Стоимость квартиры
            </label>
            <output htmlFor="calc-price" className="text-lg font-bold tracking-[-0.02em] text-ink">
              {formatRub(price)}
            </output>
          </div>
          <input
            id="calc-price"
            type="range"
            min={1_000_000}
            max={30_000_000}
            step={100_000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-3 accent-pik"
          />
          <div className="mt-1.5 flex justify-between text-xs text-ink-3">
            <span>1 млн ₽</span>
            <span>30 млн ₽</span>
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="calc-down" className="text-sm font-semibold text-ink-2">
              Первоначальный взнос
            </label>
            <output htmlFor="calc-down" className="text-lg font-bold tracking-[-0.02em] text-ink">
              {formatRub(down)}{" "}
              <span className="text-sm font-semibold text-ink-3">({Math.round(downShare * 100)}%)</span>
            </output>
          </div>
          <input
            id="calc-down"
            type="range"
            min={0.15}
            max={0.9}
            step={0.05}
            value={downShare}
            onChange={(e) => setDownShare(Number(e.target.value))}
            className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-3 accent-pik"
          />
          <div className="mt-1.5 flex justify-between text-xs text-ink-3">
            <span>15%</span>
            <span>90%</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink-2">Процентная ставка</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {RATE_OPTIONS.map((o) => (
              <button
                key={o.rate}
                type="button"
                onClick={() => setRate(o.rate)}
                aria-pressed={rate === o.rate}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-all ${
                  rate === o.rate
                    ? "border-ink bg-ink text-white"
                    : "border-line-strong bg-white text-ink-2 hover:border-ink hover:text-ink"
                }`}
              >
                {o.label}
              </button>
            ))}
            <label className="flex items-center gap-2 rounded-xl border border-line-strong bg-white px-3">
              <input
                type="number"
                min={1}
                max={40}
                step={0.25}
                value={rate}
                onChange={(e) => setRate(Math.min(40, Math.max(1, Number(e.target.value) || 0)))}
                aria-label="Своя ставка, % годовых"
                className="h-10 w-16 bg-transparent text-sm font-semibold text-ink outline-none"
              />
              <span className="text-sm text-ink-3">% годовых</span>
            </label>
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="calc-years" className="text-sm font-semibold text-ink-2">
              Срок кредита
            </label>
            <output htmlFor="calc-years" className="text-lg font-bold tracking-[-0.02em] text-ink">
              {years} лет
            </output>
          </div>
          <input
            id="calc-years"
            type="range"
            min={5}
            max={30}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-3 accent-pik"
          />
          <div className="mt-1.5 flex justify-between text-xs text-ink-3">
            <span>5 лет</span>
            <span>30 лет</span>
          </div>
        </div>

        {/* Индикаторы прокрутки — визуальная подсказка */}
        <div className="space-y-1.5 pt-1" aria-hidden="true">
          <div className="h-1 rounded-full bg-surface-3">
            <div className="h-full rounded-full bg-pik transition-all" style={{ width: `${pricePct}%` }} />
          </div>
          <div className="h-1 rounded-full bg-surface-3">
            <div className="h-full rounded-full bg-ink transition-all" style={{ width: `${yearsPct}%` }} />
          </div>
        </div>
      </div>

      {/* Результат */}
      <div className="flex flex-col justify-between gap-6 bg-ink p-6 text-white md:p-8">
        <div>
          <p className="text-sm font-semibold tracking-[-0.01em] text-white/60">Ежемесячный платёж</p>
          <p className="mt-2 text-[2.75rem] leading-none font-bold tracking-[-0.04em] text-white md:text-[3.5rem]">
            {formatRub(monthly)}
          </p>

          <dl className="mt-8 space-y-3 border-t border-white/15 pt-6 text-sm">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-white/60">Сумма кредита</dt>
              <dd className="font-semibold">{formatRub(loan)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-white/60">Первоначальный взнос</dt>
              <dd className="font-semibold">{formatRub(down)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-white/60">Процентная ставка</dt>
              <dd className="font-semibold">{rate}%</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-white/60">Переплата за весь срок</dt>
              <dd className="font-semibold">{formatRub(total - loan)}</dd>
            </div>
          </dl>
        </div>

        <div>
          <a
            href="https://msg.pik.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[52px] w-full items-center justify-center rounded-2xl bg-pik px-7 text-base font-semibold text-white transition-colors hover:bg-pik-dark"
          >
            Заявка на ипотеку
          </a>
          <p className="mt-4 text-xs leading-relaxed text-white/45">
            Расчёт предварительный и носит информационный характер. Точные условия определяет
            банк-партнёр.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";

const AGREEMENT_HREF = "/about#dokumenty";

/** Маска телефона: +7 (999) 999-99-99 */
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").replace(/^8/, "7").slice(0, 11);
  const d = digits.startsWith("7") ? digits : `7${digits}`.slice(0, 11);
  const p = d.slice(1);
  let out = "+7";
  if (p.length) out += ` (${p.slice(0, 3)}`;
  if (p.length >= 3) out += `) ${p.slice(3, 6)}`;
  if (p.length >= 6) out += `-${p.slice(6, 8)}`;
  if (p.length >= 8) out += `-${p.slice(8, 10)}`;
  return out;
}

function isValidPhone(v: string) {
  return v.replace(/\D/g, "").length === 11;
}

export function CallbackForm({
  title = "Оставьте заявку",
  subtitle = "Перезвоним в течение 15 минут и подберём квартиру под ваш запрос.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValidPhone(phone)) {
      setError("Введите номер телефона полностью");
      return;
    }
    if (!consent) {
      setError("Необходимо согласие на обработку персональных данных");
      return;
    }
    setError(null);
    setSent(true);
  };

  if (sent) {
    return (
      <div
        className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-[var(--radius-card)] border border-success/25 bg-[#eaf7ef] p-8 text-center"
        role="status"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success text-2xl text-white">
          ✓
        </span>
        <p className="mt-5 text-xl font-bold text-ink">Заявка отправлена</p>
        <p className="mt-2 max-w-sm text-sm text-ink-3">
          Спасибо! Наш специалист свяжется с вами в ближайшее время.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 md:p-8"
    >
      <h3 className="headline text-2xl text-ink md:text-[1.75rem]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-3">{subtitle}</p>

      <div className="mt-6 flex flex-1 flex-col gap-3">
        <div>
          <label htmlFor="cf-name" className="sr-only">
            Ваше имя
          </label>
          <input
            id="cf-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
            autoComplete="name"
            className="h-[52px] w-full rounded-xl border border-line-strong bg-white px-4 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-pik"
          />
        </div>

        <div>
          <label htmlFor="cf-phone" className="sr-only">
            Телефон
          </label>
          <input
            id="cf-phone"
            type="tel"
            inputMode="tel"
            required
            value={phone}
            onChange={(e) => {
              setPhone(formatPhone(e.target.value));
              if (error) setError(null);
            }}
            placeholder="+7 (___) ___-__-__"
            autoComplete="tel"
            aria-invalid={Boolean(error)}
            className={`h-[52px] w-full rounded-xl border px-4 text-[0.95rem] outline-none transition-colors ${
              error && !isValidPhone(phone) ? "border-pik" : "border-line-strong"
            } bg-white text-ink placeholder:text-ink-3 focus:border-pik`}
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3 pt-1">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (error) setError(null);
            }}
            className="mt-0.5 h-4 w-4 shrink-0 accent-pik"
          />
          <span className="text-xs leading-relaxed text-ink-3">
            Согласен на обработку персональных данных и ознакомлен с{" "}
            <a
              href={AGREEMENT_HREF}
              className="text-ink-2 underline underline-offset-2 hover:text-pik"
            >
              политикой конфиденциальности
            </a>
          </span>
        </label>

        {error && (
          <p className="text-sm font-medium text-pik" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-auto h-[52px] w-full rounded-2xl bg-pik text-base font-semibold text-white transition-colors hover:bg-pik-dark active:scale-[0.99]"
        >
          Перезвоните мне
        </button>
      </div>
    </form>
  );
}

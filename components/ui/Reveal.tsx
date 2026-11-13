"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Плавное появление блока при прокрутке до него.
 *
 * Контент видим в SSR-разметке и без JS. Скрываем его только после того,
 * как клиент подтвердил поддержку IntersectionObserver, и только для блоков,
 * которые находятся ниже видимой области (чтобы не мигало на первом экране).
 * Если наблюдатель по какой-то причине не сработает, блок показываем по таймауту.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  // null — ещё не определено (показываем), true — видим, false — скрыт до появления
  const [visible, setVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;

    // Прячем только то, что изначально вне вьюпорта — пользователь не заметит.
    const rect = el.getBoundingClientRect();
    const belowFold = rect.top > window.innerHeight * 0.95;
    if (!belowFold) return;

    setVisible(false);

    const show = () => setVisible(true);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );
    io.observe(el);

    // Страховка: если IO не сработал (редкий баг, offscreen-редакторы и т.п.),
    // всё равно показываем контент, чтобы он не остался невидимым.
    const timer = setTimeout(show, 2500);

    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible === false ? "translate-y-5 opacity-0" : "translate-y-0 opacity-100"
      } ${className}`}
      style={delay && visible !== false ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { NAV, REGIONS, SITE } from "@/data/site";

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const [region, setRegion] = useState(REGIONS[0].name);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Закрываем мобильное меню при переходе по ссылке: слушаем клики по <a>,
  // не вызывая setState напрямую в теле эффекта.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a[href]")) {
        setMenuOpen(false);
        setRegionOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line bg-white/85 backdrop-blur-xl" : "border-b border-transparent bg-white"
      }`}
    >
      <div className="container-page">
        <div className="flex h-16 items-center gap-6 md:h-[72px]">
          {/* Логотип */}
          <Logo />

          {/* Основная навигация — desktop */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-lg px-3 py-2 text-[0.95rem] font-medium transition-colors ${
                  isActive(pathname, item.href) ? "text-pik" : "text-ink-2 hover:text-ink"
                }`}
              >
                {item.label}
                {isActive(pathname, item.href) && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-pik" />
                )}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            {/* Выбор региона */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setRegionOpen((v) => !v)}
                aria-expanded={regionOpen}
                className="flex max-w-[190px] items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-ink-3 transition-colors hover:bg-surface-2 hover:text-ink"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                <span className="truncate">{region}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              {regionOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Закрыть"
                    className="fixed inset-0 z-10 cursor-default"
                    onClick={() => setRegionOpen(false)}
                  />
                  <div className="animate-fade-in absolute right-0 z-20 mt-2 max-h-[360px] w-[260px] overflow-y-auto rounded-2xl border border-line-strong bg-white p-2">
                    {REGIONS.map((r) => (
                      <button
                        key={r.name}
                        type="button"
                        onClick={() => {
                          setRegion(r.name);
                          setRegionOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                          r.name === region ? "bg-pik-soft font-semibold text-pik" : "text-ink-2 hover:bg-surface-2"
                        }`}
                      >
                        {r.name}
                        {r.name === region && <span className="text-pik">✓</span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Телефон */}
            <a
              href={SITE.phoneHref}
              className="hidden items-center gap-2 rounded-xl px-3 py-2 text-[0.95rem] font-semibold text-ink transition-colors hover:bg-surface-2 xl:flex"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6.6 3.5h3l1.5 4-2 1.4a12 12 0 0 0 6 6l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
              {SITE.phone}
            </a>

            {/* CTA */}
            <ButtonLink href="/projects" size="sm" className="hidden md:inline-flex">
              Выбрать квартиру
            </ButtonLink>

            {/* Бургер */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-ink transition-colors hover:bg-surface-2 lg:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                    menuOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute top-1.5 left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                    menuOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="animate-fade-in fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-white lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-5" aria-label="Мобильная навигация">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl px-4 py-3.5 text-lg font-semibold transition-colors ${
                  isActive(pathname, item.href) ? "bg-pik-soft text-pik" : "text-ink hover:bg-surface-2"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-4 border-t border-line pt-4">
              <p className="px-4 text-xs font-semibold tracking-wider text-ink-3 uppercase">Ваш регион</p>
              <div className="mt-2 grid grid-cols-2 gap-1">
                {REGIONS.map((r) => (
                  <button
                    key={r.name}
                    type="button"
                    onClick={() => setRegion(r.name)}
                    className={`rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      r.name === region ? "bg-pik-soft font-semibold text-pik" : "text-ink-2 hover:bg-surface-2"
                    }`}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t border-line pt-5">
              <a
                href={SITE.phoneHref}
                className="text-2xl font-bold tracking-[-0.02em] text-ink"
              >
                {SITE.phone}
              </a>
              <p className="text-sm text-ink-3">Ежедневно 9:00 — 21:00</p>
              <ButtonLink href="/projects" size="lg" className="mt-1 w-full">
                Выбрать квартиру
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

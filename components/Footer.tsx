import Link from "next/link";
import { Logo } from "@/components/Logo";
import { FOOTER_COLUMNS, NAV, SITE, SOCIAL } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface-2">
      <div className="container-page section-pad">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          {/* Бренд и контакты */}
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-3">{SITE.description}</p>

            <div className="mt-6 space-y-3">
              <a href={SITE.phoneHref} className="block text-2xl font-bold tracking-[-0.02em] text-ink hover:text-pik">
                {SITE.phone}
              </a>
              <p className="text-sm text-ink-3">
                Бесплатно по России · ежедневно 9:00 — 21:00
                <br />
                Москва:{" "}
                <a href={SITE.phoneMoscowHref} className="font-medium text-ink-2 hover:text-pik">
                  {SITE.phoneMoscow}
                </a>
              </p>
            </div>

            <address className="mt-6 max-w-xs text-sm leading-relaxed text-ink-3 not-italic">
              {SITE.address}
            </address>

            <div className="mt-5 flex flex-wrap gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-line-strong bg-white px-4 py-1.5 text-sm font-medium text-ink-2 transition-colors hover:border-ink hover:text-ink"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Навигационные колонки */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="text-sm font-bold text-ink">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link, i) => {
                    const external = link.href.startsWith("http");
                    const body = (
                      <span className="text-sm text-ink-3 transition-colors hover:text-pik">{link.label}</span>
                    );
                    return (
                      <li key={`${col.title}-${i}`}>
                        {external ? (
                          <a href={link.href} target="_blank" rel="noopener noreferrer">
                            {body}
                          </a>
                        ) : (
                          <Link href={link.href}>{body}</Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Юридический блок */}
        <div className="mt-12 border-t border-line pt-8">
          <p className="max-w-4xl text-xs leading-relaxed text-ink-3">{SITE.legal}</p>
          <div className="mt-5 flex flex-col gap-3 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
            <p>{SITE.copyright}</p>
            <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Правовая информация">
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-ink">
                  {item.label}
                </Link>
              ))}
              <a href={`mailto:${SITE.pressEmail}`} className="hover:text-ink">
                {SITE.pressEmail}
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

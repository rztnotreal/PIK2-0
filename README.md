# ПИК — сайт строительной компании

Витринный сайт-клон [pik.ru](https://www.pik.ru/) на **Next.js 16 (App Router)**, TypeScript и Tailwind CSS v4.

> ⚠️ Учебный/демонстрационный проект. Не является официальным сайтом ПИК и не является публичной офертой.

## Что внутри

| Раздел | Описание |
| --- | --- |
| `/` | Главная: герой, витрина проектов, направления, акции, инфраструктура, ипотека, новости, география |
| `/projects` | Каталог 46 жилых кварталов с клиентскими фильтрами (класс, комнатность, цена, сдача) и сортировкой |
| `/projects/[slug]` | Карточка проекта: галерея, характеристики, преимущества, примеры планировок с ценами, похожие проекты, форма заявки |
| `/mortgage` | Ипотечные программы, аннуитетный калькулятор платежа, шаги оформления |
| `/about` | О компании: направления, история с 1994 года, социальная инфраструктура, документы |
| `/contacts` | Каналы связи, центральный офис, отделы продаж |
| `/404`, `/sitemap.xml`, `/robots.txt` | Служебные маршруты |

Все страницы проектов генерируются статически (`generateStaticParams` — 57 маршрутов).

## Стек

- **Next.js 16.4.3** — App Router, `cacheComponents` (PPR), Turbopack
- **TypeScript 5** — строгий режим
- **Tailwind CSS v4** — дизайн-система через `@theme` в `app/globals.css`
- **next/font** — шрифт **Onest** (открытый гротеск с кириллицей, замена коммерческого Graphik)

## Структура проекта

```
app/
  layout.tsx            # корневой layout: Onest, Header/Footer, metadata
  page.tsx              # главная
  globals.css           # дизайн-система (@theme: цвета, тени, утилиты)
  projects/
    page.tsx            # каталог
    [slug]/page.tsx     # карточка проекта
  mortgage/ about/ contacts/
  sitemap.ts robots.ts not-found.tsx loading.tsx
components/
  Header.tsx Footer.tsx Logo.tsx
  ProjectCard.tsx Gallery.tsx ProjectsFilter.tsx
  MortgageCalculator.tsx CallbackForm.tsx
  sections/             # секции главной
  ui/                   # Button, Badge, Reveal, SafeImage, SectionHeading
data/
  projects.ts           # каталог 46 проектов + helpers
  site.ts news.ts company.ts mortgage.ts
lib/format.ts           # форматирование цен и склонений
public/media/           # изображения, выгруженные с pik.ru / Web Archive
```

## Дизайн-система

Токены объявлены в `app/globals.css` (`@theme`):

- `--color-pik: #FC4C02` — фирменный оранжевый
- `--color-ink`, `--color-ink-2`, `--color-ink-3` — текстовые оттенки
- `--color-surface`, `--color-surface-2`, `--color-surface-3` — фоны
- `--color-line`, `--color-line-strong` — границы
- `--radius-card` — радиус карточек

Тени не используются: плоский дизайн, глубина строится границами (`border-line` → `border-line-strong` / `border-pik/40` на hover) и сменой фонов.

Пользовательские утилиты: `container-page`, `section-pad`, `headline`, `.snap-x-strip`, `.hatch`.

Анимации уважают `prefers-reduced-motion`.

## Запуск

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # продакшен-сборка
npm run start   # запуск собранного приложения
npm run lint    # ESLint
```

## Данные и изображения

- Каталог собран из архивной версии `pik.ru/projects` через **Wayback Machine** (сам сайт отдаёт 401 прямым ботам).
- Изображения лежат в `public/media/` и загружены с `cdn.pik.ru` / `content.cdn.pik-service.ru`; часть восстановлена через `web.archive.org`.
- Если какое-то изображение недоступно, компонент `SafeImage` показывает фирменную заглушку вместо битой картинки.

## Ипотечный калькулятор

Аннуитетный расчёт: `П = С × r / (1 − (1 + r)⁻ⁿ)`, где `r = ставка / 1200`, `n = срок × 12`.

**Ставки в `data/mortgage.ts` приведены справочно.** Актуальные условия определяют банки-партнёры — на страницах всегда стоит дисклеймер.

## Лицензия и правовая информация

Фотографии и логотип принадлежат ПАО «ПИК СЗ». Проект выполняется в учебных целях; персональные данные в формах не отправляются и не сохраняются.

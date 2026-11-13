# ПИК — сайт строительной компании (Next.js) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Создать многостраничный сайт строительной компании «ПИК» визуально и функционально приближённый к pik.ru, на Next.js (App Router, TypeScript, Tailwind), с реальными данными и ассетами, полученными с pik.ru / pik-group.ru.

**Architecture:** SSR/SSG-сайт на Next.js App Router: контент декларативно описан в модулях данных (`src/data/*`), страницы — серверные компоненты, интерактив (фильтры, калькулятор, избранное, формы, меню) — клиентские островы. Дизайн-система — Tailwind v4 (`@theme`): белый фон, чёрный текст, акцент `#FC4C02` (фирменный оранжевый ПИК), шрифт Onest (самостоятельный, Cyrillic), радиусы 16–24px, pill-кнопки.

**Tech Stack:** Next.js (App Router) + TypeScript strict + Tailwind CSS v4 + @fontsource-variable/onest; изображения — статические файлы в `public/media/` (скачаны с cdn.pik.ru и content.cdn.pik-service.ru).

**Spec:** контент-источники: архив pik.ru (главная, /projects, /pages/company), pik-group.ru (о компании, контакты). Логотип — inline SVG «ПИК» (viewBox 0 0 54 54, fill `#FC4C02`) с pik-group.ru.

## Global Constraints
- Язык интерфейса — русский; телефон горячей линии `8 800 500-00-20`, офис `123242, Россия, г. Москва, ул. Баррикадная, 19 стр. 1`.
- Акцентный цвет `#FC4C02`; логотип — SVG-контуры «ПИК», без растровых подделок.
- Все внешние картинки скачивать в `public/media/` (никаких hotlink'ов в рантайме).
- Strict TypeScript, без `any`; страницы — server components по умолчанию, `"use client"` только для интерактива.
- Ленты проектов/новостей формировать из единого источника `src/data/*` (DRY).
- Каждая задача завершается проверкой: `npm run build` проходит без ошибок.

## Review Focus
- Каталог `/projects`: фильтры (комнаты, цена, класс) и сортировка должны комбинироваться и не теряться при навигации — проверка: клиентский тест фильтра на граничных значениях (пустая выборка → «Ничего не найдено»).
- Детальная страница `/projects/[slug]`: неверный slug → `notFound()` и корректный 404 — проверка: ручной переход на несуществующий slug.
- `next/image` с локальными файлами и `images.unoptimized`/конфиг — проверка: сборка и отсутствие 404 на изображениях.
- Мобильная адаптивность шапки (бургер-меню) и hero-фильтра — проверка: `npm run build` + ручной осмотр на 375px.
- Формы (обратный звонок, контакты): валидация и состояние успеха без сервера — проверка: отправка с пустым/некорректным телефоном показывает ошибку.

---

## File Structure

```
PIK2-0/
├─ public/
│  ├─ media/projects/<slug>-{1..4}.jpg   # галереи проектов
│  ├─ media/projects/<slug>.jpg          # обложки карточек ( = -1 )
│  ├─ media/content/*.jpg|png            # промо, сервисы, соц-инфраструктура
│  ├─ media/news/*.jpg                   # новости
│  ├─ media/company/*.jpg                # страница «О компании»
│  ├─ logo.svg, favicon.ico
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx            # шрифт, Header, Footer, metadata
│  │  ├─ page.tsx              # главная
│  │  ├─ projects/page.tsx     # каталог (searchParams не используем — клиентские фильтры)
│  │  ├─ projects/[slug]/page.tsx + generateStaticParams/generateMetadata
│  │  ├─ about/page.tsx
│  │  ├─ mortgage/page.tsx
│  │  ├─ contacts/page.tsx
│  │  ├─ not-found.tsx, loading.tsx, sitemap.ts, robots.ts, globals.css
│  ├─ components/
│  │  ├─ layout/Header.tsx, Footer.tsx, Logo.tsx, RegionSelect.tsx
│  │  ├─ ui/Button.tsx, Badge.tsx, Reveal.tsx (IntersectionObserver), Section.tsx
│  │  ├─ home/Hero.tsx, SearchPanel.tsx, PromoCards.tsx, FeaturedProjects.tsx,
│  │  │     PlusBanner.tsx, OtherOffers.tsx, ServicesGrid.tsx, StatsBand.tsx,
│  │  │     MortgageTeaser.tsx, NewsGrid.tsx, CtaBanner.tsx
│  │  ├─ projects/ProjectCard.tsx, ProjectsFilter.tsx, FavoriteButton.tsx
│  │  ├─ project/Gallery.tsx, FactList.tsx, ApartmentsTable.tsx, SimilarProjects.tsx
│  │  ├─ forms/CallbackForm.tsx (универсальная: имя, телефон, согласие)
│  │  └─ mortgage/MortgageCalculator.tsx
│  ├─ data/projects.ts   # export const projects: Project[] (46 шт.)
│  ├─ data/site.ts       # регионы, навигация, контакты, футер-колонки
│  ├─ data/news.ts, data/company.ts (факты, история, направления), data/mortgage.ts (программы)
│  ├─ lib/format.ts (formatPrice, plural), lib/favorites.ts (localStorage store)
│  └─ types.ts           # Project, NewsItem, MortgageProgram, Region...
```

## Interfaces (locked)

```ts
// src/types.ts
export type Rooms = "studio" | 1 | 2 | 3;          // 3 = «3+»
export type EstateClass = "comfort" | "plus" | "business";
export interface Project {
  slug: string; name: string; district: string;    // «Аминьевская» и т.п.
  metro: string; walkMin: number;                  // до метро, мин пешком
  priceFrom: number;                               // ₽
  klass: EstateClass; badge?: string;              // «Новый проект», «Серия плюс»
  deadline: string;                                // «2027 год»
  rooms: Rooms[];                                  // какие типы есть
  images: string[];                                // 1..4 путей /media/projects/...
  description: string;                             // 1–2 предложения
  features: string[];                              // 3–5 преимуществ
}
// Функции: getProject(slug): Project | undefined; similarProjects(slug, n): Project[]
```

- `formatPrice(15479262)` → `"15 479 262 ₽"`; `formatPriceShort` → `"от 15,5 млн ₽"`.
- `FavoriteButton({ slug })` — клиентская, читает/пишет `localStorage["pik:favorites"]`, бейдж в `Header` подписывается через кастомное событие `pik:favorites-changed`.
- `MortgageCalculator` — поля: цена, первый взнос (слайдер %), срок (лет), ставка (%); результат: аннуитетный платёж (`rate/1200`), подпись «Платёж в месяц».

## Tasks

### Task 1: Scaffold + дизайн-система
Создать проект (`create-next-app`: TS, Tailwind, App Router, alias `@/*`), установить `@fontsource-variable/onest`, объявить в `globals.css` `@theme` (цвета `--color-ink`, `--color-pik: #FC4C02`, радиусы, `--font-sans`), базовые компоненты `Button` (variants: primary/black/outline, rounded-full), `Badge`, `Section`, `Reveal`. Шаги: scaffold → `npm run build` (PASS) → шрифт подключён в layout → commit.

### Task 2: Данные + ассеты
Скачать логотип (`logo.svg`, favicon), ~80 фото проектов (1 фото на все 46 + 4 фото на 12 ключевых), промо/новости/компания (≈25 шт.) в `public/media/**` скриптом (PowerShell, параллельно, с ретраями). Заполнить `src/data/projects.ts` (46 проектов из архивной выдачи /projects: имя, район, метро, мин, цена, класс, дедлайн, 4 URL), `site.ts`, `news.ts`, `company.ts`, `mortgage.ts`. Проверка: `tsc --noEmit`, все пути к картинкам существуют (скрипт-сверка).

### Task 3: Шапка, футер, 404
`Logo` (SVG контуры), sticky `Header` (мега-меню десктоп / бургер-мобильно, регион-селектор, телефон, «Избранное» с бейджем), `Footer` (4 колонки + юр. блок), `not-found.tsx`. Проверка: `npm run build`, рендер всех ссылок без `href="#"`-заглушек (реальные маршруты).

### Task 4: Главная
Секции по порядку: Hero (H1 «Новостройки в Москве и области», SearchPanel: комнаты/цена/город → переход на `/projects`), PromoCards (горизонтальный скролл, 6 карточек «Что нового»), FeaturedProjects (первые 8, ссылка «Все проекты»), PlusBanner (Серия плюс), OtherOffers (машино-места/коммерция/кладовые), ServicesGrid (сервисы + социальная инфраструктура), StatsBand (цифры ПИК), MortgageTeaser, NewsGrid (3 новости), CtaBanner (телефон + форма). Проверка: `npm run build`, LCP-картинки через `next/image` с `sizes`.

### Task 5: Каталог /projects
`ProjectsFilter` (клиент): чипсы комнат, диапазон цены (два number/range), класс, сортировка (по цене/названию), счётчик «N проектов», состояние пусто; сетка `ProjectCard` (фото с hover-зумом, бейдж класса, метро+мин, «от N ₽», сердце). Проверка: unit-проверка логики фильтра (граничные значения), ручная — комбинация фильтров.

### Task 6: Детальная /projects/[slug]
Gallery (4 фото, стрелки/превью, клиентская), заголовок+бейджи, FactList (класс, срок, метро, отделка), price-block, description+features, похожие проекты (3), CTA-форма. `generateStaticParams` из данных, `notFound()` для неверного slug, `generateMetadata`. Проверка: build со всеми slug + 404-сценарий.

### Task 7: О компании /about
Hero («ПИК — ведущий девелопер России» + фото), направления деятельности (4 карточки), «ПИК в цифрах» (5 показателей), история (1994→2024, горизонтальная лента), социальная ответственность (школы, карточки с фото), география (14 регионов), CTA. Проверка: build; факты — только из `data/company.ts`.

### Task 8: Ипотека /mortgage
Программы (5 карточек: ставка, первый взнос, срок) + `MortgageCalculator` (аннуитет, клиент), блок «Как купить онлайн» (4 шага), CTA. Проверка: точность формулы (ручной расчёт 6%/20 лет), build.

### Task 9: Контакты /contacts
Карточка офиса (адрес, телефоны, e-mail, часы), `CallbackForm` (имя, телефон с маской, чекбокс согласия → состояние успеха), ссылки msg.pik.ru/press@pik.ru/job.pik.ru, отделы продаж (3 филиала: Москва, СПб, Казань). Проверка: валидация (пусто/короткий телефон), build.

### Task 10: Финальная полировка + верификация
`sitemap.ts`, `robots.ts`, metadata/OpenGraph (картинка из media), `loading.tsx`, reduced-motion, доступность (alt, aria, фокус), README.md (запуск). Финальная проверка: `npm run lint`, `npm run build`, `npx next start` + обход всех маршрутов (200), фикс найденного.

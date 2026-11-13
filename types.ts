export type Rooms = "studio" | 1 | 2 | 3;
export type EstateClass = "comfort" | "plus" | "business";
export type ProjectStatus = "construction" | "ready";

export interface Project {
  slug: string;
  name: string;
  /** район / локация, как на pik.ru (например «Котельники», «МЦД-3 · Крюково») */
  location: string;
  /** станция транспорта рядом (для карточек) */
  metro: string;
  /** минут пешком до транспорта */
  walkMin: number;
  /** минимальная цена, ₽ */
  priceFrom: number;
  klass: EstateClass;
  /** срок сдачи, например «2027 год» или «Сдан — 2024» */
  deadline: string;
  status: ProjectStatus;
  /** доступные типы квартир */
  rooms: Rooms[];
  /** локальные пути вида /media/projects/<slug>-N.jpg (1..4) */
  images: string[];
  description: string;
  features: string[];
}

export interface NewsItem {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
}

export interface MortgageProgram {
  slug: string;
  name: string;
  rate: number;
  rateNote: string;
  downPayment: number;
  termYears: number;
  description: string;
}

export interface Region {
  name: string;
  /** подпись в Hero («в Москве и области» и т.п.) */
  dative: string;
  active?: boolean;
}

export interface PromoCard {
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

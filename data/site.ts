import type { Region } from "@/types";

export const SITE = {
  name: "ПИК",
  fullName: "ПАО «ПИК СЗ»",
  tagline: "Ведущий девелопер России",
  description:
    "ПИК — крупнейший девелопер России: более 150 жилых кварталов в 13 регионах, 37 млн м² введённой площади и свыше 650 тысяч семей, уже живущих в домах ПИК.",
  phone: "8 800 500-00-20",
  phoneHref: "tel:+78005000020",
  phoneMoscow: "8 495 500-00-20",
  phoneMoscowHref: "tel:+74955000020",
  email: "msg.pik.ru",
  emailHref: "https://msg.pik.ru",
  pressEmail: "press@pik.ru",
  job: "job.pik.ru",
  jobHref: "https://job.pik.ru",
  address: "123242, Россия, г. Москва, ул. Баррикадная, 19 стр. 1",
  copyright: "© 2000 — 2026 ПАО «ПИК СЗ»",
  legal:
    "Информация на сайте носит информационный характер и не является публичной офертой (ст. 437 ГК РФ). Условия приобретения квартир и процентные ставки по программам кредитования уточняйте в банках-партнёрах и отделах продаж.",
} as const;

export const REGIONS: Region[] = [
  { name: "Москва и область", dative: "в Москве и области", active: true },
  { name: "Санкт-Петербург и область", dative: "в Санкт-Петербурге и области" },
  { name: "Казань", dative: "в Казани" },
  { name: "Екатеринбург", dative: "в Екатеринбурге" },
  { name: "Нижний Новгород", dative: "в Нижнем Новгороде" },
  { name: "Владивосток", dative: "во Владивостоке" },
  { name: "Хабаровск", dative: "в Хабаровске" },
  { name: "Улан-Удэ", dative: "в Улан-Удэ" },
  { name: "Благовещенск", dative: "в Благовещенске" },
  { name: "Южно-Сахалинск", dative: "в Южно-Сахалинске" },
  { name: "Тюмень", dative: "в Тюмени" },
  { name: "Ярославль", dative: "в Ярославле" },
  { name: "Обнинск", dative: "в Обнинске" },
];

export interface NavItem {
  href: string;
  label: string;
}

export const NAV: NavItem[] = [
  { href: "/projects", label: "Каталог" },
  { href: "/mortgage", label: "Ипотека" },
  { href: "/about", label: "О компании" },
  { href: "/contacts", label: "Контакты" },
];

export interface FooterColumn {
  title: string;
  links: NavItem[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Покупателям",
    links: [
      { href: "/projects", label: "Каталог квартир" },
      { href: "/mortgage", label: "Ипотечные программы" },
      { href: "/about#infrastruktura", label: "Социальная инфраструктура" },
      { href: "/contacts", label: "Отделы продаж" },
    ],
  },
  {
    title: "Компания",
    links: [
      { href: "/about", label: "О компании" },
      { href: "/about#istoriya", label: "История" },
      { href: "/about#napravleniya", label: "Направления деятельности" },
      { href: "/contacts", label: "Контакты" },
    ],
  },
  {
    title: "Документы",
    links: [
      { href: "/about#dokumenty", label: "Проектные декларации" },
      { href: "/about#dokumenty", label: "Раскрытие информации" },
      { href: "/contacts", label: "Обращения граждан" },
      { href: SITE.jobHref, label: "Вакансии" },
    ],
  },
];

export const SOCIAL = [
  { label: "Телеграм", href: "https://t.me/pikru" },
  { label: "ВКонтакте", href: "https://vk.com/pikru" },
] as const;

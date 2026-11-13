import { REGIONS } from "./site";

export interface CompanyStat {
  value: string;
  label: string;
  note?: string;
}

export const COMPANY_STATS: CompanyStat[] = [
  { value: "37 млн м²", label: "жилья введено с 2000 года" },
  { value: "более 650 тыс.", label: "семей уже живут в домах ПИК" },
  { value: "более 150", label: "жилых кварталов построено" },
  { value: String(REGIONS.length), label: "регионов присутствия" },
  { value: "более 30 тыс.", label: "сотрудников в команде" },
];

export interface Direction {
  title: string;
  description: string;
  image: string;
  href: string;
}

export const DIRECTIONS: Direction[] = [
  {
    title: "Жилищное строительство",
    description:
      "Комфорт-, комфорт+ и бизнес-класс: от компактных студий до просторных семейных квартир с отделкой «под ключ».",
    image: "/media/company/dir-housing.jpg",
    href: "/projects",
  },
  {
    title: "Благоустройство",
    description:
      "Дворы без машин, прогулочные аллеи, площадки для всех возрастов и озеленение по авторским проектам ландшафтных архитекторов.",
    image: "/media/company/dir-landscape.jpg",
    href: "/about#infrastruktura",
  },
  {
    title: "Социальная инфраструктура",
    description:
      "Более 170 объектов: детские сады, школы и поликлиники. Более 200 объектов находятся в работе.",
    image: "/media/company/dir-social.jpg",
    href: "/about#infrastruktura",
  },
  {
    title: "Коммерческая недвижимость",
    description:
      "Свободные назначения, помещения для ритейла и офисы класса А в собственных кварталах компании.",
    image: "/media/company/dir-commercial.jpg",
    href: "/contacts",
  },
];

export interface HistoryMilestone {
  year: string;
  title: string;
  text: string;
}

export const HISTORY: HistoryMilestone[] = [
  {
    year: "1994",
    title: "«Первая Ипотечная Компания»",
    text: "Компания основана как ипотечный институт — с этого началась история группы ПИК.",
  },
  {
    year: "2000",
    title: "Первые дома",
    text: "Начало жилищного строительства: первые корпуса будущих кварталов в Москве.",
  },
  {
    year: "2006",
    title: "Выход на биржу",
    text: "Акции компании размещаются на Московской бирже — один из первых публичных девелоперов России.",
  },
  {
    year: "2015",
    title: "Масштабирование в регионы",
    text: "Старт проектов в новых регионах: Санкт-Петербург, Казань, Екатеринбург, Приморье.",
  },
  {
    year: "2020",
    title: "30 млн м²",
    text: "Компания вводит 30-миллионный метр жилья и начинает программу комплексного благоустройства.",
  },
  {
    year: "2026",
    title: "Более 150 кварталов",
    text: "ПИК строит и благоустраивает более 150 жилых кварталов в 13 регионах России.",
  },
];

export interface InfraObject {
  title: string;
  text: string;
  image: string;
}

export const SCHOOLS: InfraObject[] = [
  {
    title: "Школа им. Ф. М. Достоевского",
    text: "1150 учеников. Парк «Люблинский парк», при школе работает лицей «Летово».",
    image: "/media/company/school-dostoevsky.jpg",
  },
  {
    title: "Лицей № 280 им. М. Ю. Лермонтова",
    text: "1300 учеников. Историческое здание 1824 года в квартале «Москворечье».",
    image: "/media/company/school-lermontov.jpg",
  },
  {
    title: "Школа № 104 «Кантемировская, 11»",
    text: "Корпус «Русский Рено»: гимназия с углублённым изучением языков.",
    image: "/media/company/school-reno.jpg",
  },
  {
    title: "СДЮШ «Авангард»",
    text: "Спортивная школа в квартале «Ярославский» с программами для детей с ОВЗ.",
    image: "/media/company/school-avangard.jpg",
  },
];

export const INFRA_NUMBERS = [
  { value: "106", label: "детских садов построено" },
  { value: "44", label: "школы построено" },
  { value: "20", label: "поликлиник построено" },
  { value: "более 200", label: "объектов в работе" },
];

export const COMPANY_DOCUMENTS = [
  { title: "Проектные декларации", note: "на сайте наш.дом.рф" },
  { title: "Раскрытие информации", note: "в соответствии с 214-ФЗ" },
  { title: "Годовые отчёты", note: "финансовая отчётность группы" },
  { title: "Политика обработки данных", note: "152-ФЗ" },
];

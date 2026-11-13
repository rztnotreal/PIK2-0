import type { MortgageProgram } from "@/types";

export const MORTGAGE_DISCLAIMER =
  "Ставки по программам кредитования приведены справочно и не являются публичной офертой. Актуальные условия, требования к заёмщику и наличие программ уточняйте в банках-партнёрах ПИК и в отделах продаж.";

export const MORTGAGE_PROGRAMS: MortgageProgram[] = [
  {
    slug: "semeynaya",
    name: "Семейная ипотека",
    rate:  6,
    rateNote: "льготная ставка для семей с детьми",
    downPayment: 20,
    termYears: 30,
    description:
      "Господдержка для семей, в которых есть дети. Ставка действует на весь срок кредита при покупке квартиры в новостройке у юридического лица.",
  },
  {
    slug: "it",
    name: "IT-ипотека",
    rate: 6,
    rateNote: "для сотрудников аккредитованных IT-компаний",
    downPayment: 20,
    termYears: 30,
    description:
      "Льготная ставка для работников аккредитованных IT-компаний и их супругов. Действует на новостройки по всей стране.",
  },
  {
    slug: "dva-goda",
    name: "Льготная ставка от 5% на первые 2 года",
    rate: 5,
    rateNote: "на льготный период, далее по программе банка",
    downPayment: 20,
    termYears: 30,
    description:
      "Специальное предложение от ПИК и банков-партнёров: пониженная ставка на первые два года кредитования для покупки квартиры в новостройке.",
  },
  {
    slug: "standartnaya",
    name: "Стандартная ипотека",
    rate: 16,
    rateNote: "рыночная ставка без государственной поддержки",
    downPayment: 15,
    termYears: 30,
    description:
      "Классическая ипотека без ограничений по возрасту жилья и составу семьи. Подходит, если льготные программы недоступны.",
  },
  {
    slug: "dlya-biznesa",
    name: "Ипотека для бизнеса",
    rate: 20,
    rateNote: "условия определяет банк-партнёр",
    downPayment: 30,
    termYears: 15,
    description:
      "Покупка квартир и нежилых помещений в инвестиционных целях для юридических лиц и индивидуальных предпринимателей.",
  },
];

/** Дефолтная ставка калькулятора, % годовых */
export const CALCULATOR_DEFAULT_RATE = 6;
export const CALCULATOR_DEFAULT_YEARS = 20;
export const CALCULATOR_DEFAULT_PRICE = 12_000_000;
export const CALCULATOR_DEFAULT_DOWN_SHARE = 0.2;

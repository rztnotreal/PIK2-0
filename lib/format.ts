/** Форматирование чисел и цен для интерфейса ПИК. */

export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(value)} ₽`;
}

/** 15479262 → «15,5 млн ₽» */
export function formatPriceShort(value: number): string {
  const millions = value / 1_000_000;
  const text = millions >= 100 ? Math.round(millions).toString() : millions.toFixed(1).replace(".", ",");
  return `${text} млн ₽`;
}

/** «от 15 479 262 ₽» */
export function formatPriceFrom(value: number): string {
  return `от ${formatPrice(value)}`;
}

export function plural(n: number, forms: [string, string, string]): string {
  const abs = Math.abs(n) % 100;
  const n1 = abs % 10;
  if (abs > 10 && abs < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
}

/** «46 проектов» / «1 проект» с правильным склонением */
export function formatCount(n: number, unitForms: [string, string, string] = ["проект", "проекта", "проектов"]): string {
  return `${n} ${plural(n, unitForms)}`;
}

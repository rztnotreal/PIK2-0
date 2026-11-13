import Link from "next/link";

/**
 * Фирменный знак ПИК — inline SVG (path из pik-group.ru, fill #FC4C02).
 * Оригинальный viewBox «0 0 54 54» обрезан до «0 16 54 20»,
 * чтобы буквы заполняли компактный контейнер шапки.
 */
export function LogoMark({ className = "h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 16 54 20"
      className={className}
      fill="currentColor"
      role="img"
      aria-label="ПИК"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 34V18h15.533v16H12.05V21.968H5.483V34H1zm28.773-9.259L22.601 34h-3.983V18h4.483v9.259L30.273 18h3.983v16h-4.483v-9.259zm11.05 2.816V34h-4.482V18h4.483v6.635L46.182 18h5.233l-6.38 7.765L53 34h-6.026l-6.15-6.443z" />
    </svg>
  );
}

/** Логотип-ссылка: оранжевые буквы «ПИК» */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="ПИК — на главную"
      className={`inline-flex items-center text-pik transition-opacity hover:opacity-80 ${className}`}
    >
      <LogoMark className="h-[18px] w-auto md:h-[22px]" />
    </Link>
  );
}

import type { ReactNode } from "react";

/** Заголовок секции: крупный заголовок + необязательное описание справа */
export function SectionHeading({
  title,
  description,
  action,
  className = "",
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-8 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-2xl">
        <h2 className="headline text-[2rem] md:text-[2.75rem]">{title}</h2>
        {description && (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-3 md:text-lg">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

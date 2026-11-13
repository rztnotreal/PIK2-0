/** Индикатор загрузки маршрута (App Router streaming) */
export default function Loading() {
  return (
    <div className="container-page py-12 md:py-16" role="status" aria-live="polite">
      <span className="sr-only">Загрузка страницы…</span>
      <div className="h-8 w-64 animate-pulse rounded-xl bg-surface-2" />
      <div className="mt-4 h-4 w-96 max-w-full animate-pulse rounded bg-surface-2" />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-[var(--radius-card)] border border-line">
            <div className="aspect-[16/10] animate-pulse bg-surface-2" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-2/3 animate-pulse rounded bg-surface-2" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-surface-2" />
              <div className="h-9 w-full animate-pulse rounded bg-surface-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

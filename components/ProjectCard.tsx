import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { SafeImage } from "@/components/ui/SafeImage";
import { CLASS_LABELS } from "@/data/projects";
import { formatPriceShort } from "@/lib/format";
import type { Project } from "@/types";

/** Иконка транспорта (метро/МЦД) */
function TransitIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <rect x="5" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 12h14M8.5 14.5h.01M15.5 14.5h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m8 17-2 4M16 17l2 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const href = `/projects/${project.slug}`;
  const cover = project.images[0];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-colors duration-300 hover:border-line-strong">
      {/* Фото */}
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-surface-2">
        <SafeImage
          src={cover}
          alt={`${project.name} — жилой квартал ПИК`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />

        {/* Статус и класс */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {project.status === "ready" ? (
            <Badge tone="success">
              Сдан
            </Badge>
          ) : (
            <Badge tone="soft">
              {project.deadline}
            </Badge>
          )}
        </div>

        {/* Быстрый просмотр */}
        <span className="pointer-events-none absolute right-3 bottom-3 translate-y-2 rounded-full border border-line bg-white/95 px-3 py-1.5 text-xs font-semibold text-ink opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Смотреть →
        </span>
      </Link>

      {/* Контент */}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg leading-tight font-bold tracking-[-0.02em]">
            <Link href={href} className="transition-colors hover:text-pik">
              {project.name}
            </Link>
          </h3>
          <Badge tone="pik" className="shrink-0">
            {CLASS_LABELS[project.klass]}
          </Badge>
        </div>

        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-3">
          <TransitIcon />
          {project.metro} · {project.walkMin} мин
        </p>

        <p className="mt-1 text-sm text-ink-3">{project.location}</p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {project.rooms.map((r) => (
            <span
              key={r}
              className="rounded-lg bg-surface-2 px-2.5 py-1 text-xs font-medium text-ink-2"
            >
              {r === "studio" ? "Студия" : `${r}-комн.`}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
          <div>
            <p className="text-xs text-ink-3">Цены на квартиры</p>
            <p className="mt-0.5 text-lg font-bold tracking-[-0.02em] text-ink">
              от {formatPriceShort(project.priceFrom)}
            </p>
          </div>
          <Link
            href={href}
            className="rounded-xl border border-line-strong px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-pik hover:bg-pik hover:text-white"
          >
            Подобрать
          </Link>
        </div>
      </div>
    </article>
  );
}

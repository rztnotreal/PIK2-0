"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { projects, CLASS_LABELS, ROOM_LABELS } from "@/data/projects";
import { formatCount } from "@/lib/format";
import type { EstateClass, Rooms } from "@/types";

type RoomFilter = "all" | Rooms;
type ClassFilter = "all" | EstateClass;
type SortKey = "price-asc" | "price-desc" | "deadline";

const ROOM_OPTIONS: { value: RoomFilter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "studio", label: ROOM_LABELS.studio },
  { value: 1, label: ROOM_LABELS[1] },
  { value: 2, label: ROOM_LABELS[2] },
  { value: 3, label: ROOM_LABELS[3] },
];

const CLASS_OPTIONS: { value: ClassFilter; label: string }[] = [
  { value: "all", label: "Любой класс" },
  { value: "comfort", label: CLASS_LABELS.comfort },
  { value: "plus", label: CLASS_LABELS.plus },
  { value: "business", label: CLASS_LABELS.business },
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "price-asc", label: "Сначала дешевле" },
  { value: "price-desc", label: "Сначала дороже" },
  { value: "deadline", label: "По сроку сдачи" },
];

const MAX_PRICE = Math.ceil(Math.max(...projects.map((p) => p.priceFrom)) / 1_000_000) * 1_000_000;
const MIN_PRICE = Math.floor(Math.min(...projects.map((p) => p.priceFrom)) / 1_000_000) * 1_000_000;

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-xl border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all ${
        active
          ? "border-ink bg-ink text-white"
          : "border-line-strong bg-white text-ink-2 hover:border-ink hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

export function ProjectsFilter() {
  const searchParams = useSearchParams();
  const initialRoom = searchParams.get("klass");

  const [room, setRoom] = useState<RoomFilter>(
    initialRoom && ["studio", "1", "2", "3"].includes(initialRoom)
      ? (initialRoom === "studio" ? "studio" : Number(initialRoom) as 1 | 2 | 3)
      : "all",
  );
  const [klass, setKlass] = useState<ClassFilter>("all");
  const [sort, setSort] = useState<SortKey>("price-asc");
  const [priceMax, setPriceMax] = useState(MAX_PRICE);
  const [readyOnly, setReadyOnly] = useState(false);

  const filtered = useMemo(() => {
    const out = projects.filter((p) => {
      if (room !== "all" && !p.rooms.includes(room)) return false;
      if (klass !== "all" && p.klass !== klass) return false;
      if (p.priceFrom > priceMax) return false;
      if (readyOnly && p.status !== "ready") return false;
      return true;
    });

    out.sort((a, b) => {
      if (sort === "price-asc") return a.priceFrom - b.priceFrom;
      if (sort === "price-desc") return b.priceFrom - a.priceFrom;
      return Number(a.status === "ready") - Number(b.status === "ready") || a.deadline.localeCompare(b.deadline, "ru");
    });
    return out;
  }, [room, klass, sort, priceMax, readyOnly]);

  const reset = () => {
    setRoom("all");
    setKlass("all");
    setSort("price-asc");
    setPriceMax(MAX_PRICE);
    setReadyOnly(false);
  };

  const dirty = room !== "all" || klass !== "all" || priceMax !== MAX_PRICE || readyOnly;

  return (
    <div>
      {/* Панель фильтров */}
      <div className="sticky top-16 z-30 -mx-5 border-y border-line bg-white/90 px-5 py-4 backdrop-blur-xl md:top-[72px] md:mx-0 md:rounded-2xl md:border md:px-6">
        <div className="flex flex-col gap-4">
          {/* Комнатность */}
          <div className="snap-x-strip flex gap-2 overflow-x-auto">
            {ROOM_OPTIONS.map((o) => (
              <Chip key={String(o.value)} active={room === o.value} onClick={() => setRoom(o.value)}>
                {o.label}
              </Chip>
            ))}
          </div>

          {/* Класс, сдача, сортировка */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="snap-x-strip flex gap-2 overflow-x-auto">
              {CLASS_OPTIONS.map((o) => (
                <Chip key={o.value} active={klass === o.value} onClick={() => setKlass(o.value)}>
                  {o.label}
                </Chip>
              ))}
              <Chip active={readyOnly} onClick={() => setReadyOnly((v) => !v)}>
                {readyOnly ? "✓ " : ""}Сданы
              </Chip>
            </div>

            <label className="ml-auto flex items-center gap-3 text-sm text-ink-3">
              <span className="hidden sm:inline">Сортировка</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-10 cursor-pointer rounded-xl border border-line-strong bg-white px-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Цена */}
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex flex-1 items-center gap-3 text-sm text-ink-3">
              <span className="shrink-0">Цена до</span>
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={500_000}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-surface-3 accent-pik"
                aria-label="Максимальная цена"
              />
              <span className="w-28 shrink-0 text-right font-semibold text-ink">
                {new Intl.NumberFormat("ru-RU").format(priceMax)} ₽
              </span>
            </label>

            {dirty && (
              <button
                type="button"
                onClick={reset}
                className="text-sm font-semibold text-pik transition-opacity hover:opacity-75"
              >
                Сбросить фильтры
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Результаты */}
      <p className="mt-6 mb-5 text-sm text-ink-3">
        Найдено {formatCount(filtered.length)}{" "}
        {dirty && <span className="text-ink-2">из {projects.length}</span>}
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {filtered.map((p, i) => (
            <ProjectCard key={p.slug} project={p} priority={i < 3} />
          ))}
        </div>
      ) : (
        <div className="rounded-[var(--radius-card)] border border-dashed border-line-strong bg-surface-2 px-6 py-16 text-center">
          <p className="text-lg font-bold text-ink">Ничего не найдено</p>
          <p className="mt-2 text-sm text-ink-3">
            Попробуйте изменить параметры поиска или сбросить фильтры.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-5 rounded-xl bg-pik px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pik-dark"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
}

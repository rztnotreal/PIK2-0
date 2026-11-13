import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ProjectsFilter } from "@/components/ProjectsFilter";
import { projects } from "@/data/projects";
import { plural } from "@/lib/format";

export const metadata: Metadata = {
  title: "Каталог квартир в новостройках — ПИК",
  description:
    "Каталог проектов ПИК: более 40 жилых кварталов в Москве и области. Квартиры от студий до 3-комнатных, ипотека от 5%, отделка от застройщика.",
  alternates: { canonical: "/projects" },
};

/** Статическая заглушка фильтров до гидратации */
function FilterSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-line bg-white p-6">
        <div className="flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 w-24 animate-pulse rounded-xl bg-surface-2" />
          ))}
        </div>
      </div>
      <p className="h-5 w-48 animate-pulse rounded bg-surface-2" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
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

export default function ProjectsPage() {
  return (
    <>
      {/* Заголовок */}
      <div className="border-b border-line bg-surface-2">
        <div className="container-page pt-10 pb-8 md:pt-14 md:pb-10">
          <nav aria-label="Хлебные крошки" className="mb-4 text-sm text-ink-3">
            <Link href="/" className="hover:text-pik">
              Главная
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-ink">Каталог</span>
          </nav>

          <h1 className="headline text-[2.25rem] md:text-[3.25rem]">
            Каталог новостроек ПИК
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-3 md:text-lg">
            {projects.length} {plural(projects.length, ["жилой квартал", "жилых квартала", "жилых кварталов"])}{" "}
            в Москве и области — от комфорт- до бизнес-класса. Дворы без машин, школы и сады рядом.
          </p>
        </div>
      </div>

      {/* Фильтры и результаты */}
      <div className="container-page section-pad">
        <Suspense fallback={<FilterSkeleton />}>
          <ProjectsFilter />
        </Suspense>
      </div>

      {/* SEO-текст */}
      <div className="border-t border-line bg-surface-2">
        <div className="container-page section-pad">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h2 className="text-lg font-bold tracking-[-0.02em]">Новостройки ПИК в Москве</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-3">
                ПИК строит жилые кварталы в Москве и области с 2000 года. Каждый проект — с
                благоустроенным двором без машин, детскими площадками и объектами социальной
                инфраструктуры: садами, школами и поликлиниками.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-[-0.02em]">Квартиры с отделкой</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-3">
                В проектах доступны квартиры с white box и чистовой отделкой от застройщика, а также
                варианты с мебелью. Умный дом с датчиками протечки и видеодомофоном входит в
                стандарт оснащения.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-[-0.02em]">Ипотека и скидки</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-3">
                Семейная ипотека, IT-ипотека и специальные ставки от застройщика. Рассчитайте платёж
                в калькуляторе и оставьте заявку — менеджер подберёт подходящие варианты.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

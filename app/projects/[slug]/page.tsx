import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { ProjectCard } from "@/components/ProjectCard";
import { CallbackForm } from "@/components/CallbackForm";
import { Badge } from "@/components/ui/Badge";
import { CLASS_LABELS, ROOM_LABELS, getProject, projects, sampleApartments, similarProjects } from "@/data/projects";
import { SITE } from "@/data/site";
import { formatPrice } from "@/lib/format";

/** 46 статических страниц проектов */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = getProject(slug);
    if (!project) return { title: "Проект не найден" };
    return {
      title: `${project.name} — жилой квартал ПИК, квартиры от ${formatPrice(project.priceFrom)}`,
      description: project.description,
      alternates: { canonical: `/projects/${project.slug}` },
      openGraph: {
        title: `${project.name} — ПИК`,
        description: project.description,
        images: project.images[0] ? [{ url: project.images[0] }] : undefined,
      },
    };
  });
}

/** Иконка-плашка характеристики */
function Feature({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pik-soft text-pik">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs text-ink-3">{label}</p>
        <p className="mt-0.5 truncate text-sm font-bold text-ink">{value}</p>
      </div>
    </div>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const similar = similarProjects(project.slug, 3);
  const apartments = sampleApartments(project, 6);

  const icons = {
    metro: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 12h14M8.5 14.5h.01M15.5 14.5h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="m8 17-2 4M16 17l2 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    calendar: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    class: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 20V9l8-5 8 5v11" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    pin: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  };

  return (
    <>
      {/* Галерея */}
      <div className="container-page pt-6 md:pt-8">
        <nav aria-label="Хлебные крошки" className="mb-4 text-sm text-ink-3">
          <Link href="/" className="hover:text-pik">
            Главная
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <Link href="/projects" className="hover:text-pik">
            Каталог
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-ink">{project.name}</span>
        </nav>

        <Gallery images={project.images} name={project.name} />
      </div>

      {/* Инфо */}
      <div className="container-page pt-8 pb-14 md:pt-12">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          {/* Левая колонка */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {project.status === "ready" ? (
                <Badge tone="success">
                  Сдан
                </Badge>
              ) : (
                <Badge tone="pik">
                  Сдача: {project.deadline}
                </Badge>
              )}
              <Badge>{CLASS_LABELS[project.klass]}</Badge>
            </div>

            <h1 className="headline mt-4 text-[2.25rem] md:text-[3rem]">{project.name}</h1>

            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-3">
              <span className="flex items-center gap-1.5">
                {icons.pin}
                {project.location}
              </span>
              <span className="text-line-strong">·</span>
              <span className="flex items-center gap-1.5">
                {icons.metro}
                {project.metro} — {project.walkMin} мин пешком
              </span>
            </p>

            {/* Характеристики */}
            <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
              <Feature icon={icons.class} label="Класс" value={CLASS_LABELS[project.klass]} />
              <Feature icon={icons.calendar} label="Срок сдачи" value={project.deadline} />
              <Feature icon={icons.metro} label="Транспорт" value={`${project.walkMin} мин пешком`} />
              <Feature icon={icons.pin} label="Локация" value={project.location} />
            </div>

            {/* Описание */}
            <div className="mt-9">
              <h2 className="text-xl font-bold tracking-[-0.02em]">О квартале</h2>
              <p className="mt-3 leading-relaxed text-ink-2">{project.description}</p>
              <p className="mt-3 leading-relaxed text-ink-2">
                В квартале предусмотрены детские и спортивные площадки, прогулочные зоны, велодорожки
                и подземный паркинг. Дворы — без машин, с многоуровневым озеленением.
              </p>
            </div>

            {/* Преимущества */}
            <div className="mt-8">
              <h2 className="text-xl font-bold tracking-[-0.02em]">Преимущества</h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pik-soft text-[11px] font-bold text-pik">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Типы квартир */}
            <div className="mt-9">
              <h2 className="text-xl font-bold tracking-[-0.02em]">Какие квартиры есть</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.rooms.map((r) => (
                  <Link
                    key={r}
                    href="/projects"
                    className="rounded-xl border border-line-strong bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-pik hover:bg-pik hover:text-white"
                  >
                    {ROOM_LABELS[r]}
                  </Link>
                ))}
              </div>
            </div>

            {/* Примеры планировок */}
            <div className="mt-9">
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-bold tracking-[-0.02em]">Планировки и цены</h2>
                <span className="text-sm text-ink-3">примеры из продаж</span>
              </div>
              <div className="mt-4 overflow-hidden rounded-[var(--radius-card)] border border-line">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface-2 text-xs tracking-wide text-ink-3 uppercase">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold md:px-6">
                        Квартира
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold md:px-6">
                        Площадь
                      </th>
                      <th scope="col" className="hidden px-4 py-3 font-semibold sm:table-cell md:px-6">
                        Этаж
                      </th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold md:px-6">
                        Цена
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line bg-white">
                    {apartments.map((a, i) => (
                      <tr key={i} className="transition-colors hover:bg-surface-2">
                        <td className="px-4 py-3.5 font-semibold text-ink md:px-6">
                          {ROOM_LABELS[a.rooms]}
                        </td>
                        <td className="px-4 py-3.5 text-ink-2 md:px-6">{a.area} м²</td>
                        <td className="hidden px-4 py-3.5 text-ink-2 sm:table-cell md:px-6">
                          {a.floor} этаж
                        </td>
                        <td className="px-4 py-3.5 text-right font-bold text-ink md:px-6">
                          {formatPrice(a.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-ink-3">
                Примеры планировок приведены для демонстрации. Актуальный список квартир и цены
                уточняйте в отделе продаж.
              </p>
            </div>

            {/* Ипотека */}
            <div className="mt-9 rounded-[var(--radius-card)] border border-line bg-surface-2 p-6">
              <h2 className="text-xl font-bold tracking-[-0.02em]">Ипотека на квартиру в {project.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-3">
                Семейная ипотека от 6%, IT-ипотека и стандартные программы банков-партнёров.
                Первоначальный взнос — от 15%. Срок кредита — до 30 лет.
              </p>
              <Link
                href="/mortgage"
                className="mt-5 inline-flex h-11 items-center rounded-xl bg-pik px-5 text-sm font-semibold text-white transition-colors hover:bg-pik-dark"
              >
                Рассчитать платёж
              </Link>
            </div>
          </div>

          {/* Правая колонка — заявка */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[var(--radius-card)] border border-line bg-white p-6">
              <p className="text-sm text-ink-3">Квартиры в продаже</p>
              <p className="mt-1 text-[2rem] leading-none font-bold tracking-[-0.04em] text-pik">
                от {formatPrice(project.priceFrom)}
              </p>

              <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-ink-3">Класс</dt>
                  <dd className="font-semibold text-ink">{CLASS_LABELS[project.klass]}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-ink-3">Срок сдачи</dt>
                  <dd className="font-semibold text-ink">{project.deadline}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-ink-3">До транспорта</dt>
                  <dd className="font-semibold text-ink">{project.walkMin} мин</dd>
                </div>
              </dl>

              <div className="mt-5">
                <CallbackForm
                  title="Записаться на просмотр"
                  subtitle="Покажем квартиры, планировки и рассчитаем ипотеку."
                />
              </div>

              <a
                href={SITE.phoneHref}
                className="mt-4 flex h-12 items-center justify-center rounded-2xl border border-line-strong text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Похожие проекты */}
        {similar.length > 0 && (
          <section className="mt-16 md:mt-24">
            <h2 className="headline text-[1.75rem] md:text-[2.5rem]">Похожие проекты</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
              {similar.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

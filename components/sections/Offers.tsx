import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const OFFERS = [
  {
    title: "Машиноместа",
    text: "В подземном паркинге жилых кварталов ПИК — с видеонаблюдением и зарядками для электромобилей.",
    image: "/media/content/offer-cars.jpg",
    href: "/projects",
  },
  {
    title: "Коммерческие помещения",
    text: "Свободные назначения и помещения под ритейл в жилых кварталах: кофейни, студии, мастерские.",
    image: "/media/content/offer-business.jpg",
    href: "/contacts",
  },
];

/** «Кроме квартир» */
export function Offers() {
  return (
    <section className="container-page section-pad">
      <SectionHeading
        title="Машиноместа и помещения"
        description="Всё, что делает жизнь в квартале удобнее — с покупкой у одного застройщика."
      />

      <div className="grid gap-4 lg:grid-cols-2 xl:gap-6">
        {OFFERS.map((o, i) => (
          <Reveal key={o.title} delay={i * 70}>
            <Link
              href={o.href}
              className="group relative flex h-full min-h-[280px] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] bg-ink"
            >
              <SafeImage
                src={o.image}
                alt={o.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-75 transition-opacity duration-700 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="relative p-6">
                <h3 className="text-xl font-bold tracking-[-0.02em] text-white md:text-2xl">{o.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75">{o.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Смотреть
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

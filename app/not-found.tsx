import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="headline text-[5rem] leading-none font-bold tracking-[-0.05em] text-pik md:text-[8rem]">
        404
      </p>
      <h1 className="headline mt-2 text-[1.75rem] md:text-[2.5rem]">Страница не найдена</h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-ink-3">
        Возможно, страница была перемещена или адрес введён с ошибкой. Посмотрите каталог проектов
        или вернитесь на главную.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/projects" size="lg">
          Каталог проектов
        </ButtonLink>
        <ButtonLink href="/" size="lg" variant="outline">
          На главную
        </ButtonLink>
      </div>

      <p className="mt-10 text-sm text-ink-3">
        Или позвоните нам:{" "}
        <a href="tel:+78005000020" className="font-semibold text-ink hover:text-pik">
          8 800 500-00-20
        </a>
      </p>

      <p className="mt-6 text-xs text-ink-3">
        <Link href="/contacts" className="underline-offset-2 hover:text-pik hover:underline">
          Контакты отделов продаж
        </Link>
      </p>
    </div>
  );
}

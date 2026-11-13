"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";

/** Галерея фотографий проекта: лента с миниатюрами, стрелками и клавиатурой */
export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((i: number) => {
    const strip = stripRef.current;
    if (!strip) return;
    const child = strip.children[i] as HTMLElement | undefined;
    if (child) strip.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
  }, []);

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(images.length - 1, next));
      setIndex(clamped);
      scrollTo(clamped);
    },
    [images.length, scrollTo],
  );

  // Синхронизация индекса со скроллом ленты
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const children = Array.from(strip.children) as HTMLElement[];
        const x = strip.scrollLeft;
        let best = 0;
        let bestDist = Infinity;
        children.forEach((c, i) => {
          const d = Math.abs(c.offsetLeft - x);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setIndex(best);
      });
    };
    strip.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      strip.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="group/gallery">
      {/* Крупное фото */}
      <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-surface-2">
        <div
          ref={stripRef}
          className="snap-x-strip flex h-[260px] overflow-x-auto sm:h-[380px] md:h-[520px]"
          tabIndex={0}
          role="group"
          aria-roledescription="карусель"
          aria-label={`Фотографии квартала ${name}`}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              go(index + 1);
            }
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              go(index - 1);
            }
          }}
        >
          {images.map((src, i) => (
            <div key={src} className="relative h-full w-full shrink-0">
              <SafeImage
                src={src}
                alt={`${name} — фото ${i + 1} из ${images.length}`}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Счётчик */}
        <div className="pointer-events-none absolute top-4 right-4 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {index + 1} / {images.length}
        </div>

        {/* Стрелки */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label="Предыдущее фото"
              className="absolute top-1/2 left-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white/90 text-ink backdrop-blur transition-all hover:bg-white disabled:pointer-events-none disabled:opacity-0 md:left-5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m14 6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              disabled={index === images.length - 1}
              aria-label="Следующее фото"
              className="absolute top-1/2 right-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white/90 text-ink backdrop-blur transition-all hover:bg-white disabled:pointer-events-none disabled:opacity-0 md:right-5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m10 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Миниатюры */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Фото ${i + 1}`}
              aria-current={i === index}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all md:h-20 md:w-32 ${
                i === index ? "border-pik" : "border-transparent opacity-65 hover:opacity-100"
              }`}
            >
              <SafeImage src={src} alt="" fill sizes="128px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

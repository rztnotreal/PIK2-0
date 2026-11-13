"use client";

import { useEffect, useRef, useState } from "react";

const VIDEOS = [
  "/videos/hero-strogino.mp4",
  "/videos/hero-plus-series.mp4",
  "/videos/hero-windows.mp4",
  "/videos/hero-privacy.mp4",
  "/videos/hero-pikplus.mp4",
];

/** Минимальная/максимальная длительность показа одного видео */
const MIN_MS = 4000;
const MAX_MS = 15000;
const FALLBACK_MS = 7000;

/** Ширина, начиная с которой показывается видео ( Tailwind md ) */
const DESKTOP_MQ = "(min-width: 768px)";

/**
 * Фоновое видео-слайд-шоу героя: без звука, все видео одного размера
 * (object-cover во весь блок). Играет только активное видео, переключение —
 * плавный кроссфейд по длительности каждого ролика (из loadedMetadata).
 *
 * На мобильных видео не рендерится вовсе (никакого трафика) — остаётся
 * сплошной фон #141414 ( bg-ink у hero-секции ).
 */
export function HeroVideoShow({ poster }: { poster: string }) {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [active, setActive] = useState(0);
  const [durations, setDurations] = useState<Record<number, number>>({});
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Десктоп: видео показываем, на мобильных — ничего не рендерим
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Настройка пользователя «уменьшить движение»: без ротации и автоплея
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Играет только активное видео, остальные на паузе
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === active && !reducedMotion) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [active, reducedMotion]);

  // Ротация по длительности активного видео (clamp, fallback — пока не загрузилась метадата)
  useEffect(() => {
    if (!isDesktop || reducedMotion) return;
    const durationMs = durations[active] ? durations[active] * 1000 : FALLBACK_MS;
    const slotMs = Math.min(Math.max(durationMs, MIN_MS), MAX_MS);
    const timer = window.setTimeout(() => setActive((i) => (i + 1) % VIDEOS.length), slotMs);
    return () => window.clearTimeout(timer);
  }, [active, durations, reducedMotion, isDesktop]);

  // На мобильных видео нет — остаётся сплошной фон #141414
  if (!isDesktop) return null;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          className={`video-slide absolute h-full w-full object-cover${i === active ? " is-active" : ""}`}
          src={src}
          poster={i === 0 ? poster : undefined}
          muted
          loop
          playsInline
          preload={i === 0 ? "auto" : "metadata"}
          onLoadedMetadata={(e) => {
            const duration = e.currentTarget.duration;
            if (Number.isFinite(duration) && duration > 0) {
              setDurations((d) => (d[i] === duration ? d : { ...d, [i]: duration }));
            }
          }}
        />
      ))}
    </div>
  );
}

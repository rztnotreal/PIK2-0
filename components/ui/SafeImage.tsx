"use client";

import Image from "next/image";
import { useState } from "react";
import { LogoMark } from "@/components/Logo";

/**
 * Изображение с мягким фолбэком: если файл недоступен,
 * вместо битой картинки показывается фирменная заглушка.
 */
export function SafeImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  fill = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#f6f6f6_0%,#ededed_55%,#f6f6f6_100%)] ${className}`}
        role="img"
        aria-label={alt}
      >
        {/* Мягкий оранжевый акцент в углу — фирменная заглушка */}
        <span
          className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-pik/10 blur-2xl"
          aria-hidden="true"
        />
        <span className="relative flex flex-col items-center gap-1.5">
          <LogoMark className="h-4 w-auto text-pik/70" />
          <span className="text-[11px] font-semibold tracking-[0.12em] text-ink-3/70 uppercase">
            Фото скоро
          </span>
        </span>
      </div>
    );
  }

  return fill ? (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}

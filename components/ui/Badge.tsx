import type { ReactNode } from "react";

type Tone = "default" | "pik" | "success" | "dark" | "soft";

const TONES: Record<Tone, string> = {
  default: "bg-surface-2 text-ink-2 border-line",
  pik: "bg-pik-soft text-pik border-pik/20",
  success: "bg-[#eaf7ef] text-success border-success/20",
  dark: "bg-ink text-white border-ink",
  soft: "bg-white/90 text-ink-2 border-white/60 backdrop-blur",
};

export function Badge({
  children,
  tone = "default",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-[-0.01em] ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

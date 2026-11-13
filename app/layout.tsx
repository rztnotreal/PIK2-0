import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SITE } from "@/data/site";
import "./globals.css";

/**
 * Graphik LCG — шрифт ПИК (локальные woff из app/fonts).
 * Начертания: Regular 400, Medium 500, Semibold 600.
 * Для веса 700 (font-bold, .headline) браузер берёт ближайшее — Semibold.
 */
const graphik = localFont({
  src: [
    { path: "./fonts/GraphikLCGRegular.woff", weight: "400", style: "normal" },
    { path: "./fonts/GraphikLCGMedium.woff", weight: "500", style: "normal" },
    { path: "./fonts/GraphikLCGSemibold.woff", weight: "600", style: "normal" },
  ],
  variable: "--font-graphik",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://piknew.vercel.app"),
  title: {
    default: `${SITE.name} — ${SITE.tagline}: квартиры в новостройках`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "ПИК",
    "новостройки",
    "квартиры в новостройках",
    "ипотека",
    "девелопер",
    "Москва",
    "жилые кварталы",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FC4C02",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={graphik.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-xl focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Перейти к содержимому
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

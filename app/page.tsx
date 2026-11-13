import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Directions, Infrastructure } from "@/components/sections/CompanySections";
import { Offers } from "@/components/sections/Offers";
import { News } from "@/components/sections/News";
import { MortgageBlock, RegionsCta } from "@/components/sections/MortgageBlock";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}: квартиры в новостройках`,
  description: SITE.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Directions />
      <Offers />
      <Infrastructure />
      <MortgageBlock />
      <News />
      <RegionsCta />
    </>
  );
}

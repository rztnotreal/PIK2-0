import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { FEATURED_PROJECTS } from "@/data/projects";

export function FeaturedProjects() {
  const items = FEATURED_PROJECTS.slice(0, 6);

  return (
    <section className="container-page section-pad">
      <SectionHeading
        title="Популярные кварталы ПИК"
        description="Дворы без машин, школы и детские сады внутри квартала, умные планировки и отделка от застройщика."
        action={
          <ButtonLink href="/projects" variant="outline" size="lg">
            Все проекты →
          </ButtonLink>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
        {items.map((p, i) => (
          <Reveal key={p.slug} delay={i * 60}>
            <ProjectCard project={p} priority={i < 3} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

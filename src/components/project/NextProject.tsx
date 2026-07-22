import Link from "next/link";
import type { Project } from "@/src/content/projects";
import { ProjectPlaceholder } from "@/src/components/ui/ProjectPlaceholder";

export function NextProject({ project }: { project: Project }) {
  return (
    <section className="next-project" aria-labelledby="next-project-title">
      <p className="eyebrow">next folder</p>
      <Link href={`/work/${project.slug}`}>
        <div className="next-project__image">
          <ProjectPlaceholder project={project} variant="wide" />
        </div>
        <div className="next-project__label">
          <h2 id="next-project-title">{project.title}</h2>
          <span aria-hidden="true">↗</span>
        </div>
      </Link>
    </section>
  );
}

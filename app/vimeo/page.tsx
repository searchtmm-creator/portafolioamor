import Link from "next/link";
import { projects } from "@/src/content/projects";
import { ProjectPlaceholder } from "@/src/components/ui/ProjectPlaceholder";

export const metadata = {
  title: "Vimeo & films",
  description: "Selected advertising films from the work archive.",
};

export default function VimeoPage() {
  const films = projects.filter((project) => project.externalVideoUrl);

  return (
    <main className="films-page" id="main-content">
      <header className="films-page__header">
        <p className="eyebrow">moving image · selection 01—05</p>
        <h1>Films, sounds &amp; characters.</h1>
        <p>
          Five links are already filed. The rest of the reel will join them as
          it arrives.
        </p>
      </header>
      <div className="film-index">
        {films.map((project, index) => (
          <article className="film-index__item" key={project.slug}>
            <Link href={`/work/${project.slug}`}>
              <ProjectPlaceholder project={project} variant="wide" />
              <div className="film-index__meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{project.title}</h2>
                <span aria-hidden="true">watch ↗</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

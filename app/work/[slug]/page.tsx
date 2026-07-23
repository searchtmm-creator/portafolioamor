import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectVideo } from "@/src/components/project/ProjectVideo";
import { getNextProject, getProject, projects } from "@/src/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description:
      project.synopsis ??
      `${project.title} — project in the executive production work archive.`,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = getNextProject(project.slug);

  return (
    <main
      className={`project-page project-page--${project.accent}`}
      id="main-content"
    >
      <nav className="project-bar" aria-label="Project navigation">
        <Link href="/#work-board">← back to work</Link>
        <span>
          {String(index + 1).padStart(2, "0")} / {projects.length}
        </span>
        <div>
          <Link
            href={`/work/${previous.slug}`}
            aria-label={`Previous project: ${previous.title}`}
          >
            prev
          </Link>
          <Link
            href={`/work/${next.slug}`}
            aria-label={`Next project: ${next.title}`}
          >
            next
          </Link>
        </div>
      </nav>
      <header className="project-hero">
        <p className="project-hero__brand">
          {project.client ?? "Brand pending"}
        </p>
        <h1>{project.title}</h1>
        {project.synopsis ? (
          <p className="project-hero__description">{project.synopsis}</p>
        ) : null}
      </header>
      <ProjectVideo project={project} />
      {project.gallery.length ? (
        <section
          className="project-stills"
          aria-label={`${project.title} stills`}
        >
          <div className="contact-sheet">
            {project.gallery.map((image) => (
              <figure key={image.src}>
                {/* Assets are pre-sized during import and served directly. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

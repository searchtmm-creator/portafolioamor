import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NextProject } from "@/src/components/project/NextProject";
import { ProjectVideo } from "@/src/components/project/ProjectVideo";
import { ProjectPlaceholder } from "@/src/components/ui/ProjectPlaceholder";
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
    description: `${project.title} — project in the executive production work archive.`,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = getNextProject(slug);

  return (
    <main
      className={`project-page project-page--${project.accent}`}
      id="main-content"
    >
      <nav className="project-bar" aria-label="Project navigation">
        <Link href="/">← back to work</Link>
        <span>{String(index + 1).padStart(2, "0")} / 16</span>
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
        <p className="eyebrow">
          production folder · {String(index + 1).padStart(2, "0")}
        </p>
        <h1>{project.title}</h1>
        <div className="project-hero__still">
          <ProjectPlaceholder project={project} variant="wide" />
          <span className="project-hero__note" aria-hidden="true">
            open the film ↓
          </span>
        </div>
      </header>
      <ProjectVideo project={project} />
      <section className="project-notes" aria-labelledby="project-notes-title">
        <div>
          <p className="eyebrow">production notes</p>
          <h2 id="project-notes-title">The folder is open.</h2>
        </div>
        <p>
          Project details, production approach and credits have not been
          supplied yet. This page is ready to reveal them without publishing
          unverified information.
        </p>
      </section>
      <section className="gallery-placeholder" aria-labelledby="gallery-title">
        <p className="eyebrow">contact sheet</p>
        <h2 id="gallery-title">Stills to be filed</h2>
        <div className="contact-sheet" aria-hidden="true">
          {[1, 2, 3].map((item) => (
            <div key={item}>
              <span>
                {project.initials} / 0{item}
              </span>
            </div>
          ))}
        </div>
      </section>
      <NextProject project={next} />
    </main>
  );
}

import type { Project } from "@/src/content/projects";

export function ProjectPlaceholder({
  project,
  variant = "cover",
}: {
  project: Project;
  variant?: "cover" | "wide";
}) {
  const artwork =
    variant === "wide" ? (project.poster ?? project.cover) : project.cover;

  return (
    <div
      className={`project-placeholder project-placeholder--${project.accent} project-placeholder--${variant}`}
    >
      {artwork ? (
        // Assets are pre-sized during import and served directly by the site.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="project-artwork"
          src={artwork}
          alt={`${project.client ? `${project.client} — ` : ""}${project.title}`}
          loading={variant === "cover" ? "lazy" : "eager"}
          decoding="async"
        />
      ) : (
        <>
          <span className="placeholder-grid" aria-hidden="true" />
          <span className="placeholder-initials" aria-hidden="true">
            {project.initials}
          </span>
          <span className="placeholder-title">{project.title}</span>
          <span className="placeholder-stamp" aria-hidden="true">
            still pending
          </span>
        </>
      )}
    </div>
  );
}

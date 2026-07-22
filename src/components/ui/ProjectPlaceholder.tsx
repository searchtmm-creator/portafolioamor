import type { Project } from "@/src/content/projects";

export function ProjectPlaceholder({
  project,
  variant = "cover",
}: {
  project: Project;
  variant?: "cover" | "wide";
}) {
  return (
    <div
      className={`project-placeholder project-placeholder--${project.accent} project-placeholder--${variant}`}
      role="img"
      aria-label={`Artwork placeholder for ${project.title}`}
    >
      <span className="placeholder-grid" aria-hidden="true" />
      <span className="placeholder-initials" aria-hidden="true">
        {project.initials}
      </span>
      <span className="placeholder-title">{project.title}</span>
      <span className="placeholder-stamp" aria-hidden="true">
        still pending
      </span>
    </div>
  );
}

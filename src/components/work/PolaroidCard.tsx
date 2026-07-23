"use client";

import Link from "next/link";
import type { CSSProperties, MouseEvent } from "react";
import type { Project } from "@/src/content/projects";
import { ProjectPlaceholder } from "@/src/components/ui/ProjectPlaceholder";

type PolaroidStyle = CSSProperties & {
  "--desktop-x": string;
  "--desktop-y": string;
  "--tablet-x": string;
  "--tablet-y": string;
  "--rotation": string;
  "--tablet-rotation": string;
  "--mobile-rotation": string;
  "--scale": number;
};

const magnetShapes = ["smiley", "rainbow", "heart", "daisy"] as const;

export function PolaroidCard({
  project,
  index,
  wasDragged,
}: {
  project: Project;
  index: number;
  wasDragged: () => boolean;
}) {
  const { desktop, tablet, mobile } = project.polaroidLayout;
  const style: PolaroidStyle = {
    "--desktop-x": `${desktop.x}%`,
    "--desktop-y": `${desktop.y}%`,
    "--tablet-x": `${tablet.x}%`,
    "--tablet-y": `${tablet.y}%`,
    "--rotation": `${desktop.rotation}deg`,
    "--tablet-rotation": `${tablet.rotation}deg`,
    "--mobile-rotation": `${mobile?.rotation ?? 0}deg`,
    "--scale": desktop.scale ?? 1,
  };

  const guardClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (wasDragged()) event.preventDefault();
  };

  return (
    <Link
      href={`/work/${project.slug}`}
      className="polaroid"
      style={style}
      data-polaroid
      data-slug={project.slug}
      data-testid="polaroid"
      onClick={guardClick}
      aria-label={`Open project ${project.title}`}
    >
      <span
        className={`magnet magnet--${magnetShapes[index % magnetShapes.length]}`}
        aria-hidden="true"
      />
      <span className="polaroid__image">
        <ProjectPlaceholder project={project} />
      </span>
      <span className="polaroid__caption">
        <span className="polaroid__brand">
          {[project.client, project.contentType].filter(Boolean).join(" · ") ||
            "brand pending"}
        </span>
        <strong>{project.title}</strong>
        {project.externalVideoUrl ? (
          <span className="polaroid__status">film attached</span>
        ) : (
          <span className="polaroid__status">stills pending</span>
        )}
      </span>
    </Link>
  );
}

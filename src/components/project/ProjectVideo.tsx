"use client";

import { useState } from "react";
import type { Project } from "@/src/content/projects";
import { getVideoEmbed } from "@/src/lib/video";
import { ProjectPlaceholder } from "@/src/components/ui/ProjectPlaceholder";

export function ProjectVideo({ project }: { project: Project }) {
  const [playing, setPlaying] = useState(false);
  const video = getVideoEmbed(project.vimeoId, project.externalVideoUrl);

  if (!video) {
    return (
      <section
        className="film-block film-block--empty"
        aria-labelledby="film-title"
      >
        <p className="eyebrow">film</p>
        <h2 id="film-title">Film link pending</h2>
        <p>
          The project is catalogued. Its film will be attached when the final
          link is available.
        </p>
      </section>
    );
  }

  return (
    <section className="film-block" aria-labelledby="film-title">
      <div className="film-heading">
        <p className="eyebrow">film · click to load</p>
        <h2 id="film-title">Watch the work</h2>
      </div>
      <div className="film-frame">
        {playing ? (
          <iframe
            src={video.embedUrl}
            title={`${project.title} film on ${video.provider}`}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
          />
        ) : (
          <button
            className="film-poster"
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play film: ${project.title}`}
          >
            <ProjectPlaceholder project={project} variant="wide" />
            <span className="play-button" aria-hidden="true">
              play film ↗
            </span>
          </button>
        )}
      </div>
      <a
        className="text-link"
        href={project.externalVideoUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        open original link <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}

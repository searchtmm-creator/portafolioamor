"use client";

import { useState } from "react";
import type { Project } from "@/src/content/projects";
import { getVideoEmbed } from "@/src/lib/video";

export function ProjectVideo({ project }: { project: Project }) {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const primaryVideo = getVideoEmbed(project.vimeoId, project.externalVideoUrl);
  const videos = [
    primaryVideo,
    ...(project.additionalVideos ?? []).map((video) =>
      getVideoEmbed(undefined, video.url),
    ),
  ].filter((video): video is NonNullable<typeof video> => Boolean(video));

  if (!videos.length) {
    return (
      <section className="film-block film-block--empty" aria-label="Video">
        <p>Video coming soon</p>
      </section>
    );
  }

  return (
    <section className="film-block" aria-label={`${project.title} videos`}>
      <div className="video-stack">
        {videos.map((video, index) => {
          const thumbnail = project.poster ?? project.gallery[0]?.src;
          return (
            <div className="film-frame" key={video.embedUrl}>
              {playingIndex === index ? (
                <iframe
                  src={video.embedUrl}
                  title={`${project.title} video ${index + 1} on ${video.provider}`}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  loading="eager"
                  allowFullScreen
                />
              ) : (
                <button
                  className={`film-poster film-poster--${project.accent}`}
                  type="button"
                  onClick={() => setPlayingIndex(index)}
                  aria-label={`Play video: ${project.title}${
                    videos.length > 1 ? ` ${index + 1}` : ""
                  }`}
                >
                  {thumbnail ? (
                    // Assets are pre-sized during import and served directly.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="film-poster__image"
                      src={thumbnail}
                      alt=""
                      loading="eager"
                      decoding="async"
                      fetchPriority={index === 0 ? "high" : "auto"}
                    />
                  ) : null}
                  <span className="play-button" aria-hidden="true">
                    click to play
                  </span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

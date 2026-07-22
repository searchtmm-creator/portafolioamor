export type VideoProvider = "vimeo" | "youtube";

export function getVideoEmbed(
  vimeoId?: string,
  externalVideoUrl?: string,
): { provider: VideoProvider; embedUrl: string } | null {
  if (vimeoId) {
    return {
      provider: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`,
    };
  }

  if (!externalVideoUrl) return null;
  try {
    const url = new URL(externalVideoUrl);
    const youtubeId = url.searchParams.get("v");
    if (
      youtubeId &&
      ["youtube.com", "www.youtube.com"].includes(url.hostname)
    ) {
      return {
        provider: "youtube",
        embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`,
      };
    }
  } catch {
    return null;
  }
  return null;
}

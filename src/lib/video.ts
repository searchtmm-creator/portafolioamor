export type VideoProvider = "vimeo" | "youtube";

export function getVideoEmbed(
  vimeoId?: string,
  externalVideoUrl?: string,
): { provider: VideoProvider; embedUrl: string } | null {
  if (vimeoId) {
    return {
      provider: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0&autoplay=1`,
    };
  }

  if (!externalVideoUrl) return null;
  try {
    const url = new URL(externalVideoUrl);
    const youtubeId =
      url.searchParams.get("v") ||
      (url.hostname === "youtu.be" ? url.pathname.split("/")[1] : null);
    if (
      youtubeId &&
      ["youtube.com", "www.youtube.com", "youtu.be"].includes(url.hostname)
    ) {
      return {
        provider: "youtube",
        embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&autoplay=1`,
      };
    }
    if (["vimeo.com", "www.vimeo.com"].includes(url.hostname)) {
      const externalVimeoId = url.pathname
        .split("/")
        .find((segment) => /^\d+$/.test(segment));
      if (externalVimeoId) {
        return {
          provider: "vimeo",
          embedUrl: `https://player.vimeo.com/video/${externalVimeoId}?title=0&byline=0&portrait=0&autoplay=1`,
        };
      }
    }
  } catch {
    return null;
  }
  return null;
}

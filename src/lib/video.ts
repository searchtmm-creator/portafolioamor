export type VideoProvider = "vimeo" | "youtube";

const vimeoEmbed = (id: string) =>
  `https://player.vimeo.com/video/${id}?autoplay=1&autopause=0&playsinline=1&dnt=1&title=0&byline=0&portrait=0`;

const youtubeEmbed = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1&rel=0`;

export function getVideoEmbed(
  vimeoId?: string,
  externalVideoUrl?: string,
): { provider: VideoProvider; embedUrl: string } | null {
  if (vimeoId) {
    return {
      provider: "vimeo",
      embedUrl: vimeoEmbed(vimeoId),
    };
  }

  if (!externalVideoUrl) return null;
  try {
    const url = new URL(externalVideoUrl);
    const youtubeId =
      url.searchParams.get("v") ||
      (url.hostname === "youtu.be" ? url.pathname.split("/")[1] : null) ||
      (["/embed/", "/shorts/"].some((prefix) =>
        url.pathname.startsWith(prefix),
      )
        ? url.pathname.split("/")[2]
        : null);
    if (
      youtubeId &&
      ["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"].includes(
        url.hostname,
      )
    ) {
      return {
        provider: "youtube",
        embedUrl: youtubeEmbed(youtubeId),
      };
    }
    if (["vimeo.com", "www.vimeo.com"].includes(url.hostname)) {
      const externalVimeoId = url.pathname
        .split("/")
        .find((segment) => /^\d+$/.test(segment));
      if (externalVimeoId) {
        return {
          provider: "vimeo",
          embedUrl: vimeoEmbed(externalVimeoId),
        };
      }
    }
  } catch {
    return null;
  }
  return null;
}

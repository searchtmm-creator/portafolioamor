export const siteConfig = {
  name: "[NOMBRE DE LA PRODUCTORA]",
  role: "Executive Producer / Advertising",
  email: "[EMAIL]",
  location: "[CIUDAD]",
  vimeoUrl: "[VIMEO_URL]",
  instagramUrl: "[INSTAGRAM_URL]",
  intro: "Producing ideas people remember.",
  bio: "Executive producer working across advertising, branded content and film production.",
  bioIsPlaceholder: true,
  reelComingSoon: "More films are joining the archive soon.",
} as const;

export const isConfiguredValue = (value: string) =>
  Boolean(value && !value.startsWith("["));

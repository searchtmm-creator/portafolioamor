export const siteConfig = {
  name: "Nicole Borja",
  role: "Executive Producer — Advertising & Music Videos",
  roleTitle: "Executive Producer",
  roleFocus: "Advertising & Music Videos",
  email: "borja.nicole9704@gmail.com",
  phone: "+52 555 500 1653",
  phoneHref: "+525555001653",
  location: "[CITY]",
  instagramUrl: "[INSTAGRAM_URL]",
  intro: "Producing work people remember.",
  bio: "I’m an executive producer working across advertising, branded content, and music videos—bringing ambitious ideas to life with the right people.",
  bioIsPlaceholder: false,
  reelComingSoon: "More films are joining the archive soon.",
} as const;

export const isConfiguredValue = (value: string) =>
  Boolean(value && !value.startsWith("["));

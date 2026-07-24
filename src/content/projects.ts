export type ProjectImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  slug: string;
  title: string;
  client?: string;
  contentType?: string;
  synopsis?: string;
  cover?: string;
  poster?: string;
  gallery: ProjectImage[];
  vimeoId?: string;
  externalVideoUrl?: string;
  additionalVideos?: ProjectLink[];
  featured?: boolean;
  accent: "rose" | "tomato" | "cobalt" | "lemon" | "peach";
  initials: string;
  polaroidLayout: {
    desktop: { x: number; y: number; rotation: number; scale?: number };
    tablet: { x: number; y: number; rotation: number; scale?: number };
    mobile?: { rotation: number };
  };
};

type ProjectSeed = Omit<Project, "gallery" | "featured" | "polaroidLayout"> & {
  gallery?: ProjectImage[];
};

const assetVersion = "20260724";

const imageSet = (slug: string, title: string, posterNumber = 1) => ({
  cover: `/projects/${slug}/cover-${assetVersion}.jpg`,
  poster: `/projects/${slug}/still-${posterNumber}-${assetVersion}.jpg`,
  gallery: [1, 2, 3].map((number) => ({
    src: `/projects/${slug}/still-${number}-${assetVersion}.jpg`,
    alt: `${title} — still ${number}`,
  })),
});

const project = (
  seed: ProjectSeed,
  desktop: Project["polaroidLayout"]["desktop"],
  tablet: Project["polaroidLayout"]["tablet"],
): Project => ({
  ...seed,
  gallery: seed.gallery ?? [],
  featured: Boolean(seed.vimeoId || seed.externalVideoUrl),
  polaroidLayout: {
    desktop,
    tablet,
    mobile: { rotation: Math.max(-3, Math.min(3, desktop.rotation / 2)) },
  },
});

export const projects: Project[] = [
  project(
    {
      slug: "old-spice-no-seas-paloma",
      title: "No Seas Paloma",
      client: "Old Spice",
      contentType: "Film",
      initials: "OS",
      accent: "tomato",
      synopsis:
        "We shot a surreal film with celebrated footballer Luis Advíncula.",
      externalVideoUrl: "https://www.youtube.com/watch?v=Qfj4gO_qo3M",
      ...imageSet("old-spice-no-seas-paloma", "No Seas Paloma"),
    },
    { x: 3, y: 4, rotation: -5, scale: 1.03 },
    { x: 3, y: 3, rotation: -4 },
  ),
  project(
    {
      slug: "ke-personajes-nos-prometimos",
      title: "Nos Prometimos",
      client: "Ke Personajes",
      contentType: "Music Video",
      initials: "KP",
      accent: "cobalt",
      synopsis:
        "We produced a music video for one of Argentina’s leading cumbia bands.",
      externalVideoUrl: "https://www.youtube.com/watch?v=h2JNzqyVYVE",
      ...imageSet("ke-personajes-nos-prometimos", "Nos Prometimos", 3),
      cover:
        "/projects/ke-personajes-nos-prometimos/cover-20260724-v2.jpg",
    },
    { x: 30, y: 7, rotation: 4 },
    { x: 38, y: 5, rotation: 3 },
  ),
  project(
    {
      slug: "jeffry-fischman-alejandome",
      title: "Alejándome de Ti",
      client: "Jeffry Fischman",
      contentType: "Music Video",
      initials: "JF",
      accent: "rose",
      synopsis:
        "We produced a music video for an MTV Award winner and founding member of Libido.",
      externalVideoUrl: "https://www.youtube.com/watch?v=wQkMVzPT1Qg",
      ...imageSet("jeffry-fischman-alejandome", "Alejándome de Ti", 3),
    },
    { x: 50, y: 3, rotation: -3, scale: 1.06 },
    { x: 67, y: 3, rotation: -2 },
  ),
  project(
    {
      slug: "bbva-la-quincena-del-ahorro",
      title: "La Quincena del Ahorro",
      client: "BBVA",
      contentType: "Film",
      initials: "BB",
      accent: "lemon",
      synopsis:
        "We transformed a simple promotion into an exciting reward: open an account and receive a gift automatically.",
      vimeoId: "1084344683",
      externalVideoUrl: "https://vimeo.com/1084344683",
      ...imageSet("bbva-la-quincena-del-ahorro", "La Quincena del Ahorro"),
    },
    { x: 78, y: 6, rotation: 5 },
    { x: 5, y: 21, rotation: 4 },
  ),
  project(
    {
      slug: "yape-hermanos-yapean",
      title: "Hermanos Yapean",
      client: "Yape",
      contentType: "Film",
      initials: "HY",
      accent: "peach",
      synopsis:
        "We told the story of how the iconic orchestra Hermanos Yaipén changed its name to match Yape, the payments app.",
      vimeoId: "1212226822",
      externalVideoUrl: "https://vimeo.com/1212226822",
      ...imageSet("yape-hermanos-yapean", "Hermanos Yapean"),
    },
    { x: 6, y: 30, rotation: -6, scale: 1.08 },
    { x: 35, y: 19, rotation: -5 },
  ),
  project(
    {
      slug: "puma-camiseta-sporting-cristal",
      title: "Camiseta 88’ Sporting Cristal",
      client: "PUMA",
      contentType: "Film",
      initials: "PS",
      accent: "rose",
      synopsis:
        "We helped relaunch Sporting Cristal’s most anticipated classic jersey.",
      externalVideoUrl: "https://www.youtube.com/watch?v=7G1ibJcfEn4",
      ...imageSet(
        "puma-camiseta-sporting-cristal",
        "Camiseta 88’ Sporting Cristal",
        2,
      ),
    },
    { x: 27, y: 26, rotation: 5 },
    { x: 70, y: 22, rotation: 4 },
  ),
  project(
    {
      slug: "kfc-streat-wear",
      title: "Str-eat Wear",
      client: "KFC",
      contentType: "Activation + Content",
      initials: "SW",
      accent: "cobalt",
      synopsis:
        "We designed and produced a streetwear collection inspired by KFC’s iconic bucket.",
      vimeoId: "877584097",
      externalVideoUrl: "https://vimeo.com/877584097",
      ...imageSet("kfc-streat-wear", "Str-eat Wear", 3),
    },
    { x: 55, y: 29, rotation: 2, scale: 1.07 },
    { x: 2, y: 35, rotation: 2 },
  ),
  project(
    {
      slug: "kfc-lofried-beats",
      title: "LoFried Beats",
      client: "KFC",
      contentType: "Activation + Content",
      initials: "LF",
      accent: "tomato",
      synopsis: "We turned the sounds of fried chicken into LoFi beats.",
      vimeoId: "1007819738",
      externalVideoUrl: "https://vimeo.com/1007819738",
      ...imageSet("kfc-lofried-beats", "LoFried Beats", 2),
    },
    { x: 74, y: 31, rotation: -4 },
    { x: 39, y: 38, rotation: -3 },
  ),
  project(
    {
      slug: "kfc-goodometer",
      title: "Goodometer",
      client: "KFC",
      contentType: "Activation",
      initials: "GO",
      accent: "lemon",
      synopsis:
        "We created an AI model that measured how much better a moment became with KFC, testing it more than 12,000 times at the point of sale.",
      vimeoId: "952131096",
      externalVideoUrl: "https://vimeo.com/952131096",
      ...imageSet("kfc-goodometer", "Goodometer", 2),
    },
    { x: 2, y: 49, rotation: 6 },
    { x: 68, y: 34, rotation: 5 },
  ),
  project(
    {
      slug: "on-no",
      title: "No!",
      client: "On Negocios",
      contentType: "Film",
      initials: "ON",
      accent: "rose",
      synopsis:
        "We turned every “no” into a plot twist. ON is here to turn things around: a new internet brand built for businesses.",
      vimeoId: "1129580010",
      externalVideoUrl: "https://vimeo.com/1129580010",
      ...imageSet("on-no", "No!"),
    },
    { x: 31, y: 54, rotation: -6, scale: 1.06 },
    { x: 6, y: 54, rotation: -5 },
  ),
  project(
    {
      slug: "nestle-sublime-sonrisa",
      title: "Sonrisa",
      client: "Nestlé Sublime",
      contentType: "Film",
      initials: "NS",
      accent: "cobalt",
      synopsis:
        "We showed that Peruvians can recognize the sound of a Sublime chocolate bar without ever seeing it.",
      externalVideoUrl: "https://www.youtube.com/watch?v=-ot6Xjk5cMM",
      ...imageSet("nestle-sublime-sonrisa", "Sonrisa", 3),
    },
    { x: 50, y: 52, rotation: 4 },
    { x: 35, y: 50, rotation: 3 },
  ),
  project(
    {
      slug: "kfc-nugget-sound-test",
      title: "Nugget Sound Test",
      client: "KFC",
      contentType: "Activation + Content",
      initials: "NT",
      accent: "peach",
      synopsis:
        "We invited four artists to taste KFC’s new sauces—without telling them we would turn the sequence of every bite into a musical arrangement.",
      vimeoId: "937817150",
      externalVideoUrl: "https://vimeo.com/937817150",
      ...imageSet("kfc-nugget-sound-test", "Nugget Sound Test", 2),
    },
    { x: 78, y: 50, rotation: -2 },
    { x: 71, y: 54, rotation: -2 },
  ),
  project(
    {
      slug: "gloria-zero-lacto-light",
      title: "Leche Zero Lacto Light",
      client: "Gloria",
      contentType: "Film",
      initials: "GL",
      accent: "tomato",
      synopsis:
        "The milk is so light, the characters begin to float after tasting it.",
      externalVideoUrl: "https://www.youtube.com/watch?v=dZJ_NdeyLwk",
      ...imageSet("gloria-zero-lacto-light", "Leche Zero Lacto Light", 2),
    },
    { x: 6, y: 76, rotation: 5 },
    { x: 2, y: 67, rotation: 4 },
  ),
  project(
    {
      slug: "atlantic-city-milloncity",
      title: "Milloncity",
      client: "Atlantic Casino",
      contentType: "AI Content",
      initials: "AC",
      accent: "rose",
      synopsis:
        "We developed video game–inspired characters for Atlantic Casino’s four ambassadors and produced Peru’s first fully AI-generated commercial of 2025.",
      vimeoId: "1158618206",
      externalVideoUrl: "https://vimeo.com/1158618206",
      ...imageSet("atlantic-city-milloncity", "Milloncity", 3),
    },
    { x: 27, y: 71, rotation: -4, scale: 1.04 },
    { x: 39, y: 70, rotation: -4 },
  ),
  project(
    {
      slug: "kfc-bring-back-the-flow",
      title: "Bring Back The Flow",
      client: "KFC",
      contentType: "Activation + Content",
      initials: "BF",
      accent: "lemon",
      synopsis:
        "FlowGPT sparked controversy with an AI-generated song that imitated Bad Bunny and became TikTok’s most viral audio. After his label removed it from every platform, we brought the flow back in Colonel Sanders’ voice.",
      vimeoId: "1040420207",
      externalVideoUrl: "https://vimeo.com/1040420207",
      ...imageSet("kfc-bring-back-the-flow", "Bring Back The Flow", 2),
    },
    { x: 55, y: 75, rotation: 3 },
    { x: 67, y: 66, rotation: 3 },
  ),
  project(
    {
      slug: "atun-florida-indispensables",
      title: "Indispensables",
      client: "Atún Florida",
      contentType: "Film",
      initials: "AF",
      accent: "cobalt",
      synopsis:
        "To celebrate its 70th anniversary, Florida launched Indispensables, a campaign by Digitas Peru that reaffirmed the brand’s place in Peruvian pantries and refreshed its story.",
      externalVideoUrl: "https://www.youtube.com/watch?v=tJwoyaBXbqI",
      ...imageSet("atun-florida-indispensables", "Indispensables", 2),
    },
    { x: 75, y: 73, rotation: -5 },
    { x: 38, y: 80, rotation: -4 },
  ),
];

const legacyProjectSlugs: Record<string, string> = {
  "old-spice": "old-spice-no-seas-paloma",
  "ke-personajes-video": "ke-personajes-nos-prometimos",
  jeffry: "jeffry-fischman-alejandome",
  "bbva-nomina": "bbva-la-quincena-del-ahorro",
  "bbva-quincena-del-ahorro": "bbva-la-quincena-del-ahorro",
  "hermanos-yapean": "yape-hermanos-yapean",
  "kfc-streetwear": "kfc-streat-wear",
  lofibeats: "kfc-lofried-beats",
  "kfc-nuggets-sound-test": "kfc-nugget-sound-test",
  "leche-gloria": "gloria-zero-lacto-light",
  "atlantic-video": "atlantic-city-milloncity",
  "atun-florida": "atun-florida-indispensables",
};

export const getProject = (slug: string) => {
  const canonicalSlug = legacyProjectSlugs[slug] ?? slug;
  return projects.find((item) => item.slug === canonicalSlug);
};

export const getNextProject = (slug: string) => {
  const index = projects.findIndex((item) => item.slug === slug);
  return projects[(index + 1) % projects.length];
};

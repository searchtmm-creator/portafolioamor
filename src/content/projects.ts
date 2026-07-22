export type ProjectImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type Project = {
  slug: string;
  title: string;
  client?: string;
  year?: string;
  category?: string;
  role?: string;
  agency?: string;
  productionCompany?: string;
  director?: string;
  synopsis?: string;
  challenge?: string;
  productionApproach?: string;
  outcome?: string;
  cover: string;
  poster?: string;
  gallery: ProjectImage[];
  vimeoId?: string;
  externalVideoUrl?: string;
  featured?: boolean;
  accent: "rose" | "tomato" | "cobalt" | "lemon" | "peach";
  initials: string;
  polaroidLayout: {
    desktop: { x: number; y: number; rotation: number; scale?: number };
    tablet: { x: number; y: number; rotation: number; scale?: number };
    mobile?: { rotation: number };
  };
};

const project = (
  slug: string,
  title: string,
  initials: string,
  accent: Project["accent"],
  desktop: Project["polaroidLayout"]["desktop"],
  tablet: Project["polaroidLayout"]["tablet"],
  video?: Pick<Project, "vimeoId" | "externalVideoUrl">,
): Project => ({
  slug,
  title,
  initials,
  accent,
  cover: `/projects/${slug}/cover.webp`,
  poster: `/projects/${slug}/poster.webp`,
  gallery: [],
  featured: Boolean(video),
  polaroidLayout: {
    desktop,
    tablet,
    mobile: { rotation: Math.max(-3, Math.min(3, desktop.rotation / 2)) },
  },
  ...video,
});

export const projects: Project[] = [
  project(
    "kfc-goodometer",
    "KFC Goodometer",
    "KG",
    "tomato",
    { x: 8, y: 5, rotation: -5, scale: 1.03 },
    { x: 5, y: 4, rotation: -4 },
    { vimeoId: "952131096", externalVideoUrl: "https://vimeo.com/952131096" },
  ),
  project(
    "old-spice",
    "Old Spice",
    "OS",
    "cobalt",
    { x: 39, y: 2, rotation: 3 },
    { x: 52, y: 2, rotation: 3 },
  ),
  project(
    "bbva-nomina",
    "BBVA Nómina",
    "BN",
    "rose",
    { x: 70, y: 7, rotation: -2, scale: 1.06 },
    { x: 28, y: 14, rotation: -2 },
  ),
  project(
    "bbva-quincena-del-ahorro",
    "BBVA La Quincena del Ahorro",
    "BQ",
    "lemon",
    { x: 17, y: 25, rotation: 4 },
    { x: 61, y: 20, rotation: 4 },
  ),
  project(
    "lofibeats",
    "Lofibeats",
    "LF",
    "peach",
    { x: 51, y: 24, rotation: -6, scale: 1.08 },
    { x: 4, y: 31, rotation: -5 },
    { vimeoId: "1007819738", externalVideoUrl: "https://vimeo.com/1007819738" },
  ),
  project(
    "nestle-sublime",
    "Nestlé Sublime",
    "NS",
    "rose",
    { x: 79, y: 29, rotation: 5 },
    { x: 48, y: 35, rotation: 4 },
  ),
  project(
    "hermanos-yapean",
    "Hermanos Yapean",
    "HY",
    "cobalt",
    { x: 3, y: 45, rotation: 2, scale: 1.07 },
    { x: 68, y: 42, rotation: 2 },
    { externalVideoUrl: "https://www.youtube.com/watch?v=uY4_3g8g3pc" },
  ),
  project(
    "ke-personajes-video",
    "KE Personajes Video",
    "KE",
    "tomato",
    { x: 35, y: 43, rotation: -3 },
    { x: 18, y: 51, rotation: -3 },
    { externalVideoUrl: "https://www.youtube.com/watch?v=h2JNzqyVYVE" },
  ),
  project(
    "yango-videos",
    "Yango Videos",
    "YV",
    "lemon",
    { x: 66, y: 49, rotation: 6 },
    { x: 56, y: 57, rotation: 5 },
  ),
  project(
    "kfc-nuggets-sound-test",
    "KFC Nuggets Sound Test",
    "KN",
    "rose",
    { x: 14, y: 64, rotation: -6, scale: 1.06 },
    { x: 4, y: 66, rotation: -5 },
    { vimeoId: "937817150", externalVideoUrl: "https://vimeo.com/937817150" },
  ),
  project(
    "atun-florida",
    "Atún Florida",
    "AF",
    "cobalt",
    { x: 45, y: 64, rotation: 4 },
    { x: 47, y: 70, rotation: 3 },
  ),
  project(
    "jeffry",
    "Jeffry",
    "JF",
    "peach",
    { x: 76, y: 67, rotation: -2 },
    { x: 69, y: 77, rotation: -2 },
  ),
  project(
    "leche-gloria",
    "Leche Gloria",
    "LG",
    "tomato",
    { x: 4, y: 82, rotation: 5 },
    { x: 18, y: 83, rotation: 4 },
  ),
  project(
    "atlantic-video",
    "Atlantic Video",
    "AV",
    "rose",
    { x: 32, y: 81, rotation: -4, scale: 1.04 },
    { x: 55, y: 88, rotation: -4 },
  ),
  project(
    "betsson",
    "Betsson",
    "BT",
    "lemon",
    { x: 60, y: 84, rotation: 3 },
    { x: 4, y: 93, rotation: 3 },
  ),
  project(
    "kfc-streetwear",
    "KFC Streetwear",
    "KS",
    "cobalt",
    { x: 80, y: 85, rotation: -5 },
    { x: 68, y: 93, rotation: -4 },
  ),
];

export const getProject = (slug: string) =>
  projects.find((item) => item.slug === slug);

export const getNextProject = (slug: string) => {
  const index = projects.findIndex((item) => item.slug === slug);
  return projects[(index + 1) % projects.length];
};

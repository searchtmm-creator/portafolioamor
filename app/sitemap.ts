import type { MetadataRoute } from "next";
import { projects } from "@/src/content/projects";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, priority: 1 },
    { url: `${baseUrl}/bio`, priority: 0.7 },
    ...projects.map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      priority: project.featured ? 0.9 : 0.6,
    })),
  ];
}

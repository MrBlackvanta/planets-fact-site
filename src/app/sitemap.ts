import { planetPath, planets, ROOT_PLANET, SITE_URL } from "@/data";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return planets.map(({ slug }) => ({
    url: `${SITE_URL}${planetPath(slug)}`,
    changeFrequency: "yearly",
    priority: slug === ROOT_PLANET ? 1 : 0.8,
  }));
}

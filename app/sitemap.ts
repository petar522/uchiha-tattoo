import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Kad dodaš nove stranice (/fine-line, /blackwork, /cene, /politika-privatnosti...),
// dodaj ih ovde.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

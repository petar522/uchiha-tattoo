import type { Metadata } from "next";
import { SITE, SITE_URL } from "@/lib/site";

const title = "Uchiha Tattoo Studio Beograd | Fine Line, Blackwork, Geometrija";

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | Uchiha Tattoo Studio",
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: "/",
    siteName: SITE.name,
    title,
    description: SITE.description,
    // OG slika se uzima automatski iz app/opengraph-image.jpg (1200x630)
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

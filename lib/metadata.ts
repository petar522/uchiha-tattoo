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
  images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Uchiha Tattoo Studio Beograd" }],
},
twitter: {
  card: "summary_large_image",
  title,
  description: SITE.description,
  images: ["/og.jpg"],
},
  robots: { index: true, follow: true },
};

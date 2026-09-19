import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Uchiha Tattoo Studio | Fine Line & Blackwork Beograd",
  description: "Najbolji tattoo majstor u Beogradu. Specijalizovano za fine line, blackwork i geometriju. Ulica Pera Slijepčevića 22A.",
  keywords: ["tattoo", "uchiha", "tattoo studio Beograd", "fine line tattoo Beograd", "najbolji tattoo majstor"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <body>{children}</body>
    </html>
  );
}
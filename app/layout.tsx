import "./globals.css";
import { siteMetadata } from "@/lib/metadata";

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr-Latn">
      <body>{children}</body>
    </html>
  );
}
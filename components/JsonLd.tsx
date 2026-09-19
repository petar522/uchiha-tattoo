import { SITE, SITE_URL } from "@/lib/site";

// Strukturirani podaci za Google (schema.org/TattooParlor).
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    "@id": `${SITE_URL}/#business`,
    name: SITE.name,
    url: SITE_URL,
    logo: SITE.logo,
    image: SITE.logo,
    description: SITE.description,
    founder: { "@type": "Person", name: SITE.artist },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressCountry: SITE.address.country,
    },
    sameAs: [SITE.instagram],
    ...(SITE.telephone ? { telephone: SITE.telephone } : {}),
  };

  return (
    <script
      type="application/ld+json"
      // "<" se escape-uje da sadržaj ne bi mogao da prekine script tag
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

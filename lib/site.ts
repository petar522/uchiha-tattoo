// Jedno mesto za podatke koje koriste metadata, sitemap, robots i JSON-LD.

// Postavi na domen koji je PRIMARNI u Vercelu (Project > Settings > Domains).
// Ako je primarni bez "www", ukloni "www." ovde.
export const SITE_URL = "https://www.uchiha.ink";

export const SITE = {
  name: "Uchiha Tattoo Studio",
  artist: "Nikola Subić",
  description: "Tattoo studio u Beogradu: fine line, blackwork i geometrija, flash motivi i cover-up. Zakaži termin online.",
  instagram: "https://instagram.com/inkuchiha_",
  logo: `${SITE_URL}/images/logo.png`,
  address: {
    // TODO: proveri zvaničan naziv ulice na Google mapama (npr. "Pere Slijepčevića").
    street: "Pere Slijepčevića 22A",
    city: "Beograd",
    country: "RS",
  },
  // TODO: kad Nikola odluči da objavi broj, upiši ga ovde (npr. "+381 6x xxx xxxx").
  telephone: "+381617344355",
};

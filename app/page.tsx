import Image from "next/image";
import InquiryForm from "@/components/InquiryForm";
import NewsletterForm from "@/components/NewsletterForm";
import PortfolioTabs from "@/components/PortfolioTabs";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";

export default function Home() {

  return (
    <main className="bg-uchiha-black text-uchiha-white min-h-screen font-sans">
      <JsonLd />
      {/* ==================== NAVIGACIJA ==================== */}
      <Navbar />

      {/* ==================== HERO SEKCIJA ==================== */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Pozadina - zameni putanju slikom ako imaš */}
        <div className="absolute inset-0 bg-gradient-to-b from-uchiha-black via-uchiha-gray to-uchiha-black opacity-90"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-6 px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Uchiha <span className="text-uchiha-gold">Tattoo Studio</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 tracking-[0.2em] uppercase">
            Fine Line • Blackwork • Geometrija
          </p>
          <p className="max-w-xl text-gray-400 mt-4">
            Ljubav prema crtanju pretvorena u veštinu. Veština pretvorena u trajnu umetnost na tvojoj koži.
          </p>
          <a href="#booking" className="mt-8 bg-transparent border-2 border-uchiha-gold text-uchiha-gold px-8 py-3 rounded font-bold uppercase tracking-wider hover:bg-uchiha-gold hover:text-uchiha-black transition-all duration-300">
            Zakaži svoj termin
          </a>
        </div>
      </section>

      {/* ==================== O MENI ==================== */}
      <section id="onama" className="py-24 px-6 bg-uchiha-gray">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-uchiha-gold">O Umetniku</h2>
          <div className="flex flex-col md:flex-row items-center gap-8 text-left">
            <Image src="/images/nikola.png" alt="Nikola Subić" width={300} height={300} className="rounded-full border-4 border-uchiha-gold" />
            <div>
              <h3 className="text-2xl font-bold mb-4">Nikola Subić</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Sa godinom dana profesionalnog iskustva, Uchiha Tattoo Studio nastao je iz čiste ljubavi prema crtanju i posvećenosti detalju. 
                Inspiracija se crpi iz svakodnevnog života i strasti ka stvaranju jedinstvenih komada.
              </p>
              <p className="text-gray-400">
                <strong className="text-uchiha-white">Lokacija:</strong> Pera Slijepčevića 22A, Beograd
              </p>
              <p className="text-gray-400 mt-2">
                <strong className="text-uchiha-white">Radno vreme:</strong> Po dogovoru
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PORTFOLIO ==================== */}
      <section id="portfolio" className="py-24 px-6">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl font-bold mb-12 text-center text-uchiha-gold">Portfolio</h2>
    <PortfolioTabs />
  </div>
</section>

      {/* ==================== FLASH ==================== */}
      <section id="flash" className="py-24 px-6 bg-uchiha-gray">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center text-uchiha-gold">Flash Motivi</h2>
          <p className="text-center text-gray-400 mb-12">Gotove ideje dostupne za brže zakazivanje.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[3/4] bg-uchiha-black rounded-lg overflow-hidden border border-uchiha-gold/20 hover:border-uchiha-gold transition-colors cursor-pointer">
                <Image src={`/images/flash/flash-${i}.jpg`} alt={`Flash ${i}`} width={300} height={400} className="w-full h-full object-cover" />
                <div className="w-full h-full flex items-center justify-center text-gray-600">Flash {i}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BOOKING & CENE ==================== */}
      <section id="booking" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          
          {/* LEVA STRANA: USLOVI I CENE */}
          <div>
            <h2 className="text-4xl font-bold mb-8 text-uchiha-gold">Cene & Zakazivanje</h2>
            <ul className="space-y-6 text-gray-300">
              <li className="border-l-2 border-uchiha-gold pl-4">
                <h4 className="font-bold text-uchiha-white text-lg">Cenovnik</h4>
                <p>Od 20€. Cena zavisi od kompleksnosti i veličine.</p>
              </li>
              <li className="border-l-2 border-uchiha-gold pl-4">
                <h4 className="font-bold text-uchiha-white text-lg">Depozit</h4>
                <p>Pola od cene se plaća unapred na bankovni račun kako bi termin bio zakazan.</p>
              </li>
              <li className="border-l-2 border-uchiha-gold pl-4">
                <h4 className="font-bold text-uchiha-white text-lg">Otkazivanje</h4>
                <p>Moguće je otkazati minimalno 48h unapred. U suprotnom, depozit se ne vraća.</p>
              </li>
              <li className="border-l-2 border-uchiha-gold pl-4">
                <h4 className="font-bold text-uchiha-white text-lg">Maloletnici & Cover-up</h4>
                <p>Tetoviram maloletnike uz pristanak roditelja. Radim prekrivanje starih tetovaža.</p>
              </li>
            </ul>
          </div>

          {/* DESNA STRANA: FORMA */}
          <div className="bg-uchiha-gray p-8 rounded-lg border border-uchiha-gold/30">
            <h3 className="text-2xl font-bold mb-6 text-center">Formiraj Upit</h3>
            <InquiryForm />
          </div>
        </div>
      </section>

      {/* ==================== AFTERCARE ==================== */}
      <section id="aftercare" className="py-24 px-6 bg-uchiha-gray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-uchiha-gold">Uputstvo za Negu</h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <span className="text-3xl font-bold text-uchiha-gold">01</span>
              <div>
                <h4 className="text-xl font-bold mb-2">Skidanje folije</h4>
                <p className="text-gray-400">Folija se skida odmah ukoliko je tetovaža velika, ili u roku od 24h ako je manja.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <span className="text-3xl font-bold text-uchiha-gold">02</span>
              <div>
                <h4 className="text-xl font-bold mb-2">Pranje</h4>
                <p className="text-gray-400">Prvo pranje baby sapunom i hladnom ili mlakom vodom, blagim kružnim pokretima. Nikako vruća voda!</p>
              </div>
            </div>
            <div className="flex gap-6">
              <span className="text-3xl font-bold text-uchiha-gold">03</span>
              <div>
                <h4 className="text-xl font-bold mb-2">Sušenje i Krema</h4>
                <p className="text-gray-400">Ubrusom natapkati (ne brisati!) da se skine višak vode. Namazati Pantenol kremom (krema je bolja opcija od masti jer koža brže upija).</p>
              </div>
            </div>
            <div className="flex gap-6">
              <span className="text-3xl font-bold text-uchiha-gold">04</span>
              <div>
                <h4 className="text-xl font-bold mb-2">Ponavljanje procesa</h4>
                <p className="text-gray-400">Postupak pranja i mazanja se ponavlja na svakih par sati tokom narednih dana.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <span className="text-3xl font-bold text-uchiha-gold">!</span>
              <div>
                <h4 className="text-xl font-bold mb-2 text-red-400">Šta izbegavati</h4>
                <p className="text-gray-400">Izbegavati vruću vodu, sunce i solarijum. Ako je tetovaža na nezgodnom mestu, izbegavati teretanu dok se ne zaceli.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-16 px-6 bg-uchiha-black border-t border-uchiha-gold/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold text-uchiha-gold mb-2">UCHIHA TATTOO</h3>
            <p className="text-gray-500">Pera Slijepčevića 22A, Beograd</p>
          </div>
          
          {/* Instagram Feed / Link */}
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-lg font-bold">Prati rad na Instagramu</h4>
            <a 
                href="https://instagram.com/inkuchiha_"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-uchiha-gold text-uchiha-gold px-6 py-2 rounded font-bold hover:bg-uchiha-gold hover:text-uchiha-black transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
                @inkuchiha_
              </a>
            {/* Ovde kasnije možeš ubaciti Elfsight kod za live feed */}
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4">Newsletter</h4>
            <p className="text-gray-500 mb-2 text-sm">Prijavi se za flash days i popuste.</p>
            <NewsletterForm />
          </div>
        </div>
        <div className="text-center text-gray-400 mt-12 text-sm" suppressHydrationWarning>
          © {new Date().getFullYear()} Uchiha Tattoo Studio. Sva prava zadržana.
        </div>
      </footer>

    </main>
  );
}
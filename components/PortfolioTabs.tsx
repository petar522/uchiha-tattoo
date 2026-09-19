"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const TABS = [
  { id: "fine-line", label: "Fine line", alt: "Fine line tetovaža" },
  { id: "blackwork", label: "Blackwork", alt: "Blackwork tetovaža" },
  { id: "geometrija", label: "Geometrija", alt: "Geometrijska tetovaža" },
] as const;

// Koliko slika ima u svakom stilu: public/images/portfolio/<stil>-<broj>.jpg
// (brojevi idu od 1 do COUNTS[stil]). Promeni kad dodaš ili ukloniš slike.
const COUNTS: Record<string, number> = {
  "fine-line": 8,
  blackwork: 8,
  geometrija: 8,
};

export default function PortfolioTabs() {
  const [activeTab, setActiveTab] = useState<string>("fine-line");
  const [current, setCurrent] = useState<number | null>(null); // 1..total ili null
  const touchStartX = useRef<number | null>(null);

  const active = TABS.find((t) => t.id === activeTab) ?? TABS[0];
  const total = COUNTS[activeTab] ?? 0;
  const srcOf = (i: number) => `/images/portfolio/${activeTab}-${i}.jpg`;
  const altOf = (i: number) =>
    `${active.alt}, Uchiha Tattoo Studio Beograd, rad ${i}`;

  const close = useCallback(() => setCurrent(null), []);
  const next = useCallback(
    () => setCurrent((c) => (c === null ? c : (c % total) + 1)),
    [total]
  );
  const prev = useCallback(
    () => setCurrent((c) => (c === null ? c : ((c - 2 + total) % total) + 1)),
    [total]
  );

  // Tastatura (Esc, strelice) i zaključavanje skrolovanja dok je lightbox otvoren
  useEffect(() => {
    if (current === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [current, close, next, prev]);

  // Swipe levo/desno na telefonu
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) next();
    else prev();
  };

  return (
    <>
      {/* Filter dugmići */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setCurrent(null);
            }}
            className={`px-6 py-2 rounded uppercase tracking-wider transition-colors ${
              activeTab === tab.id
                ? "bg-uchiha-gold text-uchiha-black"
                : "bg-uchiha-gray text-uchiha-white hover:bg-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Galerija */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: total }, (_, k) => k + 1).map((i) => (
          <button
            type="button"
            key={`${activeTab}-${i}`}
            onClick={() => setCurrent(i)}
            aria-label={`Otvori sliku ${i} u većoj veličini`}
            className="aspect-square bg-uchiha-gray rounded-lg overflow-hidden relative group cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-uchiha-gold"
          >
            {/* Placeholder je iza slike: prava slika ga prekrije */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-600 border border-dashed border-gray-700">
              Slika {i}
            </div>
            <Image
              src={srcOf(i)}
              alt={altOf(i)}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              style={{ objectFit: "cover" }}
              className="group-hover:scale-110 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {current !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pregled slike"
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Zatvori */}
          <button
            type="button"
            onClick={close}
            aria-label="Zatvori"
            className="absolute top-4 right-4 p-2 text-uchiha-gold hover:text-white"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {/* Prethodna */}
          {total > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Prethodna slika"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 text-uchiha-gold hover:text-white"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
          )}

          {/* Slika */}
          <div
            className="relative h-[80vh] w-[calc(100%-6rem)] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={srcOf(current)}
              src={srcOf(current)}
              alt={altOf(current)}
              fill
              sizes="100vw"
              priority
              className="object-contain"
            />
          </div>

          {/* Sledeća */}
          {total > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Sledeća slika"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 text-uchiha-gold hover:text-white"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Brojač */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-gray-400">
            {current} / {total}
          </p>
        </div>
      )}
    </>
  );
}

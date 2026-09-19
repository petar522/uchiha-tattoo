"use client";

import { useState } from "react";
import Image from "next/image";

const TABS = [
  { id: "fine-line", label: "Fine line", alt: "Fine line tetovaža" },
  { id: "blackwork", label: "Blackwork", alt: "Blackwork tetovaža" },
  { id: "geometrija", label: "Geometrija", alt: "Geometrijska tetovaža" },
] as const;

export default function PortfolioTabs() {
  const [activeTab, setActiveTab] = useState<string>("fine-line");
  const active = TABS.find((t) => t.id === activeTab) ?? TABS[0];

  return (
    <>
      {/* Filter dugmići */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
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
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={`${activeTab}-${i}`}
            className="aspect-square bg-uchiha-gray rounded-lg overflow-hidden relative group cursor-pointer"
          >
            {/* Placeholder je iza slike: kad postoji prava slika, prekrije ga. */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-600 border border-dashed border-gray-700">
              Slika {i}
            </div>
            <Image
              src={`/images/portfolio/${activeTab}-${i}.jpg`}
              alt={`${active.alt}, Uchiha Tattoo Studio Beograd, rad ${i}`}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              style={{ objectFit: "cover" }}
              className="group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </>
  );
}

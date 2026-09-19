"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LINKS = [
  { href: "#onama", label: "O Meni" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#flash", label: "Flash" },
  { href: "#booking", label: "Cene & Booking" },
  { href: "#aftercare", label: "Nega" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Zatvori meni na Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-uchiha-black/90 backdrop-blur-md border-b border-uchiha-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-4 flex justify-between items-center gap-3">
        {/* Logo + naziv */}
        <a href="#" className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Image
            src="/images/logo.png"
            alt="Uchiha Tattoo Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
            style={{ width: "auto", height: "40px" }}
          />
          <span className="text-base sm:text-xl font-bold tracking-wider text-uchiha-gold truncate">
            UCHIHA TATTOO
          </span>
        </a>

        {/* Desktop linkovi */}
        <ul className="hidden md:flex gap-8 text-sm uppercase tracking-wide">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-uchiha-gold transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* CTA: uvek vidljiv, kraći tekst na telefonu */}
          <a
            href="#booking"
            onClick={() => setOpen(false)}
            className="bg-uchiha-gold text-uchiha-black px-3 py-1.5 md:px-5 md:py-2 rounded font-bold text-xs md:text-sm hover:bg-white transition-colors whitespace-nowrap"
          >
            <span className="md:hidden">Zakaži</span>
            <span className="hidden md:inline">Zakaži termin</span>
          </a>

          {/* Hamburger (samo mobilni) */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden p-2 text-uchiha-gold"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobilni panel */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-uchiha-gold/20 bg-uchiha-black/95 backdrop-blur-md"
        >
          <ul className="flex flex-col px-6 py-4">
            {LINKS.map((l) => (
              <li key={l.href} className="border-b border-uchiha-gold/10 last:border-0">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-lg uppercase tracking-wide hover:text-uchiha-gold transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

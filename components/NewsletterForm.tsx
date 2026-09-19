"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);

    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: fd.get("email"),
          consent: fd.get("consent") === "on",
          website: fd.get("website"), // honeypot
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Prijava nije uspela.");

      formEl.reset();
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Prijava nije uspela.");
    }
  }

  if (status === "ok") {
    return <p className="text-sm text-uchiha-gold">Hvala! Prijavljen/a si na listu.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <div className="flex gap-2 justify-center md:justify-start">
        <input
          name="email"
          type="email"
          placeholder="Tvoj email"
          required
          maxLength={150}
          className="bg-uchiha-gray border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-uchiha-gold"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-uchiha-gold text-uchiha-black px-4 py-2 rounded text-sm font-bold disabled:opacity-60"
        >
          {status === "sending" ? "..." : "Pošalji"}
        </button>
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-2 text-xs text-gray-400 text-left">
        <input name="consent" type="checkbox" required className="mt-0.5 accent-[#d4af37]" />
        <span>Pristajem da primam obaveštenja o flash danima i terminima.</span>
      </label>

      {status === "error" && (
        <p role="alert" className="text-xs text-red-400">
          {message}
        </p>
      )}
    </form>
  );
}

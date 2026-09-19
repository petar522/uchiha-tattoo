"use client";

import { useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

const MAX_FILES = 4;

const inputCls =
  "w-full bg-uchiha-black border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-uchiha-gold";

// Smanjuje sliku (najduža strana 1600 px, JPEG 80%) da bi 4 slike stale u limit od 4.5 MB.
async function compress(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.8)
    );
    if (!blob) return file;
    const base = file.name.replace(/\.[^.]+$/, "") || "referenca";
    return new File([blob], `${base}.jpg`, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export default function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);

    const files = (data.getAll("references") as File[]).filter((f) => f.size > 0);
    if (files.length > MAX_FILES) {
      setStatus("error");
      setMessage(`Možeš da priložiš najviše ${MAX_FILES} slike.`);
      return;
    }
    if (!token) {
      setStatus("error");
      setMessage("Sačekaj sekund da se završi provera, pa probaj ponovo.");
      return;
    }

    setStatus("sending");
    setMessage("");

    data.delete("references");
    for (const f of await Promise.all(files.map(compress))) {
      data.append("references", f);
    }
    data.set("cf-turnstile-response", token);

    try {
      const res = await fetch("/api/inquiry", { method: "POST", body: data });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Slanje nije uspelo.");

      formEl.reset();
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Slanje nije uspelo. Probaj ponovo."
      );
    } finally {
      turnstileRef.current?.reset();
      setToken("");
    }
  }

  if (status === "ok") {
    return (
      <div className="text-center py-8 space-y-3">
        <h3 className="text-2xl font-bold text-uchiha-gold">Upit je poslat!</h3>
        <p className="text-gray-300">
          Nikola će ti se javiti sa preciznom cenom i predlogom termina. Termin se
          potvrđuje nakon uplate depozita.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input name="name" type="text" placeholder="Ime i Prezime" className={inputCls} required maxLength={100} />
        <input name="email" type="email" placeholder="Email" className={inputCls} required maxLength={150} />
      </div>
      <input name="phone" type="tel" placeholder="Telefon" className={inputCls} required maxLength={40} />
      <div className="grid grid-cols-2 gap-4">
        <input name="bodyPart" type="text" placeholder="Deo tela" className={inputCls} required maxLength={100} />
        <input name="size" type="text" placeholder="Dimenzije (cm)" className={inputCls} required maxLength={60} />
      </div>
      <textarea name="idea" placeholder="Opis ideje..." rows={4} className={inputCls} required maxLength={2000} />

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Reference (slike, do {MAX_FILES})
        </label>
        <input
          name="references"
          type="file"
          accept="image/*"
          multiple
          className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-uchiha-black file:bg-uchiha-gold hover:file:bg-white cursor-pointer"
        />
      </div>

      {/* Honeypot: skriveno od ljudi, botovi ga popune */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Ne popunjavaj ovo polje
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-2 text-xs text-gray-400">
        <input type="checkbox" required className="mt-0.5 accent-[#d4af37]" />
        <span>
          Slažem se da se moji podaci i slike koriste isključivo radi odgovora na
          upit. Više u{" "}
          <a href="/politika-privatnosti" className="underline hover:text-uchiha-gold">
            politici privatnosti
          </a>
          .
        </span>
      </label>

      <Turnstile
        ref={turnstileRef}
        siteKey="0x4AAAAAAE9PsMKiA4ILfBka"
        onSuccess={setToken}
        onExpire={() => setToken("")}
        options={{ theme: "dark" }}
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-uchiha-gold text-uchiha-black font-bold py-3 rounded hover:bg-white transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "Šaljem..." : "Pošalji upit"}
      </button>

      {status === "error" && (
        <p role="alert" className="text-sm text-center text-red-400">
          {message}
        </p>
      )}

      <p className="text-xs text-center text-gray-400 mt-2">
        *Nakon slanja upita, sledi dogovor o preciznoj ceni i uplata depozita.
      </p>
    </form>
  );
}

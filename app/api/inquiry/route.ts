import { NextResponse } from "next/server";
import { Resend } from "resend";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";

const MAX_FILES = 4;
// Vercel funkcije primaju telo zahteva do 4.5 MB, zato držimo ukupno ispod 4 MB.
// Klijent smanjuje slike pre slanja (vidi InquiryForm.tsx).
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const fail = (error: string, status = 400) =>
  NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("Zahtev nije ispravan ili su slike prevelike.");
  }

  // Honeypot: skriveno polje koje ljudi ne vide. Ako je popunjeno, glumimo uspeh.
  if (String(form.get("website") ?? "") !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const human = await verifyTurnstile(
    String(form.get("cf-turnstile-response") ?? ""),
    ip
  );
  if (!human) {
    return fail("Provera nije prošla. Osveži stranicu i probaj ponovo.");
  }

  const get = (key: string, max: number) =>
    String(form.get(key) ?? "").trim().slice(0, max);

  const name = get("name", 100);
  const email = get("email", 150);
  const phone = get("phone", 40);
  const bodyPart = get("bodyPart", 100);
  const size = get("size", 60);
  const idea = get("idea", 2000);

  if (!name || !email || !phone || !bodyPart || !size || !idea) {
    return fail("Popuni sva obavezna polja.");
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return fail("Email adresa nije ispravna.");
  }

  const files = form
    .getAll("references")
    .filter((f): f is File => f instanceof File && f.size > 0);

  if (files.length > MAX_FILES) {
    return fail(`Možeš da priložiš najviše ${MAX_FILES} slike.`);
  }
  if (files.some((f) => !ALLOWED_TYPES.includes(f.type))) {
    return fail("Dozvoljene su samo JPG, PNG ili WEBP slike.");
  }
  if (files.reduce((sum, f) => sum + f.size, 0) > MAX_TOTAL_BYTES) {
    return fail("Slike su prevelike. Probaj sa manje ili manjih slika.");
  }

  const attachments = await Promise.all(
    files.map(async (f, i) => ({
      filename: (f.name || `referenca-${i + 1}.jpg`).replace(/[^\w.\-]/g, "_"),
      content: Buffer.from(await f.arrayBuffer()),
    }))
  );

  const text = [
    `Ime: ${name}`,
    `Email: ${email}`,
    `Telefon: ${phone}`,
    `Deo tela: ${bodyPart}`,
    `Dimenzije (cm): ${size}`,
    `Referenci: ${files.length} slika u prilogu`,
    "",
    "Opis ideje:",
    idea,
  ].join("\n");

  const html = `
    <h2>Novi upit sa uchiha.ink</h2>
    <p><b>Ime:</b> ${esc(name)}<br>
    <b>Email:</b> ${esc(email)}<br>
    <b>Telefon:</b> ${esc(phone)}<br>
    <b>Deo tela:</b> ${esc(bodyPart)}<br>
    <b>Dimenzije (cm):</b> ${esc(size)}<br>
    <b>Reference:</b> ${files.length} slika u prilogu</p>
    <p><b>Opis ideje:</b></p>
    <p>${esc(idea).replace(/\n/g, "<br>")}</p>
  `;

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.MAIL_FROM!,
    to: process.env.INQUIRY_TO_EMAIL!,
    replyTo: email, // Nikola klikne "Reply" i odgovara direktno klijentu
    subject: `Novi upit: ${name} — ${bodyPart}, ${size} cm`,
    html,
    text,
    attachments,
  });

  if (error) {
    console.error("Resend greška:", error);
    return fail("Slanje nije uspelo. Probaj ponovo ili piši na Instagram.", 500);
  }

  return NextResponse.json({ ok: true });
}

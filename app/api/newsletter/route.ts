import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let data: { email?: string; consent?: boolean; website?: string };
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Zahtev nije ispravan." }, { status: 400 });
  }

  // Honeypot
  if (data.website) return NextResponse.json({ ok: true });

  const email = String(data.email ?? "").trim().slice(0, 150);
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Email adresa nije ispravna." }, { status: 400 });
  }
  if (data.consent !== true) {
    return NextResponse.json({ error: "Potreban je pristanak." }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.contacts.create({
    email,
    unsubscribed: false,
  });

  // Ako je kontakt već prijavljen, korisniku prikazujemo uspeh.
  if (error && !/exist/i.test(error.message ?? "")) {
    console.error("Resend contacts greška:", error);
    return NextResponse.json(
      { error: "Prijava nije uspela. Probaj ponovo." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

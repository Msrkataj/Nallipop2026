import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { currentInspirationCoupon } from "@/lib/inspiration-session";
import { couponEmailText } from "@/lib/inspiration-draw.mjs";
import { findInspiration } from "@/data/inspiration-ideas.mjs";

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request) {
  try {
    const smtpUser = process.env.GMAIL_USER;
    const smtpPass = process.env.GMAIL_APP_PASSWORD;
    const toEmail = process.env.CONTACT_TO_EMAIL || "animacje@nallipop.pl";

    const body = await request.json();
    const data = {
      name: clean(body.name),
      phone: clean(body.phone) || "Nie podano",
      email: clean(body.email),
      topic: clean(body.topic),
      message: clean(body.message),
      legalAccepted: body.consent === true || body.consent === "true" || body.consent === "on" || body.legalAccepted === true,
    };

    if (!data.name || !data.email || !data.topic || !data.message) {
      return NextResponse.json({ message: "Uzupełnij wszystkie wymagane pola." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json({ message: "Podaj poprawny adres e-mail." }, { status: 400 });
    }

    if (!data.legalAccepted) {
      return NextResponse.json({ message: "Potwierdź zapoznanie się z Regulaminem i Polityką prywatności." }, { status: 400 });
    }

    if (!smtpUser || !smtpPass) {
      return NextResponse.json({ message: "Brakuje konfiguracji wysyłki e-mail." }, { status: 500 });
    }

    // The cookie identifies the server's award; submitted coupon fields are never trusted.
    const coupon = couponEmailText(await currentInspirationCoupon());
    const inspiration = findInspiration(clean(body.inspirationId));
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const safe = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, escapeHtml(String(value))]));
    const acceptedAt = new Date().toISOString();

    await transporter.sendMail({
      from: `"Nallipop kontakt" <${smtpUser}>`,
      to: toEmail,
      replyTo: data.email,
      subject: `Nowa wiadomość: ${data.topic}`,
      text: [
        "Nowa wiadomość z formularza kontaktowego Nallipop",
        "",
        `Imię i nazwisko: ${data.name}`,
        `Telefon: ${data.phone}`,
        `E-mail: ${data.email}`,
        `Temat: ${data.topic}`,
        ...(inspiration ? [`Wybrany pomysł: ${inspiration.title}`] : []),
        ...(coupon ? [`Zweryfikowany kupon: ${coupon}`] : []),
        `Potwierdzenie Regulaminu i Polityki prywatności: Tak (${acceptedAt})`,
        "",
        data.message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;color:#27304f;line-height:1.55">
          <h1 style="color:#14bdb8">Nowa wiadomość Nallipop</h1>
          <p><strong>Imię i nazwisko:</strong> ${safe.name}</p>
          <p><strong>Telefon:</strong> ${safe.phone}</p>
          <p><strong>E-mail:</strong> ${safe.email}</p>
          <p><strong>Temat:</strong> ${safe.topic}</p>
          ${inspiration ? `<p><strong>Wybrany pomysł:</strong> ${escapeHtml(inspiration.title)}</p>` : ""}
          ${coupon ? `<p><strong>Zweryfikowany kupon:</strong> ${escapeHtml(coupon)}</p>` : ""}
          <p><strong>Potwierdzenie Regulaminu i Polityki prywatności:</strong> Tak (${acceptedAt})</p>
          <p><strong>Wiadomość:</strong><br>${safe.message.replaceAll("\n", "<br>")}</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Wiadomość została wysłana." });
  } catch (error) {
    console.error("Contact email error:", error);
    return NextResponse.json({ message: "Nie udało się wysłać wiadomości. Spróbuj ponownie później." }, { status: 500 });
  }
}

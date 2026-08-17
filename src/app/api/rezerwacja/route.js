import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const requiredFields = [
  "name",
  "phone",
  "email",
  "eventDate",
  "eventTime",
  "hours",
  "eventType",
  "childrenCount",
  "childrenAge",
  "location",
];

const labels = {
  name: "Imie i nazwisko",
  phone: "Telefon",
  email: "Email",
  eventDate: "Data imprezy",
  eventTime: "Godzina imprezy",
  hours: "Liczba godzin",
  eventType: "Rodzaj imprezy",
  childrenCount: "Liczba dzieci",
  childrenAge: "Wiek dzieci",
  location: "Miejsce imprezy",
  paidAttractions: "Dodatkowo platne atrakcje",
  notes: "Uwagi",
};

function cleanValue(value) {
  return typeof value === "string" ? value.trim() : value;
}

function normalizeFormData(data) {
  return {
    name: cleanValue(data.name),
    phone: cleanValue(data.phone),
    email: cleanValue(data.email),
    eventDate: cleanValue(data.eventDate),
    eventTime: cleanValue(data.eventTime),
    hours: cleanValue(data.hours),
    eventType: cleanValue(data.eventType),
    childrenCount: cleanValue(data.childrenCount),
    childrenAge: cleanValue(data.childrenAge),
    location: cleanValue(data.location),
    paidAttractions: Array.isArray(data.paidAttractions) ? data.paidAttractions.map(cleanValue).filter(Boolean) : [],
    notes: cleanValue(data.notes) || "Brak uwag",
    legalAccepted: data.consent === true || data.legalAccepted === true,
  };
}

function validate(data) {
  const missingFields = requiredFields.filter((field) => !data[field]);
  if (missingFields.length > 0) {
    return `Uzupelnij pola: ${missingFields.map((field) => labels[field]).join(", ")}.`;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return "Podaj poprawny adres email.";
  }

  if (!data.legalAccepted) {
    return "Potwierdź zapoznanie się z Regulaminem i Polityką prywatności.";
  }

  return null;
}

function formatTextEmail(data) {
  return [
    "Nowa rezerwacja Nallipop",
    "",
    `${labels.name}: ${data.name}`,
    `${labels.phone}: ${data.phone}`,
    `${labels.email}: ${data.email}`,
    `${labels.eventDate}: ${data.eventDate}`,
    `${labels.eventTime}: ${data.eventTime}`,
    `${labels.hours}: ${data.hours}`,
    `${labels.eventType}: ${data.eventType}`,
    `${labels.childrenCount}: ${data.childrenCount}`,
    `${labels.childrenAge}: ${data.childrenAge}`,
    `${labels.location}: ${data.location}`,
    `${labels.paidAttractions}: ${data.paidAttractions.length ? data.paidAttractions.join(", ") : "Brak"}`,
    `${labels.notes}: ${data.notes}`,
    `Potwierdzenie Regulaminu i Polityki prywatności: Tak (${data.legalAcceptedAt})`,
  ].join("\n");
}

function formatHtmlEmail(data) {
  const rows = Object.entries({
    [labels.name]: data.name,
    [labels.phone]: data.phone,
    [labels.email]: data.email,
    [labels.eventDate]: data.eventDate,
    [labels.eventTime]: data.eventTime,
    [labels.hours]: data.hours,
    [labels.eventType]: data.eventType,
    [labels.childrenCount]: data.childrenCount,
    [labels.childrenAge]: data.childrenAge,
    [labels.location]: data.location,
    [labels.paidAttractions]: data.paidAttractions.length ? data.paidAttractions.join(", ") : "Brak",
    [labels.notes]: data.notes,
    ["Potwierdzenie Regulaminu i Polityki prywatności"]: `Tak (${data.legalAcceptedAt})`,
  });

  return `
    <div style="font-family: Arial, sans-serif; color: #131a3f; line-height: 1.55;">
      <h1 style="color: #14bdb8;">Nowa rezerwacja Nallipop</h1>
      <table cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 720px;">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="width: 220px; border: 1px solid #e5e1fb; font-weight: 700; background: #f8fdff;">${label}</td>
                <td style="border: 1px solid #e5e1fb;">${String(value).replaceAll("\n", "<br />")}</td>
              </tr>
            `
          )
          .join("")}
      </table>
    </div>
  `;
}

export async function POST(request) {
  try {
    const smtpUser = process.env.GMAIL_USER;
    const smtpPass = process.env.GMAIL_APP_PASSWORD;
    const toEmail = process.env.RESERVATION_TO_EMAIL || "animacje@nallipop.pl";

    const formData = normalizeFormData(await request.json());
    formData.legalAcceptedAt = new Date().toISOString();
    const validationError = validate(formData);

    if (validationError) {
      return NextResponse.json({ message: validationError }, { status: 400 });
    }

    if (!smtpUser || !smtpPass) {
      return NextResponse.json({ message: "Brakuje konfiguracji wysylki email." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"Nallipop rezerwacje" <${smtpUser}>`,
      to: toEmail,
      replyTo: formData.email,
      subject: `Nowa rezerwacja: ${formData.eventType} - ${formData.eventDate}`,
      text: formatTextEmail(formData),
      html: formatHtmlEmail(formData),
    });

    return NextResponse.json({ message: "Formularz zostal wyslany." });
  } catch (error) {
    console.error("Reservation email error:", error);
    return NextResponse.json({ message: "Nie udalo sie wyslac formularza. Sprobuj ponownie pozniej." }, { status: 500 });
  }
}

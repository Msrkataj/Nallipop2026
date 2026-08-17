import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { getReviewsCollection } from "@/lib/reviews-database";

function clean(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isAccepted(value) {
  return value === true || value === "true" || value === "on";
}

export async function POST(request) {
  let reviewsCollection;
  let reviewId;

  try {
    const body = await request.json();

    if (clean(body.website, 200)) {
      return NextResponse.json({ message: "Dziękujemy za opinię." }, { status: 201 });
    }

    const review = {
      name: clean(body.name, 100),
      email: clean(body.email, 160).toLowerCase(),
      text: clean(body.text, 2000),
      rating: Number(body.rating),
      publicationConsent: isAccepted(body.publicationConsent),
      legalAccepted: isAccepted(body.legalAccepted),
    };

    if (review.name.length < 2) {
      return NextResponse.json({ message: "Podaj imię i nazwisko." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(review.email)) {
      return NextResponse.json({ message: "Podaj poprawny adres e-mail." }, { status: 400 });
    }
    if (!Number.isInteger(review.rating) || review.rating < 1 || review.rating > 5) {
      return NextResponse.json({ message: "Wybierz ocenę od 1 do 5 gwiazdek." }, { status: 400 });
    }
    if (review.text.length < 10) {
      return NextResponse.json({ message: "Opinia powinna mieć co najmniej 10 znaków." }, { status: 400 });
    }
    if (!review.publicationConsent) {
      return NextResponse.json({ message: "Zaznacz zgodę na publikację opinii." }, { status: 400 });
    }
    if (!review.legalAccepted) {
      return NextResponse.json({ message: "Potwierdź zapoznanie się z Polityką prywatności." }, { status: 400 });
    }

    const acceptedAt = new Date().toISOString();
    const createdAt = new Date();
    reviewsCollection = await getReviewsCollection();

    const insertResult = await reviewsCollection.insertOne({
      ...review,
      status: "pending",
      source: "nallipop.pl",
      createdAt,
      consentAcceptedAt: acceptedAt,
      notificationStatus: "pending",
    });
    reviewId = insertResult.insertedId;

    const smtpUser = process.env.GMAIL_USER;
    const smtpPass = process.env.GMAIL_APP_PASSWORD;
    const toEmail =
      process.env.REVIEW_TO_EMAIL ||
      process.env.CONTACT_TO_EMAIL ||
      "animacje@nallipop.pl";

    if (!smtpUser || !smtpPass) {
      await reviewsCollection.updateOne(
        { _id: reviewId },
        { $set: { notificationStatus: "failed", notificationError: "Brak konfiguracji SMTP" } }
      );
      return NextResponse.json(
        { message: "Opinia została zapisana, ale nie udało się wysłać powiadomienia e-mail." },
        { status: 202 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const safeName = escapeHtml(review.name);
    const safeEmail = escapeHtml(review.email);
    const safeText = escapeHtml(review.text).replaceAll("\n", "<br>");
    const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

    await transporter.sendMail({
      from: `"Nallipop opinie" <${smtpUser}>`,
      to: toEmail,
      replyTo: review.email,
      subject: `Nowa opinia Nallipop: ${review.rating}/5 – ${review.name}`,
      text: [
        "Nowa opinia przesłana przez nallipop.pl",
        "",
        `Ocena: ${review.rating}/5`,
        `Imię i nazwisko: ${review.name}`,
        `E-mail: ${review.email}`,
        `Opinia: ${review.text}`,
        "Zgoda na publikację: Tak",
        `Potwierdzenie Polityki prywatności: Tak (${acceptedAt})`,
        `ID w bazie: ${reviewId.toString()}`,
        "Status publikacji: oczekuje na akceptację",
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;color:#27304f;line-height:1.6;max-width:680px">
          <h1 style="color:#14bdb8">Nowa opinia Nallipop</h1>
          <p style="font-size:28px;color:#f2b334;letter-spacing:3px">${stars}</p>
          <p><strong>Ocena:</strong> ${review.rating}/5</p>
          <p><strong>Imię i nazwisko:</strong> ${safeName}</p>
          <p><strong>E-mail:</strong> ${safeEmail}</p>
          <p><strong>Opinia:</strong><br>${safeText}</p>
          <p><strong>Zgoda na publikację:</strong> Tak</p>
          <p><strong>Potwierdzenie Polityki prywatności:</strong> Tak (${acceptedAt})</p>
          <p><strong>ID w bazie:</strong> ${reviewId.toString()}</p>
          <p style="padding:12px 15px;border-radius:12px;background:#fff5dd;color:#77520a"><strong>Status:</strong> oczekuje na akceptację przed publikacją.</p>
        </div>
      `,
    });

    await reviewsCollection.updateOne(
      { _id: reviewId },
      { $set: { notificationStatus: "sent", notificationSentAt: new Date() } }
    );

    return NextResponse.json(
      { message: "Dziękujemy! Opinia została wysłana i czeka na akceptację." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Review submission error:", error);

    if (reviewsCollection && reviewId) {
      try {
        await reviewsCollection.updateOne(
          { _id: reviewId },
          {
            $set: {
              notificationStatus: "failed",
              notificationError: clean(error?.message, 300) || "Nieznany błąd",
            },
          }
        );
      } catch (updateError) {
        console.error("Review status update error:", updateError);
      }
    }

    const isDatabaseConfigurationError = error?.message?.includes("FIRESTORE_MONGODB_URI");
    return NextResponse.json(
      {
        message: isDatabaseConfigurationError
          ? "Formularz opinii czeka na konfigurację połączenia z bazą."
          : "Nie udało się wysłać opinii. Spróbuj ponownie później.",
      },
      { status: isDatabaseConfigurationError ? 503 : 500 }
    );
  }
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import BrandLogo from "@/components/BrandLogo";
import PageDecorations from "@/components/PageDecorations";
import FormSuccess from "@/components/FormSuccess";
import { reportContactFormConversion } from "@/lib/google-ads";

const contactItems = [
  {
    icon: faEnvelope,
    tone: "mint",
    label: "Napisz do nas",
    value: "animacje@nallipop.pl",
    href: "mailto:animacje@nallipop.pl",
    note: "Odpowiadamy zwykle tego samego dnia",
  },
  {
    icon: faPhone,
    tone: "violet",
    label: "Zadzwoń",
    value: "795 103 108",
    href: "tel:+48795103108",
    note: "Jeśli nie odbierzemy, oddzwonimy",
  },
  {
    icon: faLocationDot,
    tone: "pink",
    label: "Działamy lokalnie",
    value: "Warszawa i okolice",
    href: "#obszar",
    note: "Dojeżdżamy na miejsce wydarzenia",
  },
];

export default function KontaktPage() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "sending" || status === "success") return;
    const formElement = event.currentTarget;
    const data = Object.fromEntries(new FormData(formElement).entries());

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Nie udało się wysłać wiadomości.");
      }

      formElement.reset();
      reportContactFormConversion();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  }

  return (
    <main className="contact-page decorated-page">
      <PageDecorations variant="contact" />
      <div className="contact-bubble contact-bubble--one" aria-hidden="true" />
      <div className="contact-bubble contact-bubble--two" aria-hidden="true" />
      <div className="contact-bubble contact-bubble--three" aria-hidden="true" />

      <section className="contact-hero" id="top">
        <span className="contact-eyebrow">Jesteśmy tu dla Ciebie</span>
        <h1>Porozmawiajmy o Twoim <em>wydarzeniu</em></h1>
        <p>
          Masz pytanie, pomysł albo gotowy termin? Napisz lub zadzwoń. Wspólnie
          dobierzemy animacje, atrakcje i scenariusz dopasowany do dzieci.
        </p>
      </section>

      <section className="contact-layout" id="kontakt">
        <div className="contact-details">
          <div className="contact-section-title">
            <span className="contact-section-number">01</span>
            <div>
              <h2>Skontaktuj się z nami</h2>
              <p>Wybierz najwygodniejszy sposób kontaktu.</p>
            </div>
          </div>

          <div className="contact-list">
            {contactItems.map((item) => (
              <a className="contact-item" href={item.href} key={item.label}>
                <span className={`contact-icon is-${item.tone}`} aria-hidden="true">
                  <FontAwesomeIcon icon={item.icon} />
                </span>
                <span>
                  <small>{item.label}</small>
                  <strong>{item.value}</strong>
                  <em>{item.note}</em>
                </span>
                <b aria-hidden="true"><FontAwesomeIcon icon={faArrowRight} /></b>
              </a>
            ))}
          </div>

          <div className="contact-founder">
            <Image src="/images/natalia-founder.webp" width={76} height={76} alt="Natalia, założycielka Nallipop" />
            <div>
              <span>Porozmawiasz z Natalią</span>
              <p>Założycielką Nallipop, pedagogiem i animatorką z doświadczeniem.</p>
            </div>
          </div>
        </div>

        {status === "success" ? (
          <div className="contact-form" id="formularz">
            <FormSuccess />
          </div>
        ) : (
        <form className="contact-form" id="formularz" onSubmit={handleSubmit} aria-busy={status === "sending"}>
          <div className="contact-section-title">
            <span className="contact-section-number is-purple">02</span>
            <div>
              <h2>Napisz wiadomość</h2>
              <p>Wrócimy do Ciebie z konkretną odpowiedzią.</p>
            </div>
          </div>

          <div className="contact-form__grid">
            <label>
              <span>Imię i nazwisko *</span>
              <input name="name" placeholder="np. Natalia Marciniak" autoComplete="name" required />
            </label>
            <label>
              <span>Numer telefonu</span>
              <input name="phone" type="tel" placeholder="np. 500 600 700" autoComplete="tel" />
            </label>
            <label className="is-wide">
              <span>Adres e-mail *</span>
              <input name="email" type="email" placeholder="np. kontakt@email.pl" autoComplete="email" required />
            </label>
            <label className="is-wide">
              <span>W czym możemy pomóc? *</span>
              <select name="topic" defaultValue="" required>
                <option value="" disabled>Wybierz temat wiadomości</option>
                <option>Animacje na urodziny</option>
                <option>Wesele lub uroczystość rodzinna</option>
                <option>Festyn, piknik lub event</option>
                <option>Warsztaty dla dzieci</option>
                <option>Animacje i warsztaty w kuli</option>
                <option>Wizyta Świętego Mikołaja</option>
                <option>Wizyta Świętego Mikołaja i elfa</option>
                <option>Warsztaty świąteczne z Elfem</option>
                <option>Inne pytanie</option>
              </select>
            </label>
            <label className="is-wide">
              <span>Wiadomość *</span>
              <textarea name="message" rows="5" placeholder="Opowiedz krótko o wydarzeniu, liczbie dzieci i planowanym terminie…" required />
            </label>
          </div>

          <label className="contact-consent">
            <input type="checkbox" name="consent" required />
            <span>Zapoznałam/-em się z <Link href="/regulamin" target="_blank">Regulaminem</Link> oraz <Link href="/polityka-prywatnosci" target="_blank">Polityką prywatności</Link>. Rozumiem, że wysłanie formularza stanowi jedynie zapytanie i nie oznacza rezerwacji terminu ani zawarcia umowy. *</span>
          </label>

          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Wysyłanie…" : "Wyślij wiadomość"}
            <span aria-hidden="true">→</span>
          </button>
          <p className="contact-form__note">Administratorem danych jest KamaLogic Kamil Tosnowiec, ul. Nadrzeczna 7, 05-840 Krosna-Parcela, NIP 5342671266. Dane wykorzystamy, aby odpowiedzieć na zapytanie i przygotować ofertę. Podanie danych kontaktowych jest dobrowolne, ale konieczne do udzielenia odpowiedzi. Szczegóły znajdziesz w <Link href="/polityka-prywatnosci">Polityce prywatności</Link>.</p>

          {status === "error" && message && (
            <div className="contact-form__message is-error" role="alert">
              <strong>Nie udało się wysłać</strong>
              <span>{message}</span>
            </div>
          )}
        </form>
        )}
      </section>

      <section className="contact-area" id="obszar">
        <div className="contact-area__copy">
          <span className="contact-eyebrow">Warszawa i okolice</span>
          <h2>Przyjeżdżamy tam, gdzie dzieje się zabawa</h2>
          <p>
            Organizujemy wydarzenia w domach, ogrodach, salach, szkołach,
            przedszkolach i plenerze. Podaj miejsce w wiadomości, a potwierdzimy dojazd.
          </p>
          <a href="#formularz">Zapytaj o dojazd <span aria-hidden="true">→</span></a>
        </div>
        <div className="contact-area__map">
          <Image src="/images/warszawa-map.webp" width={1756} height={990} alt="Mapa Warszawy i okolic - obszar działania Nallipop" />
          <span>Warszawa + okolice</span>
        </div>
      </section>

      <footer className="contact-footer">
        <Link className="contact-footer__logo" href="/">
          <BrandLogo />
        </Link>
        <p>Kolorowe wydarzenia dla dzieci w Warszawie i okolicach.</p>
        <a href="mailto:animacje@nallipop.pl">animacje@nallipop.pl</a>
      </footer>
    </main>
  );
}

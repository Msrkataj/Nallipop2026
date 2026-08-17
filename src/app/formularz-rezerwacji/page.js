"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageDecorations from "@/components/PageDecorations";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  eventDate: "",
  eventTime: "",
  hours: "",
  eventType: "",
  childrenCount: "",
  childrenAge: "",
  location: "",
  paidAttractions: [],
  notes: "",
  consent: false,
};

const hoursOptions = ["2 godziny", "3 godziny", "4 godziny", "5 godzin lub więcej"];
const eventTypes = [
  "Urodziny",
  "Wesele / chrzciny / komunia",
  "Festyn lub piknik",
  "Impreza szkolna / przedszkolna",
  "Event firmowy",
  "Inne",
];
const paidAttractions = [
  { name: "Malowanie twarzy", icon: "malowanie-twarzy.webp", background: "#e4fbf7", accent: "#0daea6" },
  { name: "Tatuaże brokatowe", icon: "tatuaze-brokatowe.webp", background: "#fff0f8", accent: "#dd4d9b" },
  { name: "Modelowanie balonów", icon: "modelowanie-balonow.webp", background: "#eef0ff", accent: "#6d6fdb" },
  { name: "Bańki XXL", icon: "banki-xxl.webp", background: "#e9f6ff", accent: "#397fd1" },
  { name: "Zamykanie w bańce", icon: "zamykanie-w-bance.webp", background: "#eaf9ef", accent: "#329768" },
  { name: "Warsztaty slime", icon: "warsztaty-slime.webp", background: "#f2fbe5", accent: "#78a82f" },
  { name: "Eksperymenty", icon: "eksperymenty.webp", background: "#fff7d9", accent: "#d69308" },
  { name: "Eksperymenty z suchym lodem", icon: "eksperymenty.webp", background: "#eef6ff", accent: "#477fc4" },
  { name: "Malowanie toreb", icon: "malowanie-toreb.webp", background: "#fff0e8", accent: "#d9683d" },
  { name: "Kompozycja w słoiku", icon: "malowanie-toreb.webp", background: "#eff9e8", accent: "#5f963c" },
  { name: "Łapacze snów", icon: "malowanie-toreb.webp", background: "#f5efff", accent: "#835ac1" },
  { name: "Gniotki", icon: "warsztaty-slime.webp", background: "#fff4df", accent: "#c27c22" },
  { name: "Breloczki", icon: "malowanie-toreb.webp", background: "#eaf8fb", accent: "#278ca0" },
  { name: "Magnesy", icon: "malowanie-toreb.webp", background: "#fff1f3", accent: "#c54f67" },
  { name: "Ramki", icon: "malowanie-toreb.webp", background: "#f3f4ff", accent: "#696dc3" },
  { name: "Lusterka", icon: "malowanie-toreb.webp", background: "#edf9f5", accent: "#368b70" },
  { name: "Piniata", icon: "piniata.webp", background: "#f7eefe", accent: "#a34fc7" },
  { name: "Dmuchaniec", icon: "dmuchaniec.webp", background: "#e7faff", accent: "#1597ad" },
];

export default function FormularzRezerwacjiPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const selectedAttraction = searchParams.get("atrakcja");
    const selectedModel = searchParams.get("model");

    if (selectedAttraction) {
      const matchedAttraction = paidAttractions.find(
        (item) => item.name.toLowerCase() === selectedAttraction.toLowerCase()
      );
      const paidAttractionName = matchedAttraction?.name || "Dmuchaniec";
      const detail = selectedModel || selectedAttraction;
      const notePrefix = paidAttractionName === "Piniata" ? "Wybrany wzór piniaty" : "Wybrany model";

      setForm((current) => ({
        ...current,
        paidAttractions: current.paidAttractions.includes(paidAttractionName)
          ? current.paidAttractions
          : [...current.paidAttractions, paidAttractionName],
        notes: current.notes || `${notePrefix}: ${detail}`,
      }));
    }
  }, []);

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }

  function toggleAttraction(value) {
    setForm((current) => {
      const selected = current.paidAttractions.includes(value);
      return {
        ...current,
        paidAttractions: selected
          ? current.paidAttractions.filter((item) => item !== value)
          : [...current.paidAttractions, value],
      };
    });
  }

  async function submitForm(event) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/rezerwacja", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Nie udało się wysłać formularza.");
      }

      setForm(initialForm);
      setStatus("success");
      setMessage("Dziękujemy! Wrócimy do Ciebie z propozycją.");
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  }

  return (
    <main className="reservation-page decorated-page">
      <PageDecorations variant="reservation" />
      <div className="bubble bubble-one" aria-hidden="true" />
      <div className="bubble bubble-two" aria-hidden="true" />
      <div className="bubble bubble-three" aria-hidden="true" />

      <section className="intro">
        <span className="eyebrow">Zorganizujmy coś wyjątkowego!</span>
        <h1>
          Opowiedz nam o swojej <em>imprezie</em>
        </h1>
        <p>
          Wypełnij krótki formularz, a przygotujemy propozycję dopasowaną do wieku dzieci,
          miejsca i charakteru wydarzenia.
        </p>
        <div className="intro-pills" aria-label="Najważniejsze informacje">
          <span><b>1</b> Wypełnij formularz</span>
          <span><b>2</b> Otrzymaj wycenę</span>
          <span><b>3</b> Bawcie się!</span>
        </div>
      </section>

      <form id="formularz" className="form-card" onSubmit={submitForm}>
        <section className="form-section">
          <div className="section-heading">
            <span className="section-icon">01</span>
            <div>
              <h2>Dane kontaktowe</h2>
              <p>Żebyśmy mogli wrócić do Ciebie z ofertą.</p>
            </div>
          </div>
          <div className="form-grid">
            <label className="field">
              <span>Imię i nazwisko *</span>
              <input required autoComplete="name" placeholder="np. Natalia Marciniak" name="name" value={form.name} onChange={updateField} />
            </label>
            <label className="field">
              <span>Numer telefonu *</span>
              <input required type="tel" autoComplete="tel" placeholder="np. 500 600 700" name="phone" value={form.phone} onChange={updateField} />
            </label>
            <label className="field field-wide">
              <span>Adres e-mail *</span>
              <input required type="email" autoComplete="email" placeholder="np. kontakt@email.pl" name="email" value={form.email} onChange={updateField} />
            </label>
          </div>
        </section>

        <section className="form-section">
          <div className="section-heading">
            <span className="section-icon purple">02</span>
            <div>
              <h2>Szczegóły imprezy</h2>
              <p>Podaj najważniejsze informacje o wydarzeniu.</p>
            </div>
          </div>
          <div className="form-grid three-columns">
            <label className="field">
              <span>Data imprezy *</span>
              <input required type="date" name="eventDate" value={form.eventDate} onChange={updateField} />
            </label>
            <label className="field">
              <span>Godzina rozpoczęcia *</span>
              <input required type="time" name="eventTime" value={form.eventTime} onChange={updateField} />
            </label>
            <label className="field">
              <span>Liczba godzin *</span>
              <select required name="hours" value={form.hours} onChange={updateField}>
                <option value="" disabled>Wybierz</option>
                {hoursOptions.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label className="field field-wide">
              <span>Rodzaj imprezy *</span>
              <select required name="eventType" value={form.eventType} onChange={updateField}>
                <option value="" disabled>Wybierz rodzaj wydarzenia</option>
                {eventTypes.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label className="field">
              <span>Liczba dzieci *</span>
              <input required min="1" type="number" placeholder="np. 12" name="childrenCount" value={form.childrenCount} onChange={updateField} />
            </label>
            <label className="field">
              <span>Wiek dzieci *</span>
              <input required placeholder="np. 5–7 lat" name="childrenAge" value={form.childrenAge} onChange={updateField} />
            </label>
            <label className="field field-wide">
              <span>Miejsce imprezy *</span>
              <input required placeholder="Nazwa lokalu lub dokładny adres" name="location" value={form.location} onChange={updateField} />
            </label>
          </div>
        </section>

        <section className="form-section">
          <div className="section-heading">
            <span className="section-icon pink">03</span>
            <div>
              <h2>Dodatkowo płatne atrakcje</h2>
              <p>Zaznacz dowolną liczbę. Szczegóły i cenę potwierdzimy w ofercie.</p>
            </div>
          </div>
          <div className="attractions">
            {paidAttractions.map((attraction) => (
              <label
                className="attraction"
                key={attraction.name}
                style={{
                  "--attraction-background": attraction.background,
                  "--attraction-accent": attraction.accent,
                }}
              >
                <input
                  type="checkbox"
                  name="paidAttractions"
                  value={attraction.name}
                  checked={form.paidAttractions.includes(attraction.name)}
                  onChange={() => toggleAttraction(attraction.name)}
                />
                <span className="check" aria-hidden="true">✓</span>
                <span className="mini-icon" aria-hidden="true">
                  <Image
                    src={`/images/nallipop-ikony-atrakcje-profesjonalne/${attraction.icon}`}
                    alt=""
                    width={48}
                    height={48}
                  />
                </span>
                <span className="attraction__name">{attraction.name}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="form-section last-section">
          <div className="section-heading">
            <span className="section-icon yellow">04</span>
            <div>
              <h2>Uwagi</h2>
              <p>Napisz, co jeszcze warto wiedzieć.</p>
            </div>
          </div>
          <label className="field field-wide">
            <span>Dodatkowe informacje</span>
            <textarea
              name="notes"
              rows="5"
              placeholder="Motyw przewodni, warunki w miejscu imprezy lub inne pytania…"
              value={form.notes}
              onChange={updateField}
            />
            <small className="sensitive-data-warning">Nie wpisuj tutaj danych o zdrowiu dzieci, diagnoz ani innych informacji szczególnie chronionych. Informacje potrzebne dla bezpieczeństwa ustalimy odrębnie po potwierdzeniu rezerwacji.</small>
          </label>
          <label className="consent">
            <input required type="checkbox" name="consent" checked={form.consent} onChange={updateField} />
            <span>Zapoznałam/-em się z <Link href="/regulamin" target="_blank">Regulaminem</Link> oraz <Link href="/polityka-prywatnosci" target="_blank">Polityką prywatności</Link>. Rozumiem, że wysłanie formularza stanowi jedynie zapytanie i nie oznacza rezerwacji terminu ani zawarcia umowy. *</span>
          </label>
          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Wysyłanie…" : "Wyślij zapytanie"}
            <span aria-hidden="true">→</span>
          </button>
          <p className="form-note">Administratorem danych jest KamaLogic Kamil Tosnowiec, ul. Nadrzeczna 7, 05-840 Krosna-Parcela, NIP 5342671266. Dane wykorzystamy, aby odpowiedzieć na zapytanie i przygotować ofertę. Podanie danych kontaktowych jest dobrowolne, ale konieczne do udzielenia odpowiedzi. Szczegóły dotyczące odbiorców, okresów przechowywania i praw znajdują się w <Link href="/polityka-prywatnosci">Polityce prywatności</Link>. Kontakt: animacje@nallipop.pl.</p>
          {message && (
            <p className={`success ${status === "error" ? "error" : ""}`} role="status">
              <b>{status === "success" ? "Formularz wysłany" : "Nie udało się wysłać"}</b>
              {message}
            </p>
          )}
        </section>
      </form>

      <footer><span>Nallipop</span> · animacje z uśmiechem ♡</footer>
    </main>
  );
}

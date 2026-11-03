"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import PageDecorations from "@/components/PageDecorations";
import AttractionPicker from "@/components/AttractionPicker";
import AutumnPackageBanner from "@/components/AutumnPackageBanner";
import FormSuccess from "@/components/FormSuccess";
import { paidAttractions } from "@/data/reservation-attractions";
import { getSeasonalPackage } from "@/data/seasonal-packages";
import { photoboothScenes, photoboothPricing } from "@/data/photobooth";
import { reportContactFormConversion } from "@/lib/google-ads";
import { getWarsawDate, validateEventDetails } from "@/lib/reservation-validation";

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
  seasonalPackage: "",
  notes: "",
  consent: false,
};

const hoursOptions = ["2 godziny", "3 godziny", "4 godziny", "5 godzin lub więcej"];
const eventTypes = [
  "Urodziny",
  "Wesele",
  "Chrzciny",
  "Komunia",
  "Festyn lub piknik",
  "Impreza szkolna / przedszkolna",
  "Event firmowy",
  "Inne",
];


function subscribeToDate(onChange) {
  const timer = window.setInterval(onChange, 60000);
  window.addEventListener("focus", onChange);
  return () => {
    window.clearInterval(timer);
    window.removeEventListener("focus", onChange);
  };
}
const serverDate = () => "";

export default function FormularzRezerwacjiPage() {
  const today = useSyncExternalStore(subscribeToDate, getWarsawDate, serverDate);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const availableHours = form.paidAttractions.includes("Fotobudka") ? ["1 godzina", ...hoursOptions] : hoursOptions;

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const selectedAttraction = searchParams.get("atrakcja");
    const selectedModel = searchParams.get("model");
    const selectedOffer = searchParams.get("oferta");
    const selectedPackage = getSeasonalPackage(searchParams.get("pakiet"));
    if (selectedOffer) {
      const occasion = { urodziny: "Urodziny", wesela: "Wesele", komunie: "Komunia", mikolajki: "Inne", impreza: "Inne", festyny: "Festyn lub piknik", warsztaty: "Impreza szkolna / przedszkolna", eventy: "Event firmowy", polkolonie: "Inne" }[selectedOffer];
      if (occasion) setForm((current) => ({ ...current, eventType: occasion }));

      const holidayService = {
        "malowanie-dyni": "Jesienne warsztaty malowania dyni",
        "warsztaty-z-elfem": "Warsztaty z Elfem",
        "wizyta-mikolaja": "Wizyta Mikołaja",
      }[selectedOffer];
      if (holidayService) setForm((current) => ({ ...current, notes: current.notes || `Interesuje mnie: ${holidayService}.` }));
    }

    if (selectedPackage) {
      setForm((current) => ({ ...current, seasonalPackage: selectedPackage.id, hours: current.hours || "2 godziny" }));
    }

    if (selectedAttraction) {
      const matchedAttraction = paidAttractions.find(
        (item) => [item.name, item.displayName, ...(item.aliases || [])].some((name) => name?.toLowerCase() === selectedAttraction.toLowerCase())
      );
      const paidAttractionName = matchedAttraction?.name || "Dmuchaniec";
      const detail = selectedModel || matchedAttraction?.displayName || matchedAttraction?.name || selectedAttraction;
      const notePrefix = paidAttractionName === "Piniata" ? "Wybrany wzór piniaty" : matchedAttraction && !selectedModel ? "Wybrana atrakcja" : "Wybrany model";
      const photoScene = paidAttractionName === "Fotobudka"
        ? photoboothScenes.find((scene) => scene.id === searchParams.get("scenografia"))
        : null;
      const attractionNote = photoScene
        ? `Wybrana atrakcja: Fotobudka. Scenografia: ${photoScene.label} — ${photoScene.tags.join(", ")}.`
        : `${notePrefix}: ${detail}`;
      const photoPackage = paidAttractionName === "Fotobudka"
        ? photoboothPricing.packages.find((item) => String(item.hours) === searchParams.get("czas-fotobudki"))
        : null;
      const packageNote = photoPackage
        ? ` Czas działania fotobudki: ${photoPackage.label}. Cena: ${photoPackage.price} zł brutto. ${photoboothPricing.transportNote}`
        : "";

      setForm((current) => ({
        ...current,
        paidAttractions: current.paidAttractions.includes(paidAttractionName)
          ? current.paidAttractions
          : [...current.paidAttractions, paidAttractionName],
        hours: current.hours || photoPackage?.label || "",
        notes: current.notes || `${attractionNote}${packageNote}`,
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
        hours: selected && value === "Fotobudka" && current.hours === "1 godzina" ? "" : current.hours,
      };
    });
  }

  async function submitForm(event) {
    event.preventDefault();
    if (status === "sending" || status === "success") return;
    const validationError = validateEventDetails(form);
    if (validationError) {
      setStatus("error");
      setMessage(validationError);
      return;
    }
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
      reportContactFormConversion();
      setStatus("success");
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

      {status === "success" ? (
        <div id="formularz" className="form-card">
          <FormSuccess reservation />
        </div>
      ) : (
      <form id="formularz" className="form-card" onSubmit={submitForm} aria-busy={status === "sending"}>
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
              <input required type="date" min={today} name="eventDate" value={form.eventDate} onChange={updateField} />
            </label>
            <label className="field">
              <span>Godzina rozpoczęcia *</span>
              <input required type="time" name="eventTime" value={form.eventTime} onChange={updateField} />
            </label>
            <label className="field">
              <span>Liczba godzin *</span>
              <select required name="hours" value={form.hours} onChange={updateField}>
                <option value="" disabled>Wybierz</option>
                {availableHours.map((option) => <option key={option}>{option}</option>)}
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
              <span>Adres imprezy *</span>
              <input required autoComplete="street-address" placeholder="np. ul. Słoneczna 12, Pruszków" name="location" value={form.location} onChange={updateField} />
            </label>
          </div>
        </section>

        <AutumnPackageBanner
          selectedPackage={form.seasonalPackage}
          onChange={(id) => setForm((current) => ({ ...current, seasonalPackage: id, hours: id ? current.hours || "2 godziny" : current.hours }))}
        />

        <section className="form-section" id="atrakcje-dodatkowe" style={{ scrollMarginTop: "120px" }}>
          <div className="section-heading">
            <span className="section-icon pink">03</span>
            <div>
              <h2>Dodatkowo płatne atrakcje</h2>
              <p>Zaznacz dowolną liczbę. Szczegóły i cenę potwierdzimy w ofercie.</p>
            </div>
          </div>
          <AttractionPicker selected={form.paidAttractions} onToggle={toggleAttraction} />
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
          {status === "error" && message && (
            <p className="success error" role="alert">
              <b>Nie udało się wysłać</b>
              {message}
            </p>
          )}
        </section>
      </form>
      )}

      <footer><span>Nallipop</span> · animacje z uśmiechem ♡</footer>
    </main>
  );
}

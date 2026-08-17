"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SocialLinks from "@/components/SocialLinks";
import TrustedPartners from "@/components/TrustedPartners";
import BrandLogo from "@/components/BrandLogo";
import PageDecorations from "@/components/PageDecorations";

const clientReviews = [
  ["Anna", "Dzieci zachwycone, a rodzice mogli spokojnie napić się kawy. Bardzo dziękujemy!"],
  ["Kasia", "Super!"],
  ["Monika", "Animatorka od pierwszych minut złapała świetny kontakt z dziećmi. Zabawy były dostosowane do ich wieku, a cały program poprowadzony bardzo sprawnie."],
  ["Paulina", "Polecamy z całego serca ❤️"],
  ["Marta", "Wszystko zgodnie z ustaleniami. Punktualnie, profesjonalnie i z bardzo dobrym podejściem do dzieci."],
  ["Karolina", "Najlepsze animacje, na jakich byliśmy!"],
  ["Magda", "Dzieciaki bawiły się świetnie i nawet nie zauważyły, kiedy minęły dwie godziny."],
  ["Joanna", "Bardzo sympatyczna animatorka, dużo ciekawych zabaw i piękne malowanie twarzy. Córka była zachwycona."],
  ["Agnieszka", "Rewelacja!"],
  ["Ewelina", "Zamówiliśmy animacje na urodziny syna. Grupa była bardzo energiczna, ale animatorka świetnie sobie poradziła i potrafiła zaangażować każde dziecko."],
  ["Natalia", "Wszystko super, dzieci zadowolone 😊"],
  ["Aleksandra", "Profesjonalna organizacja, dobry kontakt przed wydarzeniem i bardzo ciekawe atrakcje. Zdecydowanie polecam Nallipop."],
  ["Ola", "Było ekstra!!!"],
  ["Sylwia", "Dziękujemy za wspaniałą zabawę. Największym hitem okazały się bańki XXL i zamykanie w bańce."],
  ["Justyna", "Pani Natalia ma cudowne podejście do dzieci. Nawet nasza nieśmiała córka po chwili dołączyła do wspólnej zabawy."],
  ["Dorota", "Polecam."],
  ["Kamila", "Animacje były bardzo różnorodne. Był ruch, muzyka, konkursy i chwila na spokojniejszą pracę plastyczną. Dzieci nie miały czasu się nudzić."],
  ["Weronika", "Bardzo fajnie poprowadzone urodziny, napewno jeszcze skorzystamy."],
  ["Małgorzata", "Pełen profesjonalizm od pierwszego kontaktu aż do zakończenia imprezy. Program został dopasowany do wieku uczestników i warunków panujących na miejscu."],
  ["Emilia", "Dzieci przeszczęśliwe!"],
  ["Patrycja", "Świetna energia, dużo uśmiechu i naprawdę dobre podejście do najmłodszych."],
  ["Klaudia", "Wszystko było dobrze przygotowane. Pani przyjechała punktualnie i miała ze sobą mnóstwo potrzebnych rzeczy."],
  ["Ania", "Cudownie ❤️"],
  ["Katarzyna", "Korzystaliśmy z animacji podczas wesela. Dzieci miały swoje zajęcia, a rodzice mogli spokojnie uczestniczyć w przyjęciu. Bardzo dobre rozwiązanie."],
  ["Beata", "Super zabawy i bardzo miła pani animatorka."],
  ["Dominika", "Syn powiedział, że to były jego najlepsze urodziny, więc chyba lepszej opinii nie potrzeba :)"],
  ["Iwona", "Duży wybór atrakcji i bezproblemowy kontakt. Wszystko odbyło się dokładnie tak, jak wcześniej ustaliliśmy."],
  ["Milena", "Polecam każdemu!"],
  ["Barbara", "Było dużo dzieci w różnym wieku, a mimo tego każde znalazło coś dla siebie. Naprawdę jesteśmy pod wrażeniem."],
  ["Maja", "Dzieci nie chciały kończyć zabawy 😄"],
  ["Julia", "Fajna atmosfera, ciekawe konkurencje i zero nudy. Dziękujemy!"],
  ["Elżbieta", "Animacje na wysokim poziomie. Widać doświadczenie, przygotowanie pedagogiczne i naturalną łatwość w nawiązywaniu kontaktu z dziećmi."],
  ["Sandra", "Wszystko super, tylko za szybko zleciało :)"],
  ["Alicja", "Największe zainteresowanie wzbudziły eksperymenty. Dzieci jeszcze długo po imprezie opowiadały o tym, co robiły."],
  ["Marzena", "Świetnie!"],
  ["Renata", "Bardzo dziękujemy za urozmaicenie naszego rodzinnego pikniku. Atrakcje zostały sprawnie dopasowane do liczby i wieku dzieci."],
  ["Wiktoria", "Miło, kolorowo i z pomysłem. Polecamy Nallipop!"],
  ["Żaneta", "Pani animatorka była cierpliwa i uśmiechnięta. Poradziła sobie nawet z dziećmi, które początkowo nie chciały brać udziału w zabawach."],
  ["Angelika", "Naprawde warto, dzieciaki zachwycone."],
  ["Kinga", "Zamówiliśmy animacje, malowanie twarzy i modelowanie balonów. Wszystkie atrakcje cieszyły się dużym zainteresowaniem."],
  ["Marlena", "Bardzo dobry kontakt i elastyczne podejście. Kiedy pogoda pokrzyżowała nasze plany, program szybko dostosowano do zabawy w pomieszczeniu."],
  ["Daria", "Petarda!"],
  ["Izabela", "Dziękujemy za cierpliwość, uśmiech i ogromne zaangażowanie. Dzieci bawiły się znakomicie, a całość była dopracowana w każdym szczególe."],
  ["Olga", "Napewno wrócimy przy kolejnej okazji. Było super!"],
].map(([name, text]) => ({ name, text }));

const fixlyReviews = [
  {
    name: "Mariusz",
    location: "Sulejówek",
    date: "19 maja 2026",
    source: "Opinia z Fixly",
    text: "Wszystko super",
  },
  {
    name: "Beata",
    location: "Warszawa",
    date: "17 listopada 2025",
    source: "Opinia z Fixly",
    text: "Bardzo polecam. Pani świetnie radzi sobie z dziećmi – od pierwszej minuty złapała z nimi kontakt i sprawiła, że były uśmiechnięte, zaangażowane i ani przez chwilę się nie nudziły. Zabawy były kreatywne i dostosowane do wieku dzieci.",
  },
  {
    name: "Pavlos",
    location: "Ożarów Mazowiecki",
    date: "22 września 2025",
    source: "Opinia z Fixly",
    text: "Tha animator was great!",
  },
  {
    name: "Małgorzata",
    location: "Ożarów Mazowiecki",
    date: "25 czerwca 2025",
    source: "Opinia z Fixly",
    category: "Organizacja imprez okolicznościowych",
    text: "Profesjonalne podejście do tematu, Bardzo dużo, roznego rodzaju zabaw i animacji. Dzieci zachwycone",
  },
  {
    name: "Joanna",
    location: "Warszawa",
    date: "11 maja 2025",
    source: "Opinia z Fixly",
    text: "Wszystko bardzo sprawnie, buzie umalowane, dzieci zabawione, wszyscy zadowoleni – bardzo polecam!",
  },
  {
    name: "Matylda",
    location: "Warszawa",
    date: "15 grudnia 2024",
    source: "Opinia z Fixly",
    text: "Zabawa była świetnie zorganizowana. Warsztaty slime to hit – kreatywnie, dużo uśmiechu, pamiątka do zabrania do domu. Dzieci były zachwycone. Polecam :)",
  },
  {
    name: "Beata",
    location: "Warszawa",
    date: "21 listopada 2024",
    source: "Opinia z Fixly",
    text: "Pani Natalia nie zawiodła - punktualnie i z walizką i głową pełną pomysłów - od razu zajęła się dziećmi i nie było ich przez 2 godziny! Córka zachwycona! Polecam!",
  },
  {
    name: "Sławomir",
    location: "Sochaczew",
    date: "1 lipca 2024",
    source: "Opinia z Fixly",
    text: "Polecam - profesjonalnie i sympatycznie, konkurencyjne ceny",
  },
  {
    name: "Iwona",
    location: "Raszyn",
    date: "26 czerwca 2024",
    source: "Opinia z Fixly",
    text: "dzieci byli bardzo zadowolone ;) na pewno sie jeszcze spotkamy",
  },
  {
    name: "Beata",
    location: "Warszawa",
    date: "16 czerwca 2024",
    source: "Opinia z Fixly",
    text: "Było rewelacyjnie! Dzieci zachwycone (10 dzieciaków) a my rodzice uratowani 🥳🥳🥳",
  },
];

const reasons = [
  ["☆", "Pomagasz innym", "Twoja opinia pomoże innym rodzicom wybrać najlepsze animacje dla ich dzieci."],
  ["☺", "Motywujesz nas", "Każda opinia to dla nas motywacja do dalszego działania i jeszcze lepszej pracy."],
  ["🎁", "Mały gest, wielka radość", "Dziękujemy! Każda opinia wywołuje uśmiech i dodaje nam energii."],
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.55, ease: "easeOut" },
};

function Stars({ large = false }) {
  return <span className={large ? "review-stars review-stars--large" : "review-stars"}>★★★★★</span>;
}

export default function OpiniePage() {
  const [visibleClientReviews, setVisibleClientReviews] = useState(6);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formStatus, setFormStatus] = useState("idle");
  const [formMessage, setFormMessage] = useState("");

  async function handleReviewSubmit(event) {
    event.preventDefault();
    const formElement = event.currentTarget;

    if (!rating) {
      setFormStatus("error");
      setFormMessage("Wybierz ocenę od 1 do 5 gwiazdek.");
      return;
    }

    const formData = Object.fromEntries(new FormData(formElement).entries());
    setFormStatus("sending");
    setFormMessage("");

    try {
      const response = await fetch("/api/opinie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, rating }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Nie udało się wysłać opinii.");
      }

      formElement.reset();
      setRating(0);
      setHoveredRating(0);
      setFormStatus("success");
      setFormMessage(result.message);
    } catch (error) {
      setFormStatus("error");
      setFormMessage(error.message);
    }
  }

  return (
    <main className="reviews-page decorated-page">
      <PageDecorations variant="reviews" />
      <section className="reviews-hero">
        <div className="container reviews-hero__grid">
          <motion.div className="reviews-hero__copy" {...fadeUp}>
            <nav className="offer-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Strona główna</Link>
              <span aria-hidden="true">›</span>
              <span>Opinie</span>
            </nav>
            <h1>
              Opinie, które dodają nam <span>skrzydeł!</span>
            </h1>
            <p>Zadowolenie dzieci i rodziców to dla nas największa nagroda. Dziękujemy za zaufanie!</p>
          </motion.div>

          <motion.div className="reviews-hero__visual" {...fadeUp}>
            <div className="reviews-hero__person image-fill" />
            <div className="reviews-hero__bubble">
              <strong>Dziękujemy za każdą opinię!</strong>
              <Stars />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="reviews-main">
        <div className="container">
          <div className="section-heading">
            <h2>Opinie naszych klientów</h2>
          </div>

          <motion.div className="reviews-main__grid" {...fadeUp}>
            <div className="review-cards" aria-live="polite">
              {clientReviews.slice(0, visibleClientReviews).map((review, index) => (
                <article className="review-card" key={`${review.name}-${index}`}>
                  <div className="review-card__author">
                    <span className={`review-initial review-initial--${index % 5}`} aria-hidden="true">
                      {review.name.slice(0, 2).toUpperCase()}
                    </span>
                    <div>
                      <strong>{review.name}</strong>
                      <small>Klient Nallipop</small>
                    </div>
                  </div>
                  <Stars />
                  <p>{review.text}</p>
                  <div className="review-card__meta">
                    <span>Opinia klienta</span>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>

          {visibleClientReviews < clientReviews.length ? (
            <button
              className="reviews-more"
              type="button"
              onClick={() => setVisibleClientReviews((current) => Math.min(current + 6, clientReviews.length))}
            >
              Rozwiń opinie <span aria-hidden="true">↓</span>
            </button>
          ) : (
            <p className="reviews-complete">Wyświetlono wszystkie 44 opinie.</p>
          )}
        </div>
      </section>

      <section className="fixly-section">
        <div className="container fixly-section__inner">
          <div className="fixly-content">
            <div className="fixly-score">
              <span>Opinie o „Nallipop”</span>
              <div><Stars large /><strong>4.9</strong></div>
              <p>38 opinii <small>(od 37 klientów)</small></p>
            </div>
            <div className="fixly-marquee" aria-label="Wybrane opinie z Fixly">
              <div className="fixly-marquee__track">
                {[...fixlyReviews, ...fixlyReviews].map((review, index) => (
                  <article className="fixly-card" key={`${review.name}-${index}`} aria-hidden={index >= fixlyReviews.length}>
                    <div className="fixly-card__top">
                      <Stars />
                      <span>✓ Opinia z Fixly</span>
                    </div>
                    <p>{review.text}</p>
                    <div className="fixly-card__author">
                      <span>{review.name.slice(0, 2).toUpperCase()}</span>
                      <strong>{review.name}<small>{review.location}</small></strong>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <a className="fixly-profile-link" href="https://fixly.pl/profil/o91vlvdx" target="_blank" rel="noreferrer">
              Zobacz pełny profil na Fixly <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="fixly-award">
            <Image src="/images/fixly2024.jpg" alt="Top wykonawca Fixly 2024 — Nallipop" width={320} height={320} />
          </div>
        </div>
      </section>

      <section className="about-trust trusted-section" id="zaufali">
        <div className="container">
          <TrustedPartners />
        </div>
      </section>

      <section className="review-form-section" id="dodaj-opinie">
        <div className="container review-form-shell">
          <motion.form className="review-form" onSubmit={handleReviewSubmit} {...fadeUp}>
            <h2>Podziel się swoją opinią</h2>
            <p>Twoja opinia pomoże innym rodzicom w wyborze idealnych animacji dla ich dzieci.</p>
            <div
              className="review-form__stars"
              role="radiogroup"
              aria-label="Ocena od 1 do 5 gwiazdek"
              onMouseLeave={() => setHoveredRating(0)}
            >
              {[1, 2, 3, 4, 5].map((value) => {
                const isActive = value <= (hoveredRating || rating);
                return (
                  <button
                    className={isActive ? "is-active" : ""}
                    type="button"
                    role="radio"
                    aria-checked={rating === value}
                    aria-label={`${value} ${value === 1 ? "gwiazdka" : value < 5 ? "gwiazdki" : "gwiazdek"}`}
                    key={value}
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoveredRating(value)}
                    onFocus={() => setHoveredRating(value)}
                    onBlur={() => setHoveredRating(0)}
                  >★</button>
                );
              })}
              <span className="review-form__rating-label" aria-live="polite">
                {rating ? `${rating}/5` : "Wybierz ocenę"}
              </span>
            </div>
            <input name="name" aria-label="Imię i nazwisko" placeholder="Imię i nazwisko" autoComplete="name" minLength={2} maxLength={100} required />
            <input name="email" aria-label="E-mail" placeholder="E-mail (nie będzie publikowany)" type="email" autoComplete="email" maxLength={160} required />
            <textarea name="text" aria-label="Twoja opinia" placeholder="Twoja opinia" rows={5} minLength={10} maxLength={2000} required />
            <label className="review-form__website" aria-hidden="true">
              <span>Strona internetowa</span>
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
            <label className="review-form__consent">
              <input name="publicationConsent" type="checkbox" required />
              <span>Zgadzam się na publikację mojej opinii na stronie Nallipop. *</span>
            </label>
            <label className="review-form__consent">
              <input name="legalAccepted" type="checkbox" required />
              <span>Zapoznałam/-em się z <Link href="/polityka-prywatnosci" target="_blank">Polityką prywatności</Link>. Wiem, że adres e-mail nie będzie publikowany. *</span>
            </label>
            <button className="button button--primary" type="submit" disabled={formStatus === "sending"}>
              {formStatus === "sending" ? "Wysyłanie…" : "Wyślij opinię"} <span aria-hidden="true">→</span>
            </button>
            {formMessage && (
              <div className={`review-form__message is-${formStatus}`} role="status">
                <strong>{formStatus === "success" ? "Dziękujemy za opinię!" : "Sprawdź formularz"}</strong>
                <span>{formMessage}</span>
              </div>
            )}
          </motion.form>

          <motion.div className="review-reasons" {...fadeUp}>
            <h2>Dlaczego warto zostawić opinię?</h2>
            <div className="review-reasons__list">
              {reasons.map(([icon, title, text]) => (
                <article key={title}>
                  <span>{icon}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="review-thanks">
              <Image src="/images/kocur.png" alt="Kot Nallipop" width={180} height={180} />
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="offer-footer" id="kontakt">
        <div className="container offer-footer__grid">
          <div>
            <Link href="/" className="offer-footer__logo">
              <BrandLogo />
            </Link>
            <p>Tworzymy niezapomniane chwile dla dzieci pełne uśmiechu, zabawy i kreatywności.</p>
            <SocialLinks />
          </div>

          <div>
            <h3>Nawigacja</h3>
            <Link href="/">Strona główna</Link>
            <Link href="/#o-nas">O nas</Link>
            <Link href="/oferta">Oferta</Link>
            <Link href="/atrakcje">Atrakcje</Link>
            <Link href="/galeria">Galeria</Link>
            <Link href="/opinie">Opinie</Link>
            <Link href="/kontakt">Kontakt</Link>
          </div>

          <div>
            <h3>Kontakt</h3>
            <a href="tel:+48795103108">795 103 108</a>
            <a href="mailto:animacje@nallipop.pl">animacje@nallipop.pl</a>
            <span>Warszawa i okolice</span>
          </div>

          <div>
            <h3>Gdzie działamy?</h3>
            <div className="offer-footer__map image-fill" style={{ backgroundImage: "url(/images/warszawa-map.webp)" }} />
          </div>
        </div>
      </footer>
    </main>
  );
}

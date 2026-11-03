import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faWandMagicSparkles, faPalette, faArrowRight, faPhone, faStar } from "@fortawesome/free-solid-svg-icons";
import JsonLd from "@/components/JsonLd";
import { createBreadcrumbSchema, createPageMetadata, createServiceSchema } from "@/lib/seo";
import "@/styles/mikolaj.scss";

const description = "Wynajmij Świętego Mikołaja, zaproś Mikołaja z Elfem lub zorganizuj świąteczne warsztaty z Elfem. Nallipop – Warszawa i okolice. Zapytaj o termin!";
const photo = "/images/mikolaj/mikolaj-z-elfem.webp";

export const metadata = createPageMetadata({
  title: "Mikołaj i Elf – wizyty i warsztaty świąteczne",
  description,
  path: "/mikolaj",
  image: photo,
  imageWidth: 1200,
  imageHeight: 1600,
  imageAlt: "Święty Mikołaj i Elf Nallipop podczas świątecznego spotkania z dziećmi",
  keywords: ["Mikołaj na wynajem Warszawa", "Mikołaj z Elfem", "warsztaty świąteczne z Elfem", "Mikołajki dla dzieci"],
});

const offers = [
  {
    id: "wizyta-mikolaja", number: "01", icon: faGift, label: "Klasyczna magia świąt", title: "Wizyta Mikołaja",
    text: "Pukanie do drzwi, dźwięk dzwoneczka i ten uśmiech, gdy do sali wchodzi wyjątkowy gość. Zaproś Mikołaja na kameralne spotkanie lub większe wydarzenie i podaruj dzieciom wspomnienie, do którego będą wracać.",
    features: ["Spotkanie i rozmowy z Mikołajem", "Wręczanie przygotowanych przez organizatora prezentów", "Chwila na pamiątkowe zdjęcia"],
    cta: "Zaproś Mikołaja",
  },
  {
    number: "02", icon: faWandMagicSparkles, label: "Jeszcze więcej radości", title: "Mikołaj z Elfem",
    text: "Ten duet potrafi rozbudzić świąteczną wyobraźnię! Elf zaprasza dzieci do wspólnej zabawy i pomaga stworzyć atmosferę oczekiwania, a Mikołaj wnosi ciepło, uśmiech i magię wyczekanej wizyty.",
    features: ["Wizyta Mikołaja w towarzystwie Elfa", "Świąteczne zabawy i angażowanie dzieci", "Wręczanie prezentów i wspólne zdjęcia"],
    cta: "Zaproś świąteczny duet", featured: true,
  },
  {
    number: "03", icon: faPalette, label: "Małe ręce, wielkie pomysły", title: "Warsztaty z Elfem",
    text: "Zamieńcie salę w małą pracownię świątecznych pomysłów. Pod okiem Elfa dzieci tworzą, ozdabiają i cieszą się tym, co zrobiły samodzielnie. To okazja do wspólnego działania i przygotowania własnej świątecznej pamiątki.",
    features: ["Kreatywne zajęcia prowadzone przez Elfa", "Temat dopasowany do wieku i liczby dzieci", "Samodzielne wydarzenie lub dodatek do wizyty Mikołaja"],
    cta: "Zamów warsztaty z Elfem",
  },
];

const faqs = [
  ["Czy można zaprosić samego Mikołaja?", "Tak. Możesz wybrać wizytę samego Mikołaja, spotkanie Mikołaja z Elfem albo warsztaty prowadzone przez Elfa. Pomagamy dobrać wariant do Waszego wydarzenia."],
  ["Czy warsztaty z Elfem można zamówić bez wizyty Mikołaja?", "Tak! Warsztaty świąteczne z Elfem mogą być osobnym wydarzeniem. Można też połączyć je z wizytą Mikołaja, aby spotkanie miało część kreatywną i uroczyste wręczanie prezentów."],
  ["Gdzie mogą odbyć się świąteczne spotkania?", "Dojeżdżamy na wydarzenia w Warszawie i okolicach: do domów, przedszkoli, szkół, sal i na spotkania firmowe. Podaj adres lub miejscowość, a potwierdzimy możliwość dojazdu."],
  ["Ile trwa spotkanie i jaki jest koszt?", "Czas i wycenę ustalamy indywidualnie, zależnie od wybranego wariantu, terminu, miejsca oraz liczby dzieci. Prześlij te informacje, a przygotujemy propozycję dla Waszej grupy."],
  ["Jak ustalić wręczanie prezentów?", "Jeśli Mikołaj ma rozdawać upominki, przygotuj je jako organizator. Przed spotkaniem ustalimy sposób ich przekazania i wręczania, aby każde dziecko dostało właściwy prezent."],
];

export default function MikolajPage() {
  return (
    <main className="christmas-page">
      <section className="christmas-hero">
        <div className="container">
          <nav className="offer-breadcrumb" aria-label="Okruszki nawigacji">
            <Link href="/">Strona główna</Link><span aria-hidden="true">/</span><span aria-current="page">Mikołaj i Elf</span>
          </nav>
          <div className="christmas-hero__grid">
            <div className="christmas-hero__copy">
              <span className="christmas-eyebrow">Świąteczne spotkania z Nallipop</span>
              <h1>Trochę magii.<br />Mnóstwo radości.<br /><em>Mikołaj jest blisko!</em></h1>
              <p>Zaproś do siebie Świętego Mikołaja i spraw, by dzieci na chwilę zapomniały o całym świecie. Z Elfem u boku lub podczas twórczych warsztatów — stworzymy razem Waszą świąteczną historię.</p>
              <div className="christmas-actions">
                <Link className="christmas-button" href="/kontakt#formularz">Zapytaj o swój termin <FontAwesomeIcon icon={faArrowRight} /></Link>
                <a className="christmas-text-link" href="#swiateczna-oferta">Poznaj 3 warianty <span aria-hidden="true">↓</span></a>
              </div>
              <div className="christmas-hero__details"><span>Warszawa i okolice</span><span>Z dojazdem do Was</span></div>
            </div>
            <figure className="christmas-hero__photo">
              <Image src={photo} width={1200} height={1600} preload sizes="(max-width: 760px) calc(100vw - 36px), 45vw" alt="Święty Mikołaj i Elf Nallipop z dziećmi w świątecznej scenerii" />
              <figcaption><FontAwesomeIcon icon={faStar} aria-hidden="true" /><span>Prawdziwe spotkania.<br /><strong>Najpiękniejsze wspomnienia.</strong></span></figcaption>
              <span className="christmas-hero__stamp" aria-hidden="true">Ho, ho,<br />ho!</span>
            </figure>
          </div>
        </div>
      </section>

      <div className="christmas-ribbon" aria-label="Oferta na święta">
        <span>Wizyty Mikołaja</span><span aria-hidden="true">✦</span><span>Świąteczna zabawa z Elfem</span><span aria-hidden="true">✦</span><span>Kreatywne warsztaty</span>
      </div>

      <section className="christmas-section container" id="swiateczna-oferta" aria-labelledby="christmas-offers-title">
        <div className="christmas-heading">
          <span className="christmas-eyebrow">Wybierz swoją świąteczną historię</span>
          <h2 id="christmas-offers-title">Trzy sposoby na wyjątkowe święta</h2>
          <p>Kameralna wizyta, rozbawiona grupa czy twórcze spotkanie? Wybierz to, co sprawi Waszym dzieciom najwięcej radości.</p>
        </div>
        <div className="christmas-offers">
          {offers.map((offer) => (
            <article key={offer.number} id={offer.id} className={`christmas-card${offer.featured ? " christmas-card--featured" : ""}`}>
              <div className="christmas-card__top"><FontAwesomeIcon icon={offer.icon} aria-hidden="true" /><span>{offer.number}</span></div>
              <span className="christmas-card__label">{offer.label}</span>
              <h3>{offer.title}</h3>
              <p>{offer.text}</p>
              <ul>{offer.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <Link href="/kontakt#formularz" className="christmas-card__link">{offer.cta}<FontAwesomeIcon icon={faArrowRight} aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="christmas-workshops" id="warsztaty-z-elfem" aria-labelledby="christmas-workshops-title">
        <div className="container christmas-workshops__grid">
          <div>
            <span className="christmas-eyebrow">W pracowni Elfa</span>
            <h2 id="christmas-workshops-title">Święta stworzone<br />małymi rączkami.</h2>
            <p>Niech przygotowania do świąt staną się przygodą. Elf zachęca do eksperymentowania z kolorami, pomaga wcielać pomysły w życie i zostawia miejsce na dziecięcą wyobraźnię.</p>
            <p>Możemy wspólnie zaplanować na przykład ozdoby choinkowe, świąteczne kartki albo drobne dekoracje. Konkretny temat, materiały i przebieg zajęć ustalimy przy przygotowaniu oferty.</p>
            <Link className="christmas-button" href="/kontakt#formularz">Zaplanuj warsztaty z Elfem <FontAwesomeIcon icon={faArrowRight} /></Link>
          </div>
          <div className="christmas-workshops__ideas">
            <span className="christmas-workshops__note">Garść świątecznych inspiracji</span>
            {[["01", "Ozdoby na choinkę", "Małe dzieła, które znajdą swoje miejsce między lampkami."], ["02", "Kartki od serca", "Własnoręczne życzenia dla kogoś naprawdę bliskiego."], ["03", "Świąteczne dekoracje", "Kolorowe pomysły, które wprowadzą do domu grudniowy nastrój."]].map(([number, title, text]) => (
              <div className="christmas-idea" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></div>
            ))}
            <p className="christmas-workshops__footnote">Warsztaty możesz zamówić także bez wizyty Mikołaja.</p>
          </div>
        </div>
      </section>

      <section className="christmas-section container christmas-plan" aria-labelledby="christmas-plan-title">
        <div>
          <span className="christmas-eyebrow">Od pomysłu do spotkania</span>
          <h2 id="christmas-plan-title">Wy opowiadacie.<br />My pomagamy<br />wyczarować święta.</h2>
          <p>W domu, przedszkolu, szkole czy na firmowych Mikołajkach — dopasujemy propozycję do miejsca, wieku dzieci i charakteru wydarzenia.</p>
        </div>
        <ol>
          <li><span>1</span><div><h3>Opowiedz o swoich planach</h3><p>Podaj termin, miejscowość, liczbę i wiek dzieci oraz wybrany wariant spotkania.</p></div></li>
          <li><span>2</span><div><h3>Ustalmy szczegóły</h3><p>Potwierdzimy dostępność i przygotujemy wycenę. Omówimy czas, program oraz ewentualne wręczanie prezentów.</p></div></li>
          <li><span>3</span><div><h3>Czekajcie na świątecznych gości</h3><p>Po potwierdzeniu rezerwacji pozostaje odliczanie do wspólnego spotkania!</p></div></li>
        </ol>
      </section>

      <section className="christmas-faq container" aria-labelledby="christmas-faq-title">
        <div className="christmas-heading"><span className="christmas-eyebrow">Warto wiedzieć</span><h2 id="christmas-faq-title">Zanim zabrzmi dzwoneczek</h2></div>
        <div className="christmas-faq__list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="christmas-contact container" aria-labelledby="christmas-contact-title">
        <span className="christmas-eyebrow">Zaproście magię do siebie</span>
        <h2 id="christmas-contact-title">W tym roku Mikołaj<br />może zapukać do Was.</h2>
        <p>Napisz, kiedy i gdzie chcecie się spotkać. Wspólnie wybierzemy wizytę Mikołaja, świąteczny duet lub warsztaty z Elfem.</p>
        <div className="christmas-actions">
          <Link href="/kontakt#formularz" className="christmas-button">Zapytaj o termin i wycenę <FontAwesomeIcon icon={faArrowRight} /></Link>
          <a href="tel:+48795103108" className="christmas-contact__phone"><FontAwesomeIcon icon={faPhone} aria-hidden="true" />795 103 108</a>
        </div>
      </section>
      <JsonLd data={[createBreadcrumbSchema("Mikołaj i Elf", "/mikolaj"), createServiceSchema({ name: "Wizyty Mikołaja i warsztaty świąteczne z Elfem", description, path: "/mikolaj", serviceTypes: ["Wizyta Świętego Mikołaja", "Mikołaj z Elfem", "Warsztaty świąteczne z Elfem"] })]} />
    </main>
  );
}

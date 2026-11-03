import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPalette, faPaintBrush, faStar, faPhone } from "@fortawesome/free-solid-svg-icons";
import JsonLd from "@/components/JsonLd";
import { pumpkinWorkshops as workshop } from "@/data/pumpkin-workshops";
import { BUSINESS, absoluteUrl, createBreadcrumbSchema, createPageMetadata, createServiceSchema } from "@/lib/seo";
import "@/styles/pumpkin-workshops.scss";

export const metadata = createPageMetadata({
  title: "Malowanie dyni – jesienne warsztaty dla dzieci",
  description: workshop.description,
  path: workshop.path,
  image: workshop.image,
  imageWidth: 1600,
  imageHeight: 1200,
  imageAlt: "Dynie w jesiennej scenerii Nallipop",
  keywords: ["malowanie dyni", "jesienne warsztaty dla dzieci", "warsztaty malowania dyni Warszawa"],
});

const activities = [
  { icon: faPalette, title: "Pomysł ma swój kolor", text: "Wesoła buźka, tęczowe paski, a może jesienny wzór? Dzieci wybierają kolory i wymyślają, w co zamieni się ich dynia." },
  { icon: faPaintBrush, title: "Pędzle w ruch!", text: "Malujemy, mieszamy barwy i próbujemy. Prowadzący pomaga w tworzeniu, a każde dziecko ma przestrzeń na własny pomysł." },
  { icon: faStar, title: "Każda dynia jest inna", text: "Na koniec oglądamy wspólnie małe dzieła. To okazja, by opowiedzieć o swojej pracy i zobaczyć, ile pomysłów powstało przy jednym stole." },
];

const photos = [
  { name: "dynie-jesienne", alt: "Dynie o różnych kształtach na drewnianej palecie wśród jesiennych liści", caption: "Każdy kształt to nowy pomysł." },
  { name: "kolory-jesieni", alt: "Pomarańczowe, żółte i jasne dynie w jesiennej scenerii", caption: "Jesień podpowiada kolory." },
  { name: "dynie-z-bliska", alt: "Zbliżenie na małe i duże dynie ułożone obok siebie", caption: "Teraz czas na Waszą wyobraźnię." },
];

const faqs = [
  ["Dla kogo są warsztaty?", "Dla dzieci, które lubią tworzyć i próbować nowych rzeczy. Planując spotkanie, ustalimy wiek i liczebność grupy, aby dopasować sposób prowadzenia zajęć."],
  ["Czy można zamówić warsztaty do przedszkola lub szkoły?", "Tak — zapytaj o warsztaty w swojej placówce, na urodzinach lub rodzinnym wydarzeniu. Działamy w Warszawie i okolicach. Miejsce i warunki organizacyjne uzgodnimy przed rezerwacją."],
  ["Ile trwają warsztaty i jaka jest cena?", "Czas i wycenę ustalamy indywidualnie, zależnie od liczby dzieci, miejsca i zakresu spotkania. W zapytaniu podaj proponowany termin, miejscowość oraz liczbę i wiek uczestników."],
  ["Co trzeba przygotować?", "Przed spotkaniem omówimy przygotowanie stanowisk, dynie, materiały i pozostałe szczegóły. Dzieciom przyda się wygodne ubranie, w którym mogą swobodnie malować."],
];

const breadcrumb = createBreadcrumbSchema("Malowanie dyni", workshop.path);
breadcrumb.itemListElement.splice(1, 0, { "@type": "ListItem", position: 2, name: "Atrakcje", item: absoluteUrl("/atrakcje") });
breadcrumb.itemListElement[2].position = 3;

export default function PumpkinWorkshopsPage() {
  return (
    <main className="pumpkin-page">
      <section className="pumpkin-hero">
        <div className="container">
          <nav className="offer-breadcrumb" aria-label="Okruszki nawigacji">
            <Link href="/">Strona główna</Link><span aria-hidden="true">›</span>
            <Link href="/atrakcje">Atrakcje</Link><span aria-hidden="true">›</span>
            <span aria-current="page">Malowanie dyni</span>
          </nav>
          <div className="pumpkin-hero__grid">
            <div className="pumpkin-hero__copy">
              <span className="pumpkin-eyebrow">Jesienne warsztaty z Nallipop</span>
              <h1>Mała dynia.<br />Wielka <em>wyobraźnia.</em></h1>
              <p className="pumpkin-hero__lead"><strong>Malowanie dyni dla dzieci</strong> — trochę farby, mnóstwo pomysłów i jesień w najpiękniejszych kolorach. Zaproście nas na wspólne tworzenie!</p>
              <div className="pumpkin-actions">
                <Link className="pumpkin-button" href={workshop.reservationHref}>Zapytaj o warsztaty <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" /></Link>
                <a className="pumpkin-text-link" href="#o-warsztatach">Zobacz, jak tworzymy <span aria-hidden="true">↓</span></a>
              </div>
              <p className="pumpkin-hero__note">Przedszkola · szkoły · urodziny · wydarzenia rodzinne</p>
            </div>
            <figure className="pumpkin-hero__photo">
              <Image src={workshop.image} width={1600} height={1200} preload sizes="(max-width: 800px) 92vw, 50vw" alt="Dynie na drewnianej palecie, otoczone złotymi jesiennymi liśćmi" />
              <span className="pumpkin-hero__sticker" aria-hidden="true">Jesień<br />pełna koloru!</span>
              <figcaption>Wystarczy dynia. Resztę podpowie wyobraźnia.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <div className="pumpkin-ribbon" aria-label="Warsztaty w skrócie">
        <span>Malowanie dyni</span><span aria-hidden="true">✦</span><span>Własne pomysły</span><span aria-hidden="true">✦</span><span>Jesienna zabawa</span>
      </div>

      <section className="pumpkin-section container" id="o-warsztatach" aria-labelledby="pumpkin-activities-title">
        <div className="pumpkin-heading">
          <span className="pumpkin-eyebrow">Od pierwszej kreski do małego dzieła</span>
          <h2 id="pumpkin-activities-title">Dynie, pędzle i dobra zabawa</h2>
          <p>Zapraszamy do twórczego stołu, przy którym każdy może malować po swojemu. Liczy się ciekawość, radość próbowania i duma z własnej pracy.</p>
        </div>
        <div className="pumpkin-activities">
          {activities.map((activity, index) => (
            <article className="pumpkin-activity" key={activity.title}>
              <div className="pumpkin-activity__top"><FontAwesomeIcon icon={activity.icon} aria-hidden="true" /><span>0{index + 1}</span></div>
              <h3>{activity.title}</h3><p>{activity.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pumpkin-gallery" aria-labelledby="pumpkin-gallery-title">
        <div className="container">
          <div className="pumpkin-heading">
            <span className="pumpkin-eyebrow">Z naszego jesiennego albumu</span>
            <h2 id="pumpkin-gallery-title">Tyle kształtów. Tyle możliwości.</h2>
            <p>Małe, duże, okrągłe i podłużne. Zobacz dynie, które inspirują do jesiennego tworzenia.</p>
          </div>
          <div className="pumpkin-gallery__grid">
            {photos.map((photo) => (
              <figure key={photo.name}>
                <Image src={`/images/malowanie-dyni/${photo.name}.webp`} width={1000} height={1333} sizes="(max-width: 600px) 92vw, 30vw" alt={photo.alt} />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="pumpkin-plan pumpkin-section container" aria-labelledby="pumpkin-plan-title">
        <div>
          <span className="pumpkin-eyebrow">Wasze miejsce, nasze wspólne tworzenie</span>
          <h2 id="pumpkin-plan-title">Zaproście jesień<br />do swojej grupy</h2>
          <p>Malowanie dyni to pomysł na twórcze spotkanie w przedszkolu, szkole, na urodzinach lub rodzinnym wydarzeniu. Porozmawiajmy o tym, jak dopasować je do Was.</p>
        </div>
        <ol>
          <li><span>1</span><div><h3>Opowiedz o grupie</h3><p>Podaj liczbę i wiek dzieci, miejsce oraz proponowany termin.</p></div></li>
          <li><span>2</span><div><h3>Ustalmy szczegóły</h3><p>Omówimy czas, materiały, przygotowanie stanowisk i wycenę.</p></div></li>
          <li><span>3</span><div><h3>Zróbcie miejsce na kolory</h3><p>Po potwierdzeniu rezerwacji pozostaje czekać na jesienne spotkanie z pędzlami!</p></div></li>
        </ol>
      </section>

      <section className="pumpkin-faq container" aria-labelledby="pumpkin-faq-title">
        <div className="pumpkin-heading"><span className="pumpkin-eyebrow">Przed spotkaniem</span><h2 id="pumpkin-faq-title">O co pytają organizatorzy?</h2></div>
        <div className="pumpkin-faq__list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="pumpkin-contact container" aria-labelledby="pumpkin-contact-title">
        <span className="pumpkin-eyebrow">Zaplanujmy coś kolorowego</span>
        <h2 id="pumpkin-contact-title">Ta jesień może mieć<br />Wasze kolory.</h2>
        <p>Napisz do nas i zapytaj o warsztaty malowania dyni. Ustalimy szczegóły i sprawdzimy dostępny termin.</p>
        <div className="pumpkin-actions">
          <Link className="pumpkin-button" href={workshop.reservationHref}>Zapytaj o termin i wycenę <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" /></Link>
          <a className="pumpkin-text-link" href={`tel:${BUSINESS.telephone.replace(/\s/g, "")}`}><FontAwesomeIcon icon={faPhone} aria-hidden="true" />795 103 108</a>
        </div>
      </section>
      <JsonLd data={[breadcrumb, createServiceSchema({ name: "Warsztaty malowania dyni dla dzieci", description: workshop.description, path: workshop.path, serviceTypes: ["Malowanie dyni", "Jesienne warsztaty kreatywne dla dzieci"] })]} />
    </main>
  );
}

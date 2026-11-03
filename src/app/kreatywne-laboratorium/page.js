import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowUpRightFromSquare, faCalendarDays, faClock, faLocationDot, faPhone, faFlask, faPalette, faHandSparkles } from "@fortawesome/free-solid-svg-icons";
import JsonLd from "@/components/JsonLd";
import { BUSINESS, createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";
import { creativeLab as lab } from "@/data/creative-lab";
import "@/styles/creative-lab.scss";

const description = "Kreatywne laboratorium z Natalią Marciniak w Pruszkowie. Zajęcia artystyczne, sensoryczne i eksperymenty dla dzieci 5–10 lat. Poznaj zajęcia i zapisz dziecko.";

export const metadata = createPageMetadata({
  title: "Kreatywne laboratorium z Natalią – zajęcia dla dzieci w Pruszkowie",
  description,
  path: lab.path,
  image: lab.image,
  imageWidth: 1536,
  imageHeight: 1024,
  imageAlt: "Dzieci tworzą kolorowe jesienne lampiony przy wspólnym stole",
  keywords: ["Kreatywne laboratorium", "zajęcia dla dzieci Pruszków", "Natalia Marciniak", "warsztaty kreatywne Helenowska"],
});

const activities = [
  { number: "01", title: "Glutek i sensoryczne odkrycia", tag: "Mieszamy i odkrywamy", image: "slime", alt: "Dzieci mieszają kolorową masę sensoryczną w miseczkach", text: "Co się stanie, gdy połączymy kolory? A jak zachowa się ta masa? Ugniatanie, mieszanie i rozciąganie to świetny pretekst do zadawania pytań i próbowania po swojemu.", tone: "mint" },
  { number: "02", title: "Lampiony pełne jesieni", tag: "Tworzymy z wyobraźnią", image: "lampiony", alt: "Dzieci ozdabiają słoiki kolorowymi jesiennymi liśćmi", text: "Liście, odrobina koloru i zwykły słoik, który zamienia się w małe dzieło. Każdy może wybrać własne barwy i ułożyć jesień dokładnie tak, jak ją sobie wyobraża.", tone: "peach" },
  { number: "03", title: "Gniotki z charakterem", tag: "Nadajemy kształt pomysłom", image: "gniotki", alt: "Dzieci przygotowują balonowe gniotki i ozdabiają je wesołymi buźkami", text: "Zabawna buźka, szalona fryzura, ulubiony kolor. Z prostych materiałów powstaje własna postać, a małe dłonie mają mnóstwo okazji do ćwiczenia precyzji.", tone: "lilac" },
];

const faqs = [
  ["Czy dziecko musi mieć zdolności plastyczne?", "Wystarczy ciekawość i chęć spróbowania. To przestrzeń do poznawania materiałów i rozwijania własnych pomysłów — pierwsze próby też są częścią twórczej przygody."],
  ["Jak zapisać dziecko?", "Kliknij „Zapisz dziecko”. Przejdziesz do ogłoszenia Kreatywnego laboratorium w Strefie Zajęć. Tam sprawdzisz aktualną dostępność i przejdziesz przez zapis zgodnie z instrukcjami organizatora."],
  ["Czy na każdym spotkaniu robimy to samo?", "Kreatywne laboratorium łączy różne formy działania: plastyczne, sensoryczne i eksperymentalne. Glutki, lampiony i gniotki pokazują przykładowe inspiracje. O temat najbliższego spotkania możesz dopytać przed zapisem."],
  ["Co przygotować przed pierwszym spotkaniem?", "Warto wybrać ubranie, w którym można swobodnie tworzyć. Kwestie materiałów, ewentualnych alergii i indywidualnych potrzeb dziecka omów wcześniej z prowadzącą lub organizatorem."],
];

function SignUpLink({ children = "Zapisz dziecko", className = "lab-button" }) {
  return <a className={className} href={lab.registrationUrl} target="_blank" rel="noopener noreferrer" aria-label={`${children} – Strefa Zajęć, nowa karta`}>{children}<FontAwesomeIcon icon={faArrowUpRightFromSquare} aria-hidden="true" /></a>;
}

export default function CreativeLabPage() {
  return (
    <main className="lab-page">
      <section className="lab-hero">
        <div className="lab-container">
          <nav className="lab-breadcrumb" aria-label="Okruszki nawigacji"><Link href="/">Strona główna</Link><span aria-hidden="true">/</span><span aria-current="page">Kreatywne laboratorium</span></nav>
          <div className="lab-hero__grid">
            <div className="lab-hero__copy">
              <span className="lab-eyebrow"><i aria-hidden="true" />Pruszków · zajęcia z Natalią</span>
              <h1>Małe ręce.<br />Wielkie <span>pomysły.<svg viewBox="0 0 400 24" aria-hidden="true"><path d="M4 16 Q 180 -3 396 13 M35 23 Q 210 7 369 21" /></svg></span></h1>
              <p className="lab-hero__lead">Zapraszamy do <strong>Kreatywnego laboratorium!</strong> Miejsca, w którym można mieszać, tworzyć, eksperymentować i z dumą powiedzieć: „Zobacz, zrobiłem to sam!”.</p>
              <div className="lab-actions"><SignUpLink /><a className="lab-text-link" href="#szczegoly">Poznaj szczegóły <span aria-hidden="true">↓</span></a></div>
              <p className="lab-hero__note">Twórcza godzina dla dzieci {lab.age}.<br />Mnóstwo miejsca na własną wyobraźnię.</p>
            </div>
            <div className="lab-hero__visual">
              <span className="lab-doodle lab-doodle--star" aria-hidden="true">✳</span>
              <figure className="lab-hero__photo"><Image src={lab.image} width={1536} height={1024} preload sizes="(max-width: 800px) 92vw, 52vw" alt="Wspólne tworzenie jesiennych lampionów przy stole pełnym kolorowych liści" /><figcaption>Trochę koloru. Dużo dziecięcej radości.</figcaption></figure>
              <div className="lab-hero__sticker"><span aria-hidden="true">✦</span>Tu pomysły<br /><strong>nabierają kształtu!</strong></div>
              <figure className="lab-hero__small"><Image src="/images/kreatywne-laboratorium/slime.webp" width={1000} height={1250} sizes="(max-width: 800px) 32vw, 190px" alt="Rozciąganie własnoręcznie przygotowanego glutka" /><figcaption>A gdyby tak…?</figcaption></figure>
            </div>
          </div>
        </div>
      </section>

      <div className="lab-facts lab-container" aria-label="Zajęcia w skrócie">
        <div><FontAwesomeIcon icon={faCalendarDays} aria-hidden="true" /><span>Spotykamy się<strong>{lab.day}</strong></span></div>
        <div><FontAwesomeIcon icon={faClock} aria-hidden="true" /><span>Godzina dla wyobraźni<strong>{lab.hours}</strong></span></div>
        <div><FontAwesomeIcon icon={faLocationDot} aria-hidden="true" /><span>Pruszków · Filia MOK<strong>Helenowska 8</strong></span></div>
        <a href="#szczegoly">Wszystko o zapisach<span aria-hidden="true">↗</span></a>
      </div>

      <section className="lab-section lab-container" aria-labelledby="lab-ideas-title">
        <div className="lab-section-heading"><div><span className="lab-eyebrow">Odkrywać. Próbować. Tworzyć.</span><h2 id="lab-ideas-title">Ciekawość to<br />świetny początek.</h2></div><p>Czasem zaczyna się od koloru, czasem od pytania „a co, jeśli…?”. Zobacz, jak wiele twórczych możliwości kryje się w prostych materiałach.</p></div>
        <div className="lab-activities">{activities.map(item => <article className={`lab-activity lab-activity--${item.tone}`} key={item.number}>
          <div className="lab-activity__image"><Image src={`/images/kreatywne-laboratorium/${item.image}.webp`} fill sizes="(max-width: 700px) 92vw, 30vw" alt={item.alt} /><span>{item.number}</span></div>
          <div className="lab-activity__copy"><span className="lab-activity__tag">{item.tag}</span><h3>{item.title}</h3><p>{item.text}</p></div>
        </article>)}</div>
        <p className="lab-caption">To przykłady twórczych aktywności. O program najbliższego spotkania dopytaj prowadzącą.</p>
      </section>

      <section className="lab-about" aria-labelledby="lab-about-title"><div className="lab-container lab-about__grid">
        <div className="lab-about__image"><Image src="/images/kreatywne-laboratorium/gniotki.webp" width={1400} height={933} sizes="(max-width: 800px) 92vw, 48vw" alt="Wspólne przygotowywanie i dekorowanie balonowych gniotków" /><span className="lab-about__label">Małe odkrycia mają wielką moc <span aria-hidden="true">✦</span></span></div>
        <div className="lab-about__copy"><span className="lab-eyebrow">Z Natalią przy wspólnym stole</span><h2 id="lab-about-title">Więcej niż<br />ładna praca.</h2><p>Zajęcia prowadzi <strong>{lab.instructor}</strong>. W Kreatywnym laboratorium działania artystyczne spotykają się z sensoryczną zabawą i eksperymentowaniem.</p><p>Liczy się także droga do własnego pomysłu: wybranie koloru, sprawdzenie, jak coś działa, i radość z kolejnej próby.</p>
          <ul className="lab-benefits"><li><FontAwesomeIcon icon={faPalette} aria-hidden="true" /><div><strong>Wyobraźnia w ruchu</strong><span>Pomysły, które można zamienić w coś własnego.</span></div></li><li><FontAwesomeIcon icon={faHandSparkles} aria-hidden="true" /><div><strong>Małe dłonie ćwiczą</strong><span>Twórcze działanie, precyzja i skupienie.</span></div></li><li><FontAwesomeIcon icon={faFlask} aria-hidden="true" /><div><strong>Odwaga do odkrywania</strong><span>Pytania, samodzielne próby i nowe doświadczenia.</span></div></li></ul>
        </div>
      </div></section>

      <section className="lab-section lab-container lab-enrol" id="szczegoly" aria-labelledby="lab-enrol-title">
        <div className="lab-enrol__copy"><span className="lab-eyebrow">Zróbcie miejsce na twórczy poniedziałek</span><h2 id="lab-enrol-title">Od „chcę spróbować”<br />do <span>„udało mi się!”.</span></h2><p>Twoje dziecko lubi tworzyć, dotykać, mieszać i sprawdzać? Zaproś je do Kreatywnego laboratorium. Tutaj ciekawość może zamienić się w nową pasję.</p>
          <ol className="lab-steps"><li><span>1</span><div><h3>Zajrzyj do ogłoszenia</h3><p>Przycisk przeniesie Cię do Strefy Zajęć.</p></div></li><li><span>2</span><div><h3>Sprawdź dostępność i zapisz dziecko</h3><p>Aktualne miejsca i warunki zapisu znajdziesz u organizatora.</p></div></li><li><span>3</span><div><h3>Przyjdźcie z ciekawością</h3><p>O resztę szczegółów dopytaj przed pierwszym spotkaniem.</p></div></li></ol>
        </div>
        <aside className="lab-booking" aria-label="Informacje organizacyjne i zapisy"><div className="lab-booking__top"><span>Sezon {lab.season}</span><FontAwesomeIcon icon={faPalette} aria-hidden="true" /></div><h3>{lab.title}</h3><p className="lab-booking__subtitle">Filia Helenowska · {lab.city}</p>
          <dl><div><dt>Dla kogo</dt><dd>Dzieci {lab.age}</dd></div><div><dt>Kiedy</dt><dd>{lab.day}, {lab.hours}</dd></div><div><dt>Rozpoczęcie cyklu</dt><dd>{lab.start}</dd></div><div><dt>Gdzie</dt><dd>{lab.venue}, {lab.city}</dd></div><div><dt>Prowadząca</dt><dd>{lab.instructor}</dd></div></dl>
          <div className="lab-booking__price"><strong>{lab.price} zł<span> / miesiąc</span></strong><p>Dla użytkowników PKDR: <b>{lab.discountedPrice} zł / miesiąc</b></p></div>
          <SignUpLink /><p className="lab-booking__note">Zapisy i aktualna dostępność w Strefie Zajęć.</p><p className="lab-booking__organizer">Organizator: {lab.organizer}.<br /><a href={lab.registrationUrl} target="_blank" rel="noopener noreferrer">Szczegóły i aktualne warunki zajęć ↗</a></p>
        </aside>
      </section>

      <section className="lab-faq lab-container" aria-labelledby="lab-faq-title"><div><span className="lab-eyebrow">Dla ciekawych rodziców</span><h2 id="lab-faq-title">Jeszcze małe<br />pytanie?</h2><p>Chętnie pomożemy przed pierwszą wizytą.</p><a href={`tel:${BUSINESS.telephone.replace(/\s/g, "")}`}><FontAwesomeIcon icon={faPhone} aria-hidden="true" />{BUSINESS.telephone.replace("+48 ", "")}</a></div><div className="lab-faq__list">{faqs.map(([question,answer])=><details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="lab-goodbye lab-container" aria-labelledby="lab-goodbye-title"><span className="lab-goodbye__spark" aria-hidden="true">✳</span><span className="lab-eyebrow">Do zobaczenia przy wspólnym stole</span><h2 id="lab-goodbye-title">Najlepsze pomysły<br />zaczynają się od próbowania.</h2><div className="lab-actions"><SignUpLink>Dołączcie do zajęć</SignUpLink><Link className="lab-text-link" href="/kontakt#formularz">Porozmawiajmy o zajęciach <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" /></Link></div></section>
      <JsonLd data={createBreadcrumbSchema(lab.title,lab.path)} />
    </main>
  );
}

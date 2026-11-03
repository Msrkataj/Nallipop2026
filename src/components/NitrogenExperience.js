import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { BUSINESS, absoluteUrl, createPageMetadata, createServiceSchema } from "@/lib/seo";
import { nitrogen, nitrogenFaqs, nitrogenOccasions } from "@/data/liquid-nitrogen";
import "@/styles/liquid-nitrogen.scss";

const description = "Pokaz ciekłego azotu dla dzieci w Warszawie i okolicach. Widowiskowa mgła i mroźne przemiany na urodziny, wydarzenia oraz do szkół i przedszkoli.";

export function nitrogenMetadata(occasion) {
  return createPageMetadata({
    title: occasion?.seoTitle || "Ciekły azot – pokazy dla dzieci z efektem WOW",
    description: occasion?.description || description,
    path: occasion?.path || nitrogen.path,
    image: nitrogen.image,
    imageWidth: 1536,
    imageHeight: 1024,
    imageAlt: nitrogen.imageAlt,
    keywords: ["ciekły azot dla dzieci", "pokaz ciekłego azotu Warszawa", "atrakcje naukowe dla dzieci"],
  });
}

function Arrow({ down = false }) {
  return <span aria-hidden="true">{down ? "↘" : "↗"}</span>;
}

export default function NitrogenExperience({ occasion }) {
  const path = occasion?.path || nitrogen.path;
  const reservationHref = occasion?.reservationHref || nitrogen.reservationHref;
  const faqs = occasion ? [...occasion.faqs, nitrogenFaqs[0]] : nitrogenFaqs;
  const breadcrumbs = [
    { name: "Strona główna", path: "/" },
    { name: "Atrakcje", path: "/atrakcje" },
    { name: "Ciekły azot", path: nitrogen.path },
    ...(occasion ? [{ name: occasion.label, path }] : []),
  ];

  return (
    <main className={`nitrogen-page${occasion ? " nitrogen-page--occasion" : ""}`}>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: breadcrumbs.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.path) })) }} />
      <JsonLd data={createServiceSchema({ name: occasion?.seoTitle || nitrogen.name, description: occasion?.description || description, path, serviceTypes: ["Pokaz ciekłego azotu dla dzieci"] })} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }} />

      <section className="nitrogen-hero">
        <div className="nitrogen-hero__image"><Image src={nitrogen.image} alt={nitrogen.imageAlt} fill sizes="100vw" preload /></div>
        <div className="nitrogen-hero__shade" />
        <div className="nitrogen-container nitrogen-hero__inner">
          <nav className="nitrogen-breadcrumb" aria-label="Ścieżka nawigacji">
            {breadcrumbs.map((item, index) => <span key={item.path}>{index > 0 && <i aria-hidden="true">/</i>}{index === breadcrumbs.length - 1 ? <span aria-current="page">{item.name}</span> : <Link href={item.path}>{item.name}</Link>}</span>)}
          </nav>
          <div className="nitrogen-hero__copy">
            <span className="nitrogen-eyebrow"><i /> Nallipop Science Show {occasion ? ` / ${occasion.label}` : ""}</span>
            <h1>{occasion ? <>{occasion.heading}<br /><em>{occasion.highlight}</em></> : <>Ciekły azot.<br />Wielkie <em>WOOOW!</em></>}</h1>
            <p>{occasion?.intro || "Biała mgła, mroźne metamorfozy i oczy szeroko otwarte ze zdumienia. Zaproś dzieci na pokaz, w którym nauka robi prawdziwe show."}</p>
            <div className="nitrogen-actions">
              <Link href={reservationHref} className="nitrogen-button">Zaproś naukowe WOW <Arrow /></Link>
              <Link href="#odkryj" className="nitrogen-text-link">Zobacz, co nas czeka <Arrow down /></Link>
            </div>
            <span className="nitrogen-hero__location">Warszawa i okolice <span aria-hidden="true">·</span> Pokaz z prowadzącym</span>
          </div>
          <div className="nitrogen-temperature" aria-label="Około minus 196 stopni Celsjusza, temperatura wrzenia azotu">
            <span>EKSTREMALNIE CHŁODNO</span><strong>−196<small>°C</small></strong><span>NIESAMOWICIE CIEKAWIE</span>
          </div>
          <div className="nitrogen-hero__bottom"><span>MAŁE PYTANIA. WIELKIE ODKRYCIA.</span><a href="#odkryj" aria-label="Przejdź do opisu pokazu">↓</a></div>
        </div>
      </section>

      <div className="nitrogen-ribbon" aria-label="Mgła, metamorfozy i nauka przez zabawę"><span>Mgła jak z bajki</span><i aria-hidden="true">✳</i><span>Nauka na żywo</span><i aria-hidden="true">✳</i><span>Emocje poniżej zera</span><i aria-hidden="true">✳</i><span>Zachwyt bez końca</span></div>

      <section className="nitrogen-discover nitrogen-container" id="odkryj">
        <div className="nitrogen-section-heading">
          <div><span className="nitrogen-eyebrow">01 / Odkryj mroźny świat</span><h2>Wygląda jak magia.<br /><em>A to nauka.</em></h2></div>
          <p>Zwyczajne przedmioty potrafią naprawdę zaskoczyć, gdy robi się bardzo zimno. Prowadzący odsłania sekrety zjawisk, a dzieci obserwują, zgadują i pytają: „jak to działa?”.</p>
        </div>
        <div className="nitrogen-discover__grid">
          <figure className="nitrogen-flower">
            <Image src={nitrogen.detailImage} alt="Różowy kwiat pokryty kryształkami szronu, trzymany szczypcami nad naczyniem z mgłą" fill sizes="(max-width: 760px) 100vw, 54vw" />
            <span className="nitrogen-flower__tag">Zwykły kwiat. Niezwykła przemiana.</span>
            <figcaption>Wizualizacja przykładowego doświadczenia</figcaption>
          </figure>
          <div className="nitrogen-discover__stories">
            <article><span>01</span><div><h3>Chmura zachwytu</h3><p>Białe obłoki otulają stanowisko. Obserwujemy mgłę i odkrywamy, dlaczego zimno potrafi stać się tak widoczne.</p></div></article>
            <article><span>02</span><div><h3>Mroźne metamorfozy</h3><p>Czy delikatny kwiat może stać się kruchy? Przykładowe doświadczenia pokazują, jak niska temperatura zmienia właściwości materiałów.</p></div></article>
            <article><span>03</span><div><h3>Małe „dlaczego?”, wielkie „aha!”</h3><p>Dzieci dzielą się pomysłami, przewidują efekty i poznają wyjaśnienia dopasowane do swojego wieku.</p></div></article>
            <p className="nitrogen-program-note">Konkretne doświadczenia i przebieg pokazu dobieramy do wieku grupy oraz warunków miejsca.</p>
          </div>
        </div>
        <p className="nitrogen-science-note">Skąd −196°C? To w przybliżeniu temperatura wrzenia azotu przy ciśnieniu atmosferycznym. <a href="https://periodic-table.rsc.org/element/7/nitrogen/" target="_blank" rel="noreferrer">Źródło: Royal Society of Chemistry ↗</a></p>
      </section>

      {occasion && <section className="nitrogen-context"><div className="nitrogen-container">
        <div className="nitrogen-section-heading"><div><span className="nitrogen-eyebrow">02 / {occasion.label}</span><h2>{occasion.sectionTitle}</h2></div><p>{occasion.sectionIntro}</p></div>
        <div className="nitrogen-features">{occasion.features.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className="nitrogen-planning"><p>{occasion.planning}</p><Link className="nitrogen-button" href={reservationHref}>Zapytaj o ten pokaz <Arrow /></Link></div>
      </div></section>}

      <section className="nitrogen-occasions nitrogen-container" aria-labelledby="nitrogen-occasions-title">
        <div className="nitrogen-section-heading"><div><span className="nitrogen-eyebrow">{occasion ? "03" : "02"} / Wybierz swoją okazję</span><h2 id="nitrogen-occasions-title">Gdzie zrobimy <em>WOW?</em></h2></div><p>Urodzinowa niespodzianka czy naukowe spotkanie w placówce? Poznaj pomysły na Wasz pokaz.</p></div>
        <div className="nitrogen-occasion-grid">{nitrogenOccasions.map((item) => <Link className={`nitrogen-occasion nitrogen-occasion--${item.slug}`} href={item.path} key={item.slug} aria-current={occasion?.slug === item.slug ? "page" : undefined}>
          <span className="nitrogen-occasion__top"><span>{item.label}</span><Arrow /></span>
          <strong className="nitrogen-occasion__art" aria-hidden="true">{item.slug === "urodziny" ? "WOW!" : <>N<sub>2</sub><span>?</span></>}</strong>
          <div><h3>{item.title}</h3><p>{item.short}</p><span className="nitrogen-occasion__link">Poznaj szczegóły <Arrow /></span></div>
        </Link>)}</div>
        <div className="nitrogen-event"><span>Planujesz piknik, festyn lub event firmowy?</span><Link href={nitrogen.reservationHref}>Porozmawiajmy o Twoim wydarzeniu <Arrow /></Link></div>
      </section>

      <section className="nitrogen-care"><div className="nitrogen-container nitrogen-care__grid">
        <div><span className="nitrogen-eyebrow">Organizacja ma znaczenie</span><h2>Emocje dla dzieci.<br /><em>Pokaz w rękach prowadzącego.</em></h2><p>Ciekły azot wymaga odpowiednich warunków. Przed wydarzeniem ustalamy miejsce, ustawienie widowni i zakres doświadczeń.</p></div>
        <ol><li><span>01</span><div><h3>Prowadzący obsługuje azot</h3><p>Doświadczenia wykonuje osoba z wyposażeniem ochronnym. Dzieci nie dotykają azotu ani schłodzonych przedmiotów.</p></div></li><li><span>02</span><div><h3>Przestrzeń gotowa na pokaz</h3><p>Odpowiednia wentylacja i oddzielona strefa widowni to warunki, które potwierdzamy z organizatorem.</p></div></li><li><span>03</span><div><h3>Program dobrany do grupy</h3><p>Wiek, liczba uczestników i charakter imprezy pomagają nam dobrać tempo oraz sposób opowiadania.</p></div></li></ol>
      </div></section>

      <section className="nitrogen-faq nitrogen-container"><div><span className="nitrogen-eyebrow">Dobrze wiedzieć</span><h2>Jeszcze kilka<br /><em>małych pytań.</em></h2><p>Chętnie omówimy Wasz pomysł.</p><a href="tel:+48795103108">{BUSINESS.telephone} <Arrow /></a></div><div className="nitrogen-faq__list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="nitrogen-finale"><div className="nitrogen-container"><span className="nitrogen-eyebrow">Gotowi na wielkie oczy?</span><h2>Dodaj odrobinę zimna.<br /><em>Zrób mnóstwo wrażeń.</em></h2><p>Opowiedz nam o swoim wydarzeniu. Wspólnie zaplanujemy jego najbardziej zaskakujący moment.</p><div className="nitrogen-actions"><Link className="nitrogen-button" href={reservationHref}>Zapytaj o termin i ofertę <Arrow /></Link><a className="nitrogen-text-link" href="tel:+48795103108">Porozmawiajmy: {BUSINESS.telephone}</a></div><small>Grafiki są wizualizacjami atrakcji. Ostateczny program ustalamy indywidualnie.</small></div></section>
    </main>
  );
}

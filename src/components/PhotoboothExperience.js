"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faHeart, faLeaf, faSnowflake, faCakeCandles, faStar, faWandMagicSparkles, faMasksTheater } from "@fortawesome/free-solid-svg-icons";
import { photoboothScenes, photoboothFaqs, photoboothGallery, photoboothPricing, getPhotoboothScene, photoboothReservationHref } from "@/data/photobooth";
import { BUSINESS } from "@/lib/seo";

const icons = { heart: faHeart, leaf: faLeaf, snowflake: faSnowflake, cake: faCakeCandles, star: faStar, disco: faWandMagicSparkles, mask: faMasksTheater };

export default function PhotoboothExperience({ initialScene = "wesele" }) {
  const [selected, setSelected] = useState(initialScene);
  const tabsRef = useRef([]);
  const studioRef = useRef(null);
  const scene = getPhotoboothScene(selected);
  const reservationHref = photoboothReservationHref(scene);
  const theme = Object.fromEntries(Object.entries(scene.colors).map(([name, value]) => [`--photo-${name}`, value]));

  useEffect(() => {
    const syncScene = () => setSelected(getPhotoboothScene(new URLSearchParams(window.location.search).get("okazja")).id);
    window.addEventListener("popstate", syncScene);
    return () => window.removeEventListener("popstate", syncScene);
  }, []);

  useEffect(() => {
    const tab = tabsRef.current[photoboothScenes.findIndex((item) => item.id === selected)];
    const rail = tab?.parentElement;
    if (!rail || rail.scrollWidth <= rail.clientWidth) return;
    const tabBounds = tab.getBoundingClientRect();
    const railBounds = rail.getBoundingClientRect();
    rail.scrollTo({ left: rail.scrollLeft + tabBounds.left - railBounds.left - (railBounds.width - tabBounds.width) / 2, behavior: "instant" });
  }, [selected]);

  function selectScene(id, fromGallery = false) {
    if (id !== selected) {
      setSelected(id);
      const url = new URL(window.location.href);
      url.searchParams.set("okazja", id);
      window.history.pushState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
    }
    if (fromGallery) {
      tabsRef.current[photoboothScenes.findIndex((item) => item.id === id)]?.focus({ preventScroll: true });
      studioRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    }
  }

  function handleTabKey(event, index) {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % photoboothScenes.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + photoboothScenes.length) % photoboothScenes.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = photoboothScenes.length - 1;
    else return;
    event.preventDefault();
    tabsRef.current[next]?.focus();
    selectScene(photoboothScenes[next].id);
  }

  return <main className="photo-page" style={theme} data-scene={scene.id}>
    <div className="photo-container">
      <nav className="photo-breadcrumb" aria-label="Ścieżka nawigacji"><Link href="/">Strona główna</Link><span aria-hidden="true">/</span><Link href="/atrakcje">Atrakcje</Link><span aria-hidden="true">/</span><span aria-current="page">Fotobudka</span></nav>
      <header className="photo-intro">
        <div><span className="photo-eyebrow"><FontAwesomeIcon icon={faCamera} /> Nallipop · Studio dobrych wspomnień</span><h1>Fotobudka.<br /><em>Wasz klimat. Wasz kadr.</em></h1></div>
        <div className="photo-intro__aside"><span className="photo-spark" aria-hidden="true">✳</span><p>Na wesela, urodziny i wiele innych wydarzeń.<br />Pokazane okazje to inspiracje — scenografię dopasujemy do Waszego pomysłu.</p><span>Warszawa i okolice <i aria-hidden="true">↙</i></span><nav className="photo-quick-links" aria-label="Na podstronie fotobudki"><a href="#przykladowe-kadry">Zobacz przykładowe kadry <span aria-hidden="true">↓</span></a><a href="#cennik">Cennik od 700 zł <span aria-hidden="true">↓</span></a></nav></div>
      </header>

      <section className="photo-studio" ref={studioRef} aria-label="Wybierz scenografię fotobudki">
        <div className="photo-studio__guide"><span><i aria-hidden="true" /> Wybierz inspirację. Zmieniamy klimat.</span><span>{photoboothScenes.length} pomysłów na Wasz moment</span></div>
        <div className="photo-tabs" role="tablist" aria-label="Okazja do fotobudki">{photoboothScenes.map((item, index) => <button key={item.id} type="button" id={`photo-tab-${item.id}`} role="tab" aria-selected={selected === item.id} aria-controls={`photo-panel-${item.id}`} tabIndex={selected === item.id ? 0 : -1} ref={(node) => { tabsRef.current[index] = node; }} onClick={() => selectScene(item.id)} onKeyDown={(event) => handleTabKey(event, index)}><span className="photo-tabs__number">{item.number}</span><FontAwesomeIcon icon={icons[item.icon]} /><span>{item.label}</span><span className="photo-tabs__dot" aria-hidden="true" /></button>)}</div>
        <div className="photo-stage">
          {photoboothScenes.map((item) => <div key={item.id} id={`photo-panel-${item.id}`} role="tabpanel" aria-labelledby={`photo-tab-${item.id}`} hidden={selected !== item.id} tabIndex={0} className="photo-stage__copy">
            <div className="photo-stage__copy-inner"><span className="photo-stage__eyebrow">Kadr {item.number} / {String(photoboothScenes.length).padStart(2, "0")} <span aria-hidden="true">—</span> {item.label}</span><h2>{item.title[0]}<br /><em>{item.title[1]}</em></h2><p>{item.description}</p><Link className="photo-button" href={photoboothReservationHref(item)}>Chcę taki klimat <span aria-hidden="true">↗</span></Link><span className="photo-stage__mood">{item.mood}</span></div>
          </div>)}
          <div className="photo-stage__visual">
            {photoboothScenes.map((item) => <Image key={item.id} src={item.image} alt={selected === item.id ? item.alt : ""} aria-hidden={selected !== item.id} width={1536} height={1024} sizes="(max-width: 760px) 100vw, (max-width: 1240px) 60vw, 730px" preload={item.id === initialScene} loading={item.id === initialScene ? undefined : "eager"} className={`photo-stage__image${selected === item.id ? " is-active" : ""}`} />)}
            <div className="photo-viewfinder" aria-hidden="true"><i /><i /><i /><i /></div>
            <span className="photo-stage__scene-label"><FontAwesomeIcon icon={icons[scene.icon]} /> {scene.label} <span>Scenografia {scene.number}</span></span>
            <span className="photo-stage__caption">Wizualizacja przykładowej aranżacji</span>
          </div>
        </div>
        <div className="photo-palette"><span>W tym klimacie</span><div>{scene.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><span className="photo-palette__swatches" aria-hidden="true"><i style={{ background: scene.colors.stage }} /><i style={{ background: scene.colors.accent }} /><i style={{ background: scene.colors.highlight }} /></span></div>
        <p className="photo-sr-only" role="status">Wybrana okazja: {scene.label}. {scene.mood}</p>
      </section>

      <section className="photo-details" aria-labelledby="photo-details-title">
        <div className="photo-section-heading"><span className="photo-eyebrow">Więcej niż ładne tło</span><h2 id="photo-details-title">Scenografia robi wrażenie.<br /><em>Emocje robią resztę.</em></h2></div>
        <div className="photo-details__grid" key={scene.id}>{scene.details.map(([title, copy], index) => <article key={title}><span className="photo-details__number">0{index + 1}<span aria-hidden="true">↗</span></span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>
    </div>

    <section className="photo-lookbook" aria-labelledby="photo-lookbook-title"><div className="photo-container">
      <div className="photo-section-heading"><span className="photo-eyebrow">Siedem odsłon. Jeden dobry pomysł.</span><h2 id="photo-lookbook-title">Zmieniamy dekoracje.<br /><em>Uśmiechy zostają.</em></h2><p>Pokazane okazje to przykłady. Fotobudkę i scenografię dopasujemy również do innych wydarzeń — opowiedz nam, co planujesz.</p><Link className="photo-text-link" href="/formularz-rezerwacji?atrakcja=Fotobudka&oferta=impreza#atrakcje-dodatkowe">Fotobudka na inne wydarzenie <span aria-hidden="true">↗</span></Link></div>
      <div className="photo-lookbook__grid">{photoboothScenes.map((item) => <button type="button" key={item.id} className="photo-print" aria-label={`Zobacz scenografię: ${item.label}`} onClick={() => selectScene(item.id, true)}><span className="photo-print__image"><Image src={item.image} alt="" width={480} height={400} sizes="(max-width: 600px) 42vw, 220px" /></span><span className="photo-print__caption"><strong>{item.label}</strong><span aria-hidden="true">↗</span></span><span className="photo-print__number">NALLIPOP / {item.number}</span></button>)}</div>
      <p className="photo-lookbook__note">To wizualizacje inspiracji. Dekoracje, wyposażenie i dodatki dobieramy oraz potwierdzamy w ofercie.</p>
    </div></section>

    <div className="photo-container">
      <section className="photo-gallery" id="przykladowe-kadry" aria-labelledby="photo-gallery-title">
        <div className="photo-gallery__heading"><div className="photo-section-heading"><span className="photo-eyebrow">Przykładowe kadry · wizualizacje</span><h2 id="photo-gallery-title">Trochę rekwizytów.<br /><em>Całe mnóstwo radości.</em></h2></div><p>Wielkie okulary, szalone peruki i miny, których nie da się zaplanować. Tak może wyglądać Wasza zabawa przed obiektywem.</p></div>
        <div className="photo-gallery__grid">{photoboothGallery.map((item, index) => <figure className="photo-gallery__item" key={item.id}><Image src={item.image} alt={item.alt} width={1080} height={1440} sizes="(max-width: 600px) 47vw, (max-width: 1000px) 45vw, 300px" /><figcaption><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</figcaption></figure>)}</div>
        <p className="photo-gallery__note">Autorskie wizualizacje przykładowych zdjęć — inspiracje do Waszej imprezy.</p>
      </section>

      <section className="photo-pricing" id="cennik" aria-labelledby="photo-pricing-title">
        <div className="photo-pricing__heading"><div className="photo-section-heading"><span className="photo-eyebrow">Cennik fotobudki</span><h2 id="photo-pricing-title">Ile czasu<br /><em>na dobre wspomnienia?</em></h2></div><div className="photo-pricing__intro"><p>Wybierz czas działania fotobudki na Waszym wydarzeniu.</p></div></div>
        <div className="photo-pricing__grid">{photoboothPricing.packages.map((item) => <article className={`photo-price${item.hours === 2 ? " photo-price--accent" : ""}`} key={item.hours}><span className="photo-price__duration">{item.label}</span><p className="photo-price__amount"><strong>{item.price.toLocaleString("pl-PL")}</strong><span>zł</span></p><p className="photo-price__caption">{item.caption}</p><Link className="photo-button" href={photoboothReservationHref(scene, item.hours)}>{item.action}<span aria-hidden="true">↗</span></Link></article>)}</div>
        <div className="photo-pricing__extras"><div><span className="photo-pricing__extra-price">+{photoboothPricing.extraHourPrice} zł</span><p><strong>Każda kolejna godzina</strong><span>Przy rezerwacji dłuższej niż 3 godziny.</span></p></div><div><span className="photo-pricing__radius">{photoboothPricing.includedRadiusKm}<small>km</small></span><p><strong>Transport i montaż w cenie</strong><span>W promieniu 50 km od centrum Warszawy.</span></p></div></div>
        <p className="photo-pricing__note">Scenografię, rekwizyty i szczegóły wydarzenia ustalimy wspólnie. Wybrany czas i klimat dołączymy do zapytania.</p>
      </section>

      <section className="photo-how" id="zapytaj-o-fotobudke" aria-labelledby="photo-how-title">
        <div className="photo-section-heading">
          <span className="photo-eyebrow">Od pomysłu do pierwszego błysku</span>
          <h2 id="photo-how-title">Wy wybieracie klimat.<br /><em>Razem układamy resztę.</em></h2>
          <div className="photo-how__invite">
            <p>Podajcie termin i miejsce imprezy. Sprawdzimy dostępność fotobudki i przygotujemy ofertę dopasowaną do Was.</p>
            <Link className="photo-button photo-button--inquiry" href={reservationHref}>Sprawdź termin i wycenę <span aria-hidden="true">↗</span></Link>
            <small>Bez zobowiązań. Wysłanie formularza nie oznacza rezerwacji.</small>
          </div>
        </div>
        <ol><li><span>01</span><div><h3>Okazja, data, miejsce</h3><p>Powiedz, co świętujecie, gdzie i w jakim gronie. Wybraną tu scenografię dołączymy do zapytania.</p></div></li><li><span>02</span><div><h3>Oprawa dopasowana do Was</h3><p>Uzgadniamy tło, dekoracje, czas działania, obsługę oraz sposób przekazania zdjęć.</p></div></li><li><span>03</span><div><h3>Oferta i wspólna zabawa</h3><p>Potwierdzamy zestaw i wycenę. W dniu imprezy zostaje miejsce na spontaniczność i wspólne kadry.</p></div></li></ol>
      </section>

      <section className="photo-faq" aria-labelledby="photo-faq-title"><div className="photo-section-heading"><span className="photo-eyebrow">Przed pierwszym zdjęciem</span><h2 id="photo-faq-title">Jeszcze kilka<br /><em>dobrych pytań.</em></h2></div><div>{photoboothFaqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="photo-finale"><div className="photo-finale__lens" aria-hidden="true"><FontAwesomeIcon icon={faCamera} /><span>3, 2, 1…</span></div><span className="photo-eyebrow">Gotowi na swój moment?</span><h2>Ten dzień minie.<br /><em>Wspomnienia zostaną.</em></h2><p>Wasz wybór: <strong>{scene.label}</strong>.<br />Wypełnij formularz — sprawdzimy termin i przygotujemy propozycję na Waszą imprezę.</p><div className="photo-finale__actions"><Link className="photo-button photo-button--inquiry" href={reservationHref}>Zapytaj o fotobudkę <span aria-hidden="true">↗</span></Link><a href="tel:+48795103108">{BUSINESS.telephone}</a></div></section>
    </div>
  </main>;
}

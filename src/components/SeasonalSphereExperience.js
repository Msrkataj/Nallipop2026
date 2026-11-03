"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { autumnPackage, halloweenPackage, spherePackageDetails } from "@/data/seasonal-packages";

function Atmosphere() {
  return <div className="sphere-atmosphere" aria-hidden="true">
    <div className="sphere-atmosphere__autumn">{["maple-leaf", "oak-leaf", "maple-leaf", "oak-leaf"].map((asset, index) => <div className={`sphere-sprite sphere-sprite--${index + 1}`} key={index}><Image src={`/images/kula/${asset}.webp`} alt="" width={100} height={130} /></div>)}</div>
    <div className="sphere-atmosphere__halloween">{["bat", "ghost", "bat", "ghost"].map((asset, index) => <div className={`sphere-sprite sphere-sprite--${index + 1} sphere-sprite--${asset}`} key={index}><Image src={`/images/kula/${asset}.webp`} alt="" width={asset === "bat" ? 180 : 100} height={asset === "bat" ? 120 : 150} /></div>)}</div>
  </div>;
}

function SphereGallery({ pack }) {
  const [active, setActive] = useState(0);
  const dialogRef = useRef(null);
  const photo = pack.gallery[active];
  function move(direction) { setActive((index) => (index + direction + pack.gallery.length) % pack.gallery.length); }
  return <section className="sphere-gallery container" id="galeria-kuli" aria-labelledby="sphere-gallery-title">
    <div className="sphere-gallery__intro"><span className="sphere-eyebrow">Zobacz każdy szczegół</span><h2 id="sphere-gallery-title">{pack.galleryTitle}</h2><p>{pack.galleryIntro}</p>
      <div className="sphere-gallery__thumbnails" role="group" aria-label={`Galeria: ${pack.label}`}>{pack.gallery.map((item, index) => <button type="button" key={item.src} onClick={() => setActive(index)} aria-pressed={index === active}><span><Image src={item.src} alt="" fill sizes="110px" /></span>{item.label}</button>)}</div>
      <p className="sphere-gallery__hint">Kliknij zdjęcie, aby obejrzeć je z bliska.</p>
    </div>
    <button type="button" className="sphere-gallery__stage" onClick={() => dialogRef.current?.showModal()} aria-label={`Powiększ: ${photo.label}`}><Image key={photo.src} src={photo.src} alt={photo.alt} fill sizes="(max-width: 800px) 92vw, 720px" /><span aria-hidden="true">⤢</span></button>
    <dialog className="sphere-lightbox" ref={dialogRef} aria-label={`Zdjęcia: ${pack.label}`} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close(); }} onKeyDown={(event) => { if (["ArrowLeft", "ArrowRight"].includes(event.key)) { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); } }}>
      <button className="sphere-lightbox__close" type="button" aria-label="Zamknij zdjęcie" onClick={() => dialogRef.current.close()}>×</button>
      <div className="sphere-lightbox__photo"><Image src={photo.src} alt={photo.alt} fill sizes="90vw" /></div>
      <div className="sphere-lightbox__controls"><button type="button" onClick={() => move(-1)} aria-label="Poprzednie zdjęcie">←</button><span aria-live="polite">{photo.label} · {active + 1}/{pack.gallery.length}</span><button type="button" onClick={() => move(1)} aria-label="Następne zdjęcie">→</button></div>
    </dialog>
  </section>;
}

export default function SeasonalSphereExperience({ initialVariant = "jesien" }) {
  const [progress, setProgress] = useState(initialVariant === "halloween" ? 100 : 0);
  const [paused, setPaused] = useState(false);
  const halloween = progress >= 50;
  const pack = halloween ? halloweenPackage : autumnPackage;
  const variant = pack.variant;

  function updateProgress(value) {
    setProgress(value);
    const url = new URL(window.location.href);
    if (value >= 50) url.searchParams.set("wariant", "halloween");
    else url.searchParams.delete("wariant");
    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    if (nextUrl !== `${window.location.pathname}${window.location.search}${window.location.hash}`) window.history.replaceState(window.history.state, "", nextUrl);
  }
  useEffect(() => {
    function syncVariant() { setProgress(new URLSearchParams(window.location.search).get("wariant") === "halloween" ? 100 : 0); }
    window.addEventListener("popstate", syncVariant);
    return () => window.removeEventListener("popstate", syncVariant);
  }, []);

  const questions = [
    [`Co obejmuje ${halloween ? "pakiet Halloween" : "jesienny pakiet"}?`, `Pakiet obejmuje 2 godziny animacji z tematycznymi warsztatami wewnątrz kuli oraz ${halloween ? "halloweenową" : "jesienną"} aranżację i obsługę. Temat warsztatów dopasujemy do wieku dzieci.`],
    ["Ile dzieci może być w środku?", "Wewnątrz kuli może przebywać do 12 dzieci jednocześnie. Przy zgłoszeniu podaj liczbę i wiek uczestników, abyśmy mogli ustalić organizację zajęć."],
    ["Czy warsztaty odbywają się w kuli?", `Tak. Warsztaty tematyczne prowadzimy wewnątrz ${halloween ? "kuli halloweenowej, wśród duszków, nietoperzy i dekoracji Halloween" : "jesiennej kuli, w otoczeniu liści, dyń i ciepłych światełek"}. Program łączy twórcze zajęcia i wspólną zabawę z animatorami.`],
    ["Do kiedy można zarezerwować pakiet?", `${pack.label} jest dostępna na wydarzenia do 31 października 2026. Dostępność wybranego terminu potwierdzimy w odpowiedzi na zapytanie.`],
    ["Jak przygotować miejsce?", "Kula ma 6 m długości z tunelem, 4,5 m szerokości i 3 m wysokości. Średnica kopuły to 4 m. Potrzebne jest dodatkowe miejsce na obsługę, zakotwiczenie i swobodne wejście. Warunki ustawienia i zasilania ustalimy przed rezerwacją."],
  ];
  function snap() { setProgress((value) => value >= 50 ? 100 : 0); }

  return <main className={`sphere-page${halloween ? " is-halloween" : ""}${paused ? " is-paused" : ""}`} style={{ "--night": `${progress}%`, "--night-progress": progress / 100 }}>
    <Atmosphere />
    <div className="sphere-world-switch">
      <div className="container sphere-world-switch__inner">
        <div className="sphere-world-switch__caption"><span className="sphere-eyebrow">Jedna kula. Dwa światy.</span><strong>Przesuń i odmień całą stronę</strong></div>
        <div className="sphere-world-switch__control">
          <div className="sphere-world-switch__labels"><button type="button" onClick={() => updateProgress(0)} aria-pressed={!halloween}><span aria-hidden="true">☀</span> Jesień</button><button type="button" onClick={() => updateProgress(100)} aria-pressed={halloween}>Halloween <span aria-hidden="true">☾</span></button></div>
          <input aria-label="Zmień klimat kuli: Jesień lub Halloween" aria-valuetext={pack.label} type="range" min="0" max="100" step="1" value={progress} onChange={(event) => updateProgress(Number(event.target.value))} onPointerUp={snap} onKeyUp={(event) => { if (["Home", "End", "Enter", " "].includes(event.key)) snap(); }} onBlur={snap} />
          <span className="sphere-sr" role="status">Wybrano: {pack.label}</span>
        </div>
        <button className="sphere-motion-control" type="button" onClick={() => setPaused((value) => !value)} aria-pressed={paused}>{paused ? "Włącz animacje" : "Wstrzymaj animacje"}</button>
      </div>
    </div>

    <section className="sphere-hero" aria-labelledby="sphere-title"><div className="container">
      <nav className="sphere-breadcrumb" aria-label="Breadcrumb"><Link href="/">Strona główna</Link><span aria-hidden="true">/</span><span>{pack.label}</span></nav>
      <div className="sphere-hero__layout">
        <div className="sphere-hero__copy" key={variant}>
          <span className="sphere-eyebrow">{halloween ? "Edycja Halloween" : "Edycja jesienna"} · {pack.dateLabel}</span>
          <h1 id="sphere-title">{pack.title[0]}<br /><em>{pack.title[1]}</em></h1>
          <p className="sphere-hero__lead">{pack.lead}</p><p>{pack.intro}</p>
          <div className="sphere-hero__facts"><span><strong>2 godziny</strong> animacji i warsztatów</span><span><strong>do 12 dzieci</strong> jednocześnie w kuli</span></div>
          <div className="sphere-actions"><Link className="sphere-button" href={pack.reservationHref}>{pack.cta} <span aria-hidden="true">↗</span></Link><a href="#galeria-kuli">Zajrzyj do środka ↓</a></div><small>Warszawa i okolice · Zapytaj o dostępność i szczegóły pakietu</small>
        </div>
        <div className="sphere-hero__visual">
          <div className="sphere-hero__orb" aria-hidden="true" />
          <div className="sphere-hero__photo"><Image src={autumnPackage.image} alt={halloween ? "" : "Jesienna kula — tematyczne warsztaty dla dzieci"} fill priority sizes="(max-width: 800px) 100vw, 60vw" style={{ opacity: 1 - progress / 100 }} /><Image src={halloweenPackage.image} alt={halloween ? "Kula halloweenowa z fioletowymi światłami, dyniami i duszkami" : ""} fill loading="eager" sizes="(max-width: 800px) 100vw, 60vw" style={{ opacity: progress / 100 }} /></div>
          <div className="sphere-hero__note"><span aria-hidden="true">{halloween ? "✦" : "☀"}</span><div>{pack.note[0]}<strong>{pack.note[1]}</strong></div></div>
        </div>
      </div>
      <div className="sphere-ribbon">{pack.ribbon.map((text) => <span key={text}>{text}</span>)}</div>
    </div></section>

    <section className="sphere-experiences container" id="co-w-pakiecie"><header className="sphere-section-heading"><span className="sphere-eyebrow">{pack.label} · wspólna przygoda</span><h2>{pack.sectionTitle}</h2><p>{pack.sectionIntro}</p></header><div className="sphere-experiences__grid">{pack.experiences.map(([label, title, text], index) => <article key={`${variant}-${index}`}><span className="sphere-experiences__number">0{index + 1}</span><small>{label}</small><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <SphereGallery key={variant} pack={pack} />

    <section className="sphere-booking container" aria-labelledby="sphere-booking-title">
      <div className="sphere-booking__price"><span className="sphere-eyebrow">{pack.label} · kompletny pakiet</span><h2 id="sphere-booking-title">Dwie godziny.<br />Mnóstwo wspomnień.</h2><p>Podaj termin, miejsce i wiek dzieci. Przygotujemy propozycję dopasowaną do Waszego wydarzenia.</p><ul><li>Tematyczne warsztaty wewnątrz kuli</li><li>{halloween ? "Aranżacja Halloween" : "Jesienna aranżacja"} i animacje Nallipop</li><li>Pełna obsługa wejścia i wyjścia</li><li>Do {pack.capacity} dzieci jednocześnie w środku</li></ul><Link className="sphere-button" href={pack.reservationHref}>Zapytaj o termin <span aria-hidden="true">↗</span></Link></div>
      <div className="sphere-booking__dimensions"><span className="sphere-eyebrow">Przestrzeń dla małych odkrywców</span><h3>Wymiary dmuchańca</h3><dl>{spherePackageDetails.dimensions.map(({label,value}) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p>Warsztaty odbywają się w kuli o średnicy 4 m. W środku może przebywać maksymalnie 12 dzieci jednocześnie.</p><small>Przy ustawieniu uwzględnimy także miejsce na obsługę, mocowania i swobodne wejście.</small></div>
    </section>

    <section className="sphere-care container"><div><span className="sphere-eyebrow">{halloween ? "Czary pod kontrolą" : "Wy przeżywacie. My organizujemy."}</span><h2>{pack.careTitle}</h2><p>{pack.careCopy}</p></div><div className="sphere-care__items"><article><span aria-hidden="true">✓</span><div><h3>Obsługa przez cały czas</h3><p>Pomagamy dzieciom wchodzić i wychodzić przez tunel. Dbamy o zamykanie wejścia, aby ograniczyć utratę powietrza.</p></div></article><article><span aria-hidden="true">✓</span><div><h3>{halloween ? "Warsztaty w klimacie Halloween" : "Warsztaty w klimacie jesieni"}</h3><p>Program zajęć w kuli dobieramy do wieku dzieci. Łączymy tematyczne tworzenie ze wspólną zabawą i animacjami.</p></div></article><article><span aria-hidden="true">✓</span><div><h3>Przygotowanie i bezpieczeństwo</h3><p>Kula ma certyfikaty, badania i ubezpieczenie, w tym NNW. Podczas montażu dbamy o solidne zakotwiczenie.</p></div></article></div></section>

    <section className="sphere-plan container"><header className="sphere-section-heading"><span className="sphere-eyebrow">Od pomysłu do zabawy</span><h2>{pack.planTitle}</h2></header><ol><li><span>1</span><h3>Wybierz swój klimat</h3><p>Podoba Ci się {halloween ? "kula halloweenowa" : "jesienna kula"}? Przejdź do formularza i zaznacz interesujący Cię wariant pakietu.</p></li><li><span>2</span><h3>Ustalmy szczegóły</h3><p>Podaj datę, miejsce oraz liczbę i wiek dzieci. Potwierdzimy dostępność i organizację warsztatów w kuli.</p></li><li><span>3</span><h3>{halloween ? "Czas na wesołe Halloween!" : "Czas na jesienną magię!"}</h3><p>Przygotujemy {halloween ? "halloweenową" : "jesienną"} scenerię i poprowadzimy 2 godziny animacji z warsztatami tematycznymi.</p></li></ol></section>

    <section className="sphere-faq container"><div><span className="sphere-eyebrow">Warto wiedzieć</span><h2>{halloween ? "Zanim zaczniemy czarować" : "Zanim wejdziecie do kuli"}</h2><p>Masz pytanie? <a href="tel:+48795103108">795 103 108</a></p></div><div key={variant}>{questions.map(([question,answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

    <section className="sphere-finale container"><span className="sphere-eyebrow">{pack.label} · {pack.dateLabel}</span><h2>{pack.finaleTitle}</h2><p>2 godziny animacji i warsztatów · do 12 dzieci jednocześnie w kuli.</p><Link className="sphere-button" href={pack.reservationHref}>{pack.cta} <span aria-hidden="true">↗</span></Link><small>Wysłanie zapytania nie oznacza rezerwacji ani płatności.</small></section>
    <footer className="sphere-footer container"><Link href="/" aria-label="Nallipop — strona główna"><BrandLogo /></Link><p>{pack.footer}</p><Link href="/oferta">Poznaj pozostałe oferty →</Link></footer>
  </main>;
}

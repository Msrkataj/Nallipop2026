"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck, faChevronUp, faPhone, faWandMagicSparkles, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useConsent } from "@/components/ConsentProvider";
import "@/styles/occasion-planner.scss";

const occasions = [
  {
    id: "halloween", seasonal: true, label: "Halloweenowa kula", detail: "Wejdźcie do świata duszków i zabawy!",
    badge: "Halloween", image: "/images/kula/halloween-front.webp",
    form: "/formularz-rezerwacji?pakiet=halloweenowa-kula", offer: "/jesienna-kula?wariant=halloween",
  },
  {
    id: "elf", seasonal: true, label: "Warsztaty z Elfem", detail: "Małe ręce, świąteczna magia", emoji: "🧝",
    form: "/formularz-rezerwacji?oferta=warsztaty-z-elfem", offer: "/mikolaj#warsztaty-z-elfem",
  },
  {
    id: "mikolaj", seasonal: true, label: "Wizyta Mikołaja", detail: "Gość, na którego czekają dzieci", emoji: "🎅",
    form: "/formularz-rezerwacji?oferta=wizyta-mikolaja", offer: "/mikolaj#wizyta-mikolaja",
  },
  {
    id: "urodziny", label: "Urodziny", detail: "Dzień pełen wow!", emoji: "🎂",
    form: "/formularz-rezerwacji?oferta=urodziny", offer: "/oferta?oferta=urodziny#opis-oferty",
  },
  {
    id: "wesela", label: "Wesele", detail: "Zabawa dla małych gości", emoji: "💍",
    form: "/formularz-rezerwacji?oferta=wesela", offer: "/oferta?oferta=wesela#opis-oferty",
  },
  {
    id: "warsztaty", label: "Przedszkole", detail: "Odkrywamy i tworzymy", emoji: "🎨",
    form: "/formularz-rezerwacji?oferta=warsztaty", offer: "/oferta?oferta=warsztaty#opis-oferty",
  },
  {
    id: "inne", label: "Inna okazja", detail: "Zrealizujmy Wasz pomysł", emoji: "🎈",
    form: "/formularz-rezerwacji", offer: "/oferta",
  },
];

export default function OccasionPlanner({ open, onOpenChange }) {
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);
  const { consent, isReady, isSettingsOpen } = useConsent();
  const occasion = occasions.find((item) => item.id === selected);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function renderChoice(item) {
    const isSelected = selected === item.id;
    return (
      <div key={item.id} className={`occasion-choice occasion-choice--${item.id}${item.seasonal ? " occasion-choice--seasonal" : ""}`} data-selected={isSelected}>
        {item.image && <Image src={item.image} alt="" fill sizes="(max-width: 560px) 100vw, 520px" className="occasion-choice__photo" />}
        <button type="button" className="occasion-choice__select" aria-label={`Wybierz: ${item.label}`} aria-pressed={isSelected} onClick={() => setSelected(item.id)}>
          {item.emoji && <span className="occasion-choice__emoji" aria-hidden="true">{item.emoji}</span>}
          <span className="occasion-choice__copy">
            {item.badge && <span className="occasion-choice__badge">{item.badge}</span>}
            <strong>{item.label}</strong>
            <small>{item.detail}</small>
          </span>
          <span className="occasion-choice__indicator" aria-hidden="true">{isSelected && <FontAwesomeIcon icon={faCheck} />}</span>
        </button>
        <Link className="occasion-choice__offer" href={item.offer} aria-label={`Zobacz ofertę: ${item.label}`} onNavigate={() => onOpenChange(false)}>Zobacz ofertę <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" /></Link>
      </div>
    );
  }

  return (
    <>
      <div className="occasion-dock" hidden={!isReady || !consent || isSettingsOpen}>
        <button type="button" className="occasion-dock__open" aria-haspopup="dialog" aria-controls="occasion-planner" aria-expanded={open} onClick={() => onOpenChange(true)}>
          <span className="occasion-dock__icon"><FontAwesomeIcon icon={faWandMagicSparkles} aria-hidden="true" /></span>
          <span><strong>Wywołaj dziecięce wow!</strong><small>Wybierz okazję i odkryj pomysły</small></span>
          <FontAwesomeIcon icon={faChevronUp} aria-hidden="true" />
        </button>
        <a className="occasion-dock__phone" href="tel:+48795103108" aria-label="Zadzwoń do Nallipop: 795 103 108"><FontAwesomeIcon icon={faPhone} aria-hidden="true" /><span>Zadzwoń</span></a>
      </div>

      <dialog id="occasion-planner" ref={dialogRef} className="occasion-sheet" aria-labelledby="occasion-title" aria-describedby="occasion-intro" onCancel={() => onOpenChange(false)} onClose={() => onOpenChange(false)} onClick={(event) => { if (event.target === event.currentTarget) onOpenChange(false); }}>
        <div className="occasion-sheet__header">
          <div className="occasion-sheet__handle" aria-hidden="true" />
          <div className="occasion-sheet__heading">
            <div><span className="occasion-sheet__eyebrow">Mały klik. Wielka frajda.</span><h2 id="occasion-title">Co organizujesz?</h2></div>
            <button type="button" className="occasion-sheet__close" aria-label="Zamknij wybór okazji" onClick={() => onOpenChange(false)}><FontAwesomeIcon icon={faXmark} aria-hidden="true" /></button>
          </div>
          <p id="occasion-intro">Wybierz okazję do wyceny lub zobacz jej ofertę.</p>
        </div>

        <div className="occasion-sheet__body">
          <div className="occasion-sheet__group" role="group" aria-labelledby="occasion-seasonal-title">
            <h3 id="occasion-seasonal-title"><span aria-hidden="true">✦</span> Sezon pełen magii</h3>
            <div className="occasion-sheet__choices">{occasions.filter((item) => item.seasonal).map(renderChoice)}</div>
          </div>
          <div className="occasion-sheet__group" role="group" aria-labelledby="occasion-classic-title">
            <h3 id="occasion-classic-title">A może świętujecie po swojemu?</h3>
            <div className="occasion-sheet__choices">{occasions.filter((item) => !item.seasonal).map(renderChoice)}</div>
          </div>
        </div>

        <div className="occasion-sheet__footer">
          <p className="occasion-sheet__selection" aria-live="polite" aria-atomic="true">{occasion ? <>Twój wybór: <strong>{occasion.label}</strong></> : "Opowiedz nam o planach — przygotujemy ofertę."}</p>
          <Link className="occasion-sheet__cta" href={occasion?.form || "/formularz-rezerwacji"} onClick={() => onOpenChange(false)}>Dalej — zapytaj o ofertę <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" /></Link>
          <p className="occasion-sheet__note">Bez zobowiązań. Z dojazdem do Was.</p>
        </div>
      </dialog>
    </>
  );
}

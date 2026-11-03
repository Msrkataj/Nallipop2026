"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ServiceOfferDetail({ offer }) {
  const dialogRef = useRef(null);
  return (
    <article className="service-detail" aria-labelledby="service-detail-title">
      <header className="service-detail__header">
        <div><span className="section-kicker">Pomysł na Waszą imprezę</span><h2 id="service-detail-title">{offer.title}</h2></div>
        <a href="#wybor-oferty">Zmień okazję <span aria-hidden="true">↑</span></a>
      </header>
      <div className="service-detail__layout">
        <div className="service-detail__visual">
          <button type="button" className="service-detail__photo" aria-label={`Powiększ zdjęcie: ${offer.title}`} onClick={() => dialogRef.current?.showModal()}>
            <Image src={offer.detailImage} alt={`${offer.title} — animacje Nallipop`} fill sizes="(max-width: 800px) 90vw, 550px" />
            <span>⤢ Powiększ zdjęcie</span>
          </button>
          <blockquote><span aria-hidden="true">“</span><p>{offer.quote}</p></blockquote>
        </div>
        <div className="service-detail__info">
          <span className="service-detail__location">Warszawa i okolice</span>
          <h3>{offer.headline}</h3>
          <p>{offer.copy}</p>
          <ul className="service-detail__benefits" aria-label="Co obejmuje oferta">{offer.benefits.map((benefit) => <li key={benefit}><span aria-hidden="true">✓</span>{benefit}</li>)}</ul>
          <div className="service-detail__booking">
            <div><span>Animacje już od</span><strong>150 <small>zł</small></strong></div>
            <p>Program dopasujemy do wieku dzieci, miejsca i czasu zabawy. Zapytaj o termin i dokładną wycenę.</p>
            <Link className="button button--primary" href={`/formularz-rezerwacji?oferta=${offer.id}`}>Zaplanuj z nami imprezę <span aria-hidden="true">→</span></Link>
            <Link className="service-detail__contact" href="/kontakt">Masz pytania? Porozmawiajmy</Link>
          </div>
        </div>
      </div>
      <section className="service-detail__extras" aria-labelledby="service-extras-title">
        <div><span className="section-kicker">Jeszcze więcej radości</span><h3 id="service-extras-title">Dobierz ulubione atrakcje</h3><p>Uzupełnij program o coś, co zachwyci Twoich małych gości.</p></div>
        <div><ul>{offer.extras.map((extra) => <li key={extra}>{extra}</li>)}</ul><Link href="/atrakcje">Poznaj atrakcje dodatkowe <span aria-hidden="true">↗</span></Link></div>
      </section>
      <details className="service-detail__more"><summary>Więcej o organizacji: {offer.title.toLowerCase()}</summary><p>{offer.searchCopy}</p></details>
      <dialog ref={dialogRef} className="inflatable-lightbox" aria-label={`Zdjęcie: ${offer.title}`} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
        <button className="inflatable-lightbox__close" type="button" aria-label="Zamknij zdjęcie" onClick={() => dialogRef.current.close()}>×</button>
        <div className="inflatable-lightbox__image"><Image src={offer.detailImage} alt={`${offer.title} — animacje Nallipop`} fill sizes="90vw" /></div>
      </dialog>
    </article>
  );
}

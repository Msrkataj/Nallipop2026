"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function InflatableDetail({ inflatable, galleryMedia, extras }) {
  const [selectedMediaId, setSelectedMediaId] = useState("main");
  const [failedMediaIds, setFailedMediaIds] = useState([]);
  const dialogRef = useRef(null);
  let imageNumber = 0;
  let videoNumber = 0;
  const media = [
    { id: "main", src: inflatable.image, type: "image" },
    ...galleryMedia
      .filter((item) => inflatable.galleryFolder && item.folderName === inflatable.galleryFolder
        && !inflatable.galleryExcludeFiles?.includes(item.sourceId || item.id))
      .sort((a, b) => (a.type === "video") - (b.type === "video") || a.id.localeCompare(b.id, "pl")),
  ].filter((item) => !failedMediaIds.includes(item.id))
    .map((item) => ({ ...item, label: item.type === "video" ? `Film ${++videoNumber}` : `Zdjęcie ${++imageNumber}` }));
  const selectedMedia = media.find(({ id }) => id === selectedMediaId) || media[0];
  const photos = media.filter((item) => item.type === "image");
  function changePhoto(direction) {
    const index = photos.findIndex((item) => item.id === selectedMedia.id);
    setSelectedMediaId(photos[(index + direction + photos.length) % photos.length].id);
  }
  const reservationHref = `/formularz-rezerwacji?atrakcja=${encodeURIComponent(inflatable.name)}`;

  return (
    <article className="inflatable-detail" aria-labelledby="inflatable-detail-title">
      <div className="inflatable-detail__heading">
        <div>
          <span className="section-kicker">Twój dmuchaniec</span>
          <h2 id="inflatable-detail-title">{inflatable.name}</h2>
        </div>
        <a className="inflatable-detail__change" href="#wybor-dmuchanca">Zmień model <span aria-hidden="true">↑</span></a>
      </div>

      <div className="inflatable-detail__layout">
        <div className="inflatable-media">
          <div className="inflatable-media__stage">
            {selectedMedia?.type === "video" ? (
              <video
                key={selectedMedia.id}
                src={selectedMedia.src}
                controls
                playsInline
                preload="none"
                poster={inflatable.image}
                aria-label={`${inflatable.name} — ${selectedMedia.label.toLowerCase()} z realizacji`}
                onError={() => setFailedMediaIds((ids) => [...ids, selectedMedia.id])}
              />
            ) : (
              <button
                className="inflatable-media__zoom"
                type="button"
                onClick={() => dialogRef.current?.showModal()}
                aria-label={`Powiększ zdjęcie: ${inflatable.name}`}
              >
                <Image
                  src={selectedMedia.src}
                  unoptimized={Boolean(selectedMedia.thumbnail)}
                  alt={`${inflatable.name} — ${selectedMedia.label.toLowerCase()}`}
                  fill
                  sizes="(max-width: 900px) 90vw, 600px"
                  onError={() => {
                    if (selectedMedia.id !== "main") setFailedMediaIds((ids) => [...ids, selectedMedia.id]);
                  }}
                />
                <span className="inflatable-media__zoom-label"><span aria-hidden="true">⤢</span> Powiększ zdjęcie</span>
              </button>
            )}
          </div>
          <div className="inflatable-media__footer">
            {media.length > 1 ? (
              <div className="inflatable-media__thumbnails" role="group" aria-label={`Zdjęcia i filmy: ${inflatable.name}`}>
                {media.map((item) => (
                  <button
                    className="inflatable-media__thumbnail"
                    type="button"
                    key={item.id}
                    aria-pressed={item.id === selectedMedia?.id}
                    onClick={() => setSelectedMediaId(item.id)}
                  >
                    <span className="inflatable-media__thumbnail-image">
                      <Image src={item.type === "image" ? item.thumbnail || item.src : inflatable.image} unoptimized={Boolean(item.thumbnail)} alt="" fill sizes="80px" />
                      {item.type === "video" && <span className="inflatable-media__play" aria-hidden="true">▶</span>}
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            ) : <p>Kliknij zdjęcie, aby obejrzeć je z bliska.</p>}
            {failedMediaIds.length > 0 && <p role="status">Jeden z materiałów jest chwilowo niedostępny. Pozostałe zdjęcia i filmy możesz oglądać dalej.</p>}
          </div>

          <section className="inflatable-detail__dimensions" aria-labelledby="inflatable-dimensions-title">
            <h3 id="inflatable-dimensions-title">Wymiary dmuchańca</h3>
            <dl className={inflatable.dimensions.length === 4 ? "has-four-dimensions" : undefined}>
              {inflatable.dimensions.map(({ label, value }) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          </section>
        </div>

        <div className="inflatable-detail__info">
          <span className="inflatable-detail__location">Warszawa i okolice</span>
          <h3>{inflatable.headline}</h3>
          <p>{inflatable.copy}</p>
          <ul className="inflatable-detail__features" aria-label="Cechy dmuchańca">
            {inflatable.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>

          <div className="inflatable-detail__booking">
            <span className="inflatable-detail__booking-label">Zaplanuj swoją imprezę</span>
            <h4>Cennik wynajmu</h4>
            <dl className="inflatable-detail__prices" aria-label={`Cennik: ${inflatable.name}`}>
              {inflatable.prices.map(({ hours, price }) => (
                <div key={hours}>
                  <dt>{hours} godz.</dt>
                  <dd>{price} <span>zł</span></dd>
                </div>
              ))}
            </dl>
            <p className="inflatable-detail__price-note">{inflatable.priceNote}</p>
            <Link className="button button--primary" href={reservationHref}>
              Zapytaj o dostępność <span aria-hidden="true">→</span>
            </Link>
            <Link className="inflatable-detail__contact" href="/kontakt">Masz pytania? Porozmawiajmy</Link>
          </div>
          <section className="inflatable-detail__service" aria-labelledby="inflatable-service-title">
            <span className="inflatable-detail__service-label">{inflatable.id === "bubble-house" ? "Obsługa przez cały czas zabawy" : "Wygodny wynajem"}</span>
            <h3 id="inflatable-service-title" className={inflatable.id === "bubble-house" ? "inflatable-detail__service-highlight" : undefined}>
              {inflatable.id === "bubble-house" && (
                <svg className="inflatable-detail__attention" viewBox="0 0 48 58" aria-hidden="true" focusable="false">
                  <path d="M22 40C23 30 17 22 19 13C20 6 29 3 35 8C42 15 31 28 29 40Z" fill="#8b5bd6" />
                  <path d="M19 37C20 27 14 19 16 10C17 3 26 0 32 5C39 12 28 25 26 37Z" fill="#f05ba5" />
                  <path d="M21 10C23 7 26 7 28 9" fill="none" stroke="#ffd7ec" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="23" cy="48" r="6.5" fill="#8b5bd6" />
                  <circle cx="21" cy="46" r="6.5" fill="#20c5c5" />
                  <path d="m7 15 1.5 4.5L13 21l-4.5 1.5L7 27l-1.5-4.5L1 21l4.5-1.5Z" fill="#f6bd42" />
                  <path d="m39 30 1.5 3.5L44 35l-3.5 1.5L39 40l-1.5-3.5L34 35l3.5-1.5Z" fill="#b598e6" />
                </svg>
              )}
              <span>{inflatable.serviceTitle}</span>
            </h3>
            <p>{inflatable.serviceCopy}</p>
          </section>
        </div>
      </div>

      <section className="inflatable-detail__safety" aria-labelledby="inflatable-safety-title">
        <h3 id="inflatable-safety-title">Zabawa z troską o bezpieczeństwo</h3>
        <div className="inflatable-detail__practical">
          {[
            ["Certyfikaty i badania", "Wszystkie nasze dmuchańce mają certyfikaty i badania."],
            ["Ubezpieczenie, w tym NNW", "Dmuchańce są ubezpieczone, także od następstw nieszczęśliwych wypadków."],
            ["Solidne zakotwiczenie", "Każdy dmuchaniec porządnie kotwiczymy podczas montażu."],
          ].map(([title, text]) => (
            <div key={title}>
              <span aria-hidden="true">✓</span>
              <div><h4>{title}</h4><p>{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <details className="inflatable-detail__extras">
        <summary>Chcesz jeszcze więcej atrakcji?<span aria-hidden="true">+</span></summary>
        <div>
          <p>Do dmuchańca dobierz zabawy dopasowane do wieku dzieci i charakteru imprezy.</p>
          <ul>{extras.map((extra) => <li key={extra}>{extra}</li>)}</ul>
          <Link href="/atrakcje">Poznaj atrakcje dodatkowe <span aria-hidden="true">→</span></Link>
        </div>
      </details>

      <dialog className="inflatable-lightbox" ref={dialogRef} aria-label={`Zdjęcie: ${inflatable.name}`} onKeyDown={(event) => {
        if (photos.length > 1 && ["ArrowLeft", "ArrowRight"].includes(event.key)) {
          event.preventDefault();
          changePhoto(event.key === "ArrowLeft" ? -1 : 1);
        }
      }} onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current.close();
      }}>
        <button className="inflatable-lightbox__close" type="button" onClick={() => dialogRef.current.close()} aria-label="Zamknij zdjęcie">×</button>
        <div className="inflatable-lightbox__image">
          {selectedMedia.type === "image" && <Image src={selectedMedia.src} alt={`${inflatable.name} — ${selectedMedia.label.toLowerCase()}`} fill sizes="90vw" />}
        </div>
        {photos.length > 1 && <>
          <button className="inflatable-lightbox__previous" type="button" onClick={() => changePhoto(-1)} aria-label="Poprzednie zdjęcie">←</button>
          <button className="inflatable-lightbox__next" type="button" onClick={() => changePhoto(1)} aria-label="Następne zdjęcie">→</button>
          <p className="inflatable-lightbox__counter" aria-live="polite">{photos.findIndex((item) => item.id === selectedMedia.id) + 1} / {photos.length}</p>
        </>}
      </dialog>
    </article>
  );
}

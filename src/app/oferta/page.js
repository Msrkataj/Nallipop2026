"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getDownloadURL, listAll, ref as storageRef } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { inflatableItems } from "@/data/inflatables";
import SocialLinks from "@/components/SocialLinks";
import BrandLogo from "@/components/BrandLogo";
import PageDecorations from "@/components/PageDecorations";

const offerItems = [
  {
    id: "urodziny",
    icon: "/images/oferta/ikony/urodziny.webp",
    title: "Urodziny",
    short: "Wyjątkowe przyjęcia pełne radości",
    image: "/images/oferta/service-urodziny.webp",
    badge: "Urodziny",
    headline: "Niezapomniane urodziny pełne uśmiechu i magii",
    copy:
      "Tworzymy wyjątkowe przyjęcia, podczas których każde dziecko czuje się ważne i wyjątkowe. Dopasowujemy program do wieku, zainteresowań i charakteru imprezy, aby ten dzień był naprawdę niezapomniany.",
    detailImage: "/images/oferta/service-urodziny.webp",
    gallery: [
      "/images/hero-kids.webp",
      "/images/oferta/service-festyny.webp",
      "/images/oferta/service-eventy.webp",
      "/images/oferta/service-warsztaty.webp",
      "/images/banner-kids.webp",
      "/images/atrakcje/banki-xxl.webp",
    ],
    quote: "Chcemy, aby każde dziecko wspominało ten dzień jeszcze długo po zakończeniu zabawy!",
  },
  {
    id: "warsztaty",
    icon: "/images/oferta/ikony/warsztaty-kreatywne.webp",
    title: "Warsztaty kreatywne",
    short: "Kreatywność, zabawa i rozwój",
    image: "/images/oferta/service-warsztaty.webp",
    badge: "Warsztaty",
    headline: "Twórcze warsztaty, które angażują od pierwszej minuty",
    copy:
      "Dzieci malują, eksperymentują, tworzą i uczą się przez swobodną zabawę. Każdy warsztat ma jasny rytm, estetyczne materiały i aktywności dobrane do wieku grupy.",
    detailImage: "/images/oferta/service-warsztaty.webp",
    gallery: [
      "/images/oferta/service-warsztaty.webp",
      "/images/atrakcje/eksperymenty.webp",
      "/images/atrakcje/slime.webp",
      "/images/atrakcje/gniotki.webp",
      "/images/atrakcje/tatuaze-broaktowe.webp",
      "/images/atrakcje/suchy-lod.webp",
    ],
    quote: "Najpiękniejszy moment? Gdy dzieci pokazują rodzicom coś, co zrobiły całkowicie same.",
  },
  {
    id: "festyny",
    icon: "/images/oferta/ikony/festyny.webp",
    title: "Festyny",
    short: "Animacje i atrakcje na świeżym powietrzu",
    image: "/images/oferta/service-festyny.webp",
    badge: "Festyny",
    headline: "Kolorowe festyny z atrakcjami dla dużych grup",
    copy:
      "Przygotowujemy płynny program dla szkół, osiedli, firm i wydarzeń plenerowych. Dbamy o dobrą energię, kolejki do atrakcji i bezpieczne tempo zabawy.",
    detailImage: "/images/oferta/service-festyny.webp",
    gallery: [
      "/images/oferta/service-festyny.webp",
      "/images/banner-kids.webp",
      "/images/atrakcje/dmuchance.webp",
      "/images/atrakcje/banki-xxl.webp",
      "/images/atrakcje/malowanie-twarzy.webp",
      "/images/oferta/service-eventy.webp",
    ],
    quote: "Duże wydarzenia potrzebują planu, ale dzieci mają czuć tylko radość i swobodę.",
  },
  {
    id: "wesela",
    icon: "/images/oferta/ikony/wesela.webp",
    title: "Wesela",
    short: "Zabawa dla dzieci, spokój dla rodziców",
    image: "/images/oferta/service-wesela.webp",
    badge: "Wesela",
    headline: "Animacje weselne z klasą i spokojem dla rodziców",
    copy:
      "Tworzymy bezpieczną strefę zabawy dla najmłodszych gości, dopasowaną do charakteru uroczystości. Dzieci są zaopiekowane, a dorośli mogą spokojnie świętować.",
    detailImage: "/images/oferta/service-wesela.webp",
    gallery: [
      "/images/oferta/service-wesela.webp",
      "/images/atrakcje/banki-xxl.webp",
      "/images/atrakcje/malowanie-twarzy.webp",
      "/images/oferta/service-urodziny.webp",
      "/images/atrakcje/piniaty.webp",
      "/images/banner-kids.webp",
    ],
    quote: "Wesele ma swój rytm, dlatego animacje prowadzimy z wyczuciem i lekkością.",
  },
  {
    id: "eventy",
    icon: "/images/oferta/ikony/bale-i-eventy.webp",
    title: "Bale i eventy",
    short: "Profesjonalna oprawa każdego wydarzenia",
    image: "/images/oferta/service-eventy.webp",
    badge: "Eventy",
    headline: "Bale i eventy z piękną oprawą oraz gotowym scenariuszem",
    copy:
      "Przyjeżdżamy z programem, materiałami i zespołem animatorów. Możemy przygotować bal tematyczny, firmowy dzień dziecka, piknik rodzinny albo kameralną strefę kreatywną.",
    detailImage: "/images/oferta/service-eventy.webp",
    gallery: [
      "/images/oferta/service-eventy.webp",
      "/images/banner-kids.webp",
      "/images/atrakcje/piniaty.webp",
      "/images/atrakcje/zamykanie-w-bance.webp",
      "/images/oferta/service-festyny.webp",
      "/images/hero-kids.webp",
    ],
    quote: "Najlepsze eventy wyglądają lekko, bo za kulisami wszystko jest dobrze przygotowane.",
  },
  {
    id: "polkolonie",
    icon: "/images/oferta/ikony/polkolonie.webp",
    title: "Półkolonie",
    short: "Niezapomniane półkolonie pełne przygód",
    image: "/images/oferta/service-polkolonie.webp",
    badge: "Półkolonie",
    headline: "Półkolonie pełne aktywności, relacji i przygód",
    copy:
      "Budujemy dni z dobrym rytmem: kreatywność, ruch, odpoczynek i integracja. Program można dopasować do wieku dzieci, miejsca oraz długości turnusu.",
    detailImage: "/images/oferta/service-polkolonie.webp",
    gallery: [
      "/images/oferta/service-polkolonie.webp",
      "/images/oferta/service-warsztaty.webp",
      "/images/atrakcje/eksperymenty.webp",
      "/images/atrakcje/slime.webp",
      "/images/oferta/service-festyny.webp",
      "/images/banner-kids.webp",
    ],
    quote: "Dobrze zaplanowany dzień daje dzieciom ekscytację, ale też poczucie bezpieczeństwa.",
  },
  {
    id: "dmuchance",
    icon: "/images/oferta/ikony/dmuchance.webp",
    title: "Dmuchańce",
    short: "Nowy dmuchaniec Safari już dostępny",
    image: "/images/dmuchance/safari/main.webp",
    imagePosition: "center 54%",
    badge: "Nowość · Dmuchaniec Safari",
    headline: "Tropikalna przygoda ze zjeżdżalnią i strefą skakania",
    copy:
      "Nowy dmuchaniec Safari to duża, efektowna atrakcja na urodziny, festyny, pikniki i wydarzenia rodzinne. Łączy wysoką zjeżdżalnię ze strefą do swobodnego skakania, a kolorowy motyw dżungli natychmiast przyciąga uwagę dzieci.",
    detailImage: "/images/dmuchance/safari/main.webp",
    gallery: [
      "/images/dmuchance/safari/main.webp",
      "/images/dmuchance/tropic/main.webp",
      "/images/dmuchance/bubble_house/main.webp",
    ],
    quote: "Transportujemy, rozkładamy i przygotowujemy dmuchaniec do bezpiecznej zabawy — Ty wybierasz miejsce i termin.",
    inflatables: inflatableItems,
  },
];

function getOfferMediaType(name) {
  return /\.(mp4|webm|mov|m4v|ogv)$/i.test(name) ? "video" : "image";
}

const strengths = [
  ["/images/ikony/magiczna-atmosfera.webp", "Magiczna atmosfera", "Zabawy, które angażują i wywołują uśmiech."],
  ["/images/ikony/doswiadczeni-animatorzy.webp", "Doświadczeni animatorzy", "Pasja, podejście i serce do pracy z dziećmi."],
  ["/images/ikony/kreatywne-podejscie.webp", "Kreatywne podejście", "Kolorowe animacje, które rozwijają wyobraźnię."],
];

const promiseItems = [
  ["/images/ikony/szybki-kontakt.webp", "Szybki kontakt", "Odpowiadamy nawet w 24h"],
  ["/images/ikony/indywidualne-podejscie.webp", "Indywidualne podejście", "Szyjemy program na miarę"],
  ["/images/ikony/100-procent-radosci.webp", "100% radości", "Dzieci są dla nas najważniejsze"],
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.55, ease: "easeOut" },
};

export default function OfertaPage() {
  const inflatableOffer = offerItems.find(({ id }) => id === "dmuchance");
  const [activeOfferId, setActiveOfferId] = useState(offerItems[0].id);
  const [activeGalleryMedia, setActiveGalleryMedia] = useState(null);
  const [selectedInflatableId, setSelectedInflatableId] = useState("safari");
  const [scrollTarget, setScrollTarget] = useState(null);
  const [galleryMedia, setGalleryMedia] = useState([]);
  const [galleryStatus, setGalleryStatus] = useState("loading");
  const detailSectionRef = useRef(null);
  const inflatablePickerRef = useRef(null);
  const activeOffer = useMemo(
    () => offerItems.find((item) => item.id === activeOfferId) || offerItems[0],
    [activeOfferId]
  );
  const selectedInflatable = inflatableOffer.inflatables.find(({ id }) => id === selectedInflatableId)
    || inflatableOffer.inflatables[0]
    || null;
  const detailOffer = activeOffer.id === "dmuchance" && selectedInflatable
    ? {
        ...activeOffer,
        badge: selectedInflatable.badge,
        headline: selectedInflatable.headline,
        copy: selectedInflatable.copy,
        quote: selectedInflatable.quote,
        detailImage: selectedInflatable.image,
        imagePosition: selectedInflatable.imagePosition,
      }
    : activeOffer;
  const activeGalleryFolder = activeOffer.id === "dmuchance" ? "dmuchaniec" : "gallery";
  const activeRemoteMedia = galleryMedia.filter(({ folderName }) => folderName === activeGalleryFolder);
  const visibleGallery = activeRemoteMedia.length
    ? activeRemoteMedia.slice(0, 6)
    : activeOffer.gallery.map((src, index) => ({
        id: `${activeOffer.id}-fallback-${index}`,
        src,
        type: "image",
        folderName: activeGalleryFolder,
      }));

  useEffect(() => {
    let alive = true;

    async function loadGallery() {
      try {
        const folderNames = ["gallery", "dmuchaniec"];
        const folderResults = await Promise.all(
          folderNames.map(async (folderName) => ({
            folderName,
            result: await listAll(storageRef(storage, folderName)),
          }))
        );
        const media = await Promise.all(
          folderResults.flatMap(({ folderName, result }) =>
            result.items
              .sort((a, b) => a.name.localeCompare(b.name, "pl"))
              .map(async (itemRef) => ({
                id: itemRef.fullPath,
                folderName,
                src: await getDownloadURL(itemRef),
                type: getOfferMediaType(itemRef.name),
              }))
          )
        );

        if (alive) {
          setGalleryMedia(media);
          setGalleryStatus(media.length ? "ready" : "empty");
        }
      } catch (error) {
        console.error("Nie udało się pobrać galerii i folderu dmuchaniec z Firebase Storage", error);
        if (alive) {
          setGalleryStatus("error");
        }
      }
    }

    loadGallery();

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const syncTimer = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const requestedOfferId = params.get("oferta");
      const requestedInflatableId = params.get("dmuchaniec");

      if (offerItems.some(({ id }) => id === requestedOfferId)) {
        setActiveOfferId(requestedOfferId);
      }

      if (inflatableOffer.inflatables.some(({ id }) => id === requestedInflatableId)) {
        setSelectedInflatableId(requestedInflatableId);
      }

      if (window.location.hash === "#opis-oferty") {
        setScrollTarget("detail");
      } else if (window.location.hash === "#wybor-dmuchanca") {
        setScrollTarget("picker");
      }
    }, 0);

    return () => window.clearTimeout(syncTimer);
  }, [inflatableOffer.inflatables]);

  useEffect(() => {
    if (!scrollTarget) {
      return;
    }

    const scrollTimer = window.setTimeout(() => {
      const targetRef = scrollTarget === "picker" ? inflatablePickerRef : detailSectionRef;
      const targetTop = targetRef.current
        ? targetRef.current.getBoundingClientRect().top + window.scrollY - 96
        : 0;

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
      window.history.replaceState(
        null,
        "",
        scrollTarget === "picker" ? "#wybor-dmuchanca" : "#opis-oferty"
      );
      setScrollTarget(null);
    }, 90);

    return () => window.clearTimeout(scrollTimer);
  }, [activeOfferId, scrollTarget, selectedInflatableId]);

  function selectOffer(event, offerId) {
    event.preventDefault();
    setActiveOfferId(offerId);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("oferta", offerId);
    if (offerId === "dmuchance") {
      setSelectedInflatableId("safari");
      nextUrl.searchParams.set("dmuchaniec", "safari");
    } else {
      nextUrl.searchParams.delete("dmuchaniec");
    }
    const nextTarget = offerId === "dmuchance" ? "picker" : "detail";
    nextUrl.hash = nextTarget === "picker" ? "wybor-dmuchanca" : "opis-oferty";
    window.history.replaceState(null, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    setScrollTarget(nextTarget);
  }

  function selectInflatable(inflatableId) {
    setSelectedInflatableId(inflatableId);
    setActiveOfferId("dmuchance");
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("oferta", "dmuchance");
    nextUrl.searchParams.set("dmuchaniec", inflatableId);
    nextUrl.hash = "opis-oferty";
    window.history.replaceState(null, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    setScrollTarget("detail");
  }

  return (
    <main className="offer-page decorated-page">
      <PageDecorations variant="offer" />
      <section className="offer-hero">
        <div className="container">
          <motion.div className="offer-hero__intro" {...fadeUp}>
            <nav className="offer-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Strona główna</Link>
              <span aria-hidden="true">›</span>
              <span>Oferta</span>
            </nav>
            <h1>Nasza oferta</h1>
            <p>Wybierz okazję, a poniżej pokażemy Ci więcej szczegółów.</p>
          </motion.div>

          <motion.div className="offer-tabs" {...fadeUp}>
            {offerItems.map((item) => (
              <a
                className={`offer-tile ${item.id === activeOffer.id ? "is-active" : ""}`}
                href={item.id === "dmuchance" ? "#wybor-dmuchanca" : "#opis-oferty"}
                key={item.id}
                onClick={(event) => selectOffer(event, item.id)}
                aria-current={item.id === activeOffer.id ? "true" : undefined}
              >
                <span
                  className="offer-tile__image image-fill"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundPosition: item.imagePosition || "center",
                  }}
                />
                <span className="offer-tile__icon">
                  <img src={item.icon} alt="" />
                </span>
                <span className="offer-tile__content">
                  <strong>{item.title}</strong>
                  <small>{item.short}</small>
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </section>
      {activeOffer.id === "dmuchance" && (
        <section
          className="inflatable-picker-section"
          id="wybor-dmuchanca"
          ref={inflatablePickerRef}
          aria-labelledby="inflatable-picker-title"
        >
            <div className="container">
              <motion.div className="inflatable-picker" {...fadeUp}>
                <div className="inflatable-picker__heading">
                  <span className="section-kicker">Dostępne dmuchańce</span>
                  <h2 id="inflatable-picker-title">Wybierz dmuchaniec na swoje wydarzenie</h2>
                  <p>Wszystkie poniższe modele są dostępne do rezerwacji. Wybierz ulubiony wariant, a my potwierdzimy termin i warunki montażu.</p>
                </div>

                <div className="inflatable-picker__grid">
                  {inflatableOffer.inflatables.map((inflatable) => (
                      <button
                          className={`inflatable-option ${inflatable.id === selectedInflatable?.id ? "is-selected" : ""}`}
                          type="button"
                          key={inflatable.id}
                          aria-pressed={inflatable.id === selectedInflatable?.id}
                          onClick={() => selectInflatable(inflatable.id)}
                      >
                    <span
                        className="inflatable-option__image image-fill"
                        style={{
                          backgroundImage: `url(${inflatable.image})`,
                          backgroundPosition: inflatable.imagePosition || "center",
                        }}
                    />
                        <span className="inflatable-option__status">Dostępny</span>
                        {inflatable.isNew && <span className="inflatable-option__new">Nowość</span>}
                        <span className="inflatable-option__copy">
                      <strong>{inflatable.name}</strong>
                      <small>{inflatable.description}</small>
                      <em>{inflatable.id === selectedInflatable?.id ? "Wybrano ✓" : "Wybierz ten model"}</em>
                    </span>
                      </button>
                  ))}
                </div>

                {selectedInflatable && (
                    <div className="inflatable-picker__selection">
                      <span>Twój wybór</span>
                      <strong>{selectedInflatable.name}</strong>
                      <Link
                          className="button button--primary"
                          href={`/formularz-rezerwacji?atrakcja=${encodeURIComponent(selectedInflatable.name)}`}
                      >
                        Zapytaj o dostępność <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                )}
              </motion.div>
            </div>
        </section>
      )}
      <section className="offer-detail-section" id="opis-oferty" ref={detailSectionRef}>
        <div className="container">
          <motion.article
            className="offer-detail"
            key={`${detailOffer.id}-${selectedInflatableId}`}
            initial={{ opacity: 0, y: 26, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
          >
            <div
              className="offer-detail__photo image-fill"
              style={{
                backgroundImage: `url(${detailOffer.detailImage})`,
                backgroundPosition: detailOffer.imagePosition || "center",
              }}
              aria-hidden="true"
            />

            <div className="offer-detail__content">
              <span className="offer-detail__badge">{detailOffer.badge}</span>
              <h2>{detailOffer.headline}</h2>
              <p>{detailOffer.copy}</p>

              <div className="offer-strengths">
                {strengths.map(([icon, title, text]) => (
                  <div className="offer-strength" key={title}>
                    <span><Image src={icon} alt="" width={42} height={42} /></span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </div>
                ))}
              </div>

              <div className="offer-detail__quote">
                <strong>{detailOffer.quote}</strong>
                <Link className="button button--primary" href="/formularz-rezerwacji">
                  Zapytaj o szczegóły <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </motion.article>
        </div>
      </section>



      <section className="offer-gallery-section">
        <div className="container">
          <motion.div className="offer-gallery-card" {...fadeUp}>
            <h2>Zobacz jak się bawimy</h2>
            <div className="offer-gallery">
              {visibleGallery.map((media, index) => (
                <button
                  className={`offer-gallery__item offer-gallery__item--${index + 1}`}
                  key={media.id}
                  type="button"
                  aria-label={media.type === "video" ? "Powiększ film" : "Powiększ zdjęcie"}
                  onClick={() => setActiveGalleryMedia(media)}
                >
                  {media.type === "video" ? (
                    <video src={media.src} muted loop autoPlay playsInline preload="metadata" />
                  ) : (
                    <span className="image-fill" style={{ backgroundImage: `url(${media.src})` }} />
                  )}
                </button>
              ))}
            </div>
            {galleryStatus === "loading" && <p className="offer-gallery__status">Ładuję zdjęcia i filmy z galerii...</p>}
            {galleryStatus === "empty" && <p className="offer-gallery__status">Dodaj zdjęcia lub filmy do folderu <strong>{activeGalleryFolder}/</strong> w Firebase Storage.</p>}
            {galleryStatus === "error" && <p className="offer-gallery__status">Nie udało się pobrać galerii z Firebase. Pokazuję zdjęcia zapasowe.</p>}
            <Link className="offer-gallery__link" href="/galeria">
              Zobacz więcej zdjęć w galerii <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="offer-ready-section">
        <div className="container">
          <motion.div className="offer-ready" {...fadeUp}>
            <div className="offer-ready__copy">
              <h2>Gotowi na wyjątkowe urodziny?</h2>
              <p>Napisz do nas, a pomożemy stworzyć najlepsze przyjęcie dla Twojego dziecka!</p>
            </div>
            <div className="offer-ready__items">
              {promiseItems.map(([icon, title, text]) => (
                <div className="offer-ready__item" key={title}>
                  <span><Image src={icon} alt="" width={48} height={48} /></span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </div>
              ))}
            </div>
            <div
              className="offer-ready__image image-fill"
              style={{
                backgroundImage: `url(${activeOffer.detailImage})`,
                backgroundPosition: activeOffer.imagePosition || "center",
              }}
            />
          </motion.div>
        </div>
      </section>

      <footer className="offer-footer" id="kontakt">
        <div className="container offer-footer__grid">
          <div>
            <Link href="/" className="offer-footer__logo">
              <BrandLogo />
            </Link>
            <SocialLinks />
          </div>

          <div>
            <h3>Nawigacja</h3>
            <Link href="/">Strona główna</Link>
            <Link href="/#o-nas">O nas</Link>
            <Link href="/oferta">Oferta</Link>
            <Link href="/#atrakcje">Atrakcje</Link>
            <Link href="/galeria">Galeria</Link>
            <Link href="/#opinie">Opinie</Link>
            <Link href="/kontakt">Kontakt</Link>
          </div>

          <div>
            <h3>Kontakt</h3>
            <a href="tel:+48795103108">795 103 108</a>
            <a href="mailto:animacje@nallipop.pl">animacje@nallipop.pl</a>
            <span>Warszawa i okolice</span>
          </div>

          <div>
            <h3>Obszar działania</h3>
            <div className="offer-footer__map image-fill" style={{ backgroundImage: "url(/images/warszawa-map.webp)" }} />
          </div>
        </div>
      </footer>

      {activeGalleryMedia && (
        <div className="offer-media-lightbox" role="dialog" aria-modal="true" aria-label="Podgląd galerii" onClick={() => setActiveGalleryMedia(null)}>
          <button className="offer-media-lightbox__close" type="button" aria-label="Zamknij podgląd" onClick={() => setActiveGalleryMedia(null)}>
            ×
          </button>
          <div className="offer-media-lightbox__content" onClick={(event) => event.stopPropagation()}>
            {activeGalleryMedia.type === "video" ? (
              <video src={activeGalleryMedia.src} controls autoPlay playsInline />
            ) : (
              <div className="offer-media-lightbox__image image-fill" style={{ backgroundImage: `url(${activeGalleryMedia.src})` }} />
            )}
          </div>
        </div>
      )}
    </main>
  );
}

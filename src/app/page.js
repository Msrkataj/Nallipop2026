"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { inflatableItems } from "@/data/inflatables";
import SocialLinks from "@/components/SocialLinks";
import ConsentAwareFacebookPosts from "@/components/ConsentAwareFacebookPosts";
import BrandLogo from "@/components/BrandLogo";
import PageDecorations from "@/components/PageDecorations";
import "@/styles/hero.scss";
import "@/styles/facebook-posts.scss";

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: 0.65, ease: "easeOut" },
};

const heroSlides = [
  {
    id: "wspomnienia",
    image: "/images/hero-kids.webp",
    caption: "Urodziny, animacje i warsztaty",
    kicker: "Animacje i warsztaty dla dzieci",
    title: ["Tworzymy dziecięce", "wspomnienia, które", "zostają na lata."],
    description:
      "Pełne radości animacje, kreatywne warsztaty i wyjątkowe atrakcje dla dzieci w Warszawie i okolicach.",
    cards: [
      ["⭐", "5.0", "w opiniach"],
      ["🎉", "500+", "wydarzeń"],
      ["⌖", "Warszawa", "i okolice"],
    ],
  },
  {
    id: "warsztaty",
    image: "/images/oferta/service-warsztaty.webp",
    caption: "Twórcze warsztaty dla dzieci",
    kicker: "Kreatywne warsztaty dla dzieci",
    title: ["Tworzymy małe", "dzieła i wielkie", "chwile radości."],
    description:
      "Kolorowe materiały, bezpieczne eksperymenty i mnóstwo swobody, dzięki której każde dziecko może tworzyć po swojemu.",
    cards: [
      ["🎨", "Kreatywnie", "bez nudy"],
      ["🧪", "Eksperymenty", "pełne efektów"],
      ["✨", "DIY", "własne dzieła"],
    ],
  },
  {
    id: "eventy",
    image: "/images/oferta/service-eventy.webp",
    caption: "Eventy rodzinne i firmowe",
    kicker: "Animacje na wyjątkowe okazje",
    title: ["Rozkręcamy eventy,", "które dzieci", "pamiętają na długo."],
    description:
      "Od pierwszego pomysłu po finał wydarzenia dbamy o dobrą energię, piękną oprawę i świetną zabawę bez chaosu.",
    cards: [
      ["🎭", "Autorski", "scenariusz"],
      ["🫧", "Atrakcje", "z efektem wow"],
      ["🤝", "Sprawdzony", "zespół"],
    ],
  },
  {
    id: "dmuchaniec",
    image: "/images/dmuchance/safari/main.webp",
    imagePosition: "right 48%",
    imageSize: "78% auto",
    caption: "Nowy dmuchaniec Safari",
    kicker: "Nowość w Nallipop",
    title: ["Nowy dmuchaniec", "Safari już", "dostępny!"],
    description:
      "Duża zjeżdżalnia, strefa skakania i tropikalna przygoda w jednym. Nowy dmuchaniec Safari jest już gotowy na urodziny, pikniki i rodzinne eventy.",
    cards: [
      ["🛝", "2 atrakcje", "w jednym"],
      ["🌴", "Motyw Safari", "pełen kolorów"],
      ["✓", "Bezpiecznie", "z montażem"],
    ],
  },
];

const services = [
  {
    id: "urodziny",
    title: "Urodziny",
    description: "Wyjątkowe przyjęcia pełne radości",
    image: "/images/oferta/service-urodziny.webp",
    badge: "Urodziny",
    heading: "Niezapomniane urodziny pełne uśmiechu i zabawy",
    copy: "Tworzymy wyjątkowe przyjęcia, podczas których każde dziecko czuje się ważne. Dopasowujemy program do wieku, zainteresowań i charakteru imprezy.",
    ages: ["3-5 lat", "6-8 lat", "9-12 lat"],
    motifs: ["Kraina Lodu", "Harry Potter", "Psi Patrol", "Jednorożce", "Minecraft", "Barbie"],
  },
  {
    id: "warsztaty",
    title: "Warsztaty kreatywne",
    description: "Kreatywność, zabawa i rozwój",
    image: "/images/oferta/service-warsztaty.webp",
    badge: "Warsztaty",
    heading: "Twórcze warsztaty, które wciągają dzieci od pierwszej minuty",
    copy: "Łączymy swobodną zabawę z rozwojem sprawczości, koncentracji i wyobraźni. Dzieci tworzą, eksperymentują i zabierają efekty pracy do domu.",
    ages: ["4-6 lat", "7-9 lat", "10-12 lat"],
    motifs: ["Slime", "Brokat", "Eksperymenty", "Eko prace", "Kolory", "DIY"],
  },
  {
    id: "festyny",
    title: "Festyny",
    description: "Animacje i atrakcje na świeżym powietrzu",
    image: "/images/oferta/service-festyny.webp",
    badge: "Festyny",
    heading: "Energetyczne festyny z atrakcjami dla dużych grup",
    copy: "Przygotowujemy płynny program dla szkół, osiedli i firm. Dbamy o tempo, bezpieczeństwo, kolejki do atrakcji i dobrą energię przez całe wydarzenie.",
    ages: ["Przedszkola", "Szkoły", "Rodziny"],
    motifs: ["Bańki XXL", "Dmuchańce", "Zabawy ruchowe", "Konkursy", "Malowanie", "Strefy tematyczne"],
  },
  {
    id: "wesela",
    title: "Wesela",
    description: "Zabawa dla dzieci, spokój dla rodziców",
    image: "/images/oferta/service-wesela.webp",
    badge: "Wesela",
    heading: "Dzieci bawią się świetnie, a dorośli spokojnie świętują",
    copy: "Organizujemy animacje weselne z wyczuciem rytmu uroczystości. Tworzymy bezpieczną strefę zabawy dopasowaną do wieku najmłodszych gości.",
    ages: ["3-6 lat", "7-10 lat", "Grupy mieszane"],
    motifs: ["Kącik kreatywny", "Mini disco", "Bańki", "Gry", "Piniaty", "Opieka animatora"],
  },
  {
    id: "eventy",
    title: "Bale i eventy",
    description: "Profesjonalna oprawa każdego wydarzenia",
    image: "/images/oferta/service-eventy.webp",
    badge: "Eventy",
    heading: "Kolorowa oprawa eventów rodzinnych i firmowych",
    copy: "Wchodzimy z gotowym planem, estetyką i zespołem animatorów. Program może być lekki, sceniczny, edukacyjny albo całkowicie tematyczny.",
    ages: ["Małe grupy", "Duże grupy", "Eventy premium"],
    motifs: ["Bale", "Pikniki", "Mikołajki", "Dzień dziecka", "Karnawał", "Otwarcia"],
  },
  {
    id: "polkolonie",
    title: "Półkolonie",
    description: "Niezapomniane półkolonie pełne przygód",
    image: "/images/oferta/service-polkolonie.webp",
    badge: "Półkolonie",
    heading: "Półkolonie z programem, który dzieci naprawdę pamiętają",
    copy: "Budujemy dni pełne aktywności, odpoczynku, kreatywności i relacji. Każdy blok ma swój rytm, cel i przestrzeń na spontaniczną zabawę.",
    ages: ["5-7 lat", "8-10 lat", "11-13 lat"],
    motifs: ["Przygoda", "Eksperymenty", "Sport", "Kreatywność", "Teren", "Integracja"],
  },
  {
    id: "dmuchance",
    title: "Dmuchańce",
    description: "Nowy dmuchaniec Safari już dostępny",
    image: "/images/dmuchance/safari/main.webp",
    imagePosition: "center 54%",
    badge: "Nowość · Dmuchaniec Safari",
    heading: "Tropikalna przygoda ze zjeżdżalnią i strefą skakania",
    copy: "Nowy dmuchaniec Safari to duża, efektowna atrakcja na urodziny, festyny, pikniki i wydarzenia rodzinne. Łączy wysoką zjeżdżalnię ze strefą do swobodnego skakania, a kolorowy motyw dżungli natychmiast przyciąga uwagę dzieci.",
    ages: ["3–12 lat", "Małe i duże grupy", "Plener i hala"],
    motifs: ["Safari", "Zjeżdżalnia", "Skakanie", "Dżungla", "Pikniki", "Urodziny"],
    quote: "Transportujemy, rozkładamy i przygotowujemy dmuchaniec do bezpiecznej zabawy — Ty wybierasz miejsce i termin.",
    footerNote: "Transport, profesjonalny montaż i zasady bezpiecznej zabawy",
    isNew: true,
  },
];

const galleryFallbackMedia = [
  {
    id: "dmuchaniec-safari-local",
    folderName: "dmuchaniec",
    src: "/images/dmuchance/safari/main.webp",
    type: "image",
    alt: "Nowy dmuchaniec Safari Nallipop",
  },
];

const attractions = [
  ["Malowanie twarzy", "/images/atrakcje/malowanie-twarzy.webp"],
  ["Tatuaże brokatowe", "/images/atrakcje/tatuaze-broaktowe.webp"],
  ["Bańki XXL", "/images/atrakcje/banki-xxl.webp"],
  ["Eksperymenty", "/images/atrakcje/eksperymenty.webp"],
  ["Suchy lód", "/images/atrakcje/suchy-lod.webp"],
  ["Piniaty", "/images/atrakcje/piniaty.webp"],
  ["Slime", "/images/atrakcje/slime.webp"],
  ["Gniotki", "/images/atrakcje/gniotki.webp"],
  ["Dmuchańce", "/images/atrakcje/dmuchance.webp"],
  ["Zamykanie w bańce", "/images/atrakcje/zamykanie-w-bance.webp"],
];

const processSteps = [
  {
    title: "Wysyłasz zapytanie",
    text: "Napisz do nas lub wypełnij formularz kontaktowy.",
    image: "/images/wspolpraca/wspolpraca1.webp",
  },
  {
    title: "Otrzymujesz ofertę",
    text: "Przygotujemy ofertę dopasowaną do Twoich potrzeb.",
    image: "/images/wspolpraca/wspolpraca2.webp",
  },
  {
    title: "Rezerwujesz termin",
    text: "Wybierasz dogodny termin i potwierdzasz rezerwację.",
    image: "/images/wspolpraca/wspolpraca3.webp",
  },
  {
    title: "My zajmujemy się resztą",
    text: "Przyjeżdżamy, organizujemy i tworzymy niezapomniane chwile!",
    image: "/images/wspolpraca/wspolpraca4.webp",
  },
];

const testimonials = [
  ["Cudowna ekipa! Dzieci zachwycone, urodziny minęły w najlepszej atmosferze. Polecam z całego serca!", "Anna K.", "Warszawa"],
  ["Warsztaty kreatywne na najwyższym poziomie. Profesjonalnie, z pasją i świetnym podejściem do dzieci.", "Magda P.", "Piaseczno"],
  ["Animatorzy pełni energii i pomysłów. Festyn w naszej szkole dzieciaki wspominają do dziś.", "Tomasz W.", "Pruszków"],
];

export default function HomePage() {
  const [activeMedia, setActiveMedia] = useState(null);
  const [activeHeroSlideIndex, setActiveHeroSlideIndex] = useState(0);
  const [galleryMedia, setGalleryMedia] = useState(galleryFallbackMedia);
  const [galleryStatus, setGalleryStatus] = useState("loading");
  const [footerFormStatus, setFooterFormStatus] = useState("idle");
  const [footerFormMessage, setFooterFormMessage] = useState("");
  const attractionsRailRef = useRef(null);
  const displayedGalleryMedia = galleryMedia;
  const activeHeroSlide = heroSlides[activeHeroSlideIndex];

  async function handleFooterContact(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setFooterFormStatus("sending");
    setFooterFormMessage("");

    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, topic: "Wiadomość ze strony głównej" }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Nie udało się wysłać wiadomości.");
      }

      form.reset();
      setFooterFormStatus("success");
      setFooterFormMessage("Wiadomość została wysłana. Odezwiemy się najszybciej, jak to możliwe.");
    } catch (error) {
      setFooterFormStatus("error");
      setFooterFormMessage(error.message);
    }
  }

  useEffect(() => {
    const rail = attractionsRailRef.current;

    if (!rail) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      rail.scrollLeft = Math.max(0, (rail.scrollWidth - rail.clientWidth) / 2);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function scrollAttractions(direction) {
    const rail = attractionsRailRef.current;

    if (!rail) {
      return;
    }

    rail.scrollBy({
      left: direction * Math.min(rail.clientWidth * 0.82, 720),
      behavior: "smooth",
    });
  }

  useEffect(() => {
    let alive = true;

    async function loadGallery() {
      try {
        const response = await fetch("/api/gallery-media");
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Nie udało się pobrać galerii.");
        const remoteMedia = data.media || [];
        const hasRemoteInflatableMedia = remoteMedia.some(({ folderName }) => folderName === "dmuchaniec");
        const media = hasRemoteInflatableMedia
          ? remoteMedia
          : [...galleryFallbackMedia, ...remoteMedia];

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

  return (
    <main className="home decorated-page">
      <PageDecorations variant="home" />
      <section className="hero-premium" id="start">
        <div className="container hero-premium__grid">
          <svg
            className="hero-premium__curve"
            viewBox="0 0 1340 650"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 0H585C677 90 589 164 663 242C739 322 559 415 619 506C655 561 588 617 532 650H0Z" />
          </svg>
          <motion.div className="hero-premium__content" {...fadeUp}>
            <AnimatePresence mode="wait">
              <motion.div
                className="hero-premium__slide-copy"
                key={`copy-${activeHeroSlide.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
              >
                <span className="section-kicker">{activeHeroSlide.kicker}</span>
                <h1>
                  {activeHeroSlide.title.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h1>
                <p>{activeHeroSlide.description}</p>
                <div className="hero-premium__actions">
                  <Link href="#oferta" className="button button--primary">
                    <Image
                      className="hero-premium__button-icon"
                      src="/images/nallipop-ikony-przyciski/zobacz-oferte-iskierka.png"
                      alt=""
                      width={24}
                      height={24}
                      aria-hidden="true"
                    />
                    Zobacz ofertę
                  </Link>
                  <Link href="/formularz-rezerwacji" className="button button--light">
                    <Image
                      className="hero-premium__button-icon"
                      src="/images/nallipop-ikony-przyciski/sprawdz-termin-kalendarz.png"
                      alt=""
                      width={24}
                      height={24}
                      aria-hidden="true"
                    />
                    Rezerwuj termin
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="hero-premium__controls" role="group" aria-label="Sterowanie slajdami">
              <button
                type="button"
                aria-label="Poprzedni slajd"
                onClick={() => setActiveHeroSlideIndex((index) => (index - 1 + heroSlides.length) % heroSlides.length)}
              >
                ‹
              </button>
              <div className="hero-premium__dots">
                {heroSlides.map((slide, index) => (
                  <button
                    className={index === activeHeroSlideIndex ? "is-active" : ""}
                    type="button"
                    key={slide.id}
                    aria-label={`Pokaż slajd ${index + 1}: ${slide.caption}`}
                    aria-current={index === activeHeroSlideIndex ? "true" : undefined}
                    onClick={() => setActiveHeroSlideIndex(index)}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Następny slajd"
                onClick={() => setActiveHeroSlideIndex((index) => (index + 1) % heroSlides.length)}
              >
                ›
              </button>
            </div>
          </motion.div>

          <motion.div className="hero-premium__visual" {...fadeUp} transition={{ duration: 0.75, delay: 0.1 }}>
            <AnimatePresence mode="wait">
              <motion.div
                className="image-fill image-fill--hero"
                key={activeHeroSlide.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              >
                <Image
                  src={activeHeroSlide.image}
                  alt={activeHeroSlide.caption}
                  fill
                  preload={activeHeroSlideIndex === 0}
                  sizes="(max-width: 1040px) calc(100vw - 84px), 56vw"
                  style={{
                    objectFit: activeHeroSlide.imageSize === "78% auto" ? "contain" : "cover",
                    objectPosition: activeHeroSlide.imagePosition || "center",
                  }}
                />
              </motion.div>
            </AnimatePresence>
            <div className="hero-premium__caption">{activeHeroSlide.caption}</div>
            <div className="hero-premium__badges">
              {activeHeroSlide.cards.map(([icon, title, text]) => (
                <motion.div
                  className="hero-premium__badge"
                  key={`${activeHeroSlide.id}-${title}`}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <span className="hero-premium__badge-icon" aria-hidden="true">{icon}</span>
                  <span className="hero-premium__badge-copy">
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <ConsentAwareFacebookPosts />

      <motion.section className="process section" id="wspolpraca" {...fadeUp}>
        <div className="container">
          <h2>Jak wygląda współpraca?</h2>
          <div className="process__steps">
            {processSteps.map((step, index) => (
              <div className="process__step" key={step.title}>
                <div className="process__icon" style={{ backgroundImage: `url('${step.image}')` }} aria-hidden="true" />
                <div className="process__copy">
                  <span>{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="services section" id="oferta">
        <div className="container">
          <motion.div className="section-heading" {...fadeUp}>
            <span className="section-kicker">Nasza oferta</span>
            <h2>Kolorowe wydarzenia dopasowane do wieku dzieci</h2>
          </motion.div>
          <div className="services__grid">
            {services.map((service) => (
              <motion.article className="service-card" key={service.id} {...fadeUp}>
                {service.isNew && <span className="service-card__new">Nowość</span>}
                <Link
                  className="service-card__button"
                  href={`/oferta?oferta=${service.id}${service.id === "dmuchance" ? "&dmuchaniec=safari" : ""}#opis-oferty`}
                  aria-label={`Zobacz szczegóły oferty: ${service.title}`}
                >
                  <span className="image-fill" style={{ backgroundImage: `url('${service.image}')` }} />
                </Link>
                <div className="service-card__content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span>Zobacz →</span>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>

      <section className="inflatable-picker-section" id="dmuchance">
        <div className="container">
          <motion.div className="inflatable-picker" {...fadeUp}>
            <div className="inflatable-picker__heading">
              <span className="section-kicker">Dostępne dmuchańce</span>
              <h2>Wybierz dmuchaniec na swoje wydarzenie</h2>
              <p>Wszystkie poniższe modele są dostępne do rezerwacji. Wybierz dmuchaniec, aby zobaczyć jego pełny opis i szczegóły oferty.</p>
            </div>

            <div className="inflatable-picker__grid">
              {inflatableItems.map((inflatable) => (
                <Link
                  className="inflatable-option"
                  href={`/oferta?oferta=dmuchance&dmuchaniec=${inflatable.id}#opis-oferty`}
                  key={inflatable.id}
                  aria-label={`Zobacz szczegóły: ${inflatable.name}`}
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
                    <em>Zobacz szczegóły →</em>
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section className="wide-banner" {...fadeUp}>
        <div className="container">
          <div className="wide-banner__inner">
            <div>
              <span>Ponad</span>
              <strong>500</strong>
              <p>zorganizowanych wydarzeń dla dzieci</p>
            </div>
            <Link href="/kontakt" className="button button--light">
              Poznaj Nallipop
            </Link>
          </div>
        </div>
      </motion.section>

      <section className="gallery section" id="galeria">
        <div className="container">
          <motion.div className="section-heading" {...fadeUp}>
            <span className="section-kicker">Galeria</span>
            <h2>Zobacz, jak się bawimy</h2>
          </motion.div>
          <div className="gallery__masonry">
            {displayedGalleryMedia.map((media) => (
              <button
                className={`gallery__item gallery__item--${media.type}`}
                key={media.id}
                onClick={() => setActiveMedia(media)}
                type="button"
                aria-label={media.type === "video" ? "Odtwórz film z dmuchańcem" : "Powiększ zdjęcie"}
              >
                {media.type === "video" ? (
                  <span className="gallery__video-placeholder"><b>Film</b></span>
                ) : (
                  <Image src={media.src} alt={media.alt} fill sizes="(max-width: 700px) calc(100vw - 28px), 25vw" />
                )}
                {media.type === "video" && <i className="gallery__play" aria-hidden="true">▶</i>}
              </button>
            ))}
          </div>
          {galleryStatus === "loading" && <p className="gallery__status">Ładuję zdjęcia i filmy z galerii...</p>}
          {galleryStatus === "empty" && <p className="gallery__status">Dodaj multimedia do folderów <strong>gallery/</strong> i <strong>dmuchaniec/</strong> w Firebase Storage.</p>}
          {galleryStatus === "error" && <p className="gallery__status">Nie udało się pobrać wszystkich multimediów z Firebase. Sprawdź reguły Storage dla folderów <strong>gallery/</strong> i <strong>dmuchaniec/</strong>.</p>}
        </div>
      </section>

      <section className="attractions section" id="atrakcje">
        <div className="container">
          <motion.div className="section-heading" {...fadeUp}>
            <span className="section-kicker">Nasze atrakcje</span>
            <h2>Przesuwaj i wybieraj ulubione atrakcje</h2>
          </motion.div>
          <div className="attractions__slider">
            <button className="attractions__arrow attractions__arrow--prev" type="button" onClick={() => scrollAttractions(-1)} aria-label="Poprzednie atrakcje">
              ‹
            </button>
            <div className="attractions__rail" ref={attractionsRailRef}>
              {attractions.map(([title, image]) => (
                <article className="attraction-card" key={title}>
                  <Image src={image} alt="" width={240} height={263} sizes="192px" />
                  <h3>{title}</h3>
                </article>
              ))}
            </div>
            <button className="attractions__arrow attractions__arrow--next" type="button" onClick={() => scrollAttractions(1)} aria-label="Następne atrakcje">
              ›
            </button>
          </div>
        </div>
      </section>


      <section className="testimonials section" id="opinie">
        <div className="container">
          <motion.div className="section-heading" {...fadeUp}>
            <span className="section-kicker">Opinie rodziców</span>
            <h2>Zaufanie budowane spokojem, energią i profesjonalizmem</h2>
          </motion.div>
          <div className="testimonials__grid">
            {testimonials.map(([quote, name, city]) => (
              <motion.article className="testimonial-card" key={name} {...fadeUp}>
                <div className="testimonial-card__stars">★★★★★</div>
                <p>“{quote}”</p>
                <strong>{name}</strong>
                <span>{city}</span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <motion.section className="founder section" id="o-nas" {...fadeUp}>
        <div className="container founder__grid">
          <div className="image-fill image-fill--founder">
            <Image src="/images/natalia-founder.webp" alt="Natalia, założycielka Nallipop" fill sizes="(max-width: 1040px) 100vw, 42vw" />
          </div>
          <div className="founder__content">
            <span className="section-kicker">O Nallipop</span>
            <h2>Poznaj założycielkę Nallipop</h2>
            <p>
              Pedagog specjalny, terapeutka i animatorka. Dzięki doświadczeniu w
              pracy z dziećmi każda zabawa jest dopasowana do wieku i potrzeb
              uczestników.
            </p>
            <p>To buduje ogromne zaufanie i daje rodzicom spokojną głowę.</p>
          </div>
        </div>
      </motion.section>

      <footer className="footer" id="kontakt">
        <div className="container footer__grid">
          <div>
            <Link href="/" className="footer__logo" aria-label="Nallipop — strona główna">
              <BrandLogo />
            </Link>
            <p>Animacje, warsztaty i wydarzenia dla dzieci w Warszawie i okolicach.</p>
            <SocialLinks />
          </div>
          <div>
            <h3>Kontakt</h3>
            <p>795 103 108</p>
            <p>animacje@nallipop.pl</p>
            <p>Warszawa i okolice</p>
          </div>
          <form className="footer__form" onSubmit={handleFooterContact}>
            <h3>Napisz do nas</h3>
            <input name="name" placeholder="Imię i nazwisko" autoComplete="name" required />
            <input name="email" placeholder="E-mail" type="email" autoComplete="email" required />
            <textarea name="message" placeholder="Wiadomość" required />
            <label className="footer__consent">
              <input name="consent" type="checkbox" required />
              <span>Zapoznałam/-em się z <Link href="/regulamin" target="_blank">Regulaminem</Link> oraz <Link href="/polityka-prywatnosci" target="_blank">Polityką prywatności</Link>. Rozumiem, że wysłanie formularza jest jedynie zapytaniem i nie oznacza rezerwacji ani zawarcia umowy. *</span>
            </label>
            <button type="submit" disabled={footerFormStatus === "sending"}>
              {footerFormStatus === "sending" ? "Wysyłanie..." : "Wyślij wiadomość"}
            </button>
            <p className="footer__privacy-note">Administratorem danych jest KamaLogic Kamil Tosnowiec. Dane służą do odpowiedzi na zapytanie. Szczegóły w Polityce prywatności.</p>
            {footerFormMessage && (
              <p className={`footer__form-message is-${footerFormStatus}`} role="status">
                {footerFormMessage}
              </p>
            )}
          </form>
          <div className="footer__map">
          </div>
        </div>
      </footer>

      {activeMedia && (
        <div className="lightbox" onClick={() => setActiveMedia(null)}>
          <button type="button" aria-label="Zamknij">×</button>
          {activeMedia.type === "video" ? (
            <video src={activeMedia.src} controls autoPlay playsInline onClick={(event) => event.stopPropagation()} />
          ) : (
            <img src={activeMedia.src} alt={activeMedia.alt} onClick={(event) => event.stopPropagation()} />
          )}
        </div>
      )}
    </main>
  );
}

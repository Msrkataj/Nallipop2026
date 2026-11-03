"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles, faCalendarDays, faPhone } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import { inflatableItems } from "@/data/inflatables";
import { autumnPackage, halloweenPackage } from "@/data/seasonal-packages";
import { creativeLab } from "@/data/creative-lab";
import { pumpkinWorkshops } from "@/data/pumpkin-workshops";
import SocialLinks from "@/components/SocialLinks";
import ConsentAwareFacebookPosts from "@/components/ConsentAwareFacebookPosts";
import SundayPromo from "@/components/SundayPromo";
import BrandLogo from "@/components/BrandLogo";
import PageDecorations from "@/components/PageDecorations";
import OccasionPlanner from "@/components/OccasionPlanner";
import NitrogenTeaser from "@/components/NitrogenTeaser";
import PhotoboothHomeBanner from "@/components/PhotoboothHomeBanner";
import { reportContactFormConversion } from "@/lib/google-ads";
import "@/styles/hero.scss";
import "@/styles/facebook-posts.scss";
import "@/styles/sunday-promo.scss";

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: 0.65, ease: "easeOut" },
};

const heroSlides = [
  {
    id: "animacje-w-kuli",
    href: autumnPackage.path,
    image: "/images/hero-animacje-w-kuli.webp",
    photoPanel: true,
    imagePosition: "center center",
    caption: "Jesień czy Halloween? Animacje i warsztaty w kuli",
    kicker: "Wyjątkowy pakiet tylko do 31 października",
    title: ["Jesień czy", "Halloween?", "Wybierz swój klimat!"],
    description: "Dwa magiczne światy, jedna niezwykła kula. Wybierz jesienną lub halloweenową aranżację i zaproś dzieci na tematyczne warsztaty w środku. Dwie godziny animacji, tworzenia i wspólnej zabawy.",
    actions: [
      { href: autumnPackage.path, label: "Odkryj oba warianty", icon: faCalendarDays, tone: "primary" },
      { href: "tel:+48795103108", label: "Zadzwoń do nas", icon: faPhone, tone: "light" },
    ],
    cards: [
      ["✨", "Jesień lub Halloween", "wybierz swój klimat"],
      ["🎨", "Animacje i warsztaty", "w jednym pakiecie"],
      ["🍂", "Wyjątkowa okazja", "tylko do 31 października"],
    ],
  },
  {
    id: "mikolaj",
    href: "/mikolaj",
    image: "/images/hero-mikolaj.webp",
    photoPanel: true,
    imagePosition: "54% center",
    caption: "Święty Mikołaj podczas spotkania z dzieckiem",
    kicker: "Świąteczne wizyty z Nallipop",
    title: ["Ruszyły zapisy!", "Mikołaj i elf", "czekają na Was."],
    description: "Zaproś Świętego Mikołaja, wybierz wizytę z Elfem lub świąteczne warsztaty z Elfem. Odkryj trzy sposoby na spotkanie pełne uśmiechów, zabawy i grudniowej magii.",
    actions: [
      { href: "/mikolaj", label: "Poznaj świąteczną ofertę", icon: faCalendarDays, tone: "primary" },
      { href: "tel:+48795103108", label: "Zadzwoń do nas", icon: faPhone, tone: "light" },
    ],
    cards: [
      ["🎅", "Święty Mikołaj", "na Waszym wydarzeniu"],
      ["✨", "Elf", "dołącza do wizyty"],
      ["🎨", "Warsztaty z Elfem", "świąteczne tworzenie"],
    ],
  },
  {
    id: "malowanie-dyni",
    href: pumpkinWorkshops.path,
    image: pumpkinWorkshops.image,
    photoPanel: true,
    imagePosition: "center center",
    caption: "Jesienne warsztaty malowania dyni dla dzieci",
    kicker: "Jesień pełna kolorów z Nallipop",
    title: ["Malowanie dyni", "Małe ręce,", "wielkie pomysły!"],
    description: "Zapraszamy na jesienne warsztaty malowania dyni! Dzieci wybierają kolory, tworzą własne wzory i zamieniają dynie w małe dzieła sztuki. Twórcza zabawa dla przedszkoli, szkół i na rodzinne wydarzenia.",
    actions: [
      { href: pumpkinWorkshops.path, label: "Poznaj warsztaty", icon: faWandMagicSparkles, tone: "primary" },
      { href: pumpkinWorkshops.reservationHref, label: "Zapytaj o termin", icon: faCalendarDays, tone: "light" },
    ],
    cards: [
      ["🎃", "Malowanie dyni", "jesienne warsztaty"],
      ["🎨", "Własne pomysły", "kolory i wyobraźnia"],
      ["🍂", "Wspólne tworzenie", "radość dla dzieci"],
    ],
  },
  {
    id: "przedszkola",
    image: "/images/hero-przedszkole.webp",
    photoPanel: true,
    imagePosition: "60% center",
    caption: "Warsztaty i animacje dla przedszkoli",
    kicker: "Warsztaty i animacje dla przedszkoli",
    title: ["Przyjeżdżamy", "do przedszkola", "z zabawą!"],
    description: "Prowadzimy zajęcia dla przedszkolaków w Waszej placówce. Dzieci biorą udział w eksperymentach z suchym lodem, pracach plastycznych i wspólnych zabawach. Program dopasowujemy do wieku grupy.",
    actions: [
      { href: "/oferta?oferta=warsztaty#opis-oferty", label: "Zobacz zajęcia", icon: faWandMagicSparkles, tone: "primary" },
      { href: "/formularz-rezerwacji", label: "Zapytaj o termin", icon: faCalendarDays, tone: "light" },
    ],
    cards: [
      ["🧪", "Eksperymenty", "z suchym lodem"],
      ["🎨", "Prace plastyczne", "tworzone przez dzieci"],
      ["✨", "Z dojazdem", "do przedszkola"],
    ],
  },
  {
    id: "wspomnienia",
    image: "/images/hero-kids.webp",
    caption: "Porozmawiajmy o Waszej imprezie",
    kicker: "Masz pytania? Jesteśmy pod telefonem",
    title: ["Zadzwoń i dopytaj", "o najlepszą opcję", "dla Waszej imprezy."],
    description:
      "Zadzwoń pod 795 103 108. Podpowiemy, jakie animacje i atrakcje najlepiej sprawdzą się w Waszym terminie, miejscu i budżecie.",
    actions: [
      { href: "tel:+48795103108", label: "Zadzwoń i dopytaj", icon: faPhone, tone: "primary" },
      {
        href: "#oferta",
        label: "Zobacz ofertę",
        icon: faWandMagicSparkles,
        tone: "light",
      },
    ],
    cards: [
      ["☎", "795 103 108", "zadzwoń teraz"],
      ["💬", "Doradzimy", "bez zobowiązań"],
      ["⌖", "Warszawa", "i okolice"],
    ],
  },
  {
    id: "dmuchaniec",
    image: "/images/dmuchance/safari/main.webp",
    photoPanel: true,
    imagePosition: "center 70%",
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
    id: "kreatywne-laboratorium",
    title: creativeLab.title,
    description: "Zajęcia z Natalią dla dzieci 5–10 lat w Pruszkowie",
    image: creativeLab.image,
    href: creativeLab.path,
  },
  {
    id: "halloween",
    title: "Halloween w kuli",
    description: "Tematyczne warsztaty i animacje wśród duszków i dyń",
    image: halloweenPackage.image,
    href: halloweenPackage.path,
  },
  {
    id: "mikolaj",
    title: "Mikołaj i Elf",
    description: "Wizyty Mikołaja i świąteczne warsztaty z Elfem",
    image: "/images/mikolaj/mikolaj-z-elfem.webp",
    imagePosition: "center 58%",
    href: "/mikolaj",
  },
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
    motifs: ["Glutek", "Brokat", "Eksperymenty", "Eko prace", "Kolory", "DIY"],
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
  ["Fotobudka", "/images/fotobudka/lustro-urodziny.webp", "/fotobudka"],
  ["Strefa malucha", "/images/strefa-malucha/strefa.webp", "/strefa-malucha"],
  ["Ciekły azot", "/images/ciekly-azot/pokaz.webp", "/ciekly-azot"],
  ["Malowanie dyni", pumpkinWorkshops.image, pumpkinWorkshops.path],
  ["Malowanie twarzy", "/images/atrakcje/malowanie-twarzy.webp"],
  ["Tatuaże brokatowe", "/images/atrakcje/tatuaze-broaktowe.webp"],
  ["Bańki XXL", "/images/atrakcje/banki-xxl.webp"],
  ["Eksperymenty", "/images/atrakcje/eksperymenty.webp"],
  ["Suchy lód", "/images/atrakcje/suchy-lod.webp"],
  ["Piniaty", "/images/atrakcje/piniaty.webp"],
  ["Glutek", "/images/atrakcje/slime.webp"],
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
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [activeMedia, setActiveMedia] = useState(null);
  const [activeHeroSlideIndex, setActiveHeroSlideIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [sphereHalloween, setSphereHalloween] = useState(false);
  const [galleryMedia, setGalleryMedia] = useState(galleryFallbackMedia);
  const [galleryStatus, setGalleryStatus] = useState("loading");
  const [footerFormStatus, setFooterFormStatus] = useState("idle");
  const [footerFormMessage, setFooterFormMessage] = useState("");
  const attractionsRailRef = useRef(null);
  const displayedGalleryMedia = galleryMedia;
  const isSphereSlide = heroSlides[activeHeroSlideIndex].id === "animacje-w-kuli";
  const sphereVariant = sphereHalloween ? halloweenPackage : autumnPackage;
  const activeHeroSlide = isSphereSlide ? {
    ...heroSlides[activeHeroSlideIndex],
    image: sphereVariant.image,
    href: sphereVariant.path,
    caption: sphereVariant.lead,
    description: sphereHalloween
      ? "Przyjazne duszki, nietoperze i rozświetlone dynie. Zaproś dzieci na tematyczne warsztaty Halloween wewnątrz kuli. Dwie godziny animacji, tworzenia i wspólnej zabawy."
      : "Złote liście, ciepłe światełka i jesienne zachwyty. Zaproś dzieci na tematyczne warsztaty wewnątrz kuli. Dwie godziny animacji, tworzenia i wspólnej zabawy.",
    actions: [{ href: sphereVariant.path, label: sphereHalloween ? "Odkryj kulę Halloween" : "Odkryj jesienną kulę", icon: faCalendarDays, tone: "primary" }, heroSlides[0].actions[1]],
    cards: [[sphereHalloween ? "👻" : "🍂", sphereVariant.label, "animacje i warsztaty"], ...heroSlides[0].cards.slice(1)],
  } : heroSlides[activeHeroSlideIndex];
  const heroActions = activeHeroSlide.actions || [
    {
      href: "#oferta",
      label: "Zobacz ofertę",
      icon: faWandMagicSparkles,
      tone: "primary",
    },
    {
      href: "/formularz-rezerwacji",
      label: "Rezerwuj termin",
      icon: faCalendarDays,
      tone: "light",
    },
  ];

  useEffect(() => {
    if (heroPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      if (isSphereSlide && !sphereHalloween) {
        setSphereHalloween(true);
      } else {
        setSphereHalloween(false);
        setActiveHeroSlideIndex((index) => (index + 1) % heroSlides.length);
      }
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [activeHeroSlideIndex, heroPaused, isSphereSlide, sphereHalloween]);

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
      reportContactFormConversion();
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
        const response = await fetch("/api/gallery-media?limit=12");
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Nie udało się pobrać galerii.");
        const remoteMedia = data.media || [];
        const media = remoteMedia;

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
        <div className="hero-mobile">
          <video
            className="hero-mobile__video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero-kids.webp"
            aria-hidden="true"
            tabIndex={-1}
            disablePictureInPicture
          >
            <source src="/main_video.mp4" type="video/mp4" media="(max-width: 700px)" />
          </video>

          <div className="hero-mobile__veil" aria-hidden="true" />
          <div className="hero-mobile__glow hero-mobile__glow--one" aria-hidden="true" />
          <div className="hero-mobile__glow hero-mobile__glow--two" aria-hidden="true" />

          <motion.div
            className="hero-mobile__topline"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
          >
            <span className="hero-mobile__brand-pill">
              <span className="hero-mobile__brand-spark" aria-hidden="true">✦</span>
              Nallipop moments
            </span>
            <span className="hero-mobile__location">Warszawa i okolice</span>
          </motion.div>

          <motion.div
            className="hero-mobile__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero-mobile__kicker">
              <span aria-hidden="true" />
              Animacje dla dzieci z dojazdem
            </span>
            <h1>
              Dzieci mają frajdę.
              <strong>Ty spokojną głowę.</strong>
            </h1>
            <p>
              Urodziny, wesela i warsztaty. Przywieziemy pomysły, atrakcje i energię —
              dopasowane do Waszej okazji.
            </p>
            <div className="hero-mobile__actions">
              <Link href="/formularz-rezerwacji" className="hero-mobile__primary-action">
                Zapytaj o termin i cenę
                <span aria-hidden="true">↗</span>
              </Link>
              <button type="button" className="hero-mobile__secondary-action" aria-haspopup="dialog" aria-controls="occasion-planner" aria-expanded={plannerOpen} onClick={() => setPlannerOpen(true)}>
                <FontAwesomeIcon icon={faWandMagicSparkles} aria-hidden="true" />
                Dobierz zabawę do okazji
              </button>
            </div>
            <span className="hero-mobile__reassurance">Bez zobowiązań — porozmawiajmy o Waszej imprezie.</span>
          </motion.div>

          <Link className="hero-mobile__scroll" href="#aktualnosci" aria-label="Przejdź do aktualności">
            <span>Odkryj więcej</span>
            <i aria-hidden="true" />
          </Link>
        </div>

        <div className="hero-mobile-promos">
          <Link href="tel:+48795103108" className="hero-mobile__offer">
            <strong>Dopytaj o rabat w październiku</strong>
            <span>Zadzwoń i zapytaj o szczegóły <span aria-hidden="true">↗</span></span>
          </Link>
          <SundayPromo />
        </div>

        <div className="container hero-premium__grid" id="aktualnosci">
          <div className="hero-premium__mobile-news-intro">
            <span>Co nowego w Nallipop</span>
            <h2>Aktualności i inspiracje</h2>
          </div>
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
                key={`copy-${activeHeroSlide.image}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <span className="section-kicker">{activeHeroSlide.kicker}</span>
                <h1>
                  {activeHeroSlide.href ? <Link href={activeHeroSlide.href}>{activeHeroSlide.title.map((line) => <span key={line}>{line}</span>)}</Link> : activeHeroSlide.title.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h1>
                <p>{activeHeroSlide.description}</p>
                <div className="hero-premium__actions">
                  {heroActions.map((action) => (
                    <Link
                      href={action.href}
                      className={`button button--${action.tone}`}
                      key={action.href}
                    >
                      <span className="hero-premium__button-icon" aria-hidden="true">
                        <FontAwesomeIcon icon={action.icon} />
                      </span>
                      {action.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            {isSphereSlide && <div className="hero-premium__season-switch" role="group" aria-label="Wybierz klimat kuli na slajdzie">
              <span>Jedna kula. Dwa światy.</span>
              <div>{[[false, "Jesień", "🍂"], [true, "Halloween", "👻"]].map(([halloween, label, icon]) => <button type="button" key={label} aria-pressed={sphereHalloween === halloween} onClick={() => { setSphereHalloween(halloween); setHeroPaused(true); }}><span aria-hidden="true">{icon}</span> {label}</button>)}</div>
            </div>}
            <SundayPromo desktop />
            <div className="hero-premium__controls" role="group" aria-label="Sterowanie slajdami">
              <button type="button" onClick={() => setHeroPaused((paused) => !paused)} aria-label={heroPaused ? "Wznów zmianę slajdów" : "Wstrzymaj zmianę slajdów"} aria-pressed={heroPaused}>
                <span aria-hidden="true">{heroPaused ? "▶" : "Ⅱ"}</span>
              </button>
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
            {activeHeroSlide.href && <Link className="hero-premium__slide-link" href={activeHeroSlide.href} aria-label={`Poznaj pakiet: ${activeHeroSlide.caption}`} />}
            <AnimatePresence initial={false}>
              <motion.div
                className={`image-fill image-fill--hero${activeHeroSlide.photoPanel ? " image-fill--photo-panel" : ""}`}
                key={activeHeroSlide.image}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Image
                  src={activeHeroSlide.image}
                  alt={activeHeroSlide.caption}
                  fill
                  preload={activeHeroSlideIndex === 0}
                  sizes="(max-width: 1040px) calc(100vw - 84px), 56vw"
                  style={{
                    objectFit: "cover",
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

      <NitrogenTeaser />
      <PhotoboothHomeBanner />

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
                  href={service.href || (service.id === "dmuchance" ? "/dmuchance" : `/oferta?oferta=${service.id}#opis-oferty`)}
                  aria-label={`Zobacz szczegóły oferty: ${service.title}`}
                >
                  <span className="image-fill" style={{ backgroundImage: `url('${service.image}')`, backgroundPosition: service.imagePosition || "center" }} />
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
                  href={`/dmuchance?dmuchaniec=${inflatable.id}#opis-oferty`}
                  key={inflatable.id}
                  aria-label={`Zobacz szczegóły: ${inflatable.name}`}
                >
                  <span className="inflatable-option__image">
                    <Image
                      src={inflatable.image}
                      alt={inflatable.name}
                      fill
                      sizes="(max-width: 760px) calc(100vw - 64px), 380px"
                    />
                  </span>
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
                  <Image src={media.thumbnail || media.src} alt={media.alt} fill unoptimized={Boolean(media.thumbnail)} sizes="(max-width: 700px) calc(100vw - 28px), 25vw" />
                )}
                {media.type === "video" && <i className="gallery__play" aria-hidden="true">▶</i>}
              </button>
            ))}
          </div>
          <div className="gallery-home-link"><Link href="/galeria" className="button button--light">Zobacz całą galerię →</Link></div>
          {galleryStatus === "loading" && <p className="gallery__status">Ładuję zdjęcia i filmy z galerii...</p>}
          {galleryStatus === "empty" && <p className="gallery__status">Nowe zdjęcia pojawią się tutaj wkrótce.</p>}
          {galleryStatus === "error" && <p className="gallery__status">Galeria jest chwilowo niedostępna. Spróbuj ponownie za chwilę.</p>}
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
              {attractions.map(([title, image, href]) => href ? (
                <Link className="attraction-card" key={title} href={href}>
                  <Image src={image} alt="" width={240} height={263} sizes="192px" />
                  <h3>{title} <span aria-hidden="true">→</span></h3>
                </Link>
              ) : (
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

      <OccasionPlanner open={plannerOpen} onOpenChange={setPlannerOpen} />

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

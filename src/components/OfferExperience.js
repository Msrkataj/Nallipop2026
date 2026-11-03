"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { inflatableItems } from "@/data/inflatables";
import { halloweenPackage } from "@/data/seasonal-packages";
import SocialLinks from "@/components/SocialLinks";
import BrandLogo from "@/components/BrandLogo";
import PageDecorations from "@/components/PageDecorations";
import InflatableDetail from "@/components/InflatableDetail";
import ServiceOfferDetail from "@/components/ServiceOfferDetail";
import InflatableHero from "@/components/InflatableHero";

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
    searchCopy:
      "Szukasz animatora na urodziny dziecka w Warszawie lub okolicach? Przygotujemy gry ruchowe, konkursy, mini disco i zabawy integracyjne dopasowane do wieku uczestników, liczby dzieci, miejsca oraz motywu przewodniego przyjęcia.",
    seoTitle: "Animator na urodziny dziecka w Warszawie",
    benefits: ["program dopasowany do wieku", "gry, konkursy i mini disco", "animacje w domu, sali lub plenerze"],
    extras: ["malowanie twarzy", "tatuaże brokatowe", "bańki XXL", "piniata", "modelowanie balonów", "dmuchaniec"],
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
    searchCopy:
      "Prowadzimy warsztaty kreatywne dla dzieci w Warszawie i okolicach — na urodzinach, w szkołach, przedszkolach, domach kultury oraz podczas eventów. Zapewniamy materiały, instruktaż animatora i projekt, który każde dziecko może zabrać do domu.",
    seoTitle: "Warsztaty kreatywne dla dzieci w Warszawie",
    benefits: ["wszystkie materiały w cenie", "temat dobrany do wieku grupy", "własnoręczna pamiątka dla dziecka"],
    extras: ["warsztaty z masą sensoryczną", "eksperymenty", "suchy lód", "malowanie toreb", "gniotki DIY", "magnesy i breloczki"],
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
    searchCopy:
      "Organizujemy animacje na festyny, pikniki rodzinne, dni dziecka i imprezy plenerowe w Warszawie oraz okolicznych miejscowościach. Program może obejmować kilka równoległych stanowisk, dzięki czemu sprawnie obsługujemy także większe grupy uczestników.",
    seoTitle: "Animacje na festyny i pikniki rodzinne",
    benefits: ["program dla małych i dużych grup", "sprawna organizacja stanowisk", "atrakcje plenerowe i sceniczne"],
    extras: ["dmuchańce", "bańki XXL", "malowanie twarzy", "tatuaże brokatowe", "modelowanie balonów", "konkursy rodzinne"],
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
    searchCopy:
      "Animator dla dzieci na wesele prowadzi zabawy w rytmie dopasowanym do planu uroczystości. Możemy przygotować spokojny kącik kreatywny, aktywne gry, mini disco i wyjątkowy finał, aby najmłodsi goście dobrze się bawili przez cały wieczór.",
    seoTitle: "Animator dla dzieci na wesele",
    benefits: ["opieka i zabawa podczas przyjęcia", "program dla grup w różnym wieku", "spokojna strefa oraz aktywne animacje"],
    extras: ["malowanie twarzy", "modelowanie balonów", "bańki mydlane", "piniata", "kącik plastyczny", "mini disco"],
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
    searchCopy:
      "Realizujemy animacje dla dzieci na eventy firmowe, bale karnawałowe, mikołajki, otwarcia lokali i rodzinne wydarzenia specjalne. Scenariusz, liczba animatorów oraz stanowiska atrakcji są dobierane do miejsca, harmonogramu i przewidywanej frekwencji.",
    seoTitle: "Animacje dla dzieci na eventy firmowe i bale",
    benefits: ["autorski scenariusz wydarzenia", "zespół animatorów i materiały", "program dopasowany do liczby gości"],
    extras: ["strefa kreatywna", "pokazy i eksperymenty", "piniaty", "zamykanie w bańce", "dmuchańce", "strefa zdjęć"],
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
    searchCopy:
      "Przygotowujemy pojedyncze bloki zajęć i rozbudowane programy animacyjne na półkolonie w Warszawie i okolicach. Łączymy warsztaty, eksperymenty, zabawy terenowe i integrację, aby każdy dzień miał inny temat oraz angażował całą grupę.",
    seoTitle: "Zajęcia i animacje na półkolonie",
    benefits: ["bloki tematyczne na jeden lub wiele dni", "połączenie ruchu i kreatywności", "program dla szkół i organizatorów"],
    extras: ["eksperymenty", "warsztaty z masą sensoryczną", "gry terenowe", "zabawy sportowe", "bańki XXL", "kreatywne DIY"],
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
    searchCopy:
      "Oferujemy wynajem dmuchańców dla dzieci w Warszawie i okolicach wraz z transportem, profesjonalnym montażem oraz przygotowaniem urządzenia do bezpiecznej zabawy. Dobierz model do wieku dzieci, dostępnego miejsca i charakteru imprezy.",
    seoTitle: "Wynajem dmuchańców dla dzieci w Warszawie",
    benefits: ["transport i profesjonalny montaż", "modele na urodziny i duże eventy", "pomoc w wyborze odpowiedniego dmuchańca"],
    extras: ["animatorzy", "bańki XXL", "malowanie twarzy", "tatuaże brokatowe", "modelowanie balonów", "piniata"],
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

const seasonalOffers = [
  {
    id: "fotobudka",
    title: "Fotobudka",
    short: "Na wesela, urodziny i wiele innych wydarzeń",
    image: "/images/fotobudka/lustro-wesele.webp",
    icon: "/images/fotobudka/aparat.svg",
    href: "/fotobudka",
    seoTitle: "Fotobudka na wesela, komunie i inne wydarzenia",
    searchCopy: "Fotobudka w Warszawie i okolicach na wesela, komunie, imprezy firmowe i wiele innych wydarzeń. Siedem scenografii to inspiracje — oprawę dopasujemy także do Twojego pomysłu.",
    benefits: ["siedem pomysłów na scenografię", "dla dzieci i dorosłych", "oprawa dopasowana do okazji"],
  },
  {
    id: "strefa-malucha",
    title: "Strefa malucha",
    short: "Własny kawałek imprezy dla dzieci 0–3 lata",
    image: "/images/strefa-malucha/strefa.webp",
    icon: "/images/atrakcje/atrakcje_ikony/najmlodszych.png",
    href: "/strefa-malucha",
    seoTitle: "Strefa malucha 0–3 lata w Warszawie i okolicach",
    searchCopy: "Suchy basen, miękkie klocki, maty i mała zjeżdżalnia jako dodatkowa atrakcja na rodzinne wydarzenie. Poznaj Strefę malucha i zapytaj o zestaw dla Was.",
    benefits: ["dla dzieci 0–3 lata", "zabawa z opiekunem", "zestaw dopasowany do miejsca"],
  },
  {
    id: "ciekly-azot",
    title: "Ciekły azot",
    short: "Widowiskowy pokaz i naukowe WOW dla dzieci",
    image: "/images/ciekly-azot/pokaz.webp",
    icon: "/images/atrakcje/atrakcje_ikony/warsztaty.png",
    href: "/ciekly-azot",
    seoTitle: "Pokaz ciekłego azotu w Warszawie i okolicach",
    searchCopy: "Mgła, mroźne przemiany i nauka przez obserwację. Poznaj pokaz ciekłego azotu na urodziny oraz do szkół i przedszkoli.",
    benefits: ["pokaz z prowadzącym", "program dopasowany do grupy", "na urodziny i do placówek"],
  },
  {
    id: "kreatywne-laboratorium",
    title: "Kreatywne laboratorium",
    short: "Zajęcia z Natalią dla dzieci 5–10 lat w Pruszkowie",
    image: "/images/kreatywne-laboratorium/lampiony.webp",
    icon: "/images/atrakcje/atrakcje_ikony/warsztaty.png",
    href: "/kreatywne-laboratorium",
    seoTitle: "Kreatywne laboratorium – zajęcia z Natalią w Pruszkowie",
    searchCopy: "Twórcze zajęcia artystyczne, sensoryczne i eksperymenty. Poznaj Kreatywne laboratorium z Natalią Marciniak i zapisz dziecko przez Strefę Zajęć.",
    benefits: ["dla dzieci 5–10 lat", "poniedziałkowe spotkania", "Pruszków, Helenowska 8"],
  },
  {
    id: "halloween",
    title: "Halloween w kuli",
    short: "Tematyczne warsztaty i animacje wśród duszków i dyń",
    image: halloweenPackage.image,
    icon: "/images/atrakcje/atrakcje_ikony/sezonowe.png",
    href: halloweenPackage.path,
    seoTitle: "Halloween w kuli – animacje i warsztaty",
    searchCopy: halloweenPackage.intro,
    benefits: ["2 godziny animacji i warsztatów", "halloweenowa aranżacja", "do 12 dzieci jednocześnie w kuli"],
  },
  {
    id: "mikolaj",
    title: "Mikołaj i Elf",
    short: "Wizyty Mikołaja i świąteczne warsztaty z Elfem",
    image: "/images/mikolaj/mikolaj-z-elfem.webp",
    imagePosition: "center 58%",
    icon: "/images/atrakcje/atrakcje_ikony/sezonowe.png",
    href: "/mikolaj",
    seoTitle: "Mikołaj i Elf – świąteczne spotkania dla dzieci",
    searchCopy: "Zaproś Świętego Mikołaja, wybierz wizytę Mikołaja z Elfem lub kreatywne warsztaty świąteczne prowadzone przez Elfa. Dopasujemy propozycję do Waszego wydarzenia w Warszawie i okolicach.",
    benefits: ["wizyta Mikołaja", "Mikołaj w towarzystwie Elfa", "warsztaty świąteczne z Elfem"],
  },
];
const selectableOffers = [...seasonalOffers, ...offerItems];

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

// Keep query-string observation inside a small Suspense boundary so that
// the offer content remains present in the server-rendered page.
function OfferUrlSync() {
  const searchParams = useSearchParams();
  useEffect(() => {
    window.dispatchEvent(new Event("nallipop:offer-navigation"));
  }, [searchParams]);
  return null;
}

export default function OfferExperience({ inflatablesOnly = false }) {
  const router = useRouter();
  const inflatableOffer = offerItems.find(({ id }) => id === "dmuchance");
  const [activeOfferId, setActiveOfferId] = useState(inflatablesOnly ? "dmuchance" : offerItems[0].id);
  const [activeGalleryMedia, setActiveGalleryMedia] = useState(null);
  const [selectedInflatableId, setSelectedInflatableId] = useState("safari");
  const [scrollTarget, setScrollTarget] = useState(null);
  const [galleryMedia, setGalleryMedia] = useState([]);
  const [galleryStatus, setGalleryStatus] = useState("loading");
  const detailSectionRef = useRef(null);
  const inflatablePickerRef = useRef(null);
  const offerRailRef = useRef(null);
  const [offerRail, setOfferRail] = useState({ overflowing: false, previous: false, next: false, first: 1, last: selectableOffers.length });

  useEffect(() => {
    const rail = offerRailRef.current;
    if (!rail) return;
    let frame;
    function measure() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const bounds = rail.getBoundingClientRect();
        const visible = Array.from(rail.children).flatMap((tile, index) => {
          const rect = tile.getBoundingClientRect();
          const overlap = Math.min(rect.right, bounds.right) - Math.max(rect.left, bounds.left);
          return overlap >= rect.width / 2 ? [index + 1] : [];
        });
        const nextState = {
          overflowing: rail.scrollWidth > rail.clientWidth + 2,
          previous: rail.scrollLeft > 2,
          next: rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 2,
          first: visible[0] || 1,
          last: visible.at(-1) || 1,
        };
        setOfferRail((current) => Object.keys(nextState).every((key) => current[key] === nextState[key]) ? current : nextState);
      });
    }
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    Array.from(rail.children).forEach((tile) => observer.observe(tile));
    rail.addEventListener("scroll", measure, { passive: true });
    measure();
    return () => {
      observer.disconnect();
      rail.removeEventListener("scroll", measure);
      window.cancelAnimationFrame(frame);
    };
  }, [inflatablesOnly]);

  function scrollOffers(direction) {
    const rail = offerRailRef.current;
    if (!rail) return;
    const firstTile = rail.firstElementChild;
    const step = firstTile.getBoundingClientRect().width + parseFloat(window.getComputedStyle(rail).columnGap || "0");
    rail.scrollBy({
      left: direction * step * Math.max(1, Math.floor(rail.clientWidth / step)),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }
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
  const activeGalleryFolder = activeOffer.id === "dmuchance" ? selectedInflatable.galleryFolder : "gallery";
  const activeRemoteMedia = galleryMedia.filter(({ folderName }) => folderName === activeGalleryFolder);
  const visibleGallery = activeRemoteMedia.length
    ? activeRemoteMedia.slice(0, 6)
    : (activeOffer.id === "dmuchance" ? [selectedInflatable.image] : activeOffer.gallery).map((src, index) => ({
        id: `${activeOffer.id}-fallback-${index}`,
        src,
        type: "image",
        folderName: activeGalleryFolder,
      }));

  useEffect(() => {
    let alive = true;

    async function loadGallery() {
      try {
        const params = new URLSearchParams({limit: "72"});
        if (inflatablesOnly) params.set("folder", selectedInflatable.galleryFolder);
        else params.set("folder", "gallery");
        const response = await fetch(`/api/gallery-media?${params}`);
        if (!response.ok) throw new Error("Galeria jest chwilowo niedostępna");
        const { media } = await response.json();

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
  }, [inflatablesOnly, selectedInflatable.galleryFolder]);

  useEffect(() => {
    let syncTimer;
    function syncFromUrl() {
      window.clearTimeout(syncTimer);
      syncTimer = window.setTimeout(() => {
        const params = new URLSearchParams(window.location.search);
        const requestedOfferId = params.get("oferta");
        const requestedInflatableId = params.get("dmuchaniec");

        if (!inflatablesOnly && (requestedOfferId === "dmuchance" || window.location.hash === "#wybor-dmuchanca")) {
          const model = inflatableOffer.inflatables.some(({ id }) => id === requestedInflatableId)
            ? `?dmuchaniec=${requestedInflatableId}` : "";
          router.replace(`/dmuchance${model}${window.location.hash}`);
          return;
        }
        setActiveOfferId(inflatablesOnly ? "dmuchance"
          : offerItems.some(({ id }) => id === requestedOfferId) ? requestedOfferId : offerItems[0].id);
        setSelectedInflatableId(inflatableOffer.inflatables.some(({ id }) => id === requestedInflatableId)
          ? requestedInflatableId : "safari");

        if (window.location.hash === "#opis-oferty") {
          setScrollTarget("detail");
        } else if (window.location.hash === "#wybor-dmuchanca") {
          setScrollTarget("picker");
        }
      }, 0);
    }

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    window.addEventListener("hashchange", syncFromUrl);
    window.addEventListener("nallipop:offer-navigation", syncFromUrl);
    return () => {
      window.clearTimeout(syncTimer);
      window.removeEventListener("popstate", syncFromUrl);
      window.removeEventListener("hashchange", syncFromUrl);
      window.removeEventListener("nallipop:offer-navigation", syncFromUrl);
    };
  }, [inflatableOffer.inflatables, inflatablesOnly, router]);

  useEffect(() => {
    if (!scrollTarget) {
      return;
    }

    const scrollTimer = window.setTimeout(() => {
      const targetRef = scrollTarget === "picker" ? inflatablePickerRef : detailSectionRef;
      const headerHeight = document.querySelector(".header")?.getBoundingClientRect().height || 78;
      const targetTop = targetRef.current
        ? targetRef.current.getBoundingClientRect().top + window.scrollY - headerHeight - 18
        : 0;

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
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
    nextUrl.searchParams.delete("oferta");
    nextUrl.searchParams.set("dmuchaniec", inflatableId);
    nextUrl.hash = "opis-oferty";
    window.history.replaceState(null, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    setScrollTarget("detail");
  }

  return (
    <main className="offer-page decorated-page">
      <Suspense fallback={null}><OfferUrlSync /></Suspense>
      <PageDecorations variant="offer" />
      {inflatablesOnly ? <InflatableHero /> : <section className="offer-hero">
        <div className="container">
          <motion.div className="offer-hero__intro" {...fadeUp}>
            <nav className="offer-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Strona główna</Link>
              <span aria-hidden="true">›</span>
              <span>Oferta</span>
            </nav>
            <h1>Animacje i atrakcje dla dzieci</h1>
            <p>
              Wybierz okazję i poznaj programy animacyjne dla dzieci w Warszawie
              oraz okolicach. Animacje z prowadzącym już od 150 zł.
            </p>
            <div className="offer-hero__actions">
              <Link className="button button--primary" href="/formularz-rezerwacji">
                Zarezerwuj termin <span aria-hidden="true">→</span>
              </Link>
              <Link className="button button--light" href="/kontakt">
                Dopytaj o szczegóły
              </Link>
            </div>
          </motion.div>

          <div className="offer-selection">
            <div className="offer-selection__toolbar">
              <div>
                <h2>Wybierz ofertę dla siebie</h2>
                <p id="offer-selection-hint">{offerRail.overflowing ? "Przesuń kafelki w lewo lub w prawo albo użyj strzałek. Kliknij wybraną ofertę." : "Kliknij kafelek, aby poznać szczegóły oferty."}</p>
              </div>
              {offerRail.overflowing && <div className="offer-selection__navigation">
                <span className="offer-selection__count" aria-live="polite" aria-atomic="true">{offerRail.first}–{offerRail.last} z {selectableOffers.length} ofert</span>
                <div className="offer-selection__arrows" role="group" aria-label="Przewijanie ofert">
                  <button type="button" aria-label="Poprzednie oferty" aria-controls="wybor-oferty" disabled={!offerRail.previous} onClick={() => scrollOffers(-1)}><span aria-hidden="true">←</span></button>
                  <button type="button" aria-label="Kolejne oferty" aria-controls="wybor-oferty" disabled={!offerRail.next} onClick={() => scrollOffers(1)}><span aria-hidden="true">→</span></button>
                </div>
              </div>}
            </div>
            <div className={`offer-selection__viewport${offerRail.previous ? " has-previous" : ""}${offerRail.next ? " has-next" : ""}`}>
          <div className="offer-tabs" id="wybor-oferty" ref={offerRailRef} role="region" aria-label="Oferty do wyboru" aria-describedby="offer-selection-hint" tabIndex={offerRail.overflowing ? 0 : undefined}>
            {selectableOffers.map((item) => (
              <a
                className={`offer-tile ${item.id === activeOffer.id ? "is-active" : ""}`}
                href={item.href || (item.id === "dmuchance" ? "/dmuchance" : `?oferta=${item.id}#opis-oferty`)}
                key={item.id}
                onClick={item.href || item.id === "dmuchance" ? undefined : (event) => selectOffer(event, item.id)}
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
          </div>
            </div>
          </div>
        </div>
      </section>}
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
                        <span className="inflatable-option__image">
                          <Image src={inflatable.image} alt={inflatable.name} fill sizes="(max-width: 760px) 90vw, 380px" />
                        </span>
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

              </motion.div>
            </div>
        </section>
      )}
      <section className="offer-detail-section" id="opis-oferty" ref={detailSectionRef}>
        <div className="container">
          {activeOffer.id === "dmuchance" ? (
            <InflatableDetail
              key={selectedInflatable.id}
              inflatable={selectedInflatable}
              galleryMedia={galleryMedia}
              extras={activeOffer.extras}
            />
          ) : (
          <ServiceOfferDetail key={detailOffer.id} offer={detailOffer} />
          )}
        </div>
      </section>

      {!inflatablesOnly && <section className="offer-seo-section" aria-labelledby="offer-seo-title">
        <div className="container">
          <div className="offer-seo-section__intro">
            <span className="section-kicker">Oferta Nallipop</span>
            <h2 id="offer-seo-title">Animacje dla dzieci w Warszawie i okolicach</h2>
            <p>
              Organizujemy animacje na urodziny, wesela, festyny, pikniki, eventy
              firmowe i półkolonie. Możesz zamówić sam program z animatorem albo
              rozbudować wydarzenie o warsztaty, dmuchańce i atrakcje z efektem WOW.
              Ceny animacji zaczynają się już od 150 zł, a końcowa wycena
              zależy od terminu, lokalizacji, czasu trwania i wybranych dodatków.
            </p>
          </div>

          <div className="offer-seo-grid">
            {selectableOffers.map((item) => (
              <article className="offer-seo-card" id={`oferta-${item.id}`} key={item.id}>
                <span className="offer-seo-card__icon">
                  <Image src={item.icon} alt="" width={58} height={58} />
                </span>
                <div>
                  <h3>{item.seoTitle}</h3>
                  <p>{item.searchCopy}</p>
                  <ul>
                    {item.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                  </ul>
                  <div className="offer-seo-card__links">
                    <Link href={item.href || (item.id === "dmuchance" ? "/dmuchance" : `/oferta?oferta=${item.id}#opis-oferty`)}>
                      Poznaj szczegóły oferty <span aria-hidden="true">→</span>
                    </Link>
                    <Link href="/atrakcje">Zobacz atrakcje dodatkowe</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="offer-seo-cta">
            <div>
              <h2>Nie wiesz, jaki program wybrać?</h2>
              <p>
                Opowiedz nam o wieku dzieci, liczbie gości i miejscu wydarzenia.
                Zaproponujemy program oraz atrakcje dopasowane do Twojego budżetu.
              </p>
            </div>
            <div>
              <Link className="button button--primary" href="/formularz-rezerwacji">
                Zarezerwuj i poproś o wycenę <span aria-hidden="true">→</span>
              </Link>
              <Link className="button button--light" href="/kontakt">
                Dopytaj o szczegóły
              </Link>
            </div>
          </div>
        </div>
      </section>}

      {!inflatablesOnly && <section className="offer-gallery-section">
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
                    <video src={media.src} muted playsInline preload="none" poster={activeOffer.id === "dmuchance" ? selectedInflatable.image : activeOffer.detailImage} />
                  ) : (
                    <span className="image-fill" style={{ backgroundImage: `url(${media.thumbnail || media.src})` }} />
                  )}
                </button>
              ))}
            </div>
            {galleryStatus === "loading" && <p className="offer-gallery__status">Ładuję zdjęcia i filmy z galerii...</p>}
            <Link className="offer-gallery__link" href="/galeria">
              Zobacz więcej zdjęć w galerii <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </section>}

      <section className="offer-ready-section">
        <div className="container">
          <motion.div className="offer-ready" {...fadeUp}>
            <div className="offer-ready__copy">
              <h2>Gotowi na wyjątkową imprezę?</h2>
              <p>Zarezerwuj termin lub dopytaj o program, cenę i dostępne atrakcje dodatkowe.</p>
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
                backgroundImage: `url(${detailOffer.detailImage})`,
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
            <Link href="/dmuchance">Wynajmij dmuchańca</Link>
            <Link href="/#atrakcje">Atrakcje</Link>
            <Link href="/galeria">Galeria</Link>
            <Link href="/#opinie">Opinie</Link>
            <Link href="/blog">Blog</Link>
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

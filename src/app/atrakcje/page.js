"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getDownloadURL, listAll, ref as storageRef } from "firebase/storage";
import attractionsData from "@/data/atrakcje.json";
import SocialLinks from "@/components/SocialLinks";
import NitrogenTeaser from "@/components/NitrogenTeaser";
import ToddlerZoneBanner from "@/components/ToddlerZoneBanner";
import PhotoboothTeaser from "@/components/PhotoboothTeaser";
import BrandLogo from "@/components/BrandLogo";
import { storage } from "@/lib/firebase";
import PageDecorations from "@/components/PageDecorations";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.55, ease: "easeOut" },
};

const categories = attractionsData.categories;
const pinataNames = {
  samolot: "Samolot LOT",
  pies: "Wesoły piesek",
  creaper: "Creeper",
  creeper: "Creeper",
  elsa: "Kraina Lodu",
  pilka: "Piłka",
};
const pinataColors = ["#ff74b7", "#7d68ef", "#14bdb7", "#f3a91a", "#5f9ee8", "#ef6c54"];

function getPinataName(fileName) {
  const baseName = fileName.replace(/\.[^.]+$/, "").toLowerCase();
  return pinataNames[baseName] || baseName.replace(/[-_]+/g, " ").replace(/^./, (letter) => letter.toUpperCase());
}

export default function AtrakcjePage() {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id);
  const [activeSubcategoryId, setActiveSubcategoryId] = useState(categories[0].subcategories[0].id);
  const [pinatas, setPinatas] = useState([]);
  const [pinatasLoading, setPinatasLoading] = useState(true);
  const [pinatasError, setPinatasError] = useState(false);
  const [bubbleVideo, setBubbleVideo] = useState("");
  const [bubbleVideoLoading, setBubbleVideoLoading] = useState(true);
  const [bubbleVideoError, setBubbleVideoError] = useState(false);
  const detailRef = useRef(null);
  const categoriesRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPinatas() {
      try {
        const result = await listAll(storageRef(storage, "piniaty"));
        const imageItems = result.items.filter((item) => /\.(jpe?g|png|webp|gif)$/i.test(item.name));
        const loadedPinatas = await Promise.all(
          imageItems.map(async (item, index) => ({
            id: item.fullPath,
            name: getPinataName(item.name),
            image: await getDownloadURL(item),
            color: pinataColors[index % pinataColors.length],
          }))
        );

        if (!cancelled) setPinatas(loadedPinatas);
      } catch (error) {
        console.error("Nie udało się pobrać zdjęć piniat", error);
        if (!cancelled) setPinatasError(true);
      } finally {
        if (!cancelled) setPinatasLoading(false);
      }
    }

    loadPinatas();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadBubbleVideo() {
      try {
        const result = await listAll(storageRef(storage, "banka"));
        const videoItem = result.items.find((item) => /\.(mp4|webm|mov)$/i.test(item.name));

        if (!videoItem) throw new Error("Brak filmu w katalogu banka");
        const url = await getDownloadURL(videoItem);
        if (!cancelled) setBubbleVideo(url);
      } catch (error) {
        console.error("Nie udało się pobrać filmu z zamykania w bańce", error);
        if (!cancelled) setBubbleVideoError(true);
      } finally {
        if (!cancelled) setBubbleVideoLoading(false);
      }
    }

    loadBubbleVideo();
    return () => { cancelled = true; };
  }, []);

  const activeCategory = useMemo(
    () => categories.find((category) => category.id === activeCategoryId) || categories[0],
    [activeCategoryId]
  );
  const activeSubcategory = useMemo(
    () => activeCategory.subcategories.find((subcategory) => subcategory.id === activeSubcategoryId) || activeCategory.subcategories[0],
    [activeCategory, activeSubcategoryId]
  );

  function scrollToDetails() {
    window.setTimeout(() => {
      const top = detailRef.current ? detailRef.current.getBoundingClientRect().top + window.scrollY - 96 : 0;
      window.scrollTo({
        top: Math.max(top, 0),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    }, 80);
  }

  function chooseCategory(category) {
    setActiveCategoryId(category.id);
    setActiveSubcategoryId(category.subcategories[0].id);
    scrollToDetails();
  }

  function chooseSubcategory(subcategoryId) {
    setActiveSubcategoryId(subcategoryId);
    scrollToDetails();
  }

  function showMoreCategories() {
    const rail = categoriesRef.current;
    if (!rail) return;

    rail.scrollTo({
      left: rail.scrollLeft + Math.min(rail.clientWidth * 0.78, 320),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }

  return (
    <main className="attractions-page decorated-page">
      <PageDecorations variant="attractions" />
      <section className="attractions-hero">
        <div className="container attractions-hero__grid">
          <motion.div className="attractions-hero__copy" {...fadeUp}>
            <nav className="offer-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">{attractionsData.breadcrumb.home}</Link>
              <span aria-hidden="true">›</span>
              <span>{attractionsData.breadcrumb.current}</span>
            </nav>
            <span className="attractions-hero__eyebrow">Pomysły na niezapomnianą zabawę</span>
            <h1>
              {attractionsData.hero.title} <span>{attractionsData.hero.highlight}</span>
            </h1>
            <p>{attractionsData.hero.description}</p>
            <div className="attractions-hero__actions">
              <Link className="button button--primary" href="#wybierz-atrakcje">
                Odkryj atrakcje <span aria-hidden="true">↓</span>
              </Link>
              <Link className="attractions-hero__text-link" href="/formularz-rezerwacji">
                Pomóż mi wybrać <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="attractions-hero__proof" aria-label="Najważniejsze informacje">
              <span><strong>30+</strong> pomysłów</span>
              <span><strong>6</strong> kategorii</span>
              <span><strong>WOW</strong> w cenie uśmiechu</span>
            </div>
          </motion.div>
          <motion.div className="attractions-hero__visual" {...fadeUp}>
            <span className="attractions-hero__photo image-fill" />
            <strong>{attractionsData.hero.badge}</strong>
            <div className="attractions-hero__tags" aria-hidden="true">
              <span>Animacje</span>
              <span>Warsztaty</span>
              <span>Efekt WOW</span>
            </div>
          </motion.div>
        </div>
      </section>

      <PhotoboothTeaser />
      <ToddlerZoneBanner />
      <NitrogenTeaser />

      <section className="attractions-picker" id="wybierz-atrakcje">
        <div className="container">
          <div className="section-heading attractions-picker__heading">
            <span className="attractions-step">Krok 1 z 2</span>
            <h2>{attractionsData.sections.categoryHeading}</h2>
            <p>Dotknij wybranej kategorii. Pokażemy Ci konkretne pomysły i warianty.</p>
          </div>

          <div className="attractions-scroll-guide">
            <span>Przesuń karty w bok</span>
            <button type="button" onClick={showMoreCategories} aria-label="Pokaż kolejne kategorie atrakcji">
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <motion.div className="attractions-categories" ref={categoriesRef} {...fadeUp}>
            {categories.map((category) => (
              <button
                className={`attraction-category ${category.id === activeCategory.id ? "is-active" : ""}`}
                key={category.id}
                style={{ "--category-color": category.color }}
                type="button"
                onClick={() => chooseCategory(category)}
              >
                <span>
                  {category.iconImage ? <img src={category.iconImage} alt="" /> : category.icon}
                </span>
                <strong>{category.title}</strong>
                <small>{category.description}</small>
                <em>Pokaż atrakcje →</em>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="attractions-details" id="lista-atrakcji" ref={detailRef}>
        <div className="container attractions-details__shell">
          <aside className="attractions-sidebar" style={{ "--category-color": activeCategory.color }}>
            <span className="attractions-step">Krok 2 z 2</span>
            <span className="attractions-sidebar__icon">
              {activeCategory.iconImage ? <img src={activeCategory.iconImage} alt="" /> : activeCategory.icon}
            </span>
            <h2>{activeCategory.title}</h2>
            <p>{activeCategory.description}</p>

            <div className="attractions-subcategories">
              <span className="attractions-subcategories__label">Wybierz rodzaj atrakcji:</span>
              {activeCategory.subcategories.map((subcategory) => (
                <button
                  className={subcategory.id === activeSubcategory.id ? "is-active" : ""}
                  key={subcategory.id}
                  type="button"
                  onClick={() => chooseSubcategory(subcategory.id)}
                >
                  {subcategory.title}
                </button>
              ))}
            </div>
          </aside>

          <motion.div
            className="attractions-list"
            key={`${activeCategory.id}-${activeSubcategory.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease: "easeOut" }}
          >
            <div className="attractions-list__heading">
              <h2>{activeSubcategory.title}</h2>
              <p>{activeSubcategory.intro}</p>
            </div>

            <div className="attraction-cards">
              {activeSubcategory.items.map((item) => (
                <article className="attraction-card" key={item.title}>
                  <span className="attraction-card__image">
                    <img src={item.image} alt={item.title} />
                  </span>
                  <span className="attraction-card__badge">
                    {activeCategory.iconImage ? <img src={activeCategory.iconImage} alt="" /> : activeCategory.icon}
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    {item.href && <Link className="attraction-card__reserve" href={item.href}>{item.linkLabel || "Dodaj do zapytania"} <span aria-hidden="true">→</span></Link>}
                  </div>
                </article>
              ))}
            </div>

            <Link className="button button--primary attractions-list__button" href="/formularz-rezerwacji">
              Zapytaj o {activeSubcategory.title.toLowerCase()} <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="pinata-showcase" id="piniaty-na-zamowienie">
        <div className="container">
          <motion.div className="pinata-showcase__intro" {...fadeUp}>
            <div>
              <span className="section-kicker">Piniaty handmade</span>
              <h2>Piniata stworzona specjalnie dla Twojego dziecka</h2>
              <p>
                Wykonujemy piniaty na zamówienie — dopasowane do motywu urodzin,
                ulubionej postaci albo pomysłu małego solenizanta. Każda powstaje
                ręcznie i może być wyjątkowym finałem zabawy.
              </p>
            </div>
            <div className="pinata-showcase__features" aria-label="Zalety naszych piniat">
              <span><strong>01</strong> Dowolny motyw</span>
              <span><strong>02</strong> Ręczne wykonanie</span>
              <span><strong>03</strong> Projekt na zamówienie</span>
            </div>
          </motion.div>

          <div className="pinata-showcase__heading">
            <div>
              <span>Nasze realizacje</span>
              <h3>Zobacz kilka pomysłów lub wybierz swój wzór</h3>
            </div>
            <Link
              className="button button--primary"
              href="/formularz-rezerwacji?atrakcja=Piniata&model=Własny%20projekt"
            >
              Zamów własny projekt <span aria-hidden="true">→</span>
            </Link>
          </div>

          {pinatasLoading && (
            <div className="pinata-grid" aria-label="Ładowanie realizacji piniat">
              {[0, 1, 2, 3].map((item) => <span className="pinata-card pinata-card--loading" key={item} />)}
            </div>
          )}

          {!pinatasLoading && pinatas.length > 0 && (
            <div className="pinata-grid">
              {pinatas.map((pinata, index) => (
                <motion.article
                  className="pinata-card"
                  key={pinata.id}
                  style={{ "--pinata-color": pinata.color }}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.24) }}
                >
                  <div className="pinata-card__image">
                    <img src={pinata.image} alt={`Piniata ${pinata.name} wykonana przez Nallipop`} />
                    <span>Realizacja Nallipop</span>
                  </div>
                  <div className="pinata-card__content">
                    <span className="pinata-card__number">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{pinata.name}</h3>
                      <p>Ten wzór możemy przygotować również w kolorach Twojego przyjęcia.</p>
                    </div>
                    <Link
                      href={`/formularz-rezerwacji?atrakcja=Piniata&model=${encodeURIComponent(pinata.name)}`}
                      aria-label={`Wybierz piniatę ${pinata.name}`}
                    >
                      Wybierz ten wzór <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {!pinatasLoading && pinatas.length === 0 && (
            <div className="pinata-showcase__empty">
              <h3>{pinatasError ? "Zdjęcia realizacji chwilowo się nie załadowały" : "Nowe realizacje już wkrótce"}</h3>
              <p>Możesz od razu opisać nam wymarzony motyw — przygotujemy indywidualną propozycję.</p>
              <Link href="/formularz-rezerwacji?atrakcja=Piniata&model=Własny%20projekt">Zapytaj o piniatę →</Link>
            </div>
          )}
        </div>
      </section>

      <section className="bubble-showcase" id="zamykanie-w-bance">
        <div className="container">
          <div className="bubble-showcase__shell">
            <motion.div className="bubble-showcase__copy" {...fadeUp}>
              <span className="section-kicker">Atrakcja WOW</span>
              <h2>Wejdź do środka ogromnej bańki mydlanej</h2>
              <p>
                Zamykanie w bańce to wyjątkowy moment, w którym dziecko na chwilę
                znajduje się wewnątrz mieniącej się, gigantycznej bańki. Atrakcja
                zachwyca dzieci, świetnie wygląda na zdjęciach i zostaje w pamięci
                na długo.
              </p>

              <div className="bubble-showcase__benefits" aria-label="Zalety zamykania w bańce">
                <span><strong>01</strong> Efekt WOW dla każdego dziecka</span>
                <span><strong>02</strong> Wyjątkowe zdjęcia i nagrania</span>
                <span><strong>03</strong> Atrakcja prowadzona przez animatora</span>
              </div>

              <Link
                className="button button--primary"
                href="/formularz-rezerwacji?atrakcja=Zamykanie%20w%20ba%C5%84ce"
              >
                Rezerwuj tę atrakcję <span aria-hidden="true">→</span>
              </Link>
            </motion.div>

            <motion.div className="bubble-showcase__visual" {...fadeUp}>
              <span className="bubble-showcase__label">Zobacz, jak to wygląda</span>
              {bubbleVideoLoading && (
                <div className="bubble-showcase__video bubble-showcase__video--loading" aria-label="Ładowanie filmu" />
              )}
              {!bubbleVideoLoading && bubbleVideo && (
                <video
                  className="bubble-showcase__video"
                  controls
                  playsInline
                  preload="metadata"
                  poster="/images/atrakcje/zamykanie-w-bance.webp"
                  aria-label="Film przedstawiający zamykanie dziecka w dużej bańce mydlanej"
                >
                  <source src={bubbleVideo} type="video/mp4" />
                  Twoja przeglądarka nie obsługuje odtwarzania filmu.
                </video>
              )}
              {!bubbleVideoLoading && bubbleVideoError && (
                <div className="bubble-showcase__fallback">
                  <Image
                    src="/images/atrakcje/zamykanie-w-bance.webp"
                    alt="Zamykanie dziecka w dużej bańce mydlanej"
                    width={700}
                    height={900}
                  />
                  <p>Film chwilowo się nie załadował — spróbuj ponownie za moment.</p>
                </div>
              )}
              <span className="bubble-showcase__bubble bubble-showcase__bubble--one" aria-hidden="true" />
              <span className="bubble-showcase__bubble bubble-showcase__bubble--two" aria-hidden="true" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="attractions-cta">
        <div className="container attractions-cta__inner">
          <div className="attractions-cta__image">
            <Image
              src="/images/nallipop-ikony-przyciski/kontakt-koperta.png"
              alt=""
              width={72}
              height={72}
              aria-hidden="true"
            />
          </div>
          <div>
            <h2>{attractionsData.cta.title}</h2>
            <p>{attractionsData.cta.description}</p>
          </div>
          <Link className="button button--primary" href="/formularz-rezerwacji">
            {attractionsData.cta.button} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <footer className="offer-footer" id="kontakt">
        <div className="container offer-footer__grid">
          <div>
            <Link href="/" className="offer-footer__logo">
              <BrandLogo />
            </Link>
            <p>{attractionsData.footer.description}</p>
            <SocialLinks />
          </div>

          <div>
            <h3>{attractionsData.footer.navigationTitle}</h3>
            <Link href="/">Strona główna</Link>
            <Link href="/#o-nas">O nas</Link>
            <Link href="/oferta">Oferta</Link>
            <Link href="/atrakcje">Atrakcje</Link>
            <Link href="/galeria">Galeria</Link>
            <Link href="/opinie">Opinie</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/kontakt">Kontakt</Link>
          </div>

          <div>
            <h3>{attractionsData.footer.contactTitle}</h3>
            <a href="tel:+48795103108">{attractionsData.footer.phone}</a>
            <a href={`mailto:${attractionsData.footer.email}`}>{attractionsData.footer.email}</a>
            <span>{attractionsData.footer.location}</span>
          </div>

          <div>
            <h3>{attractionsData.footer.areaTitle}</h3>
            <div className="offer-footer__map image-fill" style={{ backgroundImage: "url(/images/warszawa-map.webp)" }} />
          </div>
        </div>
      </footer>
    </main>
  );
}

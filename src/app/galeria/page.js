"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, listAll, ref as storageRef } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import PageDecorations from "@/components/PageDecorations";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.55, ease: "easeOut" },
};

function getDateValue(value) {
  if (!value) {
    return 0;
  }

  if (typeof value.toMillis === "function") {
    return value.toMillis();
  }

  return new Date(value).getTime() || 0;
}

async function normalizeGalleryDoc(docSnapshot) {
  const data = docSnapshot.data();
  const directUrl = data.url || data.imageUrl || data.photoUrl || data.fileUrl || data.src || data.downloadURL;
  const storagePath = data.storagePath || data.path;
  let image = directUrl;

  if (!image && storagePath) {
    image = await getDownloadURL(storageRef(storage, storagePath));
  }

  if (!image) {
    return null;
  }

  return {
    id: docSnapshot.id,
    image,
    type: data.type === "video" || /\.(mp4|webm|mov|m4v|ogv)(\?|$)/i.test(image) ? "video" : "image",
    title: data.title || data.alt || "Zdjęcie z wydarzenia",
    category: data.category || data.tag || "Nallipop",
    featured: Boolean(data.featured),
    order: Number(data.order || 0),
    createdAt: getDateValue(data.createdAt),
  };
}

function withTimeout(promise, timeoutMs) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error("Przekroczono czas odpowiedzi Firestore")), timeoutMs);
    }),
  ]);
}

async function loadStorageGallery() {
  const folders = ["gallery", "dmuchaniec"];
  const results = await Promise.all(
    folders.map(async (folderName) => ({
      folderName,
      result: await listAll(storageRef(storage, folderName)),
    }))
  );

  return Promise.all(
    results.flatMap(({ folderName, result }) =>
      result.items.map(async (itemRef, index) => ({
        id: `storage-${itemRef.fullPath}`,
        image: await getDownloadURL(itemRef),
        type: /\.(mp4|webm|mov|m4v|ogv)$/i.test(itemRef.name) ? "video" : "image",
        title: itemRef.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
        category: folderName === "dmuchaniec" ? "Dmuchańce" : "Nallipop",
        featured: folderName === "dmuchaniec",
        order: index,
        createdAt: 0,
      }))
    )
  );
}

export default function GaleriaPage() {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("loading");
  const [activeImage, setActiveImage] = useState(null);
  const categories = useMemo(
    () => ["Wszystkie", ...Array.from(new Set(images.map((image) => image.category).filter(Boolean)))],
    [images]
  );
  const [activeCategory, setActiveCategory] = useState("Wszystkie");
  const visibleImages = useMemo(() => {
    const filtered =
      activeCategory === "Wszystkie"
        ? images
        : images.filter((image) => image.category === activeCategory);

    return filtered;
  }, [activeCategory, images]);
  const previewImage = useMemo(
    () => images.find((item) => item.type !== "video")?.image || "/images/hero-kids.webp",
    [images]
  );

  useEffect(() => {
    let alive = true;
    const timeout = window.setTimeout(() => {
      if (alive) {
        setStatus((currentStatus) => (currentStatus === "loading" ? "error" : currentStatus));
      }
    }, 8000);

    async function loadGallery() {
      try {
        let storageMedia = [];
        let firestoreMedia = [];
        let storageFailed = false;
        let firestoreFailed = false;

        try {
          storageMedia = await loadStorageGallery();
          if (alive && storageMedia.length) {
            window.clearTimeout(timeout);
            setImages(storageMedia);
            setStatus("ready");
          }
        } catch (error) {
          storageFailed = true;
          console.warn("Nie udało się pobrać galerii z Firebase Storage", error);
        }

        try {
          const firestoreResult = await withTimeout(getDocs(collection(db, "gallery")), 4500);
          firestoreMedia = await Promise.all(firestoreResult.docs.map((docSnapshot) => normalizeGalleryDoc(docSnapshot)));
        } catch (error) {
          firestoreFailed = true;
          console.warn("Nie udało się pobrać galerii z Firestore", error);
        }

        const seenUrls = new Set();
        const prepared = [...firestoreMedia, ...storageMedia]
          .filter(Boolean)
          .filter((item) => {
            if (seenUrls.has(item.image)) {
              return false;
            }
            seenUrls.add(item.image);
            return true;
          })
          .sort((a, b) => b.featured - a.featured || a.order - b.order || b.createdAt - a.createdAt || a.title.localeCompare(b.title, "pl"));

        if (alive) {
          window.clearTimeout(timeout);
          setImages(prepared);
          setStatus(prepared.length ? "ready" : firestoreFailed && storageFailed ? "error" : "empty");
        }
      } catch (error) {
        console.error("Nie udało się pobrać galerii z Firestore", error);
        if (alive) {
          window.clearTimeout(timeout);
          setStatus("error");
        }
      }
    }

    loadGallery();

    return () => {
      alive = false;
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <main className="gallery-page decorated-page">
      <PageDecorations variant="gallery" />
      <section className="gallery-hero">
        <div className="container gallery-hero__grid">
          <motion.div className="gallery-hero__copy" {...fadeUp}>
            <nav className="offer-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Strona główna</Link>
              <span aria-hidden="true">›</span>
              <span>Galeria</span>
            </nav>
            <h1>
              Zobacz, jak bawimy się z <span>Nallipop</span>
            </h1>
            <p>Zdjęcia i filmy z urodzin, warsztatów, festynów i rodzinnych wydarzeń pobierane bezpośrednio z Firebase.</p>
          </motion.div>
          <motion.div className="gallery-hero__preview" {...fadeUp}>
            <span className="image-fill" style={{ backgroundImage: `url(${previewImage})` }} />
            <strong>{images.length || "500+"} chwil pełnych uśmiechu</strong>
          </motion.div>
        </div>
      </section>

      <section className="gallery-browser">
        <div className="container">
          <div className="section-heading">
            <h2>Galeria zdjęć</h2>
          </div>

          {categories.length > 1 && (
            <div className="gallery-filters" aria-label="Kategorie galerii">
              {categories.map((category) => (
                <button
                  className={category === activeCategory ? "is-active" : ""}
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {status === "loading" && <p className="gallery-page__status">Ładuję zdjęcia i filmy z Firebase...</p>}
          {status === "empty" && (
            <p className="gallery-page__status">
              Dodaj dokumenty do kolekcji <strong>gallery</strong> w Firestore albo pliki do folderu <strong>gallery/</strong> w Firebase Storage.
            </p>
          )}
          {status === "error" && (
            <p className="gallery-page__status">
              Nie udało się pobrać galerii z Firebase. Sprawdź reguły dostępu do Firestore i Storage.
            </p>
          )}

          {visibleImages.length > 0 && (
            <motion.div className="gallery-masonry-page" {...fadeUp}>
              {visibleImages.map((item, index) => (
                <button
                  className={`gallery-photo gallery-photo--${(index % 7) + 1}`}
                  key={item.id}
                  type="button"
                  onClick={() => setActiveImage(item)}
                >
                  {item.type === "video" ? (
                    <video src={item.image} muted loop autoPlay playsInline preload="metadata" />
                  ) : (
                    <span className="image-fill" style={{ backgroundImage: `url(${item.image})` }} />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {activeImage && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Podgląd zdjęcia lub filmu z galerii">
          <button className="gallery-lightbox__close" type="button" onClick={() => setActiveImage(null)}>
            ×
          </button>
          {activeImage.type === "video" ? (
            <video className="gallery-lightbox__video" src={activeImage.image} controls autoPlay playsInline />
          ) : (
            <div className="gallery-lightbox__image image-fill" style={{ backgroundImage: `url(${activeImage.image})` }} />
          )}
        </div>
      )}
    </main>
  );
}

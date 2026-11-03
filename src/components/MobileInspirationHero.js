"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { inspirationIdeas, couponIdea, inspirationContactHref } from "@/data/inspiration-ideas.mjs";
import { inspirationPhotos } from "@/data/inspiration-photos";
import styles from "./MobileInspirationHero.module.scss";

const moods = [
  { id: "play", label: "Baw się", icon: "✦", ideas: ["idea-5", "idea-7", "idea-12"] },
  { id: "create", label: "Twórz", icon: "✿", ideas: ["idea-2", "idea-4", "idea-15"] },
  { id: "remember", label: "Wspominaj", icon: "♡", ideas: ["idea-8", "idea-santa-globe", "idea-18"] },
];
const ideaById = id => inspirationIdeas.find(idea => idea.id === id) || couponIdea;
const initialCards = [...inspirationIdeas, couponIdea];
const photoSizes = "(max-width: 440px) 55vw, 240px";
const preparedPhotos = new Map();

function preparePhoto(idea) {
  const { props } = getImageProps({ src: inspirationPhotos[idea.id], alt: idea.title, width: 420, height: 300, sizes: photoSizes });
  const key = `${props.srcSet}:${window.innerWidth}:${window.devicePixelRatio}`;
  if (preparedPhotos.has(key)) return preparedPhotos.get(key);
  const prepared = new Promise(resolve => {
    const image = new window.Image();
    const timeout = setTimeout(() => finish(false), 8000);
    function finish(loaded) {
      clearTimeout(timeout);
      image.onload = image.onerror = null;
      if (!loaded) preparedPhotos.delete(key);
      resolve(loaded);
    }
    image.onload = () => image.decode().then(() => finish(true), () => finish(false));
    image.onerror = () => finish(false);
    image.sizes = props.sizes;
    image.srcset = props.srcSet;
    image.src = props.src;
  });
  preparedPhotos.set(key, prepared);
  return prepared;
}

function Photo({ idea, ...props }) {
  return <Image src={inspirationPhotos[idea.id]} alt={idea.title} width={420} height={300} sizes={photoSizes} placeholder="blur" style={{ objectPosition: idea.position, backgroundColor: "#392b4e" }} {...props} />;
}

function Wheel({ round, onComplete, reducedMotion, canWin }) {
  const windowRef = useRef(null);
  const cardRefs = useRef(new Map());
  const cards = round?.cards || (canWin ? initialCards : inspirationIdeas);

  useEffect(() => {
    const width = windowRef.current?.clientWidth || 360;
    const radius = width * .96;
    let frame;
    const paint = (position, settled = false) => {
      cards.forEach((idea, index) => {
        const card = cardRefs.current.get(idea.id);
        if (!card) return;
        const raw = (index - position) * Math.PI * 2 / cards.length;
        const angle = Math.atan2(Math.sin(raw), Math.cos(raw));
        const front = Math.cos(angle);
        const selected = settled && Math.abs(angle) < .001;
        card.style.visibility = front < .12 ? "hidden" : "visible";
        card.style.opacity = String(Math.max(0, Math.min(1, (front - .12) / .3)));
        card.style.zIndex = String(Math.round(front * 100));
        card.style.transform = `translateX(-50%) translate3d(${Math.sin(angle) * radius}px,${(1-front)*33-(selected?6:0)}px,${(front-1)*radius*.8}px) rotateY(${angle*180/Math.PI*.72}deg) rotateZ(${Math.sin(angle)*18-3*front}deg) scale(${(.78+.22*front**3)*(selected?1.025:1)})`;
      });
    };
    if (!round) { paint(0); return; }
    const destination = cards.length * 2 + cards.findIndex(idea => idea.id === round.result.drawnId);
    const duration = reducedMotion ? 0 : 3800;
    let started;
    const animate = time => {
      started ??= time;
      const progress = duration ? Math.min(1, (time-started)/duration) : 1;
      paint(destination * (1-(1-progress)**3.4), progress === 1);
      if (progress < 1) frame = requestAnimationFrame(animate);
      else onComplete(round.result);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [cards, round, onComplete, reducedMotion]);

  return <div className={styles.wheel} ref={windowRef} aria-hidden="true">
    <span className={styles.pointer}>▼</span>
    {cards.map(idea => <div key={idea.id} ref={node => { if (node) cardRefs.current.set(idea.id, node); else cardRefs.current.delete(idea.id); }} className={`${styles.wheelCard} ${idea.kind === "coupon" ? styles.prize : ""}`}>
      {idea.kind === "coupon" ? <div className={styles.prizeArt}><span>TWÓJ ZŁOTY KUPON</span><b>−10%</b><small>na animacje</small></div> : <Photo idea={idea} loading="eager" />}
      <strong>{idea.title}</strong>
    </div>)}
    <span className={styles.wheelShadow} />
  </div>;
}

export default function MobileInspirationHero() {
  const reducedMotion = useReducedMotion();
  const [mood, setMood] = useState("play");
  const [scene, setScene] = useState(0);
  const [selected, setSelected] = useState(null);
  const [draw, setDraw] = useState(null);
  const [busy, setBusy] = useState(false);
  const [round, setRound] = useState(null);
  const [unavailable, setUnavailable] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [preparingPhotos, setPreparingPhotos] = useState(false);
  const preparingPhotosRef = useRef(false);
  const busyRef = useRef(false);
  const aliveRef = useRef(false);
  const abortRef = useRef(null);
  const pendingRequest = useRef(null);

  useEffect(() => {
    aliveRef.current = true;
    const media = window.matchMedia("(max-width: 700px)");
    const controller = new AbortController();
    const refresh = async () => {
      if (!media.matches || busyRef.current || document.hidden) return;
      try {
        const response = await fetch("/api/inspiration", { cache: "no-store", signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]) });
        if (!response.ok) throw new Error();
        const result = await response.json();
        if (!busyRef.current) { setDraw(result); setUnavailable(false); }
      } catch { if (!controller.signal.aborted) setUnavailable(true); }
    };
    refresh();
    media.addEventListener("change", refresh);
    window.addEventListener("focus", refresh);
    const timer = setInterval(refresh, 60000);
    return () => {
      aliveRef.current = false;
      controller.abort(); abortRef.current?.abort(); clearInterval(timer);
      media.removeEventListener("change", refresh); window.removeEventListener("focus", refresh);
    };
  }, []);

  const finish = useCallback(result => {
    setSelected(ideaById(result.drawnId));
    if (!result.offline) setDraw(result);
    busyRef.current = false;
    setBusy(false);
  }, []);

  async function spin() {
    if (busyRef.current || preparingPhotosRef.current) return;
    busyRef.current = true;
    setBusy(true); setMood("surprise"); setSelected(null); setRound(null);
    // Reuse an uncertain request on retry, so a lost response cannot cost another attempt.
    pendingRequest.current ||= crypto.randomUUID();
    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 10000);
    let result;
    try {
      const response = await fetch("/api/inspiration", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: pendingRequest.current }), signal: controller.signal,
      });
      if (!response.ok) throw new Error();
      result = await response.json();
      pendingRequest.current = null;
      setUnavailable(false);
    } catch {
      if (!aliveRef.current) return;
      setUnavailable(true);
      result = { drawnId: inspirationIdeas[Math.floor(Math.random()*inspirationIdeas.length)].id, offline: true };
    } finally { clearTimeout(timeout); }
    if (!aliveRef.current) return;
    const cards = !result.offline && (draw?.remaining > 0 || result.drawnId === couponIdea.id) ? initialCards : inspirationIdeas;
    setRound({ result, cards });
  }

  async function chooseMood(nextMood) {
    if (busyRef.current || preparingPhotosRef.current) return;
    const nextScene = mood === nextMood.id ? scene + 1 : 0;
    const nextFront = ideaById(nextMood.ideas[nextScene % nextMood.ideas.length]);
    const nextBack = ideaById(nextMood.ideas[(nextScene+1) % nextMood.ideas.length]);
    preparingPhotosRef.current = true;
    setPreparingPhotos(true);
    // Keep the current photos visible until the replacement pair is downloaded and decoded.
    await Promise.all([preparePhoto(nextFront), preparePhoto(nextBack)]);
    preparingPhotosRef.current = false;
    if (!aliveRef.current) return;
    setPreparingPhotos(false);
    setMood(nextMood.id); setScene(nextScene);
    setSelected(nextFront);
  }

  const activeMood = moods.find(item => item.id === mood) || moods[0];
  const front = ideaById(activeMood.ideas[scene % activeMood.ideas.length]);
  const back = ideaById(activeMood.ideas[(scene+1) % activeMood.ideas.length]);
  const winner = mood === "surprise" && selected;

  return <div className={styles.hero} id="mobile-inspiration">
    <div className={styles.topline}><span>✦ Małe chwile. Wielkie emocje.</span><span>Warszawa i okolice</span></div>
    <h1>Tu zaczyna się<br /><em>wielkie WOOOW!</em></h1>
    <p className={styles.lead}>Animacje i atrakcje na małe i duże wydarzenia. Dla dzieci, dorosłych i całej Waszej ekipy.</p>

    <div className={styles.stage} aria-busy={preparingPhotos}>
      <div className={styles.disc} aria-hidden="true" />
      <span className={styles.sparkOne} aria-hidden="true">✦</span><span className={styles.sparkTwo} aria-hidden="true">✧</span>
      {mood === "surprise" ? <Wheel round={round} canWin={draw?.remaining > 0 && !unavailable} onComplete={finish} reducedMotion={reducedMotion} /> :
        <AnimatePresence initial={false}>
          <motion.div className={styles.collage} key={`${mood}-${scene}`} initial={{ opacity: 0, y: reducedMotion ? 0 : 18, rotate: reducedMotion ? 0 : -4 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -12 }} transition={{ duration: .24 }}>
            <div className={styles.backPhoto}><Photo idea={back} loading="eager" fetchPriority="high" /><strong>{back.title}</strong></div>
            <div className={styles.frontPhoto}><Photo idea={front} loading="eager" fetchPriority="high" /><strong>{front.title}</strong></div>
            <span className={styles.sticker}>Ale będzie<br /><b>zabawa!</b></span>
          </motion.div>
        </AnimatePresence>}
    </div>

    <div className={styles.moods} aria-label="Odkryj inspiracje">
      {moods.map(item => <button key={item.id} type="button" disabled={busy || preparingPhotos} aria-pressed={mood === item.id} onClick={() => chooseMood(item)}><span aria-hidden="true">{item.icon}</span>{item.label}</button>)}
      <button type="button" className={styles.surprise} disabled={busy || preparingPhotos || (!draw && !unavailable)} aria-pressed={mood === "surprise"} onClick={spin}><span aria-hidden="true">✺</span>{busy ? "Losujemy…" : "Zaskocz mnie"}</button>
    </div>

    <div className={styles.result} aria-live="polite" aria-atomic="true">
      {busy ? <><strong>Co tym razem wyczarujemy?</strong><p>Za chwilę zatrzymamy się na Twojej inspiracji…</p></> : winner ? <><span className={styles.eyebrow}>{winner.category}</span><h2>{winner.title}</h2><p>{winner.short}</p></> : <><strong>Jaki klimat wybierasz?</strong><p>Klikaj, odkrywaj i znajdź pomysł na Waszą imprezę.</p></>}
    </div>
    <p className={styles.allowance}>{unavailable ? "Kupony chwilowo niedostępne. Pomysły losujesz dalej!" : draw ? draw.remaining ? <>Próby na kupon −10% na dziś: <b>{draw.remaining} z 3</b></> : <>Próby na kupon: <b>0 z 3.</b> Nowe jutro!<small>Pomysły na atrakcje losujesz dalej bez limitu.</small></> : "Sprawdzamy Twoje dzisiejsze próby…"}</p>
    {draw?.coupon && <div className={styles.savedCoupon}><span aria-hidden="true">✦</span><div><strong>Twój kupon −10% na animacje jest zapisany!</strong><small>Dołączymy go do zapytania w formularzu.</small></div></div>}
    <Link className={styles.cta} href={selected ? inspirationContactHref(selected.id) : "/formularz-rezerwacji#formularz"} aria-disabled={busy} tabIndex={busy ? -1 : undefined} onClick={event => { if (busy) event.preventDefault(); }}>{selected ? "Zapytaj o ten pomysł" : "Zapytaj o termin i cenę"}<span aria-hidden="true">↗</span></Link>
    <p className={styles.reassurance}>Bez zobowiązań. Wspólnie dopasujemy atrakcje do Was.</p>
    <button type="button" className={styles.showIdeas} aria-expanded={expanded} aria-controls="inspiration-list" onClick={() => setExpanded(!expanded)}>{expanded ? "Zwiń pomysły" : `Zobacz ${inspirationIdeas.length} pomysłów w losowaniu`} <span aria-hidden="true">{expanded ? "−" : "+"}</span></button>
    {expanded && <ul id="inspiration-list" className={styles.ideaList}>{inspirationIdeas.map(idea => <li key={idea.id}><Link href={inspirationContactHref(idea.id)}><Photo idea={idea} sizes="62px" /><span>{idea.title}</span><span aria-hidden="true">↗</span></Link></li>)}</ul>}
    <p className={styles.more}>To dopiero początek. <Link href="/oferta">Poznaj całą ofertę <span aria-hidden="true">→</span></Link></p>
  </div>;
}

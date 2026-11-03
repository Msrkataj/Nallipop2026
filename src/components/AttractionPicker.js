"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck, faPlus, faWandMagicSparkles, faXmark } from "@fortawesome/free-solid-svg-icons";
import { paidAttractions } from "@/data/reservation-attractions";
import "@/styles/attraction-picker.scss";

function AttractionPreview({ attraction, anchor, pinned, selected, onToggle, onClose, onEnter, onLeave }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const [mobile, setMobile] = useState(false);
  const [position, setPosition] = useState(null);

  useLayoutEffect(() => {
    const place = () => {
      const isMobile = window.matchMedia("(max-width: 720px)").matches;
      setMobile(isMobile);
      const rect = anchor.getBoundingClientRect();
      const panel = panelRef.current;
      if (!panel) return;
      const margin = 16;
      const width = panel.offsetWidth;
      const height = panel.offsetHeight;
      let left = rect.right + 12;
      if (left + width > window.innerWidth - margin) left = rect.left - width - 12;
      left = Math.max(margin, Math.min(left, window.innerWidth - width - margin));
      const top = Math.max(margin, Math.min(rect.top - 60, window.innerHeight - height - margin));
      setPosition({ left, top });
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(panelRef.current);
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [anchor]);

  useEffect(() => {
    if (pinned) closeRef.current?.focus({ preventScroll: true });
  }, [pinned]);

  useEffect(() => {
    if (!mobile) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [mobile]);

  useEffect(() => {
    const keydown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose(true);
      }
      if (mobile && event.key === "Tab") {
        const buttons = panelRef.current.querySelectorAll("button");
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    const outside = (event) => {
      if (!panelRef.current?.contains(event.target) && !anchor.contains(event.target)) onClose(false);
    };
    document.addEventListener("keydown", keydown);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("pointerdown", outside);
    };
  }, [anchor, mobile, onClose]);

  return createPortal(
    <>
      {mobile && <div className="extra-preview-backdrop" aria-hidden="true" />}
      <div
        ref={panelRef}
        className={`extra-preview extra-preview--${attraction.effect}`}
        style={{ "--extra-accent": attraction.accent, "--extra-tint": attraction.background, ...(mobile ? {} : position), visibility: position ? "visible" : "hidden" }}
        id="attraction-preview"
        role="dialog"
        aria-modal={mobile || undefined}
        aria-labelledby="attraction-preview-title"
        aria-describedby="attraction-preview-description"
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        onFocusCapture={onEnter}
      >
        <div className="extra-preview__scene">
          <Image src={attraction.image} alt={attraction.alt} fill sizes="(max-width: 720px) 100vw, 400px" style={{ objectPosition: attraction.imagePosition || "center" }} />
          <div className="extra-preview__particles" aria-hidden="true">
            {Array.from({ length: 9 }, (_, i) => <i key={i} style={{ "--i": i, "--x": `${9 + (i * 23) % 85}%`, "--size": `${14 + (i % 4) * 11}px` }} />)}
          </div>
          <span className="extra-preview__category"><FontAwesomeIcon icon={faWandMagicSparkles} /> {attraction.category}</span>
          <button ref={closeRef} className="extra-preview__close" type="button" aria-label="Zamknij podgląd atrakcji" onClick={() => onClose(true)}><FontAwesomeIcon icon={faXmark} /></button>
        </div>
        <div className="extra-preview__body">
          <span className="extra-preview__eyebrow">{attraction.displayName || attraction.name}</span>
          <h3 id="attraction-preview-title">{attraction.headline}</h3>
          <p id="attraction-preview-description">{attraction.description}</p>
          <ul className="extra-preview__tags">{attraction.tags.map((tag) => <li key={tag}><FontAwesomeIcon icon={faCheck} /> {tag}</li>)}</ul>
          <button className={`extra-preview__add${selected ? " is-selected" : ""}`} type="button" aria-pressed={selected} onClick={onToggle}>
            <FontAwesomeIcon icon={selected ? faCheck : faPlus} />
            {selected ? "Dodano · kliknij, aby usunąć" : "Dodaj do zapytania"}
          </button>
          <small>Opcja dodatkowo płatna. Cenę i szczegóły potwierdzimy w ofercie.</small>
        </div>
      </div>
    </>, document.body
  );
}

export default function AttractionPicker({ selected, onToggle }) {
  const [preview, setPreview] = useState(null);
  const timer = useRef(null);
  const trigger = useRef(null);
  const clearTimer = () => window.clearTimeout(timer.current);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function closePreview(restoreFocus = false) {
    clearTimer();
    setPreview(null);
    if (restoreFocus && trigger.current) trigger.current.focus({ preventScroll: true });
  }

  function openPreview(attraction, anchor, pinned = false) {
    clearTimer();
    trigger.current = anchor.querySelector(".extra-choice__preview");
    setPreview({ attraction, anchor, pinned });
  }

  function hoverPreview(event, attraction) {
    if (event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (min-width: 721px)").matches || preview?.pinned) return;
    clearTimer();
    const anchor = event.currentTarget;
    timer.current = window.setTimeout(() => openPreview(attraction, anchor), 180);
  }

  function leavePreview() {
    clearTimer();
    if (document.activeElement?.closest(".extra-preview")) return;
    if (!preview?.pinned) timer.current = window.setTimeout(() => setPreview(null), 280);
  }

  return (
    <>
      <div className="extra-picker__intro">
        <span><FontAwesomeIcon icon={faWandMagicSparkles} /> Odkryj ich małe wielkie WOW</span>
        <span aria-live="polite">Wybrano: <b>{selected.length}</b></span>
      </div>
      <p className="extra-picker__hint">Podejrzyj atrakcję i znajdź coś dla swoich małych gości.</p>
      <div className="extra-picker">
        {paidAttractions.map((attraction) => {
          const label = attraction.displayName || attraction.name;
          const checked = selected.includes(attraction.name);
          const active = preview?.attraction.name === attraction.name;
          return (
            <div
              className={`extra-choice${checked ? " is-selected" : ""}${active ? " is-previewing" : ""}`}
              key={attraction.name}
              style={{ "--extra-accent": attraction.accent, "--extra-tint": attraction.background }}
              onPointerEnter={(event) => hoverPreview(event, attraction)}
              onPointerLeave={leavePreview}
            >
              <label className="extra-choice__select">
                <input type="checkbox" name="paidAttractions" value={attraction.name} aria-label={label} checked={checked} onChange={() => onToggle(attraction.name)} />
                <span className="extra-choice__image"><Image src={attraction.image} alt="" fill sizes="84px" style={{ objectPosition: attraction.imagePosition || "center" }} /></span>
                <span className="extra-choice__copy"><strong>{label}</strong><small>{attraction.category}</small></span>
                <span className="extra-choice__check" aria-hidden="true"><FontAwesomeIcon icon={checked ? faCheck : faPlus} /></span>
              </label>
              <button className="extra-choice__preview" type="button" aria-label={`Zobacz atrakcję: ${label}`} aria-haspopup="dialog" aria-expanded={active} aria-controls={active ? "attraction-preview" : undefined} onClick={(event) => openPreview(attraction, event.currentTarget.parentElement, true)}>
                Zobacz, jak to wygląda <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          );
        })}
      </div>
      {preview && <AttractionPreview key={preview.attraction.name} {...preview} selected={selected.includes(preview.attraction.name)} onToggle={() => onToggle(preview.attraction.name)} onClose={closePreview} onEnter={clearTimer} onLeave={leavePreview} />}
    </>
  );
}

"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

// Midnight after Sunday, 20 September, in Europe/Warsaw.
const endsAt = Date.parse("2026-09-21T00:00:00+02:00");
const isActive = () => Date.now() < endsAt;
const serverSnapshot = () => false;

function subscribe(onChange) {
  const remaining = endsAt - Date.now();
  const timer = remaining > 0 ? window.setTimeout(onChange, Math.min(remaining, 2147483647)) : null;
  window.addEventListener("focus", onChange);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.clearTimeout(timer);
    window.removeEventListener("focus", onChange);
    document.removeEventListener("visibilitychange", onChange);
  };
}

export default function SundayPromo({ desktop = false }) {
  const active = useSyncExternalStore(subscribe, isActive, serverSnapshot);
  if (!active) return null;
  return (
    <Link href="/formularz-rezerwacji?atrakcja=Dmuchaniec" className={`sunday-promo${desktop ? " sunday-promo--desktop" : " hero-mobile__offer"}`}>
      <strong>W tę niedzielę dmuchaniec do 20% taniej</strong>
      <span>20 września · Zarezerwuj i dowiedz się więcej ↗</span>
    </Link>
  );
}

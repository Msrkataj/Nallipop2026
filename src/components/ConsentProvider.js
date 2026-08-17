"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "nallipop_cookie_consent";
export const CONSENT_VERSION = "2026-08-11.1";

const ConsentContext = createContext(null);

function createConsent(optional) {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: Boolean(optional.analytics),
    social: Boolean(optional.social),
    decidedAt: new Date().toISOString(),
    consentId:
      globalThis.crypto?.randomUUID?.() ||
      `nallipop-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  };
}

function clearAnalyticsCookies() {
  if (typeof document === "undefined") return;

  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (name === "_ga" || name.startsWith("_ga_")) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${window.location.hostname}; SameSite=Lax`;
    }
  });
}

export function ConsentProvider({ children }) {
  const [consent, setConsent] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
      if (saved?.version === CONSENT_VERSION && saved?.necessary === true) {
        setConsent(saved);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady || consent?.analytics) return;

    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: "denied" });
    }
    clearAnalyticsCookies();
  }, [consent?.analytics, isReady]);

  const saveConsent = useCallback((optional) => {
    const nextConsent = createConsent(optional);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextConsent));
    } catch {
      // Ustawienie nadal działa w bieżącej sesji, nawet jeśli przeglądarka blokuje zapis lokalny.
    }
    setConsent(nextConsent);
    setIsSettingsOpen(false);
    window.dispatchEvent(new CustomEvent("nallipop:consent-changed", { detail: nextConsent }));
  }, []);

  const value = useMemo(
    () => ({
      consent,
      isReady,
      isSettingsOpen,
      acceptAll: () => saveConsent({ analytics: true, social: true }),
      rejectOptional: () => saveConsent({ analytics: false, social: false }),
      savePreferences: saveConsent,
      openSettings: () => setIsSettingsOpen(true),
      closeSettings: () => setIsSettingsOpen(false),
    }),
    [consent, isReady, isSettingsOpen, saveConsent]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const value = useContext(ConsentContext);
  if (!value) throw new Error("useConsent musi być użyte wewnątrz ConsentProvider.");
  return value;
}

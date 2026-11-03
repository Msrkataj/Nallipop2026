"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CONSENT_STORAGE_KEY, CONSENT_VERSION } from "@/lib/consent";

const ConsentContext = createContext(null);

function createConsent(optional) {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: Boolean(optional.analytics),
    marketing: Boolean(optional.marketing),
    social: Boolean(optional.social),
    decidedAt: new Date().toISOString(),
    consentId:
      globalThis.crypto?.randomUUID?.() ||
      `nallipop-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  };
}

function clearGoogleCookies({ analytics, marketing }) {
  if (typeof document === "undefined") return;

  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    const isAnalyticsCookie = name === "_ga" || name.startsWith("_ga_");
    const isMarketingCookie = name.startsWith("_gcl_");
    if ((!analytics && isAnalyticsCookie) || (!marketing && isMarketingCookie)) {
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
      const saved = JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY));
      if (saved?.version === CONSENT_VERSION && saved?.necessary === true) {
        setConsent(saved);
      }
    } catch {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) return;

    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: consent?.analytics ? "granted" : "denied",
        ad_storage: consent?.marketing ? "granted" : "denied",
        ad_user_data: consent?.marketing ? "granted" : "denied",
        ad_personalization: consent?.marketing ? "granted" : "denied",
      });
    }
    clearGoogleCookies({ analytics: consent?.analytics, marketing: consent?.marketing });
  }, [consent?.analytics, consent?.marketing, isReady]);

  const saveConsent = useCallback((optional) => {
    const nextConsent = createConsent(optional);
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(nextConsent));
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
      acceptAll: () => saveConsent({ analytics: true, marketing: true, social: true }),
      rejectOptional: () => saveConsent({ analytics: false, marketing: false, social: false }),
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

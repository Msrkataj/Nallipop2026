"use client";

import { useEffect } from "react";
import { useConsent } from "@/components/ConsentProvider";

export default function GoogleAnalyticsConsent() {
  const { consent, isReady } = useConsent();

  useEffect(() => {
    if (!isReady || typeof window.gtag !== "function") return;

    window.gtag("consent", "update", {
      analytics_storage: consent?.analytics ? "granted" : "denied",
      ad_storage: consent?.marketing ? "granted" : "denied",
      ad_user_data: consent?.marketing ? "granted" : "denied",
      ad_personalization: consent?.marketing ? "granted" : "denied",
    });
  }, [consent?.analytics, consent?.marketing, isReady]);

  return null;
}

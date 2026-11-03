"use client";

import { useEffect } from "react";
import { reportPhoneClickConversion } from "@/lib/google-ads";

export default function GoogleAdsPhoneTracking() {
  useEffect(() => {
    const handlePhoneClick = (event) => {
      const phoneLink = event.target.closest?.('a[href^="tel:"]');
      if (!phoneLink) return;

      event.preventDefault();
      reportPhoneClickConversion(phoneLink.href);
    };

    document.addEventListener("click", handlePhoneClick);
    return () => document.removeEventListener("click", handlePhoneClick);
  }, []);

  return null;
}

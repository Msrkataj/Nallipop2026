"use client";

import Script from "next/script";
import { useConsent } from "@/components/ConsentProvider";

export default function GoogleAnalyticsConsent() {
  const { consent } = useConsent();
  const measurementId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "G-NN5Q100TDG";

  if (!measurementId || !consent?.analytics) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="nallipop-google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', { analytics_storage: 'granted' });
          gtag('js', new Date());
          gtag('config', '${measurementId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}

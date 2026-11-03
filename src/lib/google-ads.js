const CONTACT_FORM_CONVERSION =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_CONVERSION ||
  "AW-18398709233/TkqGCJPLmeQcEPGLmMVE";

const PHONE_CLICK_CONVERSION =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION ||
  "AW-18398709233/_hUQCNjT3ewcEPGLmMVE";

function getGtag() {
  if (typeof window === "undefined") return null;

  // Keep events queueable even when gtag.js is still loading.
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  return window.gtag;
}

export function reportContactFormConversion() {
  const gtag = getGtag();
  if (!gtag) return;

  gtag("event", "conversion", {
    send_to: CONTACT_FORM_CONVERSION,
    value: 1.0,
    currency: "PLN",
  });
}

export function reportPhoneClickConversion(url) {
  const gtag = getGtag();
  if (!gtag) {
    if (url) window.location.href = url;
    return;
  }

  let navigationStarted = false;
  const continueToPhone = () => {
    if (!url || navigationStarted) return;
    navigationStarted = true;
    window.location.href = url;
  };

  // Keep a GA4 event as a useful diagnostic and send the dedicated Google Ads
  // conversion generated for phone-number clicks.
  gtag("event", "phone_click", {
    event_category: "contact",
    event_label: url || "tel",
  });
  gtag("event", "conversion", {
    send_to: PHONE_CLICK_CONVERSION,
    event_callback: continueToPhone,
  });

  // Ad blockers or denied consent can prevent the callback. Never make
  // tracking block the actual phone action.
  window.setTimeout(continueToPhone, 700);
}

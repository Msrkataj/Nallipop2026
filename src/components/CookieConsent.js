"use client";

import { useState } from "react";
import Link from "next/link";
import { useConsent } from "@/components/ConsentProvider";

function CookieSettingsPanel({ consent, acceptAll, rejectOptional, savePreferences, closeSettings }) {
  const [analytics, setAnalytics] = useState(Boolean(consent?.analytics));
  const [marketing, setMarketing] = useState(Boolean(consent?.marketing));
  const [social, setSocial] = useState(Boolean(consent?.social));

  return (
    <div className="cookie-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeSettings()}>
      <section className="cookie-settings" role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title">
        <div className="cookie-settings__heading">
          <div>
            <span>Centrum prywatności</span>
            <h2 id="cookie-settings-title">Ustawienia cookies</h2>
          </div>
          <button className="cookie-settings__close" type="button" onClick={closeSettings} aria-label="Zamknij ustawienia">×</button>
        </div>

        <p className="cookie-settings__intro">
          Opcjonalne kategorie są domyślnie wyłączone. Możesz zmienić ten wybór w każdej chwili.
        </p>

        <div className="cookie-settings__options">
          <div className="cookie-option">
            <div><strong>Niezbędne</strong><p>Bezpieczeństwo, transmisja formularzy i zapamiętanie Twojego wyboru.</p></div>
            <span className="cookie-option__required">Zawsze aktywne</span>
          </div>
          <label className="cookie-option">
            <div><strong>Analityczne</strong><p>Pomagają mierzyć ruch za pomocą Google Analytics.</p></div>
            <input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} />
            <span className="cookie-switch" aria-hidden="true" />
          </label>
          <label className="cookie-option">
            <div><strong>Reklamowe</strong><p>Pozwalają mierzyć skuteczność kampanii Google Ads.</p></div>
            <input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} />
            <span className="cookie-switch" aria-hidden="true" />
          </label>
          <label className="cookie-option">
            <div><strong>Treści społecznościowe</strong><p>Pozwalają pobrać najnowsze wpisy z Facebooka.</p></div>
            <input type="checkbox" checked={social} onChange={(event) => setSocial(event.target.checked)} />
            <span className="cookie-switch" aria-hidden="true" />
          </label>
        </div>

        <div className="cookie-settings__actions">
          <button type="button" onClick={() => savePreferences({ analytics, marketing, social })}>Zapisz mój wybór</button>
          <button type="button" onClick={rejectOptional}>Odrzuć opcjonalne</button>
          <button type="button" onClick={acceptAll}>Akceptuj wszystkie</button>
        </div>
        <Link className="cookie-settings__policy" href="/polityka-prywatnosci" onClick={closeSettings}>Przeczytaj pełną Politykę prywatności →</Link>
      </section>
    </div>
  );
}

export default function CookieConsent() {
  const { consent, isReady, isSettingsOpen, acceptAll, rejectOptional, savePreferences, openSettings, closeSettings } = useConsent();

  if (!isReady) return null;

  return (
    <>
      {!consent && !isSettingsOpen && (
        <section className="cookie-banner" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
          <div className="cookie-banner__mark" aria-hidden="true">🍭</div>
          <div className="cookie-banner__copy">
            <span>Prywatność po Twojej stronie</span>
            <h2 id="cookie-title">Ty wybierasz, które cookies włączamy</h2>
            <p>
              Niezbędne technologie obsługują stronę. Analitykę, pomiar reklam i treści z Facebooka
              uruchomimy dopiero po Twojej zgodzie. Więcej w{" "}
              <Link href="/polityka-prywatnosci">Polityce prywatności i cookies</Link>.
            </p>
          </div>
          <div className="cookie-banner__actions">
            <button type="button" onClick={acceptAll}>Akceptuję wszystkie</button>
            <button type="button" onClick={rejectOptional}>Odrzucam opcjonalne</button>
            <button type="button" onClick={openSettings}>Ustawienia</button>
          </div>
        </section>
      )}

      {isSettingsOpen && (
        <CookieSettingsPanel
          consent={consent}
          acceptAll={acceptAll}
          rejectOptional={rejectOptional}
          savePreferences={savePreferences}
          closeSettings={closeSettings}
        />
      )}
    </>
  );
}

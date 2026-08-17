"use client";

import dynamic from "next/dynamic";
import { useConsent } from "@/components/ConsentProvider";

const FacebookPosts = dynamic(() => import("@/components/FacebookPosts"), {
  ssr: false,
  loading: () => (
    <section className="facebook-posts" aria-label="Aktualności Nallipop z Facebooka">
      <div className="container"><div className="facebook-posts__notice">Ładujemy aktualności…</div></div>
    </section>
  ),
});

export default function ConsentAwareFacebookPosts() {
  const { consent, isReady, openSettings } = useConsent();

  if (!isReady || !consent?.social) {
    return (
      <section className="facebook-posts" aria-labelledby="facebook-consent-title">
        <div className="container">
          <div className="facebook-posts__heading">
            <div>
              <span className="section-kicker">Najnowsze realizacje</span>
              <h2 id="facebook-consent-title">Zobacz, co u nas słychać</h2>
              <p>Posty pobierzemy dopiero po Twojej zgodzie.</p>
            </div>
          </div>
          <div className="facebook-posts__notice facebook-posts__notice--consent">
            <span className="facebook-posts__notice-icon" aria-hidden="true">f</span>
            <div>
              <strong>Posty z Facebooka są wyłączone</strong>
              <p>Ta sekcja połączy się z Facebookiem dopiero po zgodzie na treści społecznościowe.</p>
            </div>
            <button type="button" onClick={openSettings}>Ustawienia cookies</button>
          </div>
        </div>
      </section>
    );
  }

  return <FacebookPosts />;
}

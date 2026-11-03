import Image from "next/image";
import Link from "next/link";

export default function InflatableHero() {
  return (
    <section className="rental-hero" aria-labelledby="rental-hero-title">
      <div className="container">
        <nav className="offer-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Strona główna</Link><span aria-hidden="true">›</span><span>Wynajmij dmuchańca</span>
        </nav>
        <div className="rental-hero__layout">
          <div className="rental-hero__copy">
            <span className="rental-hero__eyebrow">Dmuchańce · Warszawa i okolice</span>
            <h1 id="rental-hero-title">Mała impreza.<br /><span>Wielka frajda!</span></h1>
            <p>Zamień ogród w krainę dziecięcej radości. Tropikalne zjeżdżalnie, skakanie do woli i balonowa magia Bubble House — wybierz swoją atrakcję, a my zajmiemy się przygotowaniem.</p>
            <div className="rental-hero__actions">
              <a className="button button--primary" href="#wybor-dmuchanca">Wybierz dmuchańca <span aria-hidden="true">↓</span></a>
              <Link href="/kontakt">Pomóżcie mi wybrać <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="rental-hero__occasions"><span>Urodziny</span><span>Pikniki i festyny</span><span>Wesela</span></div>
          </div>
          <div className="rental-hero__visual">
            <div className="rental-hero__picture">
              <Image src="/images/dmuchance/hero-safari.webp" alt="Kolorowa ilustracja zabawy na tropikalnej zjeżdżalni Safari" fill priority sizes="(max-width: 800px) 100vw, 60vw" />
            </div>
            <div className="rental-hero__sticker"><span>Wynajem już od</span><strong>500 <small>zł</small></strong><span>Wybierz swój pakiet</span></div>
            <span className="rental-hero__spark" aria-hidden="true">✦</span>
          </div>
        </div>
        <ul className="rental-hero__reassurance">
          <li><span aria-hidden="true">✦</span><div><strong>Trzy pomysły na wielkie WOW</strong><small>Safari, Tropic i Bubble House</small></div></li>
          <li><span aria-hidden="true">✓</span><div><strong>Z troską o bezpieczeństwo</strong><small>Certyfikaty, badania i ubezpieczenie NNW</small></div></li>
          <li><span aria-hidden="true">♡</span><div><strong>Wszystko jasno opisane</strong><small>Ceny, wymiary i zakres obsługi każdego modelu</small></div></li>
        </ul>
      </div>
    </section>
  );
}

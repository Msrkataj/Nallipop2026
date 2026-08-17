import Link from "next/link";

export default function Hero() {
    return (
        <section className="hero">
            <div className="container hero__inner">
                <div className="hero__content">
                    <span className="hero__label">Animacje i warsztaty dla dzieci</span>

                    <h1>
                        Radosne wydarzenia,
                        <br />
                        które dzieci naprawdę zapamiętają
                    </h1>

                    <p>
                        Urodziny, eventy rodzinne, warsztaty kreatywne i kolorowe atrakcje
                        prowadzone z energią, sercem i pomysłem.
                    </p>

                    <div className="hero__buttons">
                        <Link href="/oferta" className="hero__primary">
                            Zobacz ofertę
                        </Link>

                        <Link href="/formularz-rezerwacji" className="hero__secondary">
                            Skontaktuj się
                        </Link>
                    </div>
                </div>

                <div className="hero__visual">
                    <div className="hero__card">
                        <span>Urodziny</span>
                        <span>Warsztaty</span>
                        <span>Eventy</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

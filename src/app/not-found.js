import Image from "next/image";
import Link from "next/link";
import PageDecorations from "@/components/PageDecorations";

export const metadata = {
  title: "Nie znaleziono strony",
  description: "Ta strona nie istnieje lub została przeniesiona.",
};

export default function NotFound() {
  return (
    <main className="not-found-page decorated-page">
      <PageDecorations variant="home" />
      <section className="not-found-card" aria-labelledby="not-found-title">
        <div className="not-found-copy">
          <span className="not-found-code" aria-hidden="true">404</span>
          <p className="section-kicker">Ups! Tej strony tutaj nie ma</p>
          <h1 id="not-found-title">Chyba zabłądziliśmy w krainie zabawy</h1>
          <p>
            Podany adres jest nieprawidłowy albo strona została przeniesiona.
            Wróć na stronę główną lub przejdź prosto do naszej oferty.
          </p>
          <div className="not-found-actions">
            <Link className="button button--primary" href="/">
              Wróć na stronę główną <span aria-hidden="true">→</span>
            </Link>
            <Link className="button button--light" href="/oferta">
              Zobacz ofertę
            </Link>
          </div>
        </div>

        <div className="not-found-visual" aria-hidden="true">
          <span className="not-found-bubble not-found-bubble--one" />
          <span className="not-found-bubble not-found-bubble--two" />
          <Image
            src="/images/kocur.png"
            alt=""
            width={430}
            height={430}
            priority
          />
        </div>
      </section>
    </main>
  );
}

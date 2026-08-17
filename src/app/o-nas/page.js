import Image from "next/image";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import TrustedPartners from "@/components/TrustedPartners";
import BrandLogo from "@/components/BrandLogo";
import { createPageMetadata } from "@/lib/seo";
import "@/styles/o-nas.scss";

export const metadata = createPageMetadata({
  title: "O nas – poznaj Natalię i naszą historię",
  description:
    "Poznaj Natalię, historię Nallipop i wartości, które stoją za naszymi animacjami, warsztatami i atrakcjami dla dzieci w Warszawie i okolicach.",
  path: "/o-nas",
  imageAlt: "Natalia i zespół Nallipop",
  keywords: ["Nallipop", "animator dla dzieci Warszawa", "Natalia animacje dla dzieci"],
});

const values = [
  {
    icon: "✦",
    title: "Pedagogiczne podejście",
    text: "Każdy scenariusz powstaje w oparciu o wiedzę o rozwoju dziecka, jego wieku i możliwościach.",
    tone: "turquoise",
  },
  {
    icon: "☆",
    title: "Zabawa z pomysłem",
    text: "Kreatywne motywy, autorskie warsztaty i energia, która zamienia spotkanie w prawdziwą przygodę.",
    tone: "violet",
  },
  {
    icon: "♡",
    title: "Indywidualne podejście",
    text: "Słuchamy potrzeb, dopasowujemy program i dbamy, by każde dziecko czuło się zauważone.",
    tone: "pink",
  },
];

function Decoration({ src, className }) {
  return (
    <Image
      className={`about-decoration ${className}`}
      src={`/images/nallipop-dekoracje/${src}`}
      alt=""
      width={240}
      height={240}
      aria-hidden="true"
    />
  );
}

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <Decoration src="gwiazdka-zolta.webp" className="about-hero__star" />
        <Decoration src="slaczek-fiolet.webp" className="about-hero__squiggle" />
        <Decoration src="kropki-turkus.webp" className="about-hero__dots" />

        <div className="container about-hero__grid">
          <div className="about-hero__copy">
            <span className="about-kicker about-kicker--pink">O nas</span>
            <h1>
              Poznaj Natalię
              <span>
                i historię <em>Nallipop</em>
              </span>
            </h1>
            <p>
              Nallipop to miejsce, gdzie dobra zabawa łączy się z rozwojem.
              Tworzymy animacje i warsztaty, które rozbudzają ciekawość, budują
              pewność siebie i zostają w pamięci na długo.
            </p>
            <a className="about-scroll-link" href="#historia">
              Poznaj nas bliżej <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="about-hero__visual">
            <div className="about-hero__portrait">
              <Image
                src="/images/logo.png"
                alt="Logo Nallipop"
                fill
                priority
                unoptimized
                sizes="(max-width: 760px) 84vw, 42vw"
              />
            </div>
            <div className="about-hero__badge" aria-hidden="true">
              <span>NM</span>
              <small>serce Nallipop</small>
            </div>
            <Decoration src="serce-roz.webp" className="about-hero__heart" />
          </div>
        </div>
      </section>

      <section className="about-founder" id="historia">
        <Decoration src="kwiatek-roz.webp" className="about-founder__flower" />
        <Decoration src="kropki-roz.webp" className="about-founder__dots" />

        <div className="container about-founder__grid">
          <div className="about-founder__photo-wrap">
            <div className="about-founder__photo">
              <Image
                src="/images/natalia-founder.webp"
                alt="Natalia z Nallipop"
                fill
                unoptimized
                sizes="(max-width: 840px) 90vw, 46vw"
              />
            </div>
            <span className="about-founder__photo-note">Z miłości do dzieci i dobrej zabawy</span>
          </div>

          <div className="about-founder__copy">
            <span className="about-kicker">Założycielka Nallipop</span>
            <h2>Cześć, jestem Natalia!</h2>
            <p>
              Jestem absolwentką <strong>Akademii Pedagogiki Specjalnej w Warszawie.</strong>{" "}
              Ukończyłam pedagogikę specjalną ze specjalnością wczesne wspomaganie
              rozwoju, a następnie studia magisterskie z terapii pedagogicznej.
            </p>
            <p>
              Na co dzień pracuję jako wychowawczyni w prywatnej szkole Kolumbus.
              Wiedzę pedagogiczną łączę z kreatywnością i doświadczeniem w pracy z dziećmi.
            </p>
            <p>
              W Nallipop zależy mi nie tylko na świetnej zabawie. Tworzę bezpieczną
              przestrzeń, w której każde dziecko może być sobą, odkrywać swoje mocne
              strony i przeżywać piękne chwile.
            </p>
            <div className="about-founder__signature">Natalia ♡</div>
          </div>
        </div>
      </section>

      <section className="about-stats" aria-label="Nallipop w liczbach">
        <Decoration src="gwiazdka-turkus.webp" className="about-stats__star" />
        <div className="container about-stats__grid">
          <article>
            <strong>5</strong>
            <span>lat tworzenia<br />dziecięcych wspomnień</span>
          </article>
          <article>
            <strong>100%</strong>
            <span>programu dopasowanego<br />do wieku dzieci</span>
          </article>
          <article>
            <strong>∞</strong>
            <span>pomysłów na zabawę,<br />warsztaty i wyjątkowe eventy</span>
          </article>
        </div>
      </section>

      <section className="about-story">
        <Decoration src="slaczek-turkus.webp" className="about-story__squiggle" />
        <div className="container about-story__grid">
          <div className="about-story__copy">
            <span className="about-kicker about-kicker--pink">Nasza historia</span>
            <h2>
              Nallipop działa
              <span>już od 5 lat</span>
            </h2>
            <p>
              Od pięciu lat tworzymy niezapomniane chwile dla dzieci podczas
              urodzin, pikników, festynów, wesel i wydarzeń firmowych.
            </p>
            <p>
              Ruchowe zabawy, bańki mydlane, kolorowa chusta, twórcze warsztaty
              i mnóstwo uśmiechu — to nasz przepis na dobrą zabawę.
            </p>
            <div className="about-story__motto">Radość. Kreatywność. Wspólne chwile.</div>
          </div>

          <div className="about-story__image">
            <Image
              src="/images/natalia_samolot.jpg"
              alt="Dzieci bawiące się podczas wydarzenia"
              fill
              unoptimized
              sizes="(max-width: 840px) 90vw, 48vw"
            />
          </div>
        </div>
      </section>

      <section className="about-values" id="wartosci">
        <Decoration src="serce-turkus.webp" className="about-values__heart" />
        <Decoration src="gwiazdka-fiolet.webp" className="about-values__star" />
        <div className="container">
          <div className="about-section-heading">
            <span className="about-kicker">Co jest dla nas ważne</span>
            <h2>Zabawa, która ma znaczenie</h2>
          </div>
          <div className="about-values__grid">
            {values.map((value) => (
              <article className={`about-value about-value--${value.tone}`} key={value.title}>
                <span className="about-value__icon" aria-hidden="true">{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-trust" id="zaufali">
        <Decoration src="tecza.webp" className="about-trust__rainbow" />
        <div className="container">
          <TrustedPartners />
        </div>
      </section>

      <section className="about-cta" id="rezerwacja">
        <Decoration src="gwiazdka-zolta.webp" className="about-cta__star" />
        <Decoration src="kropki-roz.webp" className="about-cta__dots" />
        <Decoration src="slaczek-fiolet.webp" className="about-cta__squiggle" />
        <div className="container about-cta__card">
          <div className="about-cta__copy">
            <span className="about-kicker">Zorganizujmy coś razem</span>
            <h2>Stwórzmy razem coś wyjątkowego</h2>
            <p>
              Opowiedz nam o swoim wydarzeniu. Przygotujemy kolorowy scenariusz,
              który zachwyci dzieci i pozwoli dorosłym cieszyć się chwilą.
            </p>
            <div className="about-cta__benefits" aria-label="Co zapewniamy">
              <span>Program dopasowany do wieku</span>
              <span>Bezpieczna i angażująca zabawa</span>
              <span>Organizacja pełna dobrych pomysłów</span>
            </div>
            <div className="about-cta__actions">
              <Link className="button button--primary" href="/formularz-rezerwacji">
                Zapytaj o termin <span aria-hidden="true">→</span>
              </Link>
              <Link className="about-cta__contact" href="/kontakt">
                Porozmawiajmy
              </Link>
            </div>
          </div>

          <div className="about-cta__visual">
            <Image
              src="/images/banner-kids.webp"
              alt="Uśmiechnięte dzieci podczas kolorowej zabawy"
              fill
              unoptimized
              sizes="(max-width: 840px) 100vw, 48vw"
            />
            <span className="about-cta__visual-label">Animacje • warsztaty • eventy</span>
            <div className="about-cta__location">
              <strong>Warszawa</strong>
              <span>i okolice</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="offer-footer" id="kontakt">
        <div className="container offer-footer__grid">
          <div>
            <Link href="/" className="offer-footer__logo">
              <BrandLogo />
            </Link>
            <SocialLinks />
          </div>

          <div>
            <h3>Nawigacja</h3>
            <Link href="/">Strona główna</Link>
            <Link href="/o-nas">O nas</Link>
            <Link href="/oferta">Oferta</Link>
            <Link href="/atrakcje">Atrakcje</Link>
            <Link href="/galeria">Galeria</Link>
            <Link href="/opinie">Opinie</Link>
            <Link href="/kontakt">Kontakt</Link>
          </div>

          <div>
            <h3>Kontakt</h3>
            <a href="tel:+48795103108">795 103 108</a>
            <a href="mailto:animacje@nallipop.pl">animacje@nallipop.pl</a>
            <span>Warszawa i okolice</span>
          </div>

          <div>
            <h3>Obszar działania</h3>
            <div
              className="offer-footer__map image-fill"
              style={{ backgroundImage: "url(/images/warszawa-map.webp)" }}
            />
          </div>
        </div>
      </footer>
    </main>
  );
}

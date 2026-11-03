import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { BUSINESS, absoluteUrl, createPageMetadata, createServiceSchema } from "@/lib/seo";
import { toddlerZone as zone, toddlerElements, toddlerFaqs } from "@/data/toddler-zone";
import "@/styles/toddler-zone.scss";

export const metadata = createPageMetadata({
  title: "Strefa malucha 0–3 lata – atrakcja na imprezy w Warszawie",
  description: zone.description,
  path: zone.path,
  image: zone.image,
  imageWidth: 1536,
  imageHeight: 1024,
  imageAlt: zone.imageAlt,
  keywords: ["strefa malucha", "strefa malucha Warszawa", "atrakcje dla dzieci 0–3 lata", "suchy basen na imprezę"],
});

const occasions = [
  { title: "Urodziny i roczki", text: "Własny kawałek przyjęcia dla najmłodszego solenizanta i jego małych gości.", offer: "urodziny", number: "01" },
  { title: "Wesela i rodzinne spotkania", text: "Kącik zabawy dla maluchów, blisko rodziców i rodzinnych emocji.", offer: "wesela", number: "02" },
  { title: "Pikniki i eventy", text: "Uzupełnienie atrakcji dla starszaków, żeby najmłodsi też mieli swój mały świat.", offer: "festyny", number: "03" },
];

export default function ToddlerZonePage() {
  return (
    <main className="toddler-page">
      <section className="toddler-hero">
        <div className="toddler-container">
          <nav className="toddler-breadcrumb" aria-label="Ścieżka nawigacji"><Link href="/">Strona główna</Link><span aria-hidden="true">/</span><Link href="/atrakcje">Atrakcje</Link><span aria-hidden="true">/</span><span aria-current="page">Strefa malucha</span></nav>
          <div className="toddler-hero__grid">
            <div className="toddler-hero__copy">
              <span className="toddler-eyebrow"><i /> Mały świat Nallipop · {zone.age}</span>
              <h1>Strefa malucha.<br /><em>Małe kroki,</em><br />wielka radość.</h1>
              <p>Miękko, kolorowo i we własnym tempie. Tworzymy miejsce, w którym najmłodsi goście mogą odkrywać, budować i bawić się z opiekunem obok.</p>
              <div className="toddler-actions"><Link className="toddler-button" href={zone.reservationHref}>Dodaj strefę do imprezy <span aria-hidden="true">↗</span></Link><a className="toddler-text-link" href="#co-w-strefie">Zajrzyj do środka <span aria-hidden="true">↓</span></a></div>
              <div className="toddler-hero__notes"><span>Dodatkowa atrakcja</span><i aria-hidden="true">·</i><span>Warszawa i okolice</span></div>
            </div>
            <div className="toddler-hero__visual">
              <span className="toddler-spark" aria-hidden="true">✳</span>
              <figure className="toddler-hero__photo"><Image src={zone.image} alt={zone.imageAlt} width={1536} height={1024} sizes="(max-width: 800px) 95vw, 53vw" preload /><figcaption>Tak może wyglądać Wasz mały świat.</figcaption></figure>
              <div className="toddler-age"><strong>0–3</strong><span>lata małych<br />wielkich odkryć</span></div>
              <span className="toddler-hero__sticker">Tutaj rządzą<br /><strong>maluchy!</strong></span>
            </div>
          </div>
        </div>
      </section>

      <div className="toddler-ribbon" aria-label="Wyposażenie strefy"><span>Suchy basen</span><i aria-hidden="true">✦</i><span>Miękkie klocki</span><i aria-hidden="true">✦</i><span>Maty do zabawy</span><i aria-hidden="true">✦</i><span>Mała zjeżdżalnia</span></div>

      <section className="toddler-elements toddler-container" id="co-w-strefie" aria-labelledby="toddler-elements-title">
        <div className="toddler-heading"><div><span className="toddler-eyebrow">Zaglądamy do środka</span><h2 id="toddler-elements-title">Wszystko w skali<br /><em>małego człowieka.</em></h2></div><p>Cztery pomysły na pierwsze przygody. Zestaw i układ dobieramy do wieku dzieci oraz miejsca Waszego wydarzenia.</p></div>
        <div className="toddler-elements__grid">{toddlerElements.map((item) => <article className={`toddler-element toddler-element--${item.shape}`} key={item.number}><div className="toddler-element__top"><span>{item.number}</span><div className={`toddler-shape toddler-shape--${item.shape}`} aria-hidden="true"><i /><i /><i /></div></div><span className="toddler-element__label">{item.label}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className="toddler-moments"><div className="toddler-container toddler-moments__grid">
        <figure><Image src={zone.playImage} alt="Maluch i mama wspólnie układają duże pastelowe klocki na miękkiej macie" width={1536} height={1024} sizes="(max-width: 800px) 95vw, 50vw" /><figcaption>Najlepsze odkrycia? Te przeżywane razem.</figcaption></figure>
        <div className="toddler-moments__copy"><span className="toddler-eyebrow">Ich tempo. Ich mały świat.</span><h2>Nie trzeba się spieszyć,<br /><em>żeby świetnie się bawić.</em></h2><p>Jedni dopiero przyglądają się kolorom. Inni stawiają pierwszą wieżę albo wracają po kolejny zjazd. W Strefie malucha jest miejsce na różne sposoby odkrywania.</p><ul><li><span aria-hidden="true">✦</span><div><strong>Blisko opiekuna</strong><p>Wspólna zabawa, pomocna dłoń i znajoma twarz obok.</p></div></li><li><span aria-hidden="true">✦</span><div><strong>Przestrzeń dla najmłodszych</strong><p>Osobny kącik dopasowany do dzieci w wieku 0–3 lata.</p></div></li><li><span aria-hidden="true">✦</span><div><strong>Po swojemu</strong><p>Chwila na obserwację, budowanie albo odrobinę ruchu.</p></div></li></ul></div>
      </div></section>

      <section className="toddler-occasions toddler-container" aria-labelledby="toddler-occasions-title">
        <div className="toddler-heading"><div><span className="toddler-eyebrow">Mała strefa, wiele okazji</span><h2 id="toddler-occasions-title">Najmłodsi też mają<br /><em>swoje miejsce na imprezie.</em></h2></div><p>Dodaj Strefę malucha do zapytania o wydarzenie. Wyposażenie, czas i zakres obsługi ustalimy wspólnie.</p></div>
        <div className="toddler-occasions__grid">{occasions.map((item) => <Link href={`${zone.reservationHref.split("#")[0]}&oferta=${item.offer}#atrakcje-dodatkowe`} key={item.offer}><div><span>{item.number}</span><span aria-hidden="true">↗</span></div><h3>{item.title}</h3><p>{item.text}</p><strong>Zapytaj o ten wariant <span aria-hidden="true">→</span></strong></Link>)}</div>
      </section>

      <section className="toddler-plan toddler-container"><div><span className="toddler-eyebrow">Ułóżmy to razem</span><h2>Wy opowiadacie.<br /><em>My planujemy strefę.</em></h2></div><ol><li><span>1</span><div><h3>Poznajemy Wasze plany</h3><p>Podaj termin, miejsce oraz liczbę i wiek dzieci.</p></div></li><li><span>2</span><div><h3>Dobieramy mały świat</h3><p>Uzgadniamy zestaw, potrzebną przestrzeń, czas i obsługę.</p></div></li><li><span>3</span><div><h3>Potwierdzamy szczegóły</h3><p>Otrzymujesz propozycję i wycenę do akceptacji przed rezerwacją.</p></div></li></ol></section>

      <section className="toddler-faq toddler-container"><div><span className="toddler-eyebrow">Rodzice pytają</span><h2>Małe pytania<br /><em>przed wielkim dniem.</em></h2></div><div>{toddlerFaqs.map(([question,answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="toddler-finale toddler-container"><span className="toddler-finale__spark" aria-hidden="true">✳</span><span className="toddler-eyebrow">Zróbmy miejsce na radość</span><h2>Mały świat.<br /><em>Wielkie wspomnienia.</em></h2><p>Zaproś Strefę malucha na Wasze wydarzenie.<br />Sprawdzimy termin i dobierzemy zestaw dla najmłodszych gości.</p><div className="toddler-actions"><Link className="toddler-button" href={zone.reservationHref}>Zapytaj o Strefę malucha <span aria-hidden="true">↗</span></Link><a className="toddler-text-link" href="tel:+48795103108">{BUSINESS.telephone}</a></div><small>Grafiki przedstawiają przykładową aranżację. Wyposażenie potwierdzamy w ofercie.</small></section>

      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ name: "Strona główna", path: "/" }, { name: "Atrakcje", path: "/atrakcje" }, { name: zone.name, path: zone.path }].map((item,index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.path) })) },
        createServiceSchema({ name: "Strefa malucha dla dzieci 0–3 lata", description: zone.description, path: zone.path, serviceTypes: ["Strefa malucha", "Atrakcje dla dzieci 0–3 lata"] }),
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: toddlerFaqs.map(([question,answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
      ]} />
    </main>
  );
}

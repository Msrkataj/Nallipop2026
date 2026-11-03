import Image from "next/image";
import Link from "next/link";
import "@/styles/photobooth-teaser.scss";

export default function PhotoboothTeaser() {
  return <section className="photobooth-teaser" aria-labelledby="photobooth-teaser-title"><div className="photobooth-teaser__frames" aria-hidden="true">{["wesele", "mikolajki", "impreza-disco"].map((scene) => <div key={scene}><Image src={`/images/fotobudka/lustro-${scene}.webp`} alt="" fill sizes="(max-width: 650px) 100px, 125px" /></div>)}</div><div className="photobooth-teaser__copy"><span>Nowa atrakcja · 7 klimatów do odkrycia</span><h2 id="photobooth-teaser-title">Fotobudka.<br /><em>Wasz klimat. Wasz kadr.</em></h2><p>Na wesela, disco, bale maskowe i wiele innych wydarzeń. Odkryj nasze inspiracje — scenografię dopasujemy do Twojej okazji.</p></div><Link href="/fotobudka">Wybierz swój klimat <span aria-hidden="true">↗</span></Link></section>;
}

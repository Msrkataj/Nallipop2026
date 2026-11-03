import Image from "next/image";
import Link from "next/link";
import { getPhotoboothScene, photobooth, photoboothPricing } from "@/data/photobooth";
import "@/styles/photobooth-home-banner.scss";

export default function PhotoboothHomeBanner() {
  const scene = getPhotoboothScene("impreza-disco");
  const startingPackage = photoboothPricing.packages[0];

  return (
    <section className="home-photobooth" id="fotobudka" aria-labelledby="home-photobooth-title">
      <div className="home-photobooth__copy">
        <span className="home-photobooth__eyebrow">Nallipop · Studio dobrych wspomnień</span>
        <h2 id="home-photobooth-title">Fotobudka.<br /><em>Uśmiech, proszę!</em></h2>
        <p>Szalone rekwizyty, wyjątkowa scenografia i Wasza ekipa w kadrze. Na wesela, urodziny, imprezy firmowe i wiele innych wydarzeń.</p>
        <div className="home-photobooth__price">Od <strong>{startingPackage.price} zł</strong><span>brutto / {startingPackage.label}</span></div>
        <div className="home-photobooth__actions">
          <Link className="home-photobooth__button" href={photobooth.path}>Odkryj fotobudkę <span aria-hidden="true">↗</span></Link>
          <Link className="home-photobooth__price-link" href={`${photobooth.path}#cennik`}>Zobacz cennik <span aria-hidden="true">→</span></Link>
        </div>
        <small>{photoboothPricing.transportNote}</small>
      </div>
      <div className="home-photobooth__visual">
        <Image src={scene.image} alt={scene.alt} fill sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1288px) 68vw, 843px" />
        <span className="home-photobooth__caption">Scenografia disco · wizualizacja</span>
      </div>
    </section>
  );
}

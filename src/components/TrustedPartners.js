import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { BUSINESS } from "@/lib/seo";
import "@/styles/o-nas.scss";

const partners = [
  ["/images/zaufali/miasta-i-gminy.webp", "Miasta i gminy"],
  ["/images/zaufali/domy-kultury.webp", "Domy kultury"],
  ["/images/zaufali/hotele-i-restauracje.webp", "Hotele i restauracje"],
  ["/images/zaufali/sale-zabaw.webp", "Sale zabaw"],
  ["/images/zaufali/szkoly-i-przedszkola.webp", "Szkoły i przedszkola"],
];

export default function TrustedPartners() {
  return (
    <>
      <div className="about-section-heading">
        <span className="about-kicker about-kicker--pink">Współpraca</span>
        <h2>Zaufali nam</h2>
        <p>
          Współpracujemy z miastami, domami kultury, hotelami, salami zabaw,
          szkołami i firmami.
        </p>
      </div>

      <div className="about-trust__grid">
        {partners.map(([icon, label]) => (
          <article key={label}>
            <span><Image src={icon} alt="" width={66} height={66} /></span>
            <p>{label}</p>
          </article>
        ))}
      </div>

      <div className="about-trust__facebook">
        <span className="about-trust__facebook-icon" aria-hidden="true">
          <FontAwesomeIcon icon={faFacebookF} />
        </span>
        <div>
          <strong>Zobacz, jak wyglądają nasze realizacje</strong>
          <p>Zdjęcia, relacje i najnowsze wydarzenia czekają w postach Nallipop.</p>
        </div>
        <a
          className="about-trust__facebook-link"
          href={BUSINESS.facebook}
          target="_blank"
          rel="noreferrer"
        >
          Zobacz posty na Facebooku
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} aria-hidden="true" />
        </a>
      </div>
    </>
  );
}

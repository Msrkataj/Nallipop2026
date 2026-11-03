import Image from "next/image";
import Link from "next/link";
import { autumnPackage, getSeasonalPackage, seasonalPackages } from "@/data/seasonal-packages";

export default function AutumnPackageBanner({ selectedPackage, onChange }) {
  const pack = getSeasonalPackage(selectedPackage) || autumnPackage;
  const halloween = pack.variant === "halloween";
  return (
    <section className={`autumn-package-banner${selectedPackage ? " is-selected" : ""}${halloween ? " is-halloween" : ""}`} id="pakiet-sezonowy" aria-labelledby="autumn-banner-title">
      <div className="autumn-package-banner__image">
        <Image src={pack.image} alt={halloween ? "Kula halloweenowa z duszkami, dyniami i fioletowymi światłami" : "Jesienna kula wśród dyń, kolorowych liści i ciepłych światełek"} fill sizes="(max-width: 700px) 90vw, 480px" />
        <span>Jedna kula. Dwa magiczne światy.</span>
      </div>
      <div className="autumn-package-banner__copy">
        <span className="autumn-package-banner__eyebrow">{pack.dateLabel}</span>
        <h2 id="autumn-banner-title">{halloween ? "Dodaj strrrasznie dużo frajdy!" : "Zaproś dzieci do świata małych zachwytów"}</h2>
        <p>{halloween ? "Duszki, nietoperze i tematyczne warsztaty Halloween wewnątrz kuli." : "Złote liście, ciepłe światełka i tematyczne warsztaty wewnątrz jesiennej kuli."} Animacje, aranżacja i pełna obsługa. Do 12 dzieci jednocześnie w środku.</p>
        <div className="autumn-package-banner__price"><strong>2 godziny</strong><span>animacji i warsztatów w kuli</span></div>
        <fieldset className="autumn-package-banner__variants">
          <legend>Wybierz klimat swojego pakietu</legend>
          {seasonalPackages.map((item) => <label key={item.id} className={selectedPackage === item.id ? "is-active" : ""}><input type="radio" name="seasonalPackage" value={item.id} checked={selectedPackage === item.id} onChange={() => onChange(item.id)} /><span>{item.label}</span></label>)}
          <label className="autumn-package-banner__none"><input type="radio" name="seasonalPackage" value="" checked={!selectedPackage} onChange={() => onChange("")} /><span>Bez pakietu sezonowego</span></label>
        </fieldset>
        <Link href={pack.path} target="_blank" rel="noopener noreferrer">Poznaj cały pakiet <span aria-hidden="true">↗</span><span className="autumn-package-banner__sr"> (otwiera się w nowej karcie)</span></Link>
      </div>
    </section>
  );
}

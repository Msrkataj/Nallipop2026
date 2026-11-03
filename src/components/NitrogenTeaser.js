import Image from "next/image";
import Link from "next/link";
import { nitrogen } from "@/data/liquid-nitrogen";
import "@/styles/nitrogen-teaser.scss";

export default function NitrogenTeaser() {
  return <section className="nitrogen-teaser" aria-label="Pokazy ciekłego azotu">
    <div className="nitrogen-teaser__visual"><Image src={nitrogen.image} alt="Widowiskowa mgła podczas pokazu ciekłego azotu" fill sizes="(max-width: 700px) 100vw, 55vw" /></div>
    <div className="nitrogen-teaser__copy"><span>Nallipop Science Show</span><h2>Małe dzieci.<br />Wielkie <em>WOOOW!</em></h2><p>Ciekły azot, mroźne metamorfozy i nauka, która zachwyca. Odkryj pokaz na urodziny, do szkoły i na Wasze wydarzenie.</p><Link href={nitrogen.path}>Odkryj ciekły azot <span aria-hidden="true">↗</span></Link></div>
    <span className="nitrogen-teaser__temperature" aria-hidden="true">−196°</span>
  </section>;
}

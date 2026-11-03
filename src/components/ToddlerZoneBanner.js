import Image from "next/image";
import Link from "next/link";
import { toddlerZone as zone } from "@/data/toddler-zone";
import "@/styles/toddler-zone-banner.scss";

export default function ToddlerZoneBanner() {
  return <section className="toddler-banner" aria-labelledby="toddler-banner-title"><div className="toddler-banner__photo"><Image src={zone.image} alt={zone.imageAlt} fill sizes="(max-width: 650px) 100vw, 280px" /><span>{zone.age}</span></div><div className="toddler-banner__copy"><span>Nowa dodatkowa atrakcja</span><h2 id="toddler-banner-title">Strefa malucha.<br />Małe kroki, wielka radość.</h2><p>Suchy basen, miękkie klocki, maty i mała zjeżdżalnia. Własny kawałek imprezy dla najmłodszych.</p></div><Link href={zone.path}>Poznaj strefę <span aria-hidden="true">↗</span></Link></section>;
}

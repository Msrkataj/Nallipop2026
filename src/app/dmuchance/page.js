import OfferExperience from "@/components/OfferExperience";
import JsonLd from "@/components/JsonLd";
import { createBreadcrumbSchema, createPageMetadata, createServiceSchema } from "@/lib/seo";
import "@/styles/oferta.scss";

const description = "Wynajem dmuchańców w Warszawie i okolicach: Safari, Tropic i Bubble House z pełną obsługą. Poznaj zdjęcia, filmy, wymiary i cennik od 500 zł.";

export const metadata = createPageMetadata({
  title: "Wynajem dmuchańców Warszawa – Safari, Tropic i Bubble House",
  description,
  path: "/dmuchance",
  image: "/images/dmuchance/hero-safari.webp",
  imageWidth: 1672,
  imageHeight: 941,
  imageAlt: "Kolorowa zabawa na dmuchańcu Safari",
});

export default function DmuchancePage() {
  return <>
    <OfferExperience inflatablesOnly />
    <JsonLd data={[
      createBreadcrumbSchema("Wynajmij dmuchańca", "/dmuchance"),
      createServiceSchema({ name: "Wynajem dmuchańców Nallipop", description, path: "/dmuchance", serviceTypes: ["Wynajem dmuchańca Safari", "Wynajem dmuchańca Tropic", "Bubble House z pełną obsługą"] }),
    ]} />
  </>;
}

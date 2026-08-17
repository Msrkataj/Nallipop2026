import JsonLd from "@/components/JsonLd";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  createServiceSchema,
} from "@/lib/seo";
import "@/styles/oferta.scss";

const description =
  "Poznaj ofertę Nallipop: animacje na urodziny, wesela, festyny i eventy, kreatywne warsztaty, półkolonie oraz dmuchańce w Warszawie i okolicach.";

export const metadata = createPageMetadata({
  title: "Oferta animacji dla dzieci w Warszawie",
  description,
  path: "/oferta",
  image: "/images/oferta/service-urodziny.webp",
  imageAlt: "Oferta animacji urodzinowych dla dzieci Nallipop",
  imageWidth: 1254,
  imageHeight: 1254,
  keywords: ["animacje dla dzieci Warszawa", "animator na urodziny", "dmuchańce Warszawa", "warsztaty dla dzieci"],
});

const schema = [
  createBreadcrumbSchema("Oferta", "/oferta"),
  createServiceSchema({
    name: "Animacje i atrakcje dla dzieci Nallipop",
    description,
    path: "/oferta",
    serviceTypes: ["Animacje dla dzieci", "Warsztaty kreatywne", "Dmuchańce", "Obsługa imprez dla dzieci"],
  }),
];

export default function OfertaLayout({ children }) {
  return <>{children}<JsonLd data={schema} /></>;
}

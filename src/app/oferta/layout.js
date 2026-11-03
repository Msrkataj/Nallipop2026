import JsonLd from "@/components/JsonLd";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  createServiceSchema,
} from "@/lib/seo";
import "@/styles/oferta.scss";

const description =
  "Animacje dla dzieci w Warszawie już od 150 zł: urodziny, wesela, festyny i warsztaty. W ofercie także fotobudka, dmuchańce, Strefa malucha i atrakcje dodatkowe.";

export const metadata = createPageMetadata({
  title: "Animacje dla dzieci Warszawa już od 150 zł – oferta",
  description,
  path: "/oferta",
  image: "/images/oferta/service-urodziny.webp",
  imageAlt: "Oferta animacji urodzinowych dla dzieci Nallipop",
  imageWidth: 1254,
  imageHeight: 1254,
  keywords: [
    "animacje dla dzieci Warszawa",
    "animator na urodziny Warszawa",
    "animator dla dzieci na wesele",
    "animacje na festyn",
    "animacje na event firmowy",
    "warsztaty dla dzieci Warszawa",
    "wynajem dmuchańców Warszawa",
    "atrakcje na urodziny dla dzieci",
  ],
});

const schema = [
  createBreadcrumbSchema("Oferta", "/oferta"),
  createServiceSchema({
    name: "Animacje i atrakcje dla dzieci Nallipop",
    description,
    path: "/oferta",
    serviceTypes: [
      "Fotobudka na imprezy",
      "Animacje na urodziny dla dzieci",
      "Warsztaty kreatywne dla dzieci",
      "Animacje na wesela",
      "Animacje na festyny i pikniki",
      "Animacje na eventy firmowe",
      "Zajęcia na półkolonie",
      "Wynajem dmuchańców",
    ],
  }),
];

export default function OfertaLayout({ children }) {
  return <>{children}<JsonLd data={schema} /></>;
}

import JsonLd from "@/components/JsonLd";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  createServiceSchema,
} from "@/lib/seo";
import "@/styles/atrakcje.scss";

const description =
  "Wybierz atrakcje dla dzieci na urodziny i imprezy: eksperymenty, suchy lód, piniaty na zamówienie, zamykanie w bańce, slime, bańki XXL i więcej.";

export const metadata = createPageMetadata({
  title: "Atrakcje dla dzieci na imprezy i urodziny",
  description,
  path: "/atrakcje",
  image: "/images/atrakcje/main.jpg",
  imageAlt: "Atrakcje i zabawy dla dzieci Nallipop",
  imageWidth: 2048,
  imageHeight: 1365,
  keywords: ["atrakcje dla dzieci", "piniaty na zamówienie", "zamykanie w bańce mydlanej", "bańki XXL", "malowanie twarzy Warszawa"],
});

const schema = [
  createBreadcrumbSchema("Atrakcje", "/atrakcje"),
  createServiceSchema({
    name: "Atrakcje dla dzieci Nallipop",
    description,
    path: "/atrakcje",
    serviceTypes: ["Eksperymenty", "Piniaty na zamówienie", "Zamykanie w bańce mydlanej", "Bańki XXL", "Warsztaty slime", "Malowanie twarzy"],
  }),
];

export default function AtrakcjeLayout({ children }) {
  return <>{children}<JsonLd data={schema} /></>;
}

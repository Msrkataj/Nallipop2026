import JsonLd from "@/components/JsonLd";
import { BUSINESS, createBreadcrumbSchema, createPageMetadata, SITE_URL } from "@/lib/seo";
import "@/styles/kontakt.scss";

export const metadata = createPageMetadata({
  title: "Kontakt – animacje dla dzieci Warszawa",
  description: `Skontaktuj się z Nallipop i zapytaj o animacje, warsztaty lub dmuchańce. Telefon: ${BUSINESS.telephone}, e-mail: ${BUSINESS.email}.`,
  path: "/kontakt",
  imageAlt: "Kontakt z Nallipop – animacje dla dzieci",
  keywords: ["kontakt animator dla dzieci", "animacje dla dzieci Warszawa kontakt", "Nallipop kontakt"],
});

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/kontakt#webpage`,
  url: `${SITE_URL}/kontakt`,
  name: "Kontakt z Nallipop",
  inLanguage: "pl-PL",
  about: { "@id": `${SITE_URL}/#organization` },
};

export default function KontaktLayout({ children }) {
  return <>{children}<JsonLd data={[createBreadcrumbSchema("Kontakt", "/kontakt"), contactSchema]} /></>;
}

import JsonLd from "@/components/JsonLd";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";
import "@/styles/rezerwacja.scss";

export const metadata = createPageMetadata({
  title: "Rezerwacja terminu animacji dla dzieci",
  description: "Zarezerwuj termin animacji, warsztatów, dmuchańca lub dodatkowych atrakcji Nallipop na urodziny, wesele, piknik albo inne wydarzenie.",
  path: "/formularz-rezerwacji",
  imageAlt: "Rezerwacja animacji dla dzieci Nallipop",
  keywords: ["rezerwacja animatora dla dzieci", "zarezerwuj animacje Warszawa", "termin animacji dla dzieci"],
});

export default function RezerwacjaLayout({ children }) {
  return <>{children}<JsonLd data={createBreadcrumbSchema("Rezerwacja terminu", "/formularz-rezerwacji")} /></>;
}

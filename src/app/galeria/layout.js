import JsonLd from "@/components/JsonLd";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";
import "@/styles/galeria.scss";

export const metadata = createPageMetadata({
  title: "Galeria realizacji animacji dla dzieci",
  description: "Zobacz zdjęcia i filmy z animacji, warsztatów, atrakcji oraz imprez dla dzieci zrealizowanych przez Nallipop w Warszawie i okolicach.",
  path: "/galeria",
  imageAlt: "Galeria realizacji animacji dla dzieci Nallipop",
  keywords: ["galeria animacji dla dzieci", "animacje dla dzieci zdjęcia", "realizacje Nallipop"],
});

export default function GaleriaLayout({ children }) {
  return <>{children}<JsonLd data={createBreadcrumbSchema("Galeria", "/galeria")} /></>;
}

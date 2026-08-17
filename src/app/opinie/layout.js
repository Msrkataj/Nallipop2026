import JsonLd from "@/components/JsonLd";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";
import "@/styles/opinie.scss";

export const metadata = createPageMetadata({
  title: "Opinie klientów o animacjach dla dzieci",
  description: "Przeczytaj prawdziwe opinie rodziców i klientów o animacjach, warsztatach i atrakcjach Nallipop oraz zobacz wyróżnienie Top Wykonawca Fixly.",
  path: "/opinie",
  image: "/images/fixly2024.jpg",
  imageAlt: "Nallipop – Top Wykonawca Fixly 2024",
  imageWidth: 1500,
  imageHeight: 1500,
  keywords: ["Nallipop opinie", "animator dla dzieci opinie", "animacje dla dzieci Warszawa opinie"],
});

export default function OpinieLayout({ children }) {
  return <>{children}<JsonLd data={createBreadcrumbSchema("Opinie", "/opinie")} /></>;
}

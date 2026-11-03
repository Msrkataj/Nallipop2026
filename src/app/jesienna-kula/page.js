import JsonLd from "@/components/JsonLd";
import SeasonalSphereExperience from "@/components/SeasonalSphereExperience";
import { autumnPackage, halloweenPackage } from "@/data/seasonal-packages";
import { createBreadcrumbSchema, createPageMetadata, createServiceSchema } from "@/lib/seo";
import "@/styles/autumn-package.scss";

const description = "Jesienna lub halloweenowa kula: 2 godziny animacji i tematycznych warsztatów wewnątrz kuli. Do 12 dzieci jednocześnie. Warszawa i okolice.";
export const metadata = createPageMetadata({ title: "Jesienna i halloweenowa kula – animacje i warsztaty", description, path: autumnPackage.path, image: autumnPackage.image, imageWidth: 1448, imageHeight: 1086, imageAlt: "Kula Nallipop na tematyczne warsztaty dla dzieci" });

export default async function AutumnPackagePage({ searchParams }) {
  const params = await searchParams;
  const initialVariant = params?.wariant === "halloween" ? "halloween" : "jesien";
  return <>
    <SeasonalSphereExperience initialVariant={initialVariant} key={initialVariant} />
    <JsonLd data={[createBreadcrumbSchema("Jesienna i halloweenowa kula", autumnPackage.path), createServiceSchema({ name: "Tematyczne warsztaty i animacje w kuli Nallipop", description, path: autumnPackage.path, serviceTypes: [autumnPackage.name, halloweenPackage.name] })]} />
  </>;
}

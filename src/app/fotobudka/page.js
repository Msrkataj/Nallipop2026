import JsonLd from "@/components/JsonLd";
import PhotoboothExperience from "@/components/PhotoboothExperience";
import { photobooth, photoboothScenes, photoboothFaqs, getPhotoboothScene } from "@/data/photobooth";
import { absoluteUrl, createPageMetadata, createServiceSchema } from "@/lib/seo";
import "@/styles/photobooth.scss";

export const metadata = createPageMetadata({
  title: "Fotobudka Warszawa – wesela, urodziny i inne wydarzenia",
  description: photobooth.description,
  path: photobooth.path,
  image: photoboothScenes[0].image,
  imageWidth: 1536,
  imageHeight: 1024,
  imageAlt: photoboothScenes[0].alt,
  keywords: ["fotobudka Warszawa", "fotobudka na wesele", "fotobudka na komunię", "fotobudka Mikołajki", "fotobudka na urodziny", "fotobudka na event firmowy"],
});

export default async function PhotoboothPage({ searchParams }) {
  const params = await searchParams;
  const scene = getPhotoboothScene(params?.okazja);
  return <>
    <PhotoboothExperience initialScene={scene.id} key={scene.id} />
    <JsonLd data={[
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ name: "Strona główna", path: "/" }, { name: "Atrakcje", path: "/atrakcje" }, { name: photobooth.name, path: photobooth.path }].map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.path) })) },
      createServiceSchema({ name: "Fotobudka Nallipop na imprezy", description: photobooth.description, path: photobooth.path, serviceTypes: ["Fotobudka na wesele", "Fotobudka na komunię", "Fotobudka na Mikołajki", "Fotobudka na urodziny", "Fotobudka na event firmowy"] }),
      { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: photoboothFaqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    ]} />
  </>;
}

import { absoluteUrl } from "@/lib/seo";

export default function sitemap() {
  const lastModified = new Date();
  const pages = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/oferta", changeFrequency: "monthly", priority: 0.9 },
    { path: "/atrakcje", changeFrequency: "monthly", priority: 0.9 },
    { path: "/galeria", changeFrequency: "weekly", priority: 0.8 },
    { path: "/opinie", changeFrequency: "monthly", priority: 0.8 },
    { path: "/o-nas", changeFrequency: "yearly", priority: 0.6 },
    { path: "/kontakt", changeFrequency: "yearly", priority: 0.7 },
    { path: "/formularz-rezerwacji", changeFrequency: "monthly", priority: 0.7 },
    { path: "/regulamin", changeFrequency: "yearly", priority: 0.4 },
    { path: "/polityka-prywatnosci", changeFrequency: "yearly", priority: 0.4 },
    { path: "/zgody-i-wizerunek", changeFrequency: "yearly", priority: 0.4 },
  ];

  return pages.map(({ path, ...settings }) => ({
    url: absoluteUrl(path),
    lastModified,
    ...settings,
  }));
}

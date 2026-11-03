import { absoluteUrl } from "@/lib/seo";
import { blogPosts } from "@/data/blog-posts";

export default function sitemap() {
  const lastModified = new Date();
  const pages = [
    { path: "/fotobudka", changeFrequency: "monthly", priority: 0.9 },
    { path: "/strefa-malucha", changeFrequency: "monthly", priority: 0.85 },
    { path: "/ciekly-azot", changeFrequency: "monthly", priority: 0.9 },
    { path: "/ciekly-azot/urodziny", changeFrequency: "monthly", priority: 0.85 },
    { path: "/ciekly-azot/szkoly-i-przedszkola", changeFrequency: "monthly", priority: 0.85 },
    { path: "/kreatywne-laboratorium", changeFrequency: "monthly", priority: 0.85 },
    { path: "/mikolaj", changeFrequency: "monthly", priority: 0.85 },
    { path: "/malowanie-dyni", changeFrequency: "monthly", priority: 0.85 },
    { path: "/jesienna-kula", changeFrequency: "monthly", priority: 0.85 },
    { path: "/dmuchance", changeFrequency: "monthly", priority: 0.9 },
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/oferta", changeFrequency: "monthly", priority: 0.9 },
    { path: "/atrakcje", changeFrequency: "monthly", priority: 0.9 },
    { path: "/galeria", changeFrequency: "weekly", priority: 0.8 },
    { path: "/opinie", changeFrequency: "monthly", priority: 0.8 },
    { path: "/o-nas", changeFrequency: "yearly", priority: 0.6 },
    { path: "/kontakt", changeFrequency: "yearly", priority: 0.7 },
    { path: "/formularz-rezerwacji", changeFrequency: "monthly", priority: 0.7 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { path: "/regulamin", changeFrequency: "yearly", priority: 0.4 },
    { path: "/polityka-prywatnosci", changeFrequency: "yearly", priority: 0.4 },
    { path: "/zgody-i-wizerunek", changeFrequency: "yearly", priority: 0.4 },
  ];

  const staticPages = pages.map(({ path, ...settings }) => ({
    url: absoluteUrl(path),
    lastModified,
    ...settings,
  }));

  const articles = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticPages, ...articles];
}

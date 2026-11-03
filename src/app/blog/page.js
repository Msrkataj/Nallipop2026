import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageDecorations from "@/components/PageDecorations";
import { blogPosts } from "@/data/blog-posts";
import { resolveBlogPostsImages } from "@/lib/blog-storage";
import { absoluteUrl, createPageMetadata, SITE_NAME } from "@/lib/seo";

export const revalidate = 300;

const description =
  "Poradniki Nallipop dla rodziców: organizacja urodzin dziecka, ceny animatorów oraz pomysły na zabawy i atrakcje dla dzieci.";

export const metadata = createPageMetadata({
  title: "Blog o animacjach i organizacji imprez dla dzieci",
  description,
  path: "/blog",
  image: "/images/oferta/service-urodziny.webp",
  imageAlt: "Poradniki Nallipop o organizacji imprez dla dzieci",
  imageWidth: 1254,
  imageHeight: 1254,
  keywords: [
    "blog dla rodziców",
    "organizacja urodzin dziecka",
    "atrakcje na urodziny dla dzieci",
    "animator dla dzieci Warszawa",
  ],
});

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${absoluteUrl("/blog")}#blog`,
  name: "Poradniki Nallipop",
  description,
  url: absoluteUrl("/blog"),
  publisher: { "@id": `${absoluteUrl("/")}#organization` },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    url: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: SITE_NAME },
  })),
};

export default async function BlogPage() {
  const posts = await resolveBlogPostsImages(blogPosts);

  return (
    <main className="blog-page decorated-page">
      <PageDecorations variant="home" />
      <JsonLd data={blogSchema} />

      <section className="blog-hero">
        <div className="container blog-hero__inner">
          <nav className="offer-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Strona główna</Link>
            <span aria-hidden="true">›</span>
            <span>Blog</span>
          </nav>
          <span className="section-kicker">Poradniki Nallipop</span>
          <h1>Pomysły na udane imprezy dla dzieci</h1>
          <p>
            Konkretne odpowiedzi na pytania rodziców: jak zaplanować urodziny,
            dobrać animatora i wybrać atrakcje, które zaangażują całą grupę.
          </p>
        </div>
      </section>

      <section className="blog-listing" aria-labelledby="blog-list-title">
        <div className="container">
          <div className="blog-listing__heading">
            <span className="section-kicker">Najnowsze artykuły</span>
            <h2 id="blog-list-title">Przeczytaj i zaplanuj wydarzenie bez stresu</h2>
          </div>

          <div className="blog-grid">
            {posts.map((post, index) => (
              <article className={`blog-card ${index === 0 ? "blog-card--featured" : ""}`} key={post.slug}>
                <Link className="blog-card__image" href={`/blog/${post.slug}`}>
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    width={1254}
                    height={900}
                    priority={index === 0}
                  />
                </Link>
                <div className="blog-card__content">
                  <div className="blog-card__meta">
                    <span>{post.category}</span>
                    <time dateTime={post.publishedAt}>27 sierpnia 2026</time>
                    <span>{post.readTime}</span>
                  </div>
                  <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
                  <p>{post.excerpt}</p>
                  <Link className="blog-card__link" href={`/blog/${post.slug}`}>
                    Czytaj artykuł <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-cta">
        <div className="container blog-cta__inner">
          <div>
            <span className="section-kicker">Masz już pomysł?</span>
            <h2>Zarezerwuj animacje już od 150 zł</h2>
            <p>Opisz wydarzenie, a przygotujemy program i dobierzemy atrakcje dodatkowe.</p>
          </div>
          <div>
            <Link className="button button--primary" href="/formularz-rezerwacji">
              Zapytaj o termin <span aria-hidden="true">→</span>
            </Link>
            <Link className="button button--light" href="/oferta">Zobacz ofertę</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

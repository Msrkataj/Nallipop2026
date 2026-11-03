import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PageDecorations from "@/components/PageDecorations";
import { blogPosts, getBlogPost } from "@/data/blog-posts";
import { resolveBlogImage, resolveBlogPostsImages } from "@/lib/blog-storage";
import { absoluteUrl, createPageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

export const revalidate = 300;

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const image = await resolveBlogImage(post);

  return createPageMetadata({
    title: post.seoTitle,
    description: post.description,
    path: `/blog/${post.slug}`,
    image,
    imageAlt: post.imageAlt,
    imageWidth: 1254,
    imageHeight: 900,
    keywords: post.keywords,
  });
}

function createArticleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(`/blog/${post.slug}`)}#article`,
    headline: post.title,
    description: post.description,
    image: absoluteUrl(post.image),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: "pl-PL",
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

function createFaqSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

function createBreadcrumbSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Strona główna", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(`/blog/${post.slug}`) },
    ],
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const image = await resolveBlogImage(post);
  const resolvedPost = { ...post, image };
  const relatedPosts = await resolveBlogPostsImages(blogPosts.filter((item) => item.slug !== post.slug));

  return (
    <main className="article-page decorated-page">
      <PageDecorations variant="home" />
      <JsonLd data={[createArticleSchema(resolvedPost), createFaqSchema(post), createBreadcrumbSchema(post)]} />

      <article>
        <header className="article-hero">
          <div className="container article-hero__grid">
            <div className="article-hero__copy">
              <nav className="offer-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Strona główna</Link>
                <span aria-hidden="true">›</span>
                <Link href="/blog">Blog</Link>
                <span aria-hidden="true">›</span>
                <span>{post.category}</span>
              </nav>
              <span className="section-kicker">{post.category}</span>
              <h1>{post.title}</h1>
              <p>{post.description}</p>
              <div className="article-hero__meta">
                <time dateTime={post.publishedAt}>27 sierpnia 2026</time>
                <span>{post.readTime}</span>
                <span>Autor: Nallipop</span>
              </div>
            </div>
            <div className="article-hero__image">
              <Image src={image} alt={post.imageAlt} width={1254} height={900} priority />
            </div>
          </div>
        </header>

        <div className="container article-layout">
          <aside className="article-toc">
            <span>W artykule</span>
            <nav aria-label="Spis treści">
              {post.sections.map((section) => (
                <a href={`#${section.id}`} key={section.id}>{section.title}</a>
              ))}
              <a href="#najczestsze-pytania">Najczęstsze pytania</a>
            </nav>
          </aside>

          <div className="article-content">
            <section className="article-lead">
              {post.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>

            {post.sections.map((section) => (
              <section className="article-section" id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && (
                  <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                )}
              </section>
            ))}

            <aside className="article-inline-cta">
              <div>
                <h2>Chcesz otrzymać propozycję na swoje wydarzenie?</h2>
                <p>Animacje już od 150 zł. Podaj termin, miejsce i wiek dzieci — wrócimy z dopasowaną ofertą.</p>
              </div>
              <Link className="button button--primary" href="/formularz-rezerwacji">
                Zapytaj o termin <span aria-hidden="true">→</span>
              </Link>
            </aside>

            <section className="article-faq" id="najczestsze-pytania">
              <span className="section-kicker">FAQ</span>
              <h2>Najczęściej zadawane pytania</h2>
              <div>
                {post.faq.map(({ question, answer }) => (
                  <details key={question}>
                    <summary>{question}</summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>

      <section className="related-posts" aria-labelledby="related-posts-title">
        <div className="container">
          <h2 id="related-posts-title">Przeczytaj także</h2>
          <div className="related-posts__grid">
            {relatedPosts.map((related) => (
              <article key={related.slug}>
                <Image src={related.image} alt="" width={480} height={300} />
                <div>
                  <span>{related.category}</span>
                  <h3><Link href={`/blog/${related.slug}`}>{related.title}</Link></h3>
                  <Link href={`/blog/${related.slug}`}>Czytaj dalej →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

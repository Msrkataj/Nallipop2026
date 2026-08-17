export const SITE_NAME = "Nallipop";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://kamalogic-test.pl").replace(/\/$/, "");
export const DEFAULT_DESCRIPTION =
  "Animacje, warsztaty, dmuchańce i atrakcje dla dzieci w Warszawie i okolicach. Tworzymy pełne radości urodziny, wesela, pikniki i eventy.";
export const DEFAULT_IMAGE = "/images/hero-kids.webp";

export const BUSINESS = {
  name: SITE_NAME,
  email: "animacje@nallipop.pl",
  telephone: "+48 795 103 108",
  area: "Warszawa i okolice",
  facebook: "https://www.facebook.com/p/Nallipop-100090355616685/",
  instagram: "https://www.instagram.com/animacje_nallipop/",
  tiktok: "https://www.tiktok.com/@animacje_nallipop",
  youtube: "https://www.youtube.com/@NallipopChannel",
};

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  imageAlt = "Animacje dla dzieci Nallipop",
  imageWidth = 1875,
  imageHeight = 839,
  keywords = [],
  noIndex = false,
}) {
  const socialTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    keywords,
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title: socialTitle,
      description,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      locale: "pl_PL",
      type: "website",
      images: [
        {
          url: image,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}

export function createBreadcrumbSchema(name, path) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Strona główna",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: absoluteUrl(path),
      },
    ],
  };
}

export function createServiceSchema({ name, description, path, serviceTypes = [] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    description,
    url: absoluteUrl(path),
    serviceType: serviceTypes,
    areaServed: {
      "@type": "AdministrativeArea",
      name: BUSINESS.area,
    },
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

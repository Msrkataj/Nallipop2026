import "@/styles/globals.scss";
import Header from "@/components/Header";
import { Inter, Poppins } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import JsonLd from "@/components/JsonLd";
import { ConsentProvider } from "@/components/ConsentProvider";
import CookieConsent from "@/components/CookieConsent";
import GoogleAnalyticsConsent from "@/components/GoogleAnalyticsConsent";
import LegalFooter from "@/components/LegalFooter";
import {
    absoluteUrl,
    BUSINESS,
    DEFAULT_DESCRIPTION,
    DEFAULT_IMAGE,
    SITE_NAME,
    SITE_URL,
} from "@/lib/seo";

config.autoAddCss = false;

const inter = Inter({
    subsets: ["latin", "latin-ext"],
    variable: "--font-inter",
});

const poppins = Poppins({
    subsets: ["latin", "latin-ext"],
    variable: "--font-poppins",
    weight: ["700", "800", "900"],
});

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Animacje dla dzieci Warszawa | Nallipop",
        template: "%s | Nallipop",
    },
    description: DEFAULT_DESCRIPTION,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "Animacje i atrakcje dla dzieci",
    referrer: "origin-when-cross-origin",
    alternates: {
        canonical: "/",
    },
    robots: {
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
    icons: {
        icon: [
            { url: "/images/favicon/favicon.ico" },
            { url: "/images/favicon/favicon.svg", type: "image/svg+xml" },
            { url: "/images/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        ],
        apple: [
            { url: "/images/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
    },
    manifest: "/images/favicon/site.webmanifest",
    openGraph: {
        title: "Animacje dla dzieci Warszawa | Nallipop",
        description: DEFAULT_DESCRIPTION,
        url: SITE_URL,
        siteName: SITE_NAME,
        locale: "pl_PL",
        type: "website",
        images: [
            {
                url: DEFAULT_IMAGE,
                width: 1875,
                height: 839,
                alt: "Radosne animacje dla dzieci Nallipop",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Animacje dla dzieci Warszawa | Nallipop",
        description: DEFAULT_DESCRIPTION,
        images: [DEFAULT_IMAGE],
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#16c9c3",
    colorScheme: "light",
};

const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: SITE_NAME,
            alternateName: "Nalli pop",
            inLanguage: "pl-PL",
            publisher: { "@id": `${SITE_URL}/#organization` },
        },
        {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: SITE_NAME,
            url: SITE_URL,
            logo: {
                "@type": "ImageObject",
                url: absoluteUrl("/images/logo.png"),
                width: 768,
                height: 866,
            },
            image: absoluteUrl(DEFAULT_IMAGE),
            description: DEFAULT_DESCRIPTION,
            email: BUSINESS.email,
            telephone: BUSINESS.telephone,
            areaServed: BUSINESS.area,
            contactPoint: {
                "@type": "ContactPoint",
                contactType: "obsługa klienta",
                telephone: BUSINESS.telephone,
                email: BUSINESS.email,
                areaServed: "PL",
                availableLanguage: "pl",
            },
            sameAs: [BUSINESS.facebook, BUSINESS.instagram, BUSINESS.tiktok, BUSINESS.youtube],
        },
    ],
};

export default function RootLayout({ children }) {
    return (
        <html lang="pl">
        <body className={`${inter.variable} ${poppins.variable}`}>
        <ConsentProvider>
            <JsonLd data={organizationSchema} />
            <GoogleAnalyticsConsent />
            <Header />
            {children}
            <LegalFooter />
            <CookieConsent />
        </ConsentProvider>
        </body>
        </html>
    );
}

import "@/styles/globals.scss";
import Header from "@/components/Header";
import Script from "next/script";
import { Inter, Poppins } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import JsonLd from "@/components/JsonLd";
import { ConsentProvider } from "@/components/ConsentProvider";
import CookieConsent from "@/components/CookieConsent";
import GoogleAnalyticsConsent from "@/components/GoogleAnalyticsConsent";
import GoogleAdsPhoneTracking from "@/components/GoogleAdsPhoneTracking";
import LegalFooter from "@/components/LegalFooter";
import { CONSENT_STORAGE_KEY, CONSENT_VERSION } from "@/lib/consent";
import {
    absoluteUrl,
    BUSINESS,
    DEFAULT_DESCRIPTION,
    DEFAULT_IMAGE,
    SITE_NAME,
    SITE_URL,
} from "@/lib/seo";

config.autoAddCss = false;

const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "G-NN5Q100TDG";
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18398709233";

const GOOGLE_TAG_BOOTSTRAP = `
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);};
    var nallipopSavedConsent = null;
    try {
        nallipopSavedConsent = JSON.parse(
            window.localStorage.getItem('${CONSENT_STORAGE_KEY}')
        );
        if (
            !nallipopSavedConsent ||
            nallipopSavedConsent.version !== '${CONSENT_VERSION}' ||
            nallipopSavedConsent.necessary !== true
        ) {
            nallipopSavedConsent = null;
        }
    } catch (error) {
        nallipopSavedConsent = null;
    }
    window.gtag('consent', 'default', {
        analytics_storage: nallipopSavedConsent && nallipopSavedConsent.analytics ? 'granted' : 'denied',
        ad_storage: nallipopSavedConsent && nallipopSavedConsent.marketing ? 'granted' : 'denied',
        ad_user_data: nallipopSavedConsent && nallipopSavedConsent.marketing ? 'granted' : 'denied',
        ad_personalization: nallipopSavedConsent && nallipopSavedConsent.marketing ? 'granted' : 'denied',
        wait_for_update: 500
    });
    window.gtag('js', new Date());
    window.gtag('config', '${GOOGLE_ANALYTICS_ID}', { anonymize_ip: true });
    window.gtag('config', '${GOOGLE_ADS_ID}');
`;

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
        <head>
            <script
                id="nallipop-google-tag-bootstrap"
                dangerouslySetInnerHTML={{ __html: GOOGLE_TAG_BOOTSTRAP }}
            />
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
                strategy="afterInteractive"
            />
        </head>
        <body className={`${inter.variable} ${poppins.variable}`}>
        <ConsentProvider>
            <JsonLd data={organizationSchema} />
            <GoogleAnalyticsConsent />
            <GoogleAdsPhoneTracking />
            <Header />
            {children}
            <LegalFooter />
            <CookieConsent />
        </ConsentProvider>
        </body>
        </html>
    );
}

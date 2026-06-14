import Script from "next/script";
import "../styles/globals.css";

export const metadata = {
  metadataBase: new URL("https://www.slimsubsidieadvies.nl"),
  title: {
    default: "SLIM Subsidie Aanvragen | Tot €24.999 voor MKB | SLIM Subsidie Advies",
    template: "%s | SLIM Subsidie Advies",
  },
  description:
    "Kom jij in aanmerking voor SLIM-subsidie? Tot €24.999 subsidie voor leren en ontwikkelen in uw MKB-bedrijf. Gratis quickscan, no cure no pay. Doe de check in 2 minuten.",
  keywords:
    "SLIM subsidie aanvragen, SLIM subsidie 2026, SLIM mkb subsidie, subsidie leren en ontwikkelen, subsidie opleiding personeel, SLIM subsidie adviseur, mkb subsidie scholing, SLIM regeling, subsidie leercultuur bedrijf",
  authors: [{ name: "SLIM Subsidie Advies" }],
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
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "SLIM Subsidie Advies",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  verification: {
    google: "pKxCYqiXKWkjxEUxzBARVMjvV0OfdEHerCpMPgwmxos",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SLIM Subsidie Advies",
  legalName: "Inscentia BV",
  url: "https://www.slimsubsidieadvies.nl",
  logo: "https://www.slimsubsidieadvies.nl/android-chrome-512x512.png",
  description:
    "Specialist in SLIM-subsidie voor MKB-ondernemers. Van gratis quickscan tot volledige aanvraagbegeleiding. No cure, no pay.",
  serviceType: "Subsidieadvies",
  areaServed: "NL",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Floridadreef 100",
    addressLocality: "Utrecht",
    postalCode: "3565 AM",
    addressCountry: "NL",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+31-30-88-99-045",
    email: "info@slimsubsidieadvies.nl",
    contactType: "customer service",
  },
  knowsAbout: [
    "SLIM-subsidie",
    "MKB-subsidies",
    "Leren en ontwikkelen subsidie",
    "RVO subsidies",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <head>
        <meta name="theme-color" content="#0d2e5a" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/barlow-condensed-700-latin.woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/barlow-400-latin.woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        {/* Google Tag Manager / Ads — via next/script voor optimale performance */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GT-T568ZNZ3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GT-T568ZNZ3');
            gtag('config', 'AW-18179556600');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Font: Roboto
const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cout-pompe-a-chaleur.fr'),
  title: "Prix Pompe à Chaleur 2026 - Devis Gratuit & Comparatif",
  description: "Obtenez le prix exact de votre pompe à chaleur. Comparez 3 devis d'installateurs certifiés RGE (Daikin, Atlantic, Mitsubishi, etc.) près de chez vous.",
  openGraph: {
    title: "Prix Pompe à Chaleur 2026 - Devis Gratuit & Comparatif",
    description: "Obtenez le prix exact de votre pompe-a-chaleur. Comparez 3 devis d'installateurs certifiés.",
    url: 'https://www.cout-pompe-a-chaleur.fr',
    siteName: 'Cout-Pompe-a-Chaleur.fr',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Prix Pompe à Chaleur 2026 - Devis Gratuit & Comparatif",
    description: "Obtenez le prix exact de votre pompe-a-chaleur. Comparez 3 devis d'installateurs certifiés.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Cout-Pompe-a-Chaleur.fr",
  "url": "https://www.cout-pompe-a-chaleur.fr",
  "logo": "https://www.cout-pompe-a-chaleur.fr/icon.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "areaServed": "FR",
    "availableLanguage": "French"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Cout-Pompe-a-Chaleur.fr",
  "url": "https://www.cout-pompe-a-chaleur.fr",
  "description": "Comparateur de prix et guide d'achat pour pompe-a-chaleur en France. Devis gratuits d'installateurs certifiés RGE.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.cout-pompe-a-chaleur.fr/annuaire?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${roboto.variable} font-sans antialiased text-slate-900 bg-slate-50 min-h-screen flex flex-col`}
      >
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="490067ef-024b-45c1-b8bd-dbce100285a1"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

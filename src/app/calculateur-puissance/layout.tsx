import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Calculateur Puissance PAC 2026 | Dimensionnement Gratuit",
    description: "Calculez la puissance idéale de votre pompe à chaleur (Air-Air, Air-Eau, Géothermie). Dimensionnement en kW selon votre surface, isolation et zone climatique. Outil gratuit et instantané.",
    openGraph: {
        title: "Calculateur Puissance PAC 2026 | Dimensionnement Gratuit",
        description: "Calculez la puissance idéale de votre pompe à chaleur en kW. Outil gratuit basé sur les normes RT2012/RE2020.",
    },
    alternates: {
        canonical: "https://www.cout-pompe-a-chaleur.fr/calculateur-puissance",
    },
};

const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculateur de Puissance PAC",
    url: "https://www.cout-pompe-a-chaleur.fr/calculateur-puissance",
    applicationCategory: "Utilities",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    description: "Dimensionnement gratuit de pompe à chaleur. Calcul de la puissance en kW selon la surface, l'isolation et la zone climatique.",
};

export default function CalculateurPuissanceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
            />
            {children}
        </>
    );
}

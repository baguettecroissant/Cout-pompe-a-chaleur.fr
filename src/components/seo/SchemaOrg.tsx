import { City } from "@/types";

interface SchemaOrgProps {
    city: City;
}

export function SchemaOrg({ city }: SchemaOrgProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": `Installation Pompe-a-Chaleur à ${city.name}`,
        "description": `Service d'installation et de maintenance de pompe-a-chaleur à ${city.name} (${city.zip}). Devis gratuits d'artisans certifiés RGE.`,
        "areaServed": {
            "@type": "City",
            "name": city.name,
            "address": {
                "@type": "PostalAddress",
                "postalCode": city.zip,
                "addressCountry": "FR"
            }
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": city.coordinates.lat,
            "longitude": city.coordinates.lng
        },
        "url": `https://www.cout-pompe-a-chaleur.fr/prix-pompe-a-chaleur/${city.slug}-${city.zip}`,
        "provider": {
            "@type": "Organization",
            "name": "Cout-Pompe-a-Chaleur.fr",
            "url": "https://www.cout-pompe-a-chaleur.fr"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

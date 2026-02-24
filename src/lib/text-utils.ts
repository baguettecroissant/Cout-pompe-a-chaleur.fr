import { City } from '@/types';

/**
 * Returns a random string from the provided options.
 */
export function getRandomSpintax(options: string[]): string {
    return options[Math.floor(Math.random() * options.length)];
}

/**
 * Generates an SEO-optimized intro based on city population specifically for Heat Pumps.
 */
export function getCityIntro(city: City): string {
    const pop = city.population || 0;

    // Tier 1: Major Cities (> 50k)
    if (pop > 50000) {
        const options = [
            `Moteur économique du département ${city.department_name}, l'agglomération de ${city.name} est au cœur de la rénovation énergétique avec un réseau d'artisans chauffagistes denses.`,
            `Dans la métropole dynamique de ${city.name}, de nombreux foyers font le choix de la pompe à chaleur pour faire face à la hausse des prix de l'énergie.`,
            `Le bassin de vie de ${city.name} concentre les meilleurs experts en transition thermique de la région ${city.region}, prêts à intervenir pour votre confort.`,
            `Installer une PAC en zone urbaine dense comme à ${city.name} demande un savoir-faire spécifique que maîtrisent nos partenaires certifiés RGE locaux.`
        ];
        return getRandomSpintax(options);
    }

    // Tier 2: Cities (> 10k)
    if (pop > 10000) {
        const options = [
            `Ville à forte croissance du ${city.department_name}, ${city.name} voit fleurir les projets de rénovation globale et d'installation de pompes à chaleur air-eau.`,
            `À ${city.name}, l'amélioration du DPE des logements est une priorité. Les chauffagistes de la région interviennent rapidement pour remplacer votre ancienne chaudière.`,
            `Commune stratégique de ${city.region}, ${city.name} dispose d'un réseau idéal de professionnels agréés pour le déploiement de solutions thermiques durables.`,
            `Que votre bien soit en hypercentre de ${city.name} ou dans son agglomération, optimisez votre facture d'électricité grâce à une pompe à chaleur moderne.`
        ];
        return getRandomSpintax(options);
    }

    // Tier 3: Towns (> 2k)
    if (pop > 2000) {
        const options = [
            `Le parc immobilier situé autour de ${city.name} se métamorphose. L'adoption de la pompe à chaleur y est facilitée par la présence d'installateurs de proximité.`,
            `En plein ${city.department_name}, la charmante bourgade de ${city.name} bénéficie d'une couverture complète par des experts de la rénovation énergétique.`,
            `Résider à ${city.name} ne vous empêche pas d'accéder aux technologies de chauffage de pointe, soutenues par les aides nationales (MaPrimeRénov').`,
            `Les propriétés individuelles de ${city.name} représentent un terrain idéal pour l'installation d'une pompe à chaleur aérothermique sur-mesure.`
        ];
        return getRandomSpintax(options);
    }

    // Tier 4: Villages (> 0)
    if (pop > 0) {
        const options = [
            `Dans la quiétude de ${city.name}, le remplacement des chaudières fioul par des pompes à chaleur de dernière génération s'accélère grâce aux artisans du secteur.`,
            `Au sein de la commune de ${city.name}, le confort thermique hivernal n'est plus un luxe. Nos professionnels labellisés RGE interviennent jusque dans les zones rurales de la région ${city.region}.`,
            `Vivre à ${city.name} vous donne les mêmes droits aux certificats d'économies d'énergie (CEE) que dans les grandes villes pour l'installation de votre PAC.`,
            `L'habitat en zone rurale autour de ${city.name} nécessite des solutions de chauffage performantes et économiques proposées par nos partenaires locaux.`
        ];
        return getRandomSpintax(options);
    }

    // Tier 5: Fallback / Unknown Population (0 or undefined)
    const options = [
        `Dans le département ${city.department_name}, le secteur de ${city.name} est activement couvert par notre réseau de techniciens spécialisés en pompes à chaleur.`,
        `Propriétaire à ${city.name}, lancez sereinement votre projet de transition énergétique en comparant les devis d'installateurs validés.`,
        `La localité de ${city.name} fait partie des zones d'intervention privilégiées par nos partenaires chauffagistes en région ${city.region}.`,
        `Pour chiffrer précisément votre installation à ${city.name}, appuyez-vous sur notre comparateur gratuit de professionnels certifiés du ${city.department_code}.`
    ];
    return getRandomSpintax(options);
}

import Link from "next/link";
import { Metadata } from "next";
import { BookOpen, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
    title: "Glossaire Pompe à Chaleur : Définitions et Termes Techniques",
    description: "Comprendre le vocabulaire de la pompe à chaleur : COP, PAC Air/Eau, inverter, fluide frigorigène, MaPrimeRénov'... Définitions claires.",
    openGraph: {
        title: "Glossaire Pompe à Chaleur : Termes Techniques",
        description: "Définitions claires du vocabulaire de la pompe à chaleur (PAC) : COP, inverter, aides, installation.",
    },
};

interface GlossaryTerm {
    term: string;
    definition: string;
    relatedLinks?: { text: string; href: string }[];
}

const glossaryTerms: GlossaryTerm[] = [
    {
        term: "Aérothermie",
        definition: "Principe de fonctionnement qui consiste à puiser les calories présentes dans l'air extérieur pour les restituer à l'intérieur sous forme de chaleur ou de fraîcheur.",
        relatedLinks: [{ text: "Comprendre le fonctionnement", href: "/guides" }],
    },
    {
        term: "ANAH",
        definition: "Agence Nationale de l'Habitat. Organisme public qui gère notamment MaPrimeRénov' et finance les travaux de rénovation énergétique des logements.",
        relatedLinks: [{ text: "Calculer mes aides", href: "/calculateur-aides" }],
    },
    {
        term: "Atlantic",
        definition: "Marque française leader dans les solutions de confort thermique, fabricant reconnu de pompes à chaleur air/eau (gamme Alféa).",
        relatedLinks: [{ text: "Comparer les marques", href: "/marques" }],
    },
    {
        term: "CEE (Certificats d'Économies d'Énergie)",
        definition: "Dispositif obligeant les fournisseurs d'énergie à financer des actions d'efficacité énergétique. Se traduit par la Prime Énergie versée aux particuliers.",
        relatedLinks: [{ text: "Calculer mes aides", href: "/calculateur-aides" }],
    },
    {
        term: "Compresseur",
        definition: "Élément clé de la pompe à chaleur. Il comprime le fluide frigorigène (à l'état gazeux) pour augmenter sa pression et sa température.",
    },
    {
        term: "COP (Coefficient de Performance)",
        definition: "Indicateur de performance d'une PAC. Un COP de 4 signifie que pour 1 kWh d'électricité consommé, la PAC restitue 4 kWh de chaleur. Plus il est élevé, plus le système est économique.",
    },
    {
        term: "Daikin",
        definition: "Fabricant japonais, un des leaders mondiaux de la climatisation et des pompes à chaleur (gamme Altherma).",
        relatedLinks: [{ text: "Comparer les marques", href: "/marques" }],
    },
    {
        term: "Dimensionnement",
        definition: "Étude thermique primordiale avant installation. Une PAC sous-dimensionnée chauffera mal (et utilisera trop l'appoint électrique), tandis qu'une PAC surdimensionnée s'usera prématurément (cycles courts).",
    },
    {
        term: "Fluide frigorigène",
        definition: "Gaz liquide circulant dans le circuit de la pompe à chaleur, capable de s'évaporer et de se condenser pour transporter les calories (ex: R32, R410A, R290).",
    },
    {
        term: "Garantie",
        definition: "Couverture constructeur contre les défauts de fabrication. Généralement 2 ans pour les pièces, pouvant aller jusqu'à 5 ans pour le compresseur selon les marques.",
    },
    {
        term: "Inverter",
        definition: "Technologie permettant au compresseur d'adapter sa vitesse en continu selon les besoins de chauffage, évitant les arrêts/démarrages fréquents. Réduit la consommation et améliore la longévité.",
    },
    {
        term: "MaPrimeRénov'",
        definition: "Principale aide de l'État pour la rénovation énergétique, conditionnée aux ressources du foyer. Peut financer jusqu'à plusieurs milliers d'euros pour une PAC Air/Eau ou Géothermie.",
        relatedLinks: [
            { text: "Calculer mon éligibilité", href: "/calculateur-aides" },
        ],
    },
    {
        term: "Mitsubishi Electric",
        definition: "Marque japonaise renommée pour la fiabilité de ses systèmes de pompes à chaleur (gamme Ecodan) et de climatisation.",
        relatedLinks: [{ text: "Comparer les marques", href: "/marques" }],
    },
    {
        term: "PAC Air/Air",
        definition: "Pompe à chaleur puisant les calories dans l'air extérieur pour chauffer l'air intérieur via des splits. Fait aussi office de climatisation réversible.",
        relatedLinks: [{ text: "Simuler le prix", href: "/simulateur-prix" }],
    },
    {
        term: "PAC Air/Eau",
        definition: "Pompe à chaleur transférant les calories de l'air extérieur vers le réseau d'eau de chauffage (radiateurs, plancher chauffant) ou pour l'eau chaude sanitaire.",
        relatedLinks: [{ text: "Simuler le prix", href: "/simulateur-prix" }],
    },
    {
        term: "Plancher chauffant",
        definition: "Réseau de tubes intégrés dans la dalle du sol où circule de l'eau chaude. Émetteur idéal (basse température) pour maximiser les performances d'une pompe à chaleur.",
    },
    {
        term: "Relève de chaudière",
        definition: "Système hybride où la pompe à chaleur fonctionne en priorité, la chaudière existante (fioul ou gaz) prenant le relais uniquement lors de grands froids.",
    },
    {
        term: "SAV (Service Après-Vente)",
        definition: "Service essentiel pour l'entretien bisannuel (obligatoire) et le dépannage de votre pompe à chaleur. Maintenir le fluide et nettoyer les filtres garantit la longévité.",
    },
    {
        term: "SCOP (Coefficient de Performance Saisonnier)",
        definition: "Le COP mesuré sur toute une saison de chauffe, offrant une vision plus réaliste des performances de la pompe à chaleur sur l'année.",
    },
    {
        term: "Thermostat connecté",
        definition: "Appareil permettant de piloter intelligemment sa pompe à chaleur (parfois à distance via smartphone) pour optimiser les plannings de chauffe et réduire la facture énergétique.",
    },
    {
        term: "TVA réduite",
        definition: "Les pompes à chaleur Air/Eau ou géothermiques installées par un artisan RGE bénéficient d'une TVA à 5,5% (au lieu de 20%) pour les habitations de plus de 2 ans.",
        relatedLinks: [{ text: "Calculer mes économies", href: "/calculateur-aides" }],
    },
    {
        term: "Unité extérieure",
        definition: "Module placé hors du domicile (jardin, cour, façade) contenant le ventilateur et l'évaporateur, chargé de capter les calories de l'air ambiant.",
    },
    {
        term: "Unité intérieure (Split)",
        definition: "Pour une PAC Air/Air, c'est l'élément fixé au mur à l'intérieur des pièces qui diffuse l'air chaud ou froid. Pour une Air/Eau, c'est le module hydraulique raccordé au réseau d'eau.",
    },
];

// Sort alphabetically
const sortedTerms = [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term, "fr"));

// Group by first letter
const groupedTerms = sortedTerms.reduce((acc, term) => {
    const letter = term.term[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(term);
    return acc;
}, {} as Record<string, GlossaryTerm[]>);

const letters = Object.keys(groupedTerms).sort();

export default function GlossairePage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="bg-slate-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <Breadcrumbs items={[{ label: "Glossaire" }]} />
                    <div className="max-w-3xl mx-auto text-center mt-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full mb-6">
                            <BookOpen className="h-8 w-8 text-emerald-400" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">
                            Glossaire Technique
                        </h1>
                        <p className="text-xl text-slate-300">
                            {glossaryTerms.length} définitions pour tout comprendre sur les pompes à chaleur
                        </p>
                    </div>
                </div>
            </section>

            {/* Alphabet Nav */}
            <section className="py-4 bg-white border-b border-slate-200 sticky top-16 z-40">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-1">
                        {letters.map((letter) => (
                            <a
                                key={letter}
                                href={`#lettre-${letter}`}
                                className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-emerald-500 hover:text-white rounded font-bold text-sm text-slate-700 transition-colors"
                            >
                                {letter}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Terms */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    {letters.map((letter) => (
                        <div key={letter} id={`lettre-${letter}`} className="mb-12 scroll-mt-32">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="w-12 h-12 flex items-center justify-center bg-emerald-500 text-white rounded-xl text-2xl font-bold">
                                    {letter}
                                </span>
                                <div className="h-px flex-1 bg-slate-200" />
                            </div>

                            <div className="space-y-4">
                                {groupedTerms[letter].map((item) => (
                                    <div
                                        key={item.term}
                                        className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                                    >
                                        <h3 className="font-bold text-lg text-slate-900 mb-2">{item.term}</h3>
                                        <p className="text-slate-600 mb-3">{item.definition}</p>
                                        {item.relatedLinks && (
                                            <div className="flex flex-wrap gap-2">
                                                {item.relatedLinks.map((link, i) => (
                                                    <Link
                                                        key={i}
                                                        href={link.href}
                                                        className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                                                    >
                                                        {link.text}
                                                        <ArrowRight className="h-3 w-3" />
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Prêt à passer à l'action ?</h2>
                    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                        Maintenant que vous maîtrisez le vocabulaire, obtenez des devis personnalisés.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/devis">
                            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 h-14 rounded-full shadow-lg">
                                Demander des devis
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/outils">
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 h-14 rounded-full">
                                Utiliser nos outils gratuits
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Related */}
            <section className="py-12 bg-white border-t border-slate-200">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Ressources complémentaires</h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            { href: "/faq", title: "FAQ Complète", desc: "Questions fréquentes" },
                            { href: "/guides", title: "Guides Expert", desc: "Articles détaillés" },
                            { href: "/marques", title: "Marques", desc: "Daikin, Atlantic..." },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all text-center"
                            >
                                <span className="font-bold text-slate-900">{item.title}</span>
                                <span className="text-sm text-slate-500">{item.desc}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

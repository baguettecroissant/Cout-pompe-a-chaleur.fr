import Link from "next/link";
import { Metadata } from "next";
import { HelpCircle, Search, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
    title: "FAQ Pompe à Chaleur : Questions Fréquentes et Réponses 2026",
    description: "Toutes les réponses à vos questions sur les pompes à chaleur (PAC) : prix, aides, installation, entretien, marques. FAQ complète par catégorie.",
    openGraph: {
        title: "FAQ Pompe à Chaleur : Questions Fréquentes",
        description: "Prix, aides 2026, installation, entretien : toutes vos questions sur l'aérothermie et la géothermie.",
    },
};

interface FAQItem {
    question: string;
    answer: string;
    links?: { text: string; href: string }[];
}

interface FAQCategory {
    title: string;
    icon: string;
    items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
    {
        title: "Prix & Budget",
        icon: "💰",
        items: [
            {
                question: "Quel est le prix d'une pompe à chaleur ?",
                answer: "Le prix varie selon la technologie : comptez entre 6 500€ et 9 500€ pour une PAC Air/Air (Multisplit), et entre 10 000€ et 16 000€ pour une PAC Air/Eau (sur réseau d'eau). Ces prix s'entendent pose incluse par un artisan RGE.",
                links: [
                    { text: "Simuler mon budget", href: "/simulateur-prix" },
                    { text: "Guide des prix 2026", href: "/guides/prix-pompe-a-chaleur-2026" },
                ],
            },
            {
                question: "L'installation est-elle remboursée par l'État ?",
                answer: "L'État ne rembourse pas entièrement la pompe à chaleur, mais subventionne fortement la transition écologique. En remplaçant une vieille chaudière, de nombreuses subventions (MaPrimeRénov', CEE) sécurisent et réduisent votre reste à charge.",
                links: [
                    { text: "Calculer mes aides", href: "/calculateur-aides" },
                    { text: "Tiers-payant et reste à charge", href: "/guides/remboursement-pompe-a-chaleur-securite-sociale" },
                ],
            },
            {
                question: "Quelles sont les aides disponibles en 2026 ?",
                answer: "Les aides principales sont le Coup de Pouce Chauffage (CEE), MaPrimeRénov', la TVA à 5,5% et l'Éco-Prêt à Taux Zéro (Éco-PTZ). Elles sont cumulables pour les foyers éligibles.",
                links: [{ text: "Simuler mes aides exactes", href: "/calculateur-aides" }],
            },
            {
                question: "Coût de l'ancienne offre PAC à 1 euro ?",
                answer: "Attention, le dispositif 'Pompe à Chaleur à 1 euro' n'existe plus en 2026 ! L'État a limité le cumul des subventions à 90% du montant total TTC du devis pour limiter les arnaques. Vous aurez au minimum un délai et un 10% de reste à charge.",
                links: [{ text: "En finir avec les arnaques", href: "/guides/pompe-a-chaleur-1-euro-arnaque" }],
            },
        ],
    },
    {
        title: "Installation",
        icon: "🔧",
        items: [
            {
                question: "Combien de temps dure l'installation ?",
                answer: "Une installation Air/Air demande généralement 1 à 2 jours de travail. Pour une pompe à chaleur Air/Eau en remplacement d'une chaudière existante, comptez environ 2 à 4 jours ouvrés. Aucun relogement n'est nécessaire.",
            },
            {
                question: "Dois-je changer tous mes radiateurs ?",
                answer: "Non, une PAC Haute Température permet tout à fait de conserver votre ancien réseau de radiateurs en fonte. Si vous avez un plancher chauffant ou des radiateurs récents, une PAC Basse Température sera parfaite.",
            },
            {
                question: "Où installer l'unité extérieure ?",
                answer: "Le module extérieur se place dans une cour, un jardin ou sur une façade, idéalement isolé du voisinage direct ou des murs des chambres pour éviter les nuisances sonores, même si les nouveaux modèles Inverter sont extrêmement silencieux.",
            },
            {
                question: "Vaut-il mieux un système Air/Air ou Gainable ?",
                answer: "La pose en split mural (Air/Air basique) est plus rapide et moins coûteuse. Le réseau Gainable (caché dans vos faux-plafonds), lui, est totalement invisible mais implique de lourds travaux d'aménagement intérieur, doublant souvent la facture.",
                links: [{ text: "Comparatif Droit vs Colimaçon / Split vs Gainable", href: "/guides/pompe-a-chaleur-droit-vs-colimacon-prix" }],
            },
        ],
    },
    {
        title: "Fonctionnement & Performances",
        icon: "⚡",
        items: [
            {
                question: "Comment fonctionne une pompe à chaleur (PAC) ?",
                answer: "La PAC utilise un compresseur et un fluide frigorigène pour capter les calories gratuites de l'air extérieur (même en hiver) et les transformer en chaleur pour votre intérieur, ou à l'inverse, évacuer le chaud pour vous rafraîchir en été.",
            },
            {
                question: "C'est quoi le COP (Coefficient de Performance) ?",
                answer: "C'est le rapport entre l'énergie consommée et la chaleur restituée. Un COP de 4 signifie que pour 1 kWh d'électricité payé sur votre facture, la machine restitue l'équivalent de 4 kWh de chauffage naturel dans la maison.",
            },
            {
                question: "Une PAC est-elle bruyante ?",
                answer: "Les anciens modèles l'étaient. Aujourd'hui, avec la technologie des compresseurs 'Inverter' / Scroll, les modules modernes en vitesse de croisière sont souvent plus silencieux qu'un réfrigérateur (entre 35 dB et 40 dB).",
                links: [{ text: "La technologie du compresseur Inverter", href: "/guides/cout-pompe-a-chaleur-tournant" }],
            },
            {
                question: "La pompe à chaleur produit-elle l'eau chaude sanitaire (ECS) ?",
                answer: "Oui, les PAC 'Air/Eau Duo' intègrent un ballon d'eau chaude sanitaire. En revanche, les PAC Air/Air classiques ne font que chauffer ou climatiser l'air, et nécessitent l'ajout d'un ballon thermodynamique séparé pour l'eau chaude.",
            },
        ],
    },
    {
        title: "Marques & Équipements",
        icon: "🏷️",
        items: [
            {
                question: "Quelle est la meilleure marque de Pompe à Chaleur ?",
                answer: "Sur le marché français en 2026, Daikin excelle par sa technologie et son silence. Atlantic est plébiscité en rénovation pour sa robustesse. Mitsubishi Zubadan s'impose pour les climats extrêmes de montagne.",
                links: [
                    { text: "Comparatif des marques", href: "/guides/comparatif-marques-pompe-a-chaleur" },
                ],
            },
            {
                question: "Peut-on installer une PAC soi-même ou d'occasion ?",
                answer: "Il est formellement déconseillé (et illégal en France) de raccorder soi-même des liaisons contenant du fluide frigorigène sans attestation. Les matériels d'occasion perdent toute garantie et droit aux aides étatiques.",
                links: [{ text: "Les risques de l'occasion", href: "/guides/pompe-a-chaleur-occasion" }],
            },
            {
                question: "Je vis en appartement sans extérieur, la PAC est-elle possible ?",
                answer: "Oui, il existe aujourd'hui des climatiseurs pompes à chaleur extra-plats ou la technologie 'PAC sans unité extérieure' en monobloc, avec juste deux petits carottages au mur pour expulser l'air.",
                links: [{ text: "Les PAC compactes", href: "/guides/plus-petit-pompe-a-chaleur-monde" }],
            },
        ],
    },
    {
        title: "Entretien & Après-vente",
        icon: "📋",
        items: [
            {
                question: "Quelle est la durée de vie moyenne d'une pompe à chaleur ?",
                answer: "S'il est correctement dimensionné et bien entretenu, le compresseur principal (coeur technologique) peut tenir sans encombre entre 15 et 20 ans.",
            },
            {
                question: "L'entretien d'une pompe à chaleur est-il obligatoire ?",
                answer: "Oui, la législation oblige un contrôle et une vérification de l'étanchéité des fluides tous les 2 ans (pour les puissances classiques).",
                links: [{ text: "Guide sur l'entretien", href: "/guides/entretien-pompe-a-chaleur" }],
            },
            {
                question: "Combien coûte le contrat de maintenance annuel ?",
                answer: "Il se situe majoritairement entre 150 € et 250 € par an. Faut-il choisir de payer au coup par coup ou s'abonner ? Un contrat premium offre réactivité maximale en plein hiver en cas de panne, en plus du dépannage pièces et main-d'œuvre gratuit sur la décennie.",
                links: [{ text: "Comparatif Contrat Annuel vs Ponctuel", href: "/guides/cout-entretien-pompe-a-chaleur-contrat-ou-demande" }],
            }
        ],
    },
];

// Flatten all FAQs for Schema
const allFaqs = faqCategories.flatMap((cat) => cat.items);

export default function FAQPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": allFaqs.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer,
            },
        })),
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Hero */}
            <section className="bg-slate-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <Breadcrumbs items={[{ label: "FAQ" }]} />
                    <div className="max-w-3xl mx-auto text-center mt-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full mb-6">
                            <HelpCircle className="h-8 w-8 text-emerald-400" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">
                            Questions Fréquentes
                        </h1>
                        <p className="text-xl text-slate-300">
                            Toutes les réponses à vos questions sur les pompes à chaleur
                        </p>
                    </div>
                </div>
            </section>

            {/* Quick Nav */}
            <section className="py-8 bg-white border-b border-slate-200 sticky top-16 z-40">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-2">
                        {faqCategories.map((cat) => (
                            <a
                                key={cat.title}
                                href={`#${cat.title.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-emerald-100 rounded-full text-sm font-medium text-slate-700 hover:text-emerald-700 transition-colors"
                            >
                                <span>{cat.icon}</span>
                                {cat.title}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Categories */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    {faqCategories.map((category) => (
                        <div
                            key={category.title}
                            id={category.title.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}
                            className="mb-12 scroll-mt-32"
                        >
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <span className="text-3xl">{category.icon}</span>
                                {category.title}
                            </h2>
                            <div className="space-y-4">
                                {category.items.map((item, index) => (
                                    <details
                                        key={index}
                                        className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                                    >
                                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                                            <h3 className="font-medium text-slate-900 pr-4">{item.question}</h3>
                                            <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform shrink-0" />
                                        </summary>
                                        <div className="px-5 pb-5 pt-0">
                                            <p className="text-slate-600 mb-3">{item.answer}</p>
                                            {item.links && (
                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {item.links.map((link, i) => (
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
                                    </details>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-br from-emerald-600 to-teal-800 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Vous n'avez pas trouvé votre réponse ?</h2>
                    <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                        Demandez un devis gratuit et un artisan qualifié RGE répondra à toutes vos questions.
                    </p>
                    <Link href="/devis">
                        <Button size="lg" className="bg-white text-emerald-800 hover:bg-slate-100 text-lg px-10 h-14 rounded-full shadow-lg">
                            Parler à un conseiller local
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Related */}
            <section className="py-12 bg-white border-t border-slate-200">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Nos outils gratuits</h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            { href: "/simulateur-prix", title: "Simulateur de Prix", icon: "💰" },
                            { href: "/calculateur-aides", title: "Calculateur d'Aides", icon: "🧮" },
                            { href: "/outils", title: "Tous les outils", icon: "🛠️" },
                        ].map((tool) => (
                            <Link
                                key={tool.href}
                                href={tool.href}
                                className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all group"
                            >
                                <span className="text-2xl">{tool.icon}</span>
                                <span className="font-medium text-slate-700 group-hover:text-emerald-700">{tool.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

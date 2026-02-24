import { notFound } from "next/navigation";
import { getCityFromSlug, getAllCitySlugs, generateCityMetadata } from "@/lib/seo-utils";
import { getCityIntro } from "@/lib/text-utils";
import { CityHero } from "@/components/features/CityHero";
import { ViteUnDevisWidget } from "@/components/affiliation/ViteUnDevisWidget";
import { SchemaOrg } from "@/components/seo/SchemaOrg";
import { DepartmentBreadcrumb } from "@/components/psea/DepartmentBreadcrumb";
import { NearbyCitiesModule } from "@/components/psea/NearbyCitiesModule";
import { Metadata } from "next";
import { LocalAidsModule } from "@/components/psea/LocalAidsModule";
import { StepsModule } from "@/components/psea/StepsModule";
import { GuidesWidget } from "@/components/seo/GuidesWidget";

// Next.js 15 params
type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const city = getCityFromSlug(slug);
    if (!city) return {};
    return generateCityMetadata(city);
}

// ... existing imports

export default async function CityPage({ params }: Props) {
    const { slug } = await params;
    const city = getCityFromSlug(slug);

    if (!city) {
        notFound();
    }

    // Dynamic Text Logic
    const introText = getCityIntro(city);

    return (
        <main className="min-h-screen bg-white selection:bg-emerald-100">
            <SchemaOrg city={city} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": `Quel est le prix moyen d'une pompe à chaleur à ${city.name} ?`,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": `À ${city.name}, le prix d'une installation dépend du type de pompe à chaleur. Pour une PAC Air/Air, comptez entre 3 000 € et 8 000 €. Pour une PAC Air/Eau (souvent en remplacement de chaudière), le budget se situe généralement entre 10 000 € et 16 000 € avant déduction des aides.`
                                }
                            },
                            {
                                "@type": "Question",
                                "name": `À quelles aides ai-je droit pour une PAC à ${city.name} (${city.zip}) ?`,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": `En installant une Pompe à Chaleur à ${city.name}, vous êtes éligible à MaPrimeRénov' (selon revenus), à la Prime CEE (Coup de pouce), et à un taux de TVA réduit à 5,5%. Les aides peuvent financer jusqu'à 90% du devis pour les foyers très modestes.`
                                }
                            },
                            {
                                "@type": "Question",
                                "name": `Quelle est la durée des travaux d'installation ?`,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": `L'installation d'une pompe à chaleur classique (Air/Eau ou Air/Air) chez vous à ${city.name} prend généralement de 2 à 5 jours, selon la complexité du réseau hydraulique existant et les raccordements nécessaires.`
                                }
                            },
                            {
                                "@type": "Question",
                                "name": `Qui assure l'entretien et la réparation de ma PAC dans le département ${city.department_name} ?`,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": `Nos artisans RGE partenaires locaux proposent tous des contrats d'entretien annuel (désormais obligatoire tous les deux ans minimum). En demandant vos devis, vous serez mis en contact avec des entreprises intervenant rapidement dans le ${city.department_code} pour un SAV de qualité.`
                                }
                            }
                        ]
                    })
                }}
            />

            <header className="bg-slate-50 pt-4 pb-0 border-b border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <DepartmentBreadcrumb city={city} />
                </div>
            </header>

            <CityHero city={city} />

            <article className="container mx-auto px-5 py-14 max-w-5xl">

                <section className="mb-14 grid md:grid-cols-3 gap-8 items-start">
                    <div className="md:col-span-2">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            Votre Pompe à Chaleur à {city.name}
                        </h2>
                        <div className="prose prose-lg text-slate-600 leading-relaxed space-y-4">
                            <p>
                                Vivre à <strong>{city.name}</strong> ({city.zip}) offre un cadre de vie appréciable, mais les hivers peuvent faire grimper la facture énergétique. {introText}
                                Que vous résidiez dans une construction récente ou dans une maison ancienne, l'installation d'une pompe à chaleur (PAC) est aujourd'hui la solution
                                la plus efficace pour réduire vos dépenses de chauffage tout en valorisant votre patrimoine immobilier.
                            </p>
                            <p>
                                Dans le département ({city.department_name}), de nombreux artisans spécialisés RGE proposent des solutions
                                adaptées à vos besoins : PAC Air/Air pour climatiser en été, PAC Air/Eau pour remplacer votre vieille chaudière fioul ou gaz,
                                ou encore solutions hybrides et géothermie.
                            </p>
                        </div>
                    </div>
                    {/* Colonne latérale Aides Locales */}
                    <aside className="md:col-span-1 sticky top-6">
                        <LocalAidsModule city={city} />
                    </aside>
                </section>

                {/* Formulaire Devis remonté AVANT les étapes */}
                <section className="mb-16 scroll-mt-24" id="devis">
                    <div className="bg-gradient-to-br from-slate-50 to-emerald-50/30 p-8 md:p-10 rounded-3xl border border-emerald-100 shadow-sm">
                        <div className="max-w-2xl mx-auto text-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                                Comparez les installateurs RGE à {city.name}
                            </h2>
                            <p className="text-slate-600 font-medium text-lg">
                                Obtenez jusqu'à 3 devis gratuits d'artisans certifiés RGE intervenant à {city.name} ({city.zip}).
                                <span className="block mt-3 text-sm text-emerald-700 font-semibold bg-emerald-100/60 inline-block px-4 py-1.5 rounded-full">Réponse sous 48h • Sans engagement</span>
                            </p>
                        </div>
                        <ViteUnDevisWidget />
                    </div>
                </section>

                <StepsModule city={city} />

                {/* FAQ sémantique avec dl, dt, dd */}
                <section className="mb-20 mt-16 pt-10 border-t border-slate-100">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Questions fréquentes (FAQ) : {city.name}</h2>
                    <dl className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-50 hover:border-emerald-100 transition-colors">
                            <dt className="text-lg font-bold text-slate-800 mb-3">Quel est le prix moyen d'une PAC à {city.name} ?</dt>
                            <dd className="text-slate-600 leading-relaxed">
                                Pour une PAC Air/Air (climatisation réversible), comptez entre 3 000 € et 8 000 €. Pour une PAC Air/Eau destinée au chauffage central et à la production d'eau chaude, le projet se situe généralement entre 10 000 € et 16 000 €, installation incluse, avant toute déduction d'aides.
                            </dd>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-50 hover:border-emerald-100 transition-colors">
                            <dt className="text-lg font-bold text-slate-800 mb-3">Quelles aides pour installer une PAC dans le {city.department_code} ?</dt>
                            <dd className="text-slate-600 leading-relaxed">
                                De multiples aides nationales sont accessibles à {city.name} : MaPrimeRénov', Primes Énergie (CEE), l'Éco-PTZ et la TVA réduite. Dans certaines localités du {city.department_name}, des aides supplémentaires locales ou régionales (via l'ANAH ou le département) peuvent s'additionner pour faire chuter votre reste à charge.
                            </dd>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-50 hover:border-emerald-100 transition-colors">
                            <dt className="text-lg font-bold text-slate-800 mb-3">Combien de temps faut-il pour le chantier ?</dt>
                            <dd className="text-slate-600 leading-relaxed">
                                Après la visite technique, l'accord du devis, la validation de la Déclaration Préalable (si unité extérieure) et la commande du matériel (2-4 semaines), l'installation effective chez vous par une équipe spécialisée prend généralement seulement 2 à 5 jours selon la surface et le type d'émetteurs (radiateurs ou plancher chauffant).
                            </dd>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-50 hover:border-emerald-100 transition-colors">
                            <dt className="text-lg font-bold text-slate-800 mb-3">Puis-je trouver un contrat d'entretien à {city.name} ?</dt>
                            <dd className="text-slate-600 leading-relaxed">
                                Complètement. Nos partenaires agréés interviennent sur de nombreuses villes comme {city.name} pour installer, mais aussi pour mettre en place des contrats de maintenance annuels (obligatoires selon le fluide frigorigène) afin de garantir les performances et la longévité de votre appareil thermique en toute sérénité.
                            </dd>
                        </div>
                    </dl>
                </section>

                <footer className="mt-12 text-center">
                    <GuidesWidget />
                </footer>
            </article>

            <aside className="bg-slate-50 border-t border-slate-200">
                <NearbyCitiesModule city={city} />
            </aside>
        </main>
    );
}

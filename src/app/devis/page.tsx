import { ViteUnDevisWidget } from "@/components/affiliation/ViteUnDevisWidget";
import { BadgeCheck, Leaf, Zap } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Obtenir 3 Devis Pompe à Chaleur Gratuits | Comparateur 2026",
    description: "Réduisez votre facture énergétique avec une pompe à chaleur. Demandez 3 devis gratuits sans engagement auprès d'installateurs qualifiés RGE de votre département.",
};

export default function DevisPage() {
    return (
        <div className="bg-slate-50 min-h-screen py-16">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                        Lancez votre projet <span className="text-emerald-600 block sm:inline">Pompe à Chaleur</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
                        Mettez en concurrence les meilleurs artisans de votre région. Demande 100% gratuite, réception sous 48h.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-10 items-start">
                    {/* Main Widget Area */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
                            <div className="p-4 md:p-6 bg-slate-50/50">
                                <ViteUnDevisWidget />
                            </div>
                            <div className="bg-emerald-50 px-6 py-4 border-t border-emerald-100 text-sm text-emerald-800 text-center flex items-center justify-center gap-2">
                                <BadgeCheck className="w-4 h-4" /> Plateforme sécurisée RGPD. Vos données ne servent qu'à l'établissement de vos devis.
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Trust Signals */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                            <h3 className="font-extrabold text-slate-900 mb-6 text-xl">Notre Promesse</h3>
                            <ul className="space-y-5">
                                <li className="flex items-start gap-4">
                                    <div className="bg-emerald-100 p-2 rounded-xl shrink-0">
                                        <Zap className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <strong className="block text-slate-900">100% Sans Engagement</strong>
                                        <span className="text-sm text-slate-500 line-clamp-2">L'étude de votre projet est gratuite, de la visite technique au chiffrage.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="bg-blue-100 p-2 rounded-xl shrink-0">
                                        <BadgeCheck className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <strong className="block text-slate-900">Artisans Certifiés RGE</strong>
                                        <span className="text-sm text-slate-500 line-clamp-2">Le label obligatoire pour décrocher MaPrimeRénov' et CEE.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="bg-orange-100 p-2 rounded-xl shrink-0">
                                        <Leaf className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <strong className="block text-slate-900">Indépendance Totale</strong>
                                        <span className="text-sm text-slate-500 line-clamp-2">Nous ne sommes affiliés à aucune marque (Daikin, Atlantic, etc).</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="relative overflow-hidden bg-slate-900 p-8 rounded-3xl text-center shadow-lg">
                            <div className="absolute top-0 right-0 -tr-translate-x-4 translate-y-4 opacity-10">
                                <Leaf className="w-32 h-32 text-white" />
                            </div>
                            <div className="relative z-10">
                                <div className="text-5xl font-black text-emerald-400 mb-2">12 400+</div>
                                <div className="text-slate-300 font-medium">Projets PAC étudiés sur notre réseau depuis 2021</div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* SEO Content Section */}
                <div className="mt-24">
                    <div className="grid lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8">
                            <article className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-900">
                                <h2 className="text-3xl font-extrabold pb-4 border-b border-slate-200">L'importance de comparer les artisans locaux</h2>
                                <p>
                                    L'installation d'une pompe à chaleur (Air/Air ou Air/Eau) est un investissement majeur. Bien que les constructeurs annoncent des tarifs publics pour leurs unités, ce sont les <strong>professionnels de terrain</strong> qui fixent le coût final, englobant la main d'œuvre, le petit matériel (liaisons frigorifiques), l'évacuation de l'ancienne chaudière, et le réglage du thermostat.
                                </p>
                                <p>
                                    En interrogeant 3 entreprises via notre formulaire, vous pourrez :
                                </p>
                                <ul>
                                    <li>Écarter les propositions sous-dimensionnées (risque de froid en hiver) ou sur-dimensionnées (usure prématurée du compresseur).</li>
                                    <li>Comparer les grandes marques : <em>Mitsubishi, Daikin, Panasonic, Atlantic...</em></li>
                                    <li>Profiter des remises saisonnières appliquées par les artisans de votre région pour remplir leur carnet de commandes.</li>
                                </ul>

                                <h2 className="text-3xl font-extrabold pb-4 border-b border-slate-200 mt-12">De quoi dépend votre devis final ?</h2>
                                <p>
                                    Un devis sérieux ne peut se faire uniquement par téléphone. L'installateur devra évaluer :
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4 not-prose mb-8">
                                    <div className="bg-white border border-slate-200 p-5 rounded-2xl">
                                        <strong className="text-emerald-700 block mb-1">DPE et Isolation</strong>
                                        <p className="text-sm text-slate-600">Une passoire thermique nécessite une machine plus puissante et donc plus chère.</p>
                                    </div>
                                    <div className="bg-white border border-slate-200 p-5 rounded-2xl">
                                        <strong className="text-emerald-700 block mb-1">L'Émetteur de Chaleur</strong>
                                        <p className="text-sm text-slate-600">Allez-vous conserver vos anciens radiateurs en fonte ou poser un plancher chauffant ?</p>
                                    </div>
                                </div>

                                <div className="bg-slate-100 p-8 rounded-3xl my-10 not-prose">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">Attention aux aides de l'État</h3>
                                    <p className="text-slate-600 mb-4">
                                        Ne signez jamais votre devis avant d'avoir reçu l'approbation de l'Anah pour <strong>MaPrimeRénov'</strong>. Les aides nationales et locales (Certificats d'Économie d'Énergie) peuvent couvrir une part très importante de l'investissement initial, mais elles ne sont pas rétroactives.
                                    </p>
                                    <Link href="/guides/les-aides-financieres-pompe-a-chaleur" className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1">
                                        Lire notre guide sur les aides <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                </div>
                            </article>
                        </div>

                        <div className="lg:col-span-4">
                            <div className="sticky top-24">
                                <h3 className="text-2xl font-bold text-slate-900 mb-8">Infos Pratiques</h3>
                                <div className="space-y-4">
                                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                        <div className="p-5">
                                            <h4 className="font-bold text-slate-900 mb-2">Comment faire le tri ?</h4>
                                            <p className="text-slate-600 text-sm">Privilégiez les devis détaillant parfaitement le modèle du compresseur (copie de la fiche technique), les garanties pièces (2 à 5 ans) et compresseur (5 ans).</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                        <div className="p-5">
                                            <h4 className="font-bold text-slate-900 mb-2">Et l'entretien ?</h4>
                                            <p className="text-slate-600 text-sm">L'entretien biennal est obligatoire pour les pompes à chaleur de plus de 4kW. Demandez à l'artisan d'inclure le contrat de maintenance annuel dans son devis global.</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                        <div className="p-5">
                                            <h4 className="font-bold text-slate-900 mb-2">Délai d'intervention</h4>
                                            <p className="text-slate-600 text-sm">Prévoyez en moyenne entre 1 et 3 mois entre la signature du devis et l'installation à domicile. N'attendez pas l'hiver pour lancer votre projet.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

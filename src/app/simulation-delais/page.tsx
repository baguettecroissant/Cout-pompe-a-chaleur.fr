import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, FileText, ArrowRight, Truck, CheckCircle } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Délais Installation Pompe à Chaleur | Simulation 2026",
    description: "Combien de temps pour installer une pompe à chaleur (PAC) ? Découvrez les délais moyens entre l'étude, l'acceptation du devis et l'installation.",
};

export default function DelaisPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-8">
                    <Link href="/" className="inline-flex items-center text-slate-500 hover:text-emerald-600 transition-colors mb-6">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Retour à l'accueil
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                        Délais d'installation d'une PAC : <span className="text-emerald-600">À quoi s'attendre ?</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl">
                        Le temps d'attente dépend principalement des démarches administratives, de la commande du matériel et de la disponibilité des installateurs RGE.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Summary Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Calendar className="h-6 w-6 text-emerald-500" />
                                Délais Moyens Constatés (2026)
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-100">
                                            <th className="py-4 font-semibold text-slate-900">Type de PAC</th>
                                            <th className="py-4 font-semibold text-slate-900">Préparation & Commande</th>
                                            <th className="py-4 font-semibold text-slate-900">Durée du Chantier</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr>
                                            <td className="py-4 text-slate-700 font-medium">PAC Air/Air (Climatisation)</td>
                                            <td className="py-4 text-green-600 font-bold">2 à 4 semaines</td>
                                            <td className="py-4 text-slate-600">1 à 3 jours</td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 text-slate-700 font-medium">PAC Air/Eau (Remplacement chaudière)</td>
                                            <td className="py-4 text-emerald-600 font-bold">3 à 6 semaines</td>
                                            <td className="py-4 text-slate-600">3 à 5 jours</td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 text-slate-700 font-medium">PAC Géothermique</td>
                                            <td className="py-4 text-blue-600 font-bold">2 à 4 mois</td>
                                            <td className="py-4 text-slate-600">1 à 2 semaines (forage)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg text-sm text-amber-800 flex flex-col gap-2">
                                <div>
                                    <strong>Attention Déclaration Préalable de Travaux :</strong>
                                </div>
                                <div>
                                    L'installation de l'unité extérieure modifiant l'aspect extérieur de votre maison, la loi impose souvent une Déclaration Préalable de Travaux (DP) en mairie. Le délai d'instruction est de l'ordre d'<b>1 mois</b> (voire plus si vous êtes en zone classée). Ce délai administratif s'ajoute aux délais ci-dessus.
                                </div>
                            </div>
                        </div>

                        {/* Process Steps */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Précisions sur les étapes du projet</h3>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 font-bold text-emerald-600">1</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">Cadrage, Étude Thermique et Devis</h4>
                                        <p className="text-slate-600 text-sm">Le professionnel (artisan RGE) se déplace pour un diagnostic de la maison (isolation, volume à chauffer). C'est indispensable pour bien dimensionner la PAC (1 à 2 semaines).</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 font-bold text-emerald-600">2</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">Mairie & Demande d'Aides (MaPrimeRénov', CEE)</h4>
                                        <p className="text-slate-600 text-sm">Avant de signer le devis, il faut monter votre dossier d'aides. La Mairie valide également la DP pour l'unité extérieure (1 mois compressible). Les professionnels aident souvent sur ces aspects.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 font-bold text-emerald-600">3</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">Commande, Livraison & Installation</h4>
                                        <p className="text-slate-600 text-sm">Une fois le feu vert administratif et financier obtenu, le matériel est commandé (2 à 4 semaines). L'installation prend ensuite moins d'une semaine sur place, avec mise en service.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar CTA */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl text-center">
                                <h3 className="text-2xl font-bold mb-4">Quand lancer votre projet ?</h3>
                                <p className="text-slate-300 mb-8">
                                    Il est recommandé de ne pas attendre l'hiver ! Anticipez dès le printemps pour être prêt au redémarrage du chauffage.
                                </p>

                                <div className="space-y-4 mb-8 text-left bg-white/10 p-4 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-400" />
                                        <span className="text-sm">Artisans disponibles plus vite post-hiver</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-400" />
                                        <span className="text-sm">Temps clément pour les travaux extérieurs</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-400" />
                                        <span className="text-sm">Devis et étude gratuits</span>
                                    </div>
                                </div>

                                <Link href="/devis">
                                    <Button size="lg" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-14 rounded-xl">
                                        Discuter avec un artisan RGE <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <p className="mt-4 text-xs text-slate-500">
                                    Gratuit et sans engagement
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

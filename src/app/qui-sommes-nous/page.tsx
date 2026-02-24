import { Metadata } from 'next';
import Image from 'next/image';
import { Leaf, ShieldCheck, ThumbsUp } from 'lucide-react';

export const metadata: Metadata = {
    title: "À Propos de Nous | Cout-Pompe-a-Chaleur.fr",
    description: "Découvrez notre équipe d'experts en transition énergétique et notre mission pour démocratiser l'installation des pompes à chaleur en France.",
};

export default function QuiSommesNousPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-emerald-900 border-b border-emerald-800 py-24">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Notre mission : <span className="text-emerald-400">Accélérer votre transition</span>
                    </h1>
                    <p className="text-xl text-emerald-100/90 leading-relaxed font-light">
                        Cout-Pompe-a-Chaleur.fr est le portail de référence dédié aux solutions de chauffage écologiques. Nous accompagnons des milliers de propriétaires dans la rénovation thermique de leur habitat.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-20 max-w-4xl">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12">
                    <div className="prose prose-lg prose-slate max-w-none">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-6 border-b pb-4">Notre Histoire</h2>
                        <p className="text-slate-600 leading-loose">
                            Face à l'urgence climatique et à la hausse constante des prix de l'énergie, de plus en plus de foyers français cherchent à remplacer leur vieille chaudière. Pourtant, le marché de la pompe à chaleur reste opaque : devis gonflés, entreprises éphémères, arnaques aux aides d'État...
                        </p>
                        <p className="text-slate-600 leading-loose">
                            C'est pourquoi nous avons créé <strong>Cout-Pompe-a-Chaleur.fr</strong>. Notre but est d'offrir une plateforme claire et impartiale, permettant de chiffrer avec précision le coût d'une installation tout en filtrant les prestataires pour ne retenir que l'excellence.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 my-12 not-prose">
                            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-center">
                                <div className="w-12 h-12 bg-emerald-200 text-emerald-700 flex items-center justify-center rounded-full mx-auto mb-4">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-2">Artisans RGE</h3>
                                <p className="text-sm text-slate-600">Un réseau national de professionnels rigoureusement sélectionnés et certifiés.</p>
                            </div>
                            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-center">
                                <div className="w-12 h-12 bg-emerald-200 text-emerald-700 flex items-center justify-center rounded-full mx-auto mb-4">
                                    <Leaf className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-2">Écologie</h3>
                                <p className="text-sm text-slate-600">Promotion active des systèmes de chauffage à très faible empreinte carbone.</p>
                            </div>
                            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-center">
                                <div className="w-12 h-12 bg-emerald-200 text-emerald-700 flex items-center justify-center rounded-full mx-auto mb-4">
                                    <ThumbsUp className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-2">Indépendance</h3>
                                <p className="text-sm text-slate-600">100% gratuits pour les particuliers, nous ne favorisons aucune marque spécifique.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-extrabold text-slate-900 mt-12 mb-6 border-b pb-4">Le mot de la rédaction</h2>
                        <p className="text-slate-600 leading-loose">
                            Nos tribunes et guides d'achat sont élaborés par des ingénieurs thermiciens et des experts en financement public. Ils décortiquent pour vous les mécanismes complexes tels que les CEE ou MaPrimeRénov', afin de s'assurer que vous bénéficiez du reste à charge le plus bas possible.
                        </p>
                        <p className="text-slate-600 leading-loose">
                            Notre service de mise en relation vous permet de recevoir jusqu'à trois devis comparatifs. C'est la garantie d'un prix juste et d'un dimensionnement parfait pour votre logement.
                        </p>

                        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 not-prose">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Besoin d'aide ou d'informations supplémentaires ?</h3>
                                <p className="text-slate-500 mt-1">Notre équipe vous répond sous 48h ouvrées.</p>
                            </div>
                            <a href="mailto:contact@cout-pompe-a-chaleur.fr" className="bg-slate-900 hover:bg-emerald-600 text-white font-medium px-8 py-4 rounded-xl transition-all">
                                Nous contacter
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

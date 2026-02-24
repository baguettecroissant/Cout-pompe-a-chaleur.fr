import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BRANDS } from "@/data/brands";

export const metadata: Metadata = {
    title: "Marques Pompe à Chaleur : Comparatif Daikin, Atlantic, Mitsubishi",
    description: "Comparez les meilleures marques de pompe à chaleur : Daikin, Atlantic, Mitsubishi. Prix, qualité, SAV, garanties. Guide et avis complet 2026.",
    openGraph: {
        title: "Marques Pompe à Chaleur : Comparatif 2026",
        description: "Comparez Daikin, Atlantic, Mitsubishi Electric : prix Air/Air, Air/Eau, fiabilité, SAV. Trouvez la marque idéale pour votre rénovation.",
    },
};

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`h-4 w-4 ${star <= rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
                />
            ))}
        </div>
    );
}

export default function MarquesPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="bg-slate-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <Breadcrumbs items={[{ label: "Marques" }]} />
                    <div className="max-w-3xl mt-6">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">
                            Comparatif des <span className="text-emerald-400">Marques</span> de Pompe à Chaleur
                        </h1>
                        <p className="text-xl text-slate-300">
                            Daikin, Atlantic, Mitsubishi Electric : découvrez les technologies, forces et points de vigilance de chaque fabricant pour bien choisir.
                        </p>
                    </div>
                </div>
            </section>

            {/* Brands Grid */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        {BRANDS.map((brand) => (
                            <div
                                key={brand.slug}
                                className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-4xl">{brand.countryFlag}</span>
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-900">{brand.name}</h2>
                                            <p className="text-sm text-slate-500">Depuis {brand.founded}</p>
                                        </div>
                                    </div>

                                    <p className="text-emerald-600 font-medium mb-4">{brand.tagline}</p>

                                    {/* Ratings */}
                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-600">Qualité Matérielle</span>
                                            <StarRating rating={brand.qualityRating} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-600">Réseau & SAV</span>
                                            <StarRating rating={brand.savRating} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-600">Accessibilité Prix</span>
                                            <StarRating rating={brand.priceRating} />
                                        </div>
                                    </div>

                                    {/* Price Range */}
                                    <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-slate-600 font-medium">Prix Air/Air</span>
                                            <span className="font-bold text-slate-900">{brand.priceRange.airAir}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-600 font-medium">Prix Air/Eau</span>
                                            <span className="font-bold text-slate-900">{brand.priceRange.airEau}</span>
                                        </div>
                                    </div>

                                    {/* Top Pros */}
                                    <ul className="space-y-1 mb-6">
                                        {brand.pros.slice(0, 3).map((pro, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                                                <span className="line-clamp-2">{pro}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href={`/marques/${brand.slug}`}>
                                        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl">
                                            Voir {brand.name} en détail
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-12 bg-white border-t border-slate-200">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                        Tableau comparatif rapide
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse min-w-[700px]">
                            <thead>
                                <tr className="bg-slate-100">
                                    <th className="border border-slate-200 p-4 text-left">Marque</th>
                                    <th className="border border-slate-200 p-4 text-left">Prix Air/Air</th>
                                    <th className="border border-slate-200 p-4 text-left">Prix Air/Eau</th>
                                    <th className="border border-slate-200 p-4 text-left">Garantie Compresseur</th>
                                    <th className="border border-slate-200 p-4 text-left">Point fort technique</th>
                                </tr>
                            </thead>
                            <tbody>
                                {BRANDS.map((brand) => (
                                    <tr key={brand.slug} className="hover:bg-slate-50">
                                        <td className="border border-slate-200 p-4">
                                            <Link href={`/marques/${brand.slug}`} className="font-bold text-emerald-600 hover:underline">
                                                {brand.countryFlag} {brand.name}
                                            </Link>
                                        </td>
                                        <td className="border border-slate-200 p-4">{brand.priceRange.airAir}</td>
                                        <td className="border border-slate-200 p-4">{brand.priceRange.airEau}</td>
                                        <td className="border border-slate-200 p-4">{brand.warranty.includes('5') ? '5 ans' : brand.warranty}</td>
                                        <td className="border border-slate-200 p-4 text-sm">{brand.pros[0]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-emerald-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -tr-translate-x-12 translate-y-12 opacity-10">
                    <Star className="w-64 h-64 text-emerald-400" />
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl font-extrabold mb-4">Besoin d'un devis comparatif ?</h2>
                    <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto font-light">
                        Mettez en concurrence les installateurs certifiés RGE de Daikin, Atlantic ou Mitsubishi de votre département.
                    </p>
                    <Link href="/devis">
                        <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white text-lg px-10 h-14 rounded-full shadow-lg border border-emerald-400">
                            Obtenir 3 devis gratuits
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* SEO Content */}
            <section className="py-16 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-4 max-w-3xl prose prose-slate">
                    <h2>Comment choisir sa marque de pompe à chaleur ?</h2>
                    <p>
                        Le choix de la marque est essentiel pour garantir la durabilité de votre investissement, mais attention, le meilleur matériel du monde sera inefficace s'il est mal installé.
                        Voici nos critères de sélection :
                    </p>
                    <ul>
                        <li><strong>Le Savoir-Faire de l'installateur</strong> : un artisan agréé par la marque (Partenaire Daikin, Expert Atlantic) a reçu une formation spécifique au produit.</li>
                        <li><strong>La destination</strong> : Mitsubishi excelle pour les zones très froides (Zubadan), Atlantic est imbattable sur les réseaux de vieux radiateurs (Alfea), et Daikin offre le meilleur confort acoustique.</li>
                        <li><strong>Les garanties locales</strong> : privilégiez une marque disposant d'un support technique de proximité en France pour assurer l'approvisionnement en pièces de rechange sous 10 ans.</li>
                    </ul>
                    <p>
                        Pour un guide pas à pas sur l'achat et les subventions, consultez notre <Link href="/guides/prix-pompe-a-chaleur-2026" className="text-emerald-600 font-semibold">dossier des prix 2026</Link>.
                    </p>
                </div>
            </section>
        </div>
    );
}

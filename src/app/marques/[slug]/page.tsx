import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { Star, CheckCircle, XCircle, Shield, ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BRANDS, getBrandBySlug, getAllBrandSlugs } from "@/data/brands";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllBrandSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const brand = getBrandBySlug(slug);

    if (!brand) {
        return { title: "Marque non trouvée" };
    }

    return {
        title: brand.seoTitle,
        description: brand.seoDescription,
        alternates: {
            canonical: `https://www.cout-pompe-a-chaleur.fr/marques/${slug}`,
        },
        openGraph: {
            title: brand.seoTitle,
            description: brand.seoDescription,
        },
    };
}

function StarRating({ rating, label }: { rating: number; label: string }) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 w-24 font-medium">{label}</span>
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`h-4 w-4 ${star <= rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default async function BrandPage({ params }: PageProps) {
    const { slug } = await params;
    const brand = getBrandBySlug(slug);

    if (!brand) {
        notFound();
    }

    const otherBrands = BRANDS.filter((b) => b.slug !== slug);

    // FAQPage Schema
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": brand.faq.map((item) => ({
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
                    <Breadcrumbs
                        items={[
                            { label: "Marques", href: "/marques" },
                            { label: brand.name },
                        ]}
                    />
                    <div className="mt-6 max-w-4xl">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-4xl">{brand.countryFlag}</span>
                            <div>
                                <h1 className="text-3xl md:text-5xl font-bold">{brand.name}</h1>
                                <p className="text-slate-400">Fondée en {brand.founded} • {brand.country}</p>
                            </div>
                        </div>
                        <p className="text-xl text-emerald-300 font-medium mb-6">{brand.tagline}</p>

                        {/* Ratings */}
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 bg-white/10 rounded-xl p-6">
                            <StarRating rating={brand.qualityRating} label="Qualité" />
                            <StarRating rating={brand.savRating} label="SAV" />
                            <StarRating rating={brand.priceRating} label="Prix" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Description + Prices */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-12 gap-8">
                        {/* Main Content */}
                        <div className="md:col-span-8">
                            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10 mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">À propos de {brand.name}</h2>
                                <div className="prose prose-slate prose-lg max-w-none">
                                    {brand.description.split("\n\n").map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Models */}
                            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10 mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 mb-8">Gammes & Prix {brand.name}</h2>
                                <div className="space-y-4">
                                    {brand.models.map((model) => (
                                        <div
                                            key={model.name}
                                            className="border border-slate-200 rounded-2xl p-5 hover:border-emerald-300 hover:shadow-md transition-all"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                                                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                                                    {model.name}
                                                </h3>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full capitalize">
                                                        {model.type === "air-air" ? "PAC Air/Air" : model.type === "air-eau" ? "PAC Air/Eau" : model.type === "hybride" ? "PAC Hybride" : "Géothermie"}
                                                    </span>
                                                    <span className="font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">{model.priceRange}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {model.features.map((feature, i) => (
                                                    <span key={i} className="text-sm bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl border border-slate-100">
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pros & Cons */}
                            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8">
                                    <h3 className="font-bold text-emerald-900 mb-5 flex items-center gap-2 text-lg">
                                        <CheckCircle className="h-6 w-6 text-emerald-600" />
                                        Points forts
                                    </h3>
                                    <ul className="space-y-3">
                                        {brand.pros.map((pro, i) => (
                                            <li key={i} className="flex items-start gap-3 text-emerald-800">
                                                <CheckCircle className="h-5 w-5 shrink-0 mt-0.5 opacity-60" />
                                                <span>{pro}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-red-50 border border-red-100 rounded-3xl p-8">
                                    <h3 className="font-bold text-red-900 mb-5 flex items-center gap-2 text-lg">
                                        <XCircle className="h-6 w-6 text-red-600" />
                                        Points faibles
                                    </h3>
                                    <ul className="space-y-3">
                                        {brand.cons.map((con, i) => (
                                            <li key={i} className="flex items-start gap-3 text-red-800">
                                                <XCircle className="h-5 w-5 shrink-0 mt-0.5 opacity-60" />
                                                <span>{con}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* FAQ */}
                            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10 mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                                    <HelpCircle className="h-7 w-7 text-emerald-500" />
                                    Questions fréquentes sur {brand.name}
                                </h2>
                                <div className="space-y-6">
                                    {brand.faq.map((item, i) => (
                                        <div key={i} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                                            <h3 className="font-bold text-slate-900 text-lg mb-3">{item.question}</h3>
                                            <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="md:col-span-4">
                            {/* Price Summary */}
                            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 mb-6 sticky top-24">
                                <h3 className="font-extrabold text-slate-900 mb-6 text-xl">Prix {brand.name} estimatifs</h3>
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl border border-slate-100">
                                        <span className="text-slate-600 font-medium">Modèle Air/Air</span>
                                        <span className="font-bold text-slate-900">{brand.priceRange.airAir}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl border border-slate-100">
                                        <span className="text-slate-600 font-medium">Modèle Air/Eau</span>
                                        <span className="font-bold text-slate-900">{brand.priceRange.airEau}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-slate-600 mb-8 bg-blue-50 p-4 rounded-xl border border-blue-100">
                                    <Shield className="h-5 w-5 text-blue-600 shrink-0" />
                                    <span className="text-sm font-medium">Garantie : {brand.warranty}</span>
                                </div>

                                <Link href="/devis">
                                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 text-lg rounded-xl shadow-md border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 transition-all">
                                        Comparer {brand.name}
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>

                                <Link href="/calculateur-aides" className="block mt-4 text-center">
                                    <span className="text-emerald-600 font-medium hover:underline">Estimer mes aides MaPrimeRénov'</span>
                                </Link>
                            </div>

                            {/* Other Brands */}
                            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8">
                                <h3 className="font-bold text-slate-900 mb-6 text-lg">Alternatives à {brand.name}</h3>
                                <div className="space-y-3">
                                    {otherBrands.map((other) => (
                                        <Link
                                            key={other.slug}
                                            href={`/marques/${other.slug}`}
                                            className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:shadow border border-slate-100 transition-all group"
                                        >
                                            <span className="text-3xl group-hover:scale-110 transition-transform">{other.countryFlag}</span>
                                            <div>
                                                <div className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{other.name}</div>
                                                <div className="text-sm text-slate-500">Dès {other.priceRange.airAir.split(' ')[0]}€</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                <Link
                                    href="/marques"
                                    className="block mt-6 text-center text-slate-600 font-medium hover:text-emerald-600 transition-colors"
                                >
                                    Voir toutes les marques →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

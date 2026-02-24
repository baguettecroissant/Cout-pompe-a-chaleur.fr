
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getGuideBySlug, getAllGuides } from "@/data/guides-content";
import { ViteUnDevisWidget } from "@/components/affiliation/ViteUnDevisWidget";
import { Calendar, User, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { RelatedGuides } from "@/components/seo/RelatedGuides";
import { StickyMobileCTA } from "@/components/psea/StickyMobileCTA";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const guide = getGuideBySlug(slug);

    if (!guide) {
        return {
            title: "Article non trouvé",
        };
    }

    return {
        title: guide.metaTitle,
        description: guide.metaDescription,
        alternates: {
            canonical: `https://www.cout-pompe-a-chaleur.fr/guides/${slug}`,
        },
        openGraph: {
            title: guide.metaTitle,
            description: guide.metaDescription,
            url: `https://www.cout-pompe-a-chaleur.fr/guides/${slug}`,
            siteName: "Cout-Pompe-a-Chaleur.fr",
            locale: "fr_FR",
            type: "article",
            publishedTime: guide.date,
            authors: [guide.author],
            ...(guide.image && { images: [{ url: `https://www.cout-pompe-a-chaleur.fr${guide.image}`, width: 1200, height: 630, alt: guide.title }] }),
        },
        twitter: {
            card: "summary_large_image",
            title: guide.metaTitle,
            description: guide.metaDescription,
        },
    };
}

export async function generateStaticParams() {
    const guides = getAllGuides();
    return guides.map((guide) => ({
        slug: guide.slug,
    }));
}

export default async function GuidePost({ params }: PageProps) {
    const { slug } = await params;
    const guide = getGuideBySlug(slug);

    if (!guide) {
        notFound();
    }

    // Article JSON-LD schema
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": guide.title,
        "description": guide.metaDescription,
        "datePublished": guide.date,
        "dateModified": guide.date,
        "author": {
            "@type": "Person",
            "name": guide.author,
        },
        "publisher": {
            "@type": "Organization",
            "name": "Cout-Pompe-a-Chaleur.fr",
            "url": "https://www.cout-pompe-a-chaleur.fr",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.cout-pompe-a-chaleur.fr/icon.png",
            },
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.cout-pompe-a-chaleur.fr/guides/${slug}`,
        },
        ...(guide.image && {
            "image": `https://www.cout-pompe-a-chaleur.fr${guide.image}`,
        }),
    };

    return (
        <div className="bg-white min-h-screen pb-32">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />

            {/* Header / Breadcrumb */}
            <div className="bg-slate-50 border-b border-slate-200 py-8">
                <div className="container mx-auto px-4">
                    <Breadcrumbs
                        items={[
                            { label: "Guides", href: "/guides" },
                            { label: guide.title },
                        ]}
                    />
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight max-w-4xl">
                        {guide.title}
                    </h1>
                    <div className="flex items-center gap-6 text-slate-500 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {guide.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <Link href="/qui-sommes-nous" className="hover:text-emerald-600 hover:underline transition-colors">
                                {guide.author}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <article className="lg:col-span-2">
                    {guide.image && (
                        <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden mb-10 shadow-lg">
                            <Image
                                src={guide.image}
                                alt={guide.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 66vw"
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    <div
                        className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-emerald-600 hover:prose-a:text-emerald-700 prose-strong:text-slate-900"
                        dangerouslySetInnerHTML={{ __html: guide.content }}
                    />

                    {/* CTA Bottom Article */}
                    <div className="mt-12 bg-emerald-50 border border-orange-100 rounded-2xl p-8 text-center">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Besoin d'un devis précis ?</h3>
                        <p className="text-slate-700 mb-6">
                            Nos artisans partenaires sont certifiés RGE et peuvent vous aider à monter votre dossier MaPrimeRénov'.
                        </p>
                        <Link href="/devis">
                            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 rounded-full">
                                Comparer les tarifs gratuitement
                            </Button>
                        </Link>
                    </div>

                    {/* Related Guides (inter-linking) */}
                    <RelatedGuides currentSlug={slug} />
                </article>

                {/* Sidebar */}
                <aside className="space-y-8">
                    {/* Sticky Widget */}
                    <div className="sticky top-24">
                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                Devis Gratuit
                            </h3>
                            <p className="text-sm text-slate-600 mb-4">
                                Recevez jusqu'à 3 offres d'installateurs locaux.
                            </p>
                            <ViteUnDevisWidget />
                        </div>
                    </div>
                </aside>
            </div>
            <StickyMobileCTA />
        </div>
    );
}

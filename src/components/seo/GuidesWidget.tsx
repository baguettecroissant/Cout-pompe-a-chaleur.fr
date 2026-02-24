import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

const FEATURED_GUIDES = [
    { slug: "prix-pompe-a-chaleur-2026", title: "Prix Pompe-a-Chaleur 2026 : Guide Complet" },
    { slug: "devis-pompe-a-chaleur-pieges", title: "7 Pièges à Éviter sur un Devis" },
    { slug: "pompe-a-chaleur-occasion", title: "Pompe-a-Chaleur d'Occasion : Bonne Idée ?" },
    { slug: "cout-entretien-pompe-a-chaleur", title: "Coût Entretien Pompe-a-Chaleur" },
];

export function GuidesWidget() {
    return (
        <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-emerald-500" />
                Guides utiles pour votre projet
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
                {FEATURED_GUIDES.map((guide) => (
                    <Link
                        key={guide.slug}
                        href={`/guides/${guide.slug}`}
                        className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all group"
                    >
                        <div className="bg-emerald-100 p-2 rounded-lg group-hover:bg-orange-200 transition-colors shrink-0">
                            <ArrowRight className="h-4 w-4 text-emerald-600" />
                        </div>
                        <span className="font-medium text-slate-700 group-hover:text-emerald-700 text-sm line-clamp-2">
                            {guide.title}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}

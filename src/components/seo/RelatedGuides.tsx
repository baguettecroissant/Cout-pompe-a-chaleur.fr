"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { GuideArticle, getAllGuides } from "@/data/guides-content";

interface RelatedGuidesProps {
    currentSlug: string;
    maxItems?: number;
}

export function RelatedGuides({ currentSlug, maxItems = 4 }: RelatedGuidesProps) {
    const allGuides = getAllGuides();

    // Filter out current guide and pick the most recent ones
    const related = allGuides
        .filter((g) => g.slug !== currentSlug)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, maxItems);

    if (related.length === 0) return null;

    return (
        <div className="mt-12 border-t border-slate-200 pt-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-emerald-500" />
                Articles Complémentaires
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
                {related.map((guide) => (
                    <Link
                        key={guide.slug}
                        href={`/guides/${guide.slug}`}
                        className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all group"
                    >
                        <div className="bg-emerald-100 p-2 rounded-lg group-hover:bg-orange-200 transition-colors shrink-0">
                            <ArrowRight className="h-4 w-4 text-emerald-600" />
                        </div>
                        <span className="font-medium text-slate-700 group-hover:text-emerald-700 line-clamp-2">
                            {guide.title}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

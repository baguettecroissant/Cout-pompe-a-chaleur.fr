"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
    label: string;
    href?: string; // If undefined, it's the current page (no link)
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    // Build the full breadcrumb list with Home
    const fullItems: BreadcrumbItem[] = [
        { label: "Accueil", href: "/" },
        ...items,
    ];

    // Generate Schema.org BreadcrumbList
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": fullItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": item.href ? `https://www.cout-pompe-a-chaleur.fr${item.href}` : undefined,
        })),
    };

    return (
        <>
            {/* Schema.org BreadcrumbList */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            {/* Visual Breadcrumbs */}
            <nav aria-label="Fil d'Ariane" className="py-4">
                <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
                    {fullItems.map((item, index) => {
                        const isLast = index === fullItems.length - 1;
                        const isFirst = index === 0;

                        return (
                            <li key={index} className="flex items-center gap-1">
                                {index > 0 && (
                                    <ChevronRight className="h-4 w-4 text-slate-300" />
                                )}
                                {item.href && !isLast ? (
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
                                    >
                                        {isFirst && <Home className="h-4 w-4" />}
                                        <span className={isFirst ? "sr-only sm:not-sr-only" : ""}>
                                            {item.label}
                                        </span>
                                    </Link>
                                ) : (
                                    <span className="text-slate-900 font-medium truncate max-w-[200px] sm:max-w-none">
                                        {item.label}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}

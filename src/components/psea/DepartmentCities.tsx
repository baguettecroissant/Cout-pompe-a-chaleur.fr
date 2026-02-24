"use client";

import { City } from "@/types";
import { Search, MapPin } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";

interface DepartmentCitiesProps {
    departmentName: string;
    departmentCode: string;
    cities: City[];
}

export function DepartmentCities({ departmentName, departmentCode, cities }: DepartmentCitiesProps) {
    const [search, setSearch] = useState("");

    const filteredCities = useMemo(() => {
        if (!search) return cities;
        const lower = search.toLowerCase();
        return cities.filter(c =>
            c.name.toLowerCase().includes(lower) ||
            c.zip.includes(lower)
        );
    }, [cities, search]);

    // Separate Top Cities (First 12) from the rest for visual hierarchy
    // If user is searching, show everything in list mode for clarity, or keep cards?
    // Let's keep the split logic only when NOT searching to maintain the "Showcase" feel.
    // When searching, we just want results.
    const isSearching = search.length > 0;

    // Naively assume first ones are "Top" because they come sorted from parent (hopefully)
    // or just take the first 12 as "Featured".
    const featuredCount = 12;
    const featuredCities = isSearching ? [] : filteredCities.slice(0, featuredCount);
    const listedCities = isSearching ? filteredCities : filteredCities.slice(featuredCount);

    return (
        <div className="space-y-12">
            {/* Search Bar */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 max-w-2xl mx-auto -mt-24 relative z-10">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                        type="search"
                        placeholder={`Rechercher une ville dans le ${departmentCode} (ex: ${cities[0]?.name || "Ville"}...)`}
                        className="pl-10 h-12 text-lg"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <p className="text-sm text-slate-500 mt-2 text-center">
                    {filteredCities.length} villes desservies dans le {departmentName}
                </p>
            </div>

            {/* Featured Cities Grid (Cards) - Only visible if not searching to avoid clutter, or maybe always? 
                Let's hide when searching to give full list focus.
            */}
            {!isSearching && featuredCities.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <MapPin className="h-6 w-6 text-emerald-600" />
                        Principales installations
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {featuredCities.map((city) => (
                            <Link
                                key={city.slug}
                                href={`/prix-pompe-a-chaleur/${city.slug}`}
                                className="group flex flex-col p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all bg-white"
                            >
                                <span className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 mb-1">
                                    {city.name}
                                </span>
                                <span className="text-slate-500 text-sm">
                                    Code postal : {city.zip}
                                </span>
                                <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-emerald-600 font-medium flex items-center">
                                    Voir les installateurs
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Full List (Compact) */}
            {listedCities.length > 0 && (
                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        {isSearching ? "Résultats de recherche" : `Toutes les communes (${departmentCode})`}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-2">
                        {listedCities.map((city) => (
                            <Link
                                key={city.slug}
                                href={`/prix-pompe-a-chaleur/${city.slug}`}
                                className="text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded text-sm truncate block transition-colors"
                                title={`Pompe-a-chaleur à ${city.name}`}
                            >
                                {city.name}
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {filteredCities.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    Aucune ville trouvée pour "{search}".
                </div>
            )}
        </div>
    );
}

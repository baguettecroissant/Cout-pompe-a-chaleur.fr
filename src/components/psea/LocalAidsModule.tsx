import { City } from "@/types";
import { Euro, Building2, FileCheck } from "lucide-react";

interface LocalAidsModuleProps {
    city: City;
}

export function LocalAidsModule({ city }: LocalAidsModuleProps) {
    return (
        <section className="py-12 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
                    Aides financières disponibles à {city.name}
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* MaPrimeRénov Card */}
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                                <Building2 className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1">
                                    MaPrimeRénov'
                                </h3>
                                <p className="text-sm text-slate-600 mb-3">
                                    L'aide principale de l'État pour financer l'installation d'une pompe à chaleur en remplacement d'une ancienne chaudière.
                                </p>
                                <div className="text-xs font-medium text-blue-700 bg-blue-100 inline-block px-2 py-1 rounded">
                                    Jusqu'à 11 000€ d'aide
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Prime CEE Card */}
                    <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                        <div className="flex items-start gap-4">
                            <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600">
                                <Euro className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1">
                                    Prime CEE (Coup de Pouce)
                                </h3>
                                <p className="text-sm text-slate-600 mb-3">
                                    Une prime versée par les fournisseurs d'énergie pour encourager la transition énergétique de votre logement à {city.name}.
                                </p>
                                <div className="text-xs font-medium text-emerald-700 bg-emerald-100 inline-block px-2 py-1 rounded">
                                    Jusqu'à 4 000€ d'aide
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-3">
                    <FileCheck className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-600">
                        <strong>Bon à savoir :</strong> Pour bénéficier de ces aides à {city.name} ({city.zip}), il est impératif de faire réaliser les travaux par un installateur certifié <strong>RGE (Reconnu Garant de l'Environnement)</strong>. Ces aides sont de plus cumulables.
                    </p>
                </div>
            </div>
        </section>
    );
}

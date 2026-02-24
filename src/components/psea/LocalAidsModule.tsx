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
                    {/* MDPH Card */}
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                                <Building2 className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1">
                                    {city.department_info?.aide_locale || `MDPH ${city.department_code}`}
                                </h3>
                                <p className="text-sm text-slate-600 mb-3">
                                    L'organisme référent dans le département ({city.department_name}) pour les dossiers PCH (Prestation de Compensation du Handicap).
                                </p>
                                <div className="text-xs font-medium text-blue-700 bg-blue-100 inline-block px-2 py-1 rounded">
                                    Jusqu'à 10 000€ d'aide
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MaPrimeAdapt Card */}
                    <div className="bg-emerald-50 p-6 rounded-xl border border-orange-100">
                        <div className="flex items-start gap-4">
                            <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600">
                                <Euro className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1">
                                    MaPrimeAdapt' à {city.name}
                                </h3>
                                <p className="text-sm text-slate-600 mb-3">
                                    La nouvelle aide unique pour l'adaptation du logement. Les artisans RGE locaux peuvent vous aider à monter le dossier.
                                </p>
                                <div className="text-xs font-medium text-emerald-700 bg-emerald-100 inline-block px-2 py-1 rounded">
                                    50% à 70% des travaux
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-3">
                    <FileCheck className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-600">
                        <strong>Bon à savoir :</strong> Pour bénéficier de ces aides à {city.name} ({city.zip}), il est impératif de faire réaliser les travaux par un professionnel certifié RGE.
                    </p>
                </div>
            </div>
        </section>
    );
}

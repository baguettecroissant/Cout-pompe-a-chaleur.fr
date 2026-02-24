"use client";

import { City } from "@/types";
import { Button } from "@/components/ui/button";
import { FileText, MapPin } from "lucide-react";

interface CityHeroProps {
    city: City;
}

export function CityHero({ city }: CityHeroProps) {
    return (
        <section className="bg-slate-50 border-b border-slate-200 py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-medium mb-8">
                    <MapPin className="h-4 w-4" />
                    <span>Installation disponible à {city.name} ({city.zip})</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                    Prix d'une Pompe-a-Chaleur à <span className="text-emerald-600">{city.name}</span>
                </h1>

                <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                    Comparez les tarifs des installateurs agréés dans le {city.department_name} ({city.region}).
                    Obtenez jusqu'à 3 devis gratuits sans engagement pour votre rénovation énergétique.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 h-14 w-full sm:w-auto shadow-lg rounded-full">
                        <FileText className="mr-2 h-5 w-5" />
                        Recevoir mes devis gratuits
                    </Button>
                    <p className="text-sm text-slate-500 mt-2 sm:mt-0">
                        Gratuit & Sans engagement
                    </p>
                </div>
            </div>
        </section>
    );
}

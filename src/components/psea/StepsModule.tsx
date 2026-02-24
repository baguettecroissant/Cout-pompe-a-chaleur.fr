import { City } from "@/types";
import { FileText, UserCheck, Wrench } from "lucide-react";

interface StepsModuleProps {
    city: City;
}

export function StepsModule({ city }: StepsModuleProps) {
    const steps = [
        {
            icon: FileText,
            title: "Demande de Devis",
            desc: "Remplissez le formulaire en ligne pour détailler votre projet."
        },
        {
            icon: UserCheck,
            title: "Visite Technique",
            desc: `Un artisan partenaire du ${city.department_code} vient prendre les mesures exactes.`
        },
        {
            icon: Wrench,
            title: "Installation",
            desc: "Pose de votre pompe-a-chaleur en une demi-journée, sans dégâts."
        }
    ];

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
                    Comment se passe l'installation à {city.name} ?
                </h2>

                <div className="relative">
                    {/* Connector Line (Hidden on mobile) */}
                    <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-slate-100" />

                    <div className="grid md:grid-cols-3 gap-8">
                        {steps.map((step, idx) => (
                            <div key={idx} className="relative flex flex-col items-center text-center group">
                                <div className="w-16 h-16 bg-white border-2 border-orange-100 rounded-full flex items-center justify-center mb-4 z-10 group-hover:border-emerald-500 group-hover:bg-emerald-50 transition-colors">
                                    <step.icon className="h-8 w-8 text-emerald-600" />
                                </div>
                                <h3 className="font-bold text-lg text-slate-900 mb-2">{step.title}</h3>
                                <p className="text-sm text-slate-600">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

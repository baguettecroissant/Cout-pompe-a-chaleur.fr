"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, CheckCircle, Info, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

type PacType = "air-air" | "air-eau" | "geothermie";
type Surface = "petite" | "moyenne" | "grande";

interface PriceRange {
    min: number;
    max: number;
}

// Price matrix based on type and surface
const PRICE_MATRIX: Record<PacType, Record<Surface, PriceRange>> = {
    "air-air": {
        petite: { min: 5000, max: 8000 },
        moyenne: { min: 8000, max: 11000 },
        grande: { min: 11000, max: 15000 },
    },
    "air-eau": {
        petite: { min: 9000, max: 12000 },
        moyenne: { min: 12000, max: 16000 },
        grande: { min: 16000, max: 22000 },
    },
    geothermie: {
        petite: { min: 15000, max: 20000 },
        moyenne: { min: 20000, max: 25000 },
        grande: { min: 25000, max: 35000 },
    },
};

// Options costs
const OPTIONS = {
    ecs: { label: "Production d'Eau Chaude Sanitaire (ECS)", cost: 2000 },
    rafraichissement: { label: "Mode Rafraîchissement / Climatisation", cost: 500 },
    thermostat: { label: "Thermostat intelligent connecté", cost: 250 },
    depose: { label: "Dépose de l'ancienne chaudière / cuve", cost: 800 },
};

export default function SimulateurPrix() {
    const [step, setStep] = useState(1);
    const [pacType, setPacType] = useState<PacType | null>(null);
    const [surface, setSurface] = useState<Surface | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);

    const toggleOption = (option: string) => {
        setSelectedOptions(prev =>
            prev.includes(option)
                ? prev.filter(o => o !== option)
                : [...prev, option]
        );
    };

    const calculatePrice = (): PriceRange | null => {
        if (!pacType || !surface) return null;

        const basePrice = PRICE_MATRIX[pacType][surface];
        const optionsCost = selectedOptions.reduce(
            (sum, opt) => sum + (OPTIONS[opt as keyof typeof OPTIONS]?.cost || 0),
            0
        );

        return {
            min: basePrice.min + optionsCost,
            max: basePrice.max + optionsCost,
        };
    };

    const handleSubmit = () => {
        if (pacType && surface) {
            setShowResult(true);
        }
    };

    const price = calculatePrice();

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getTypeLabel = (type: PacType) => {
        switch (type) {
            case "air-air": return "Air/Air";
            case "air-eau": return "Air/Eau";
            case "geothermie": return "Géothermie";
        }
    };

    const getSurfaceLabel = (surf: Surface) => {
        switch (surf) {
            case "petite": return "Moins de 100 m²";
            case "moyenne": return "100 à 150 m²";
            case "grande": return "Plus de 150 m²";
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="bg-slate-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <Breadcrumbs items={[{ label: "Simulateur de Prix" }]} />
                    <div className="max-w-3xl mx-auto text-center mt-4">
                        <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                            <Calculator className="h-4 w-4" />
                            Outil Gratuit
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">
                            Simulateur de Prix Pompe à Chaleur
                        </h1>
                        <p className="text-xl text-slate-300">
                            Estimez le coût de votre installation en 30 secondes
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-3xl">
                    {!showResult ? (
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                            {/* Progress Bar */}
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                                <div className="flex items-center gap-4">
                                    <div className={`flex items-center gap-2 ${step >= 1 ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200'}`}>1</div>
                                        <span className="hidden sm:inline font-medium">Type</span>
                                    </div>
                                    <div className="flex-1 h-1 bg-slate-200 rounded">
                                        <div className={`h-full bg-emerald-600 rounded transition-all ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
                                    </div>
                                    <div className={`flex items-center gap-2 ${step >= 2 ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200'}`}>2</div>
                                        <span className="hidden sm:inline font-medium">Surface</span>
                                    </div>
                                    <div className="flex-1 h-1 bg-slate-200 rounded">
                                        <div className={`h-full bg-emerald-600 rounded transition-all ${step >= 3 ? 'w-full' : 'w-0'}`}></div>
                                    </div>
                                    <div className={`flex items-center gap-2 ${step >= 3 ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200'}`}>3</div>
                                        <span className="hidden sm:inline font-medium">Options</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 md:p-8">
                                {/* Step 1: Type */}
                                {step === 1 && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                            Quel type de pompe à chaleur souhaitez-vous ?
                                        </h2>
                                        <div className="grid gap-4">
                                            {[
                                                { value: "air-air", label: "PAC Air/Air (Climatisation réversible)", desc: "Idéal pour réchauffer l'air et rafraîchir en été" },
                                                { value: "air-eau", label: "PAC Air/Eau", desc: "Se raccorde sur vos radiateurs existants ou plancher chauffant" },
                                                { value: "geothermie", label: "PAC Géothermique (Sol/Eau ou Eau/Eau)", desc: "Capte la chaleur du sol ou de la nappe phréatique" },
                                            ].map((type) => (
                                                <button
                                                    key={type.value}
                                                    onClick={() => {
                                                        setPacType(type.value as PacType);
                                                        setStep(2);
                                                    }}
                                                    className={`p-4 border-2 rounded-xl text-left transition-all ${pacType === type.value
                                                        ? 'border-emerald-500 bg-emerald-50'
                                                        : 'border-slate-200 hover:border-emerald-300'
                                                        }`}
                                                >
                                                    <div className="font-bold text-slate-900">{type.label}</div>
                                                    <div className="text-sm text-slate-500">{type.desc}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Surface */}
                                {step === 2 && (
                                    <div>
                                        <button onClick={() => setStep(1)} className="text-sm text-slate-500 hover:text-emerald-600 mb-4">
                                            ← Retour
                                        </button>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                            Quelle est la surface de votre logement ?
                                        </h2>
                                        <div className="grid gap-4">
                                            {[
                                                { value: "petite", label: "Moins de 100 m²", desc: "Besoin de puissance modéré" },
                                                { value: "moyenne", label: "De 100 à 150 m²", desc: "Maison standard, puissance intermédiaire" },
                                                { value: "grande", label: "Plus de 150 m²", desc: "Grande capacité de chauffage nécessaire" },
                                            ].map((len) => (
                                                <button
                                                    key={len.value}
                                                    onClick={() => {
                                                        setSurface(len.value as Surface);
                                                        setStep(3);
                                                    }}
                                                    className={`p-4 border-2 rounded-xl text-left transition-all ${surface === len.value
                                                        ? 'border-emerald-500 bg-emerald-50'
                                                        : 'border-slate-200 hover:border-emerald-300'
                                                        }`}
                                                >
                                                    <div className="font-bold text-slate-900">{len.label}</div>
                                                    <div className="text-sm text-slate-500">{len.desc}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Options */}
                                {step === 3 && (
                                    <div>
                                        <button onClick={() => setStep(2)} className="text-sm text-slate-500 hover:text-emerald-600 mb-4">
                                            ← Retour
                                        </button>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                            Options requises pour votre projet
                                        </h2>
                                        <p className="text-slate-500 mb-6">(Facultatif, vous pouvez passer cette étape)</p>
                                        <div className="grid gap-3 mb-8">
                                            {Object.entries(OPTIONS).map(([key, opt]) => (
                                                <label
                                                    key={key}
                                                    className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedOptions.includes(key)
                                                        ? 'border-emerald-500 bg-emerald-50'
                                                        : 'border-slate-200 hover:border-emerald-300'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedOptions.includes(key)}
                                                            onChange={() => toggleOption(key)}
                                                            className="w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                                                        />
                                                        <span className="font-medium text-slate-900">{opt.label}</span>
                                                    </div>
                                                    <span className="text-emerald-600 font-bold">+{opt.cost}€</span>
                                                </label>
                                            ))}
                                        </div>

                                        <Button
                                            onClick={handleSubmit}
                                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 text-lg rounded-xl"
                                        >
                                            Voir mon estimation
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        /* Results */
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                        <CheckCircle className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Votre estimation de prix</h2>
                                    <p className="text-slate-500">Pompe à chaleur {getTypeLabel(pacType!)} • Surface de {getSurfaceLabel(surface!)}</p>
                                </div>

                                {price && (
                                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl p-6 text-center mb-8">
                                        <div className="text-sm uppercase tracking-wider mb-2 opacity-90">Estimation globale (pose comprise)</div>
                                        <div className="text-4xl md:text-5xl font-bold">
                                            {formatPrice(price.min)} - {formatPrice(price.max)}
                                        </div>
                                    </div>
                                )}

                                {/* Breakdown */}
                                <div className="bg-slate-50 rounded-xl p-4 mb-6">
                                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                        <Euro className="h-5 w-5 text-emerald-600" />
                                        Détail du calcul
                                    </h3>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex justify-between">
                                            <span className="text-slate-600">Pompe à chaleur {getTypeLabel(pacType!)} ({getSurfaceLabel(surface!)})</span>
                                            <span className="font-medium">{formatPrice(PRICE_MATRIX[pacType!][surface!].min)} - {formatPrice(PRICE_MATRIX[pacType!][surface!].max)}</span>
                                        </li>
                                        {selectedOptions.map(opt => (
                                            <li key={opt} className="flex justify-between">
                                                <span className="text-slate-600">{OPTIONS[opt as keyof typeof OPTIONS].label}</span>
                                                <span className="font-medium">+{formatPrice(OPTIONS[opt as keyof typeof OPTIONS].cost)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Info Box */}
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                                    <div className="flex gap-3">
                                        <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                                        <div className="text-sm text-blue-800">
                                            <strong>Bon à savoir :</strong> Ce montant peut être considérablement réduit grâce aux aides financières de l'État (jusqu'à 10 000€ avec MaPrimeRénov' et CEE).{' '}
                                            <Link href="/calculateur-aides" className="underline font-medium">Calculez vos aides →</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <Button
                                        onClick={() => {
                                            setShowResult(false);
                                            setStep(1);
                                            setPacType(null);
                                            setSurface(null);
                                            setSelectedOptions([]);
                                        }}
                                        variant="outline"
                                        className="h-12 border-slate-300 text-slate-700 hover:bg-slate-50"
                                    >
                                        Refaire une simulation
                                    </Button>
                                    <Link href="/devis">
                                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12">
                                            Obtenir un devis précis
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Trust signals */}
                            <div className="bg-white rounded-xl border border-slate-200 p-6">
                                <p className="text-center text-slate-600 text-sm">
                                    <strong>Pourquoi demander un devis ?</strong> Cette estimation est 100% indicative. Seule une étude thermique de votre logement et une visite technique (généralement gratuites) permettent un dimensionnement exact de votre future pompe à chaleur.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* SEO Content */}
            <section className="py-16 bg-white border-t border-slate-200">
                <div className="container mx-auto px-4 max-w-3xl prose prose-slate">
                    <h2>Comment fonctionne notre simulateur de prix ?</h2>
                    <p>
                        Notre outil de simulation vous permet d'obtenir une <strong>estimation réaliste du coût d'une pompe à chaleur</strong> en quelques clics.
                        Les prix estimés sont basés sur les tarifs moyens constatés en France en 2026, incluant l'achat du matériel et sa pose par un artisan certifié RGE.
                    </p>
                    <h3>Critères pris en compte</h3>
                    <ul>
                        <li><strong>Technologie de PAC :</strong> Les modèles Air/Air sont généralement plus abordables, tandis que la Géothermie ou l'Air/Eau affichent des prix supérieurs compte tenu des performances et du réseau hydraulique nécessaire.</li>
                        <li><strong>Surface à chauffer :</strong> Plus votre maison est grande, plus la puissance (kW) de l'appareil doit être élevée, impactant directement son coût.</li>
                        <li><strong>Options et complexité :</strong> La production d'eau chaude sanitaire, l'ajout de thermostats connectés ou l'enlèvement d'une chaudière fioul existante modifient le prix final.</li>
                    </ul>
                    <p>
                        <Link href="/guides/prix-pompe-a-chaleur-2026" className="text-emerald-600 font-medium">Consultez notre guide complet des prix de pompe à chaleur en 2026</Link> pour des informations plus exhaustives.
                    </p>
                </div>
            </section>
        </div>
    );
}

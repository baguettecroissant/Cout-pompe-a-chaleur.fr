"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, CheckCircle, Info, Euro, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

type RevenusCategory = "tres_modestes" | "modestes" | "intermediaires" | "superieurs";
type Situation = "proprietaire" | "locataire";
type TypePAC = "air-air" | "air-eau" | "geothermie";

interface AidesResult {
    maPrimeRenov: number;
    primeCEE: number;
    tvaReduite: number;
    totalAides: number;
    resteACharge: number;
    category: string;
}

// Plafonds de revenus (Île-de-France)
const PLAFONDS_IDF = {
    tres_modestes: { 1: 23541, 2: 34551, 3: 41493, 4: 48447, 5: 55427 },
    modestes: { 1: 28657, 2: 42058, 3: 50513, 4: 58981, 5: 67473 },
    intermediaires: { 1: 38184, 2: 56130, 3: 67585, 4: 79041, 5: 90496 },
};

// Plafonds de revenus (Province)
const PLAFONDS_PROVINCE = {
    tres_modestes: { 1: 17009, 2: 24875, 3: 29917, 4: 34948, 5: 40002 },
    modestes: { 1: 21805, 2: 31889, 3: 38349, 4: 44802, 5: 51281 },
    intermediaires: { 1: 29148, 2: 42848, 3: 51592, 4: 60336, 5: 69081 },
};

export default function CalculateurAides() {
    const [step, setStep] = useState(1);
    const [typePac, setTypePac] = useState<TypePAC>("air-eau");
    const [prixTravaux, setPrixTravaux] = useState<number>(12000);
    const [situation, setSituation] = useState<Situation | null>(null);
    const [zone, setZone] = useState<"idf" | "province" | null>(null);
    const [foyer, setFoyer] = useState<number>(1);
    const [revenus, setRevenus] = useState<number>(0);
    const [showResult, setShowResult] = useState(false);

    const getRevenusCategory = (): RevenusCategory => {
        const plafonds = zone === "idf" ? PLAFONDS_IDF : PLAFONDS_PROVINCE;
        const personnes = Math.min(foyer, 5) as 1 | 2 | 3 | 4 | 5;

        if (revenus <= plafonds.tres_modestes[personnes]) return "tres_modestes";
        if (revenus <= plafonds.modestes[personnes]) return "modestes";
        if (revenus <= plafonds.intermediaires[personnes]) return "intermediaires";
        return "superieurs";
    };

    const calculateAides = (): AidesResult | null => {
        if (!situation || !zone) return null;

        const category = getRevenusCategory();

        let maPrimeRenov = 0;
        let primeCEE = 0;
        let tauxTVA = 0.055; // 5.5% par défaut pour PAC Air/Eau et Géo

        if (typePac === "air-air") {
            // PAC Air/Air: Pas de MPR. Prime CEE minime. TVA 20% en général (sauf exception MO à 10%). On simplifie.
            tauxTVA = 0.20;
            // Prime énergie (CEE) réduite pour Air/Air (souvent < 1000€, dépend de la prime)
            primeCEE = category === "tres_modestes" || category === "modestes" ? 800 : 400;
        } else if (typePac === "air-eau") {
            // PAC Air/Eau
            if (situation === "proprietaire") {
                if (category === "tres_modestes") maPrimeRenov = 5000;
                else if (category === "modestes") maPrimeRenov = 4000;
                else if (category === "intermediaires") maPrimeRenov = 3000;
                else maPrimeRenov = 0;
            }
            // Prime CEE "Coup de pouce chauffage" (Remplacement chaudière fioul/gaz)
            primeCEE = category === "tres_modestes" || category === "modestes" ? 4000 : 2500;
        } else if (typePac === "geothermie") {
            // Géothermie (Aides plus importantes)
            if (situation === "proprietaire") {
                if (category === "tres_modestes") maPrimeRenov = 11000;
                else if (category === "modestes") maPrimeRenov = 9000;
                else if (category === "intermediaires") maPrimeRenov = 6000;
                else maPrimeRenov = 0;
            }
            primeCEE = category === "tres_modestes" || category === "modestes" ? 5000 : 5000;
        }

        // Si on est locataire, généralement MPR n'est pas accessible directement, CEE locataire possible avec accord.
        if (situation === "locataire") {
            maPrimeRenov = 0;
        }

        // Économie de TVA (estimation si le devis de base était à 20%)
        let tvaReduite = 0;
        if (tauxTVA === 0.055) {
            tvaReduite = Math.round(prixTravaux * 0.145 * 0.5);
        }

        // Écrêtement des aides (ex: max 90% pour très modestes, 75% modestes, etc.)
        let totalAidesBrut = maPrimeRenov + primeCEE;

        let plafondAides = prixTravaux;
        if (category === "tres_modestes") plafondAides = prixTravaux * 0.90;
        else if (category === "modestes") plafondAides = prixTravaux * 0.75;
        else if (category === "intermediaires") plafondAides = prixTravaux * 0.60;
        else plafondAides = prixTravaux * 0.40;

        const totalAides = Math.min(totalAidesBrut, plafondAides);
        const resteACharge = Math.max(0, prixTravaux - totalAides - tvaReduite);

        return {
            maPrimeRenov: maPrimeRenov > totalAides ? totalAides : maPrimeRenov,
            primeCEE: Math.min(primeCEE, totalAides),
            tvaReduite,
            totalAides: totalAides + tvaReduite,
            resteACharge,
            category: category.replace("_", " "),
        };
    };

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleSubmit = () => {
        if (situation && zone && revenus > 0) {
            setShowResult(true);
        }
    };

    const result = calculateAides();

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="bg-slate-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <Breadcrumbs items={[{ label: "Calculateur d'Aides" }]} />
                    <div className="max-w-3xl mx-auto text-center mt-4">
                        <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                            <Calculator className="h-4 w-4" />
                            Simulation Aides de l\'État
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">
                            Calculez vos aides pompe à chaleur
                        </h1>
                        <p className="text-xl text-slate-300">
                            MaPrimeRénov\', Prime CEE (Coup de pouce) : découvrez votre reste à charge
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-3xl">
                    {!showResult ? (
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                            <div className="p-6 md:p-8">
                                {/* Step 1: Type de PAC */}
                                {step === 1 && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                            Quel type de pompe à chaleur prévoyez-vous d'installer ?
                                        </h2>
                                        <div className="grid gap-4 mb-8">
                                            {[
                                                { id: "air-air", label: "PAC Air/Air (Climatisation réversible)", desc: "Éligible uniquement aux CEE" },
                                                { id: "air-eau", label: "PAC Air/Eau", desc: "Éligible MaPrimeRénov\' et CEE (Coup de pouce)" },
                                                { id: "geothermie", label: "PAC Géothermique", desc: "Les aides les plus importantes" }
                                            ].map((pacOption) => (
                                                <button
                                                    key={pacOption.id}
                                                    onClick={() => {
                                                        setTypePac(pacOption.id as TypePAC);
                                                        setStep(2);
                                                    }}
                                                    className={`p-4 border-2 rounded-xl text-left transition-all ${typePac === pacOption.id
                                                        ? 'border-emerald-500 bg-emerald-50'
                                                        : 'border-slate-200 hover:border-orange-300'
                                                        }`}
                                                >
                                                    <div className="font-bold text-slate-900">{pacOption.label}</div>
                                                    <div className="text-sm text-slate-500">{pacOption.desc}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Prix des travaux */}
                                {step === 2 && (
                                    <div>
                                        <button onClick={() => setStep(1)} className="text-sm text-slate-500 hover:text-emerald-600 mb-4">
                                            ← Retour
                                        </button>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                            Quel est le montant estimé des travaux ?
                                        </h2>
                                        <div className="mb-8">
                                            <div className="flex items-center gap-4 mb-4">
                                                <input
                                                    type="range"
                                                    min="3000"
                                                    max="30000"
                                                    step="500"
                                                    value={prixTravaux}
                                                    onChange={(e) => setPrixTravaux(Number(e.target.value))}
                                                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                                                />
                                            </div>
                                            <div className="text-center">
                                                <span className="text-4xl font-bold text-emerald-600">{formatPrice(prixTravaux)}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-500 mb-6 flex items-start gap-2">
                                            <HelpCircle className="h-4 w-4 shrink-0 mt-0.5" />
                                            <span>Pas encore de devis ? <Link href="/simulateur-prix" className="text-emerald-600 underline">Estimez d'abord le prix</Link></span>
                                        </p>
                                        <Button
                                            onClick={() => setStep(3)}
                                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 text-lg rounded-xl"
                                        >
                                            Continuer
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </div>
                                )}

                                {/* Step 3: Situation */}
                                {step === 3 && (
                                    <div>
                                        <button onClick={() => setStep(2)} className="text-sm text-slate-500 hover:text-emerald-600 mb-4">
                                            ← Retour
                                        </button>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                            Vous êtes ?
                                        </h2>
                                        <div className="grid gap-4 mb-8">
                                            {[
                                                { value: "proprietaire", label: "Propriétaire occupant", desc: "Le logement est votre résidence principale" },
                                                { value: "locataire", label: "Locataire", desc: "Avec accord du propriétaire (Attention: réduit l'accès à MPR)" },
                                            ].map((s) => (
                                                <button
                                                    key={s.value}
                                                    onClick={() => {
                                                        setSituation(s.value as Situation);
                                                        setStep(4);
                                                    }}
                                                    className={`p-4 border-2 rounded-xl text-left transition-all ${situation === s.value
                                                        ? 'border-emerald-500 bg-emerald-50'
                                                        : 'border-slate-200 hover:border-orange-300'
                                                        }`}
                                                >
                                                    <div className="font-bold text-slate-900">{s.label}</div>
                                                    <div className="text-sm text-slate-500">{s.desc}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Zone géographique */}
                                {step === 4 && (
                                    <div>
                                        <button onClick={() => setStep(3)} className="text-sm text-slate-500 hover:text-emerald-600 mb-4">
                                            ← Retour
                                        </button>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                            Où se situe le logement ?
                                        </h2>
                                        <div className="grid gap-4 mb-8">
                                            {[
                                                { value: "idf", label: "Île-de-France", desc: "Paris et départements 77, 78, 91, 92, 93, 94, 95" },
                                                { value: "province", label: "Province", desc: "Tous les autres départements" },
                                            ].map((z) => (
                                                <button
                                                    key={z.value}
                                                    onClick={() => {
                                                        setZone(z.value as "idf" | "province");
                                                        setStep(5);
                                                    }}
                                                    className={`p-4 border-2 rounded-xl text-left transition-all ${zone === z.value
                                                        ? 'border-emerald-500 bg-emerald-50'
                                                        : 'border-slate-200 hover:border-orange-300'
                                                        }`}
                                                >
                                                    <div className="font-bold text-slate-900">{z.label}</div>
                                                    <div className="text-sm text-slate-500">{z.desc}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Step 5: Foyer & Revenus */}
                                {step === 5 && (
                                    <div>
                                        <button onClick={() => setStep(4)} className="text-sm text-slate-500 hover:text-emerald-600 mb-4">
                                            ← Retour
                                        </button>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                            Informations sur votre foyer
                                        </h2>

                                        <div className="space-y-6 mb-8">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Nombre de personnes dans le foyer
                                                </label>
                                                <div className="flex gap-2">
                                                    {[1, 2, 3, 4, 5].map((n) => (
                                                        <button
                                                            key={n}
                                                            onClick={() => setFoyer(n)}
                                                            className={`w-12 h-12 rounded-lg font-bold transition-all ${foyer === n
                                                                ? 'bg-emerald-600 text-white'
                                                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                                                }`}
                                                        >
                                                            {n}{n === 5 ? '+' : ''}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Revenu fiscal de référence (avis d'imposition N-1)
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        value={revenus || ''}
                                                        onChange={(e) => setRevenus(Number(e.target.value))}
                                                        placeholder="Ex: 25000"
                                                        className="w-full h-14 px-4 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-0 text-lg"
                                                    />
                                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">€/an</span>
                                                </div>
                                                <p className="text-xs text-slate-500 mt-2">
                                                    Ce montant figure sur votre avis d'imposition, ligne "Revenu fiscal de référence"
                                                </p>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={handleSubmit}
                                            disabled={revenus <= 0}
                                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 text-lg rounded-xl disabled:opacity-50"
                                        >
                                            Calculer mes aides
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
                                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Vos aides estimées</h2>
                                    <p className="text-slate-500">Pour un projet de {formatPrice(prixTravaux)} ({typePac.replace("-", "/")})</p>
                                </div>

                                {result && (
                                    <>
                                        {/* Main Result */}
                                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                            <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200">
                                                <div className="text-sm text-green-700 mb-1">Total des aides</div>
                                                <div className="text-3xl font-bold text-green-600">{formatPrice(result.totalAides)}</div>
                                            </div>
                                            <div className="bg-emerald-50 rounded-xl p-6 text-center border border-emerald-200">
                                                <div className="text-sm text-emerald-700 mb-1">Reste à charge estimé</div>
                                                <div className="text-3xl font-bold text-emerald-600">{formatPrice(result.resteACharge)}</div>
                                            </div>
                                        </div>

                                        {/* Breakdown */}
                                        <div className="bg-slate-50 rounded-xl p-4 mb-6">
                                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                                <Euro className="h-5 w-5 text-green-600" />
                                                Détail par dispositif
                                            </h3>
                                            <ul className="space-y-3">
                                                {result.maPrimeRenov > 0 ? (
                                                    <li className="flex justify-between items-center p-3 bg-white rounded-lg">
                                                        <div>
                                                            <span className="font-medium text-slate-900">MaPrimeRénov'</span>
                                                            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full capitalize">
                                                                Profil {result.category.split('_').join(' ')}
                                                            </span>
                                                        </div>
                                                        <span className="font-bold text-green-600">+{formatPrice(result.maPrimeRenov)}</span>
                                                    </li>
                                                ) : (
                                                    <li className="flex justify-between items-center p-3 bg-white rounded-lg text-slate-400">
                                                        <span>MaPrimeRénov'</span>
                                                        <span className="text-sm">Non éligible (revenus ou type de PAC)</span>
                                                    </li>
                                                )}

                                                {result.primeCEE > 0 && (
                                                    <li className="flex justify-between items-center p-3 bg-white rounded-lg">
                                                        <div>
                                                            <span className="font-medium text-slate-900">Prime CEE / Coup de pouce</span>
                                                        </div>
                                                        <span className="font-bold text-green-600">+{formatPrice(result.primeCEE)}</span>
                                                    </li>
                                                )}

                                                {result.tvaReduite > 0 && (
                                                    <li className="flex justify-between items-center p-3 bg-white rounded-lg">
                                                        <div>
                                                            <span className="font-medium text-slate-900">Estimation Éco TVA 5,5%</span>
                                                        </div>
                                                        <span className="font-bold text-green-600">≈ +{formatPrice(result.tvaReduite)}</span>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>

                                        {/* Info Box */}
                                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                                            <div className="flex gap-3">
                                                <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                                                <div className="text-sm text-blue-800">
                                                    <strong>Important :</strong> Ces montants sont indicatifs et dépendent de la surface à chauffer, du remplacement d'une ancienne chaudière, et du recours obligatoire à un professionnel RGE (Reconnu Garant de l'Environnement).
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <Button
                                        onClick={() => {
                                            setShowResult(false);
                                            setStep(1);
                                        }}
                                        variant="outline"
                                        className="h-12"
                                    >
                                        Refaire une simulation
                                    </Button>
                                    <Link href="/devis">
                                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12">
                                            Valider mes aides
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* SEO Content */}
            <section className="py-16 bg-white border-t border-slate-200">
                <div className="container mx-auto px-4 max-w-3xl prose prose-slate">
                    <h2>Les aides de l'État pour l'installation d'une Pompe à Chaleur (PAC)</h2>

                    <h3>MaPrimeRénov'</h3>
                    <p>
                        <strong>MaPrimeRénov'</strong> est l'aide phare pour la rénovation énergétique. Calculée en fonction de vos revenus (tranches Bleu, Jaune, Violet, Rose), elle permet de financer une grande partie de votre pompe à chaleur de type Air/Eau ou Géothermie.
                    </p>
                    <ul>
                        <li>Réservée aux <strong>propriétaires</strong> occupant un logement achevé depuis plus de 15 ans.</li>
                        <li>Non applicable pour les PAC Air/Air (climatisation réversible).</li>
                        <li>Les primes peuvent atteindre jusqu'à 11 000 € pour la géothermie (ménages très modestes).</li>
                    </ul>

                    <h3>Les Primes CEE (Coup de Pouce Chauffage)</h3>
                    <p>
                        Les primes <strong>CEE (Certificats d'Économies d'Énergie)</strong> sont versées par les fournisseurs d'énergie. En cas de remplacement d'une vieille chaudière (fioul, charbon ou gaz hors condensation) par une PAC Air/Eau ou géothermique, la prime <strong>Coup de Pouce Chauffage</strong> s'applique et augmente considérablement le montant de l'aide (de 2500 € à plus de 4000 €).
                    </p>

                    <h3>L'Éco-Prêt à Taux Zéro (Éco-PTZ) et TVA réduite</h3>
                    <p>
                        L'Éco-PTZ permet de financer votre reste à charge sans intérêts, jusqu'à 30 000 €.
                        De plus, l'installation d'une PAC Air/Eau ou Géothermie par un artisan RGE bénéficie d'une <strong>TVA à taux réduit de 5,5 %</strong> (au lieu de 20 %).
                    </p>

                    <p>
                        <Link href="/guides" className="text-emerald-600">
                            Découvrez tous nos guides sur le financement de votre pompe à chaleur →
                        </Link>
                    </p>
                </div>
            </section>
        </div>
    );
}

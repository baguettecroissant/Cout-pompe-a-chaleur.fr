"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, CheckCircle, Zap, TrendingUp,
  Leaf, Euro, MapPin, Thermometer, Home, BatteryCharging,
  Info, Calculator, RotateCcw, Flame, Wind, Gauge, Snowflake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  CLIMATE_ZONES, INSULATION_LEVELS, PAC_TYPES, EMITTER_TYPES,
  CURRENT_HEATING_TYPES, ENERGY_TARIFFS, DEPARTMENT_LIST,
  findClimateZone, searchDepartments,
  type ClimateZone, type CurrentHeating,
} from "@/data/pac-dimensionnement";

/* ──────────────── types ──────────────── */

interface DimensionnementResult {
  puissanceKW: number;
  puissanceRecommandee: number; // avec marge de sécurité
  deperditions: number; // W
  besoinChauffage: number; // kWh/an
  consoElecPAC: number; // kWh élec/an (besoin / COP)
  coutElecAnnuel: number; // €/an
  coutChauffageActuel: number; // €/an avec ancien système
  economiesAnnuelles: number; // €/an
  economiesPourcent: number; // %
  co2Avant: number; // kg CO2/an
  co2Apres: number; // kg CO2/an
  co2Economise: number; // kg CO2/an
  coutInstallation: { min: number; max: number };
  roiAns: number;
  gainsSur15Ans: number;
}

/* ──────────────── calculation engine ──────────────── */

function calculateDimensionnement(
  surface: number,
  hauteurPlafond: number,
  insulation: string,
  zone: ClimateZone,
  pacType: string,
  emitter: string,
  currentHeating: CurrentHeating,
): DimensionnementResult {
  const volume = surface * hauteurPlafond;
  const insLevel = INSULATION_LEVELS.find(i => i.key === insulation)!;
  const pac = PAC_TYPES.find(p => p.key === pacType)!;
  const emitterData = EMITTER_TYPES.find(e => e.key === emitter);
  const heating = CURRENT_HEATING_TYPES.find(h => h.key === currentHeating)!;

  // Température intérieure de consigne
  const tInterieure = 20;

  // Déperditions thermiques (W)
  const deltaT = tInterieure - zone.temperatureBase;
  const deperditions = Math.round(insLevel.coefficient * volume * deltaT);

  // Puissance nécessaire en kW
  const puissanceKW = deperditions / 1000;

  // Marge de sécurité 10-15%
  const marge = zone.temperatureBase < -7 ? 1.15 : 1.10;
  const puissanceRecommandee = Math.round(puissanceKW * marge * 10) / 10;

  // Besoin chauffage annuel (kWh) — méthode DJU
  const besoinChauffage = Math.round(
    insLevel.coefficient * volume * zone.dju * 24 / 1000
  );

  // Ajustement COP selon émetteur (haute temp = COP réduit)
  let copAjuste = pac.cop;
  if (emitterData) {
    if (emitterData.key === "radiateurs-ht") copAjuste *= 0.75; // pénalité haute temp
    if (emitterData.key === "plancher") copAjuste *= 1.05; // bonus basse temp
  }
  copAjuste = Math.round(copAjuste * 10) / 10;

  // Consommation électrique PAC
  const consoElecPAC = Math.round(besoinChauffage / copAjuste);

  // Coût annuel PAC
  const coutElecAnnuel = Math.round(consoElecPAC * ENERGY_TARIFFS.electricityPrice);

  // Coût chauffage actuel 
  // rendement ancien système (chaudière ~85%, élec direct = 100%)
  const rendementActuel = currentHeating === "electrique" ? 1.0 : 0.85;
  const consoActuelle = besoinChauffage / rendementActuel;
  const coutChauffageActuel = Math.round(consoActuelle * heating.pricePerKWh);

  // Économies
  const economiesAnnuelles = Math.max(0, coutChauffageActuel - coutElecAnnuel);
  const economiesPourcent = coutChauffageActuel > 0
    ? Math.round((economiesAnnuelles / coutChauffageActuel) * 100)
    : 0;

  // CO2
  const co2Avant = Math.round(consoActuelle * heating.co2PerKWh);
  const co2Apres = Math.round(consoElecPAC * ENERGY_TARIFFS.co2Electricity);
  const co2Economise = Math.max(0, co2Avant - co2Apres);

  // Coût installation
  const coutInstallation = {
    min: Math.round(puissanceRecommandee * pac.pricePerKW.min),
    max: Math.round(puissanceRecommandee * pac.pricePerKW.max),
  };

  // ROI
  const investMoyen = (coutInstallation.min + coutInstallation.max) / 2;
  const roiAns = economiesAnnuelles > 0
    ? Math.round(investMoyen / economiesAnnuelles)
    : 99;

  // Gains cumulés 15 ans (avec inflation énergie)
  let gainsCumules = 0;
  for (let y = 1; y <= 15; y++) {
    const facteurInflation = Math.pow(1 + ENERGY_TARIFFS.energyInflation, y - 1);
    const ecoAnnee = economiesAnnuelles * facteurInflation;
    gainsCumules += ecoAnnee;
  }

  return {
    puissanceKW: Math.round(puissanceKW * 10) / 10,
    puissanceRecommandee,
    deperditions,
    besoinChauffage,
    consoElecPAC,
    coutElecAnnuel,
    coutChauffageActuel,
    economiesAnnuelles,
    economiesPourcent,
    co2Avant,
    co2Apres,
    co2Economise,
    coutInstallation,
    roiAns,
    gainsSur15Ans: Math.round(gainsCumules),
  };
}

/* ──────────────── format helpers ──────────────── */

function fmt(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(n);
}
function fmtEuro(n: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

/* ──────────────── step progress ──────────────── */

function StepProgress({ step }: { step: number }) {
  const labels = ["Logement", "Isolation", "PAC", "Chauffage"];
  return (
    <div className="flex items-center gap-2 mb-8">
      {labels.map((label, i) => (
        <div key={i} className="flex items-center gap-2 flex-1">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-300
            ${i + 1 <= step ? "bg-emerald-600 text-white shadow-md" : "bg-slate-200 text-slate-400"}`}>
            {i + 1 <= step ? <CheckCircle className="h-5 w-5" /> : i + 1}
          </div>
          <span className={`hidden sm:inline text-sm font-medium transition-colors ${i + 1 <= step ? "text-emerald-700" : "text-slate-400"}`}>
            {label}
          </span>
          {i < labels.length - 1 && (
            <div className="flex-1 h-1 rounded bg-slate-200 mx-1">
              <div className={`h-full rounded transition-all duration-500 ${i + 1 < step ? "bg-emerald-500 w-full" : "bg-transparent w-0"}`} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ──────────────── gauge visual ──────────────── */

function PowerGauge({ power, recommended }: { power: number; recommended: number }) {
  const maxScale = 25;
  const pct = Math.min((recommended / maxScale) * 100, 100);

  let color = "from-emerald-500 to-teal-400";
  let label = "Dimensionnement standard";
  if (recommended > 15) {
    color = "from-orange-500 to-red-400";
    label = "Haute puissance requise";
  } else if (recommended > 10) {
    color = "from-amber-500 to-orange-400";
    label = "Puissance moyenne-haute";
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-sm text-slate-500 font-medium">{label}</span>
        <span className="text-sm text-slate-400">{maxScale} kW max</span>
      </div>
      <div className="h-5 bg-slate-100 rounded-full overflow-hidden relative">
        <div
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-0 h-full w-0.5 bg-slate-400"
          style={{ left: `${Math.min((power / maxScale) * 100, 100)}%` }}
          title={`Puissance brute: ${power} kW`}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-slate-400">0 kW</span>
        <span className="text-xs text-emerald-600 font-bold">{recommended} kW recommandés</span>
      </div>
    </div>
  );
}

/* ──────────────── main page ──────────────── */

export default function CalculateurPuissance() {
  const [step, setStep] = useState(1);

  // Step 1 — Logement
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeptCode, setSelectedDeptCode] = useState<string | null>(null);
  const [selectedDeptName, setSelectedDeptName] = useState<string>("");
  const [surface, setSurface] = useState(120);
  const [hauteur, setHauteur] = useState(2.5);

  // Step 2 — Isolation
  const [insulation, setInsulation] = useState("bonne");

  // Step 3 — Type PAC
  const [pacType, setPacType] = useState("air-eau");
  const [emitter, setEmitter] = useState("radiateurs-bt");

  // Step 4 — Chauffage actuel
  const [currentHeating, setCurrentHeating] = useState<CurrentHeating>("gaz");

  // Results
  const [showResult, setShowResult] = useState(false);

  const searchResults = useMemo(() => searchDepartments(searchQuery), [searchQuery]);

  const climateZone = useMemo(() => {
    if (!selectedDeptCode) return null;
    return findClimateZone(selectedDeptCode) || null;
  }, [selectedDeptCode]);

  const result = useMemo(() => {
    if (!climateZone) return null;
    return calculateDimensionnement(surface, hauteur, insulation, climateZone, pacType, emitter, currentHeating);
  }, [surface, hauteur, insulation, climateZone, pacType, emitter, currentHeating]);

  const handleSubmit = useCallback(() => {
    if (climateZone) setShowResult(true);
  }, [climateZone]);

  const resetAll = useCallback(() => {
    setStep(1);
    setSearchQuery("");
    setSelectedDeptCode(null);
    setSelectedDeptName("");
    setSurface(120);
    setHauteur(2.5);
    setInsulation("bonne");
    setPacType("air-eau");
    setEmitter("radiateurs-bt");
    setCurrentHeating("gaz");
    setShowResult(false);
  }, []);

  /* ════════════════════════════════════ */

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Hero ── */}
      <section className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Outils", href: "/outils" }, { label: "Calculateur de Puissance" }]} />
          <div className="max-w-3xl mx-auto text-center mt-4">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Calculator className="h-4 w-4" />
              Dimensionnement Gratuit — Normes RT 2012
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Calculateur de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Puissance PAC</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Déterminez la puissance idéale en kW de votre pompe à chaleur selon votre logement, votre isolation et votre zone climatique.
            </p>
          </div>
        </div>
      </section>

      {/* ── Wizard ── */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          {!showResult ? (
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="p-6 md:p-10">
                <StepProgress step={step} />

                {/* ── STEP 1: Logement ── */}
                {step === 1 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                        <Home className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">Votre logement</h2>
                        <p className="text-slate-500 text-sm">Localisation, surface et hauteur sous plafond</p>
                      </div>
                    </div>

                    {/* Department search */}
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Département</label>
                    <div className="relative mb-4">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500" />
                      <input
                        type="text"
                        placeholder="Tapez un département (ex: Rhône, 69, Var...)"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setSelectedDeptCode(null); }}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-lg focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all"
                        autoFocus
                      />
                    </div>

                    {searchQuery && !selectedDeptCode && (
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden mb-6 max-h-56 overflow-y-auto">
                        {searchResults.length > 0 ? searchResults.map((dept) => {
                          const zone = findClimateZone(dept.code);
                          return (
                            <button
                              key={dept.code}
                              onClick={() => { setSelectedDeptCode(dept.code); setSelectedDeptName(dept.name); setSearchQuery(`${dept.name} (${dept.code})`); }}
                              className="w-full flex items-center justify-between p-4 hover:bg-emerald-50 transition-colors border-b border-slate-100 last:border-b-0 text-left"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-sm font-bold text-emerald-700">{dept.code}</span>
                                <span className="font-medium text-slate-900">{dept.name}</span>
                              </div>
                              {zone && <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded">{zone.code}</span>}
                            </button>
                          );
                        }) : (
                          <p className="p-4 text-slate-500 text-center">Aucun département trouvé</p>
                        )}
                      </div>
                    )}

                    {selectedDeptCode && climateZone && (
                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl p-5 mb-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-emerald-200 rounded-xl flex items-center justify-center">
                              <Thermometer className="h-6 w-6 text-emerald-700" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 text-lg">{selectedDeptName} ({selectedDeptCode})</p>
                              <p className="text-sm text-slate-500">{climateZone.label}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-black text-emerald-600 font-mono">{climateZone.temperatureBase}°C</p>
                            <p className="text-xs text-slate-500">Temp. base ext.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Surface */}
                    <label className="block text-sm font-semibold text-slate-700 mb-2 mt-6">Surface habitable</label>
                    <div className="mb-2">
                      <input
                        type="range" min={40} max={300} step={5} value={surface}
                        onChange={(e) => setSurface(Number(e.target.value))}
                        className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                      <div className="flex justify-between text-xs text-slate-400 mt-1 px-1">
                        <span>40 m²</span><span>170 m²</span><span>300 m²</span>
                      </div>
                    </div>
                    <div className="text-center mb-6">
                      <span className="text-4xl font-black text-emerald-600 font-mono">{surface}</span>
                      <span className="text-xl text-slate-400 ml-2">m²</span>
                    </div>

                    {/* Hauteur */}
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Hauteur sous plafond</label>
                    <div className="grid grid-cols-3 gap-3 mb-8">
                      {[
                        { v: 2.3, label: "2,30 m", desc: "Appartement" },
                        { v: 2.5, label: "2,50 m", desc: "Standard" },
                        { v: 3.0, label: "3,00 m", desc: "Ancien / Loft" },
                      ].map(h => (
                        <button
                          key={h.v}
                          onClick={() => setHauteur(h.v)}
                          className={`p-3 border-2 rounded-xl text-center transition-all
                            ${hauteur === h.v ? "border-emerald-400 bg-emerald-50 shadow-sm" : "border-slate-200 hover:border-emerald-300"}`}
                        >
                          <span className="block text-lg font-bold text-slate-900">{h.label}</span>
                          <span className="block text-xs text-slate-500 mt-0.5">{h.desc}</span>
                        </button>
                      ))}
                    </div>

                    <Button
                      onClick={() => setStep(2)}
                      disabled={!selectedDeptCode}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 text-lg rounded-2xl disabled:opacity-40 shadow-md font-bold"
                    >
                      Continuer <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                )}

                {/* ── STEP 2: Isolation ── */}
                {step === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <button onClick={() => setStep(1)} className="flex items-center gap-1 text-sm text-slate-400 hover:text-emerald-600 mb-4 font-medium">
                      <ArrowLeft className="h-4 w-4" /> Retour
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <Snowflake className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">Niveau d&apos;isolation</h2>
                        <p className="text-slate-500 text-sm">L&apos;isolation détermine les déperditions thermiques</p>
                      </div>
                    </div>

                    <div className="grid gap-3 mb-8">
                      {INSULATION_LEVELS.map((level) => (
                        <button
                          key={level.key}
                          onClick={() => setInsulation(level.key)}
                          className={`p-5 border-2 rounded-2xl text-left transition-all flex items-start gap-4
                            ${insulation === level.key ? "border-emerald-400 bg-emerald-50 shadow-sm" : "border-slate-200 hover:border-emerald-300"}`}
                        >
                          <span className="text-3xl">{level.emoji}</span>
                          <div className="flex-1">
                            <p className="font-bold text-slate-900 text-lg">{level.label}</p>
                            <p className="text-sm text-slate-500 mt-0.5">{level.description}</p>
                            <div className="mt-2 flex items-center gap-2">
                              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                                level.coefficient <= 0.6 ? "bg-green-100 text-green-700"
                                : level.coefficient <= 0.9 ? "bg-emerald-100 text-emerald-700"
                                : level.coefficient <= 1.2 ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                              }`}>
                                G = {level.coefficient} W/m³·°C
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <Button
                      onClick={() => setStep(3)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 text-lg rounded-2xl shadow-md font-bold"
                    >
                      Continuer <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                )}

                {/* ── STEP 3: Type PAC + Émetteurs ── */}
                {step === 3 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <button onClick={() => setStep(2)} className="flex items-center gap-1 text-sm text-slate-400 hover:text-emerald-600 mb-4 font-medium">
                      <ArrowLeft className="h-4 w-4" /> Retour
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center">
                        <Wind className="h-6 w-6 text-teal-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">Type de pompe à chaleur</h2>
                        <p className="text-slate-500 text-sm">Chaque technologie a ses avantages</p>
                      </div>
                    </div>

                    <div className="grid gap-3 mb-8">
                      {PAC_TYPES.map((pac) => (
                        <button
                          key={pac.key}
                          onClick={() => setPacType(pac.key)}
                          className={`p-5 border-2 rounded-2xl text-left transition-all
                            ${pacType === pac.key ? "border-emerald-400 bg-emerald-50 shadow-sm" : "border-slate-200 hover:border-emerald-300"}`}
                        >
                          <div className="flex items-start gap-4">
                            <span className="text-3xl">{pac.emoji}</span>
                            <div className="flex-1">
                              <p className="font-bold text-slate-900 text-lg">{pac.shortLabel}</p>
                              <p className="text-sm text-slate-500 mt-0.5">{pac.description}</p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                <span className="text-xs font-mono bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">COP {pac.cop}</span>
                                <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">Fonctionne jusqu&apos;à {pac.minTemp}°C</span>
                                <span className="text-xs font-mono bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{pac.pricePerKW.min}-{pac.pricePerKW.max} €/kW</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Émetteurs (only for air-eau and geothermie) */}
                    {(pacType === "air-eau" || pacType === "geothermie") && (
                      <>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                            <Flame className="h-5 w-5 text-orange-600" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900">Type d&apos;émetteurs</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                          {EMITTER_TYPES.map(em => (
                            <button
                              key={em.key}
                              onClick={() => setEmitter(em.key)}
                              className={`p-3 border-2 rounded-xl text-center transition-all
                                ${emitter === em.key ? "border-emerald-400 bg-emerald-50 shadow-sm" : "border-slate-200 hover:border-emerald-300"}`}
                            >
                              <span className="block text-sm font-bold text-slate-900">{em.label}</span>
                              <span className="block text-xs text-slate-500 mt-1">{em.tempDepart}°C départ</span>
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    <Button
                      onClick={() => setStep(4)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 text-lg rounded-2xl shadow-md font-bold"
                    >
                      Continuer <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                )}

                {/* ── STEP 4: Chauffage actuel + Récap ── */}
                {step === 4 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <button onClick={() => setStep(3)} className="flex items-center gap-1 text-sm text-slate-400 hover:text-emerald-600 mb-4 font-medium">
                      <ArrowLeft className="h-4 w-4" /> Retour
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                        <Flame className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">Votre chauffage actuel</h2>
                        <p className="text-slate-500 text-sm">Pour calculer vos économies potentielles</p>
                      </div>
                    </div>

                    <div className="grid gap-3 mb-8">
                      {CURRENT_HEATING_TYPES.map(h => (
                        <button
                          key={h.key}
                          onClick={() => setCurrentHeating(h.key)}
                          className={`p-4 border-2 rounded-2xl text-left transition-all flex items-center gap-4
                            ${currentHeating === h.key ? "border-emerald-400 bg-emerald-50 shadow-sm" : "border-slate-200 hover:border-emerald-300"}`}
                        >
                          <span className="text-2xl">{h.emoji}</span>
                          <div className="flex-1">
                            <p className="font-bold text-slate-900">{h.label}</p>
                            <p className="text-xs text-slate-500">{h.pricePerKWh} €/kWh</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Summary */}
                    <div className="bg-slate-50 rounded-2xl p-5 mb-6 border border-slate-200">
                      <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <CheckCircle className="h-4 w-4 text-emerald-600" /> Récapitulatif
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between"><span className="text-slate-500">Département</span><span className="font-semibold">{selectedDeptName} ({selectedDeptCode})</span></li>
                        <li className="flex justify-between"><span className="text-slate-500">Zone climatique</span><span className="font-semibold font-mono text-emerald-600">{climateZone?.code}</span></li>
                        <li className="flex justify-between"><span className="text-slate-500">Surface</span><span className="font-semibold font-mono">{surface} m² × {hauteur} m</span></li>
                        <li className="flex justify-between"><span className="text-slate-500">Isolation</span><span className="font-semibold">{INSULATION_LEVELS.find(i => i.key === insulation)?.label}</span></li>
                        <li className="flex justify-between"><span className="text-slate-500">Type PAC</span><span className="font-semibold">{PAC_TYPES.find(p => p.key === pacType)?.shortLabel}</span></li>
                        <li className="flex justify-between"><span className="text-slate-500">Chauffage actuel</span><span className="font-semibold">{CURRENT_HEATING_TYPES.find(h => h.key === currentHeating)?.label}</span></li>
                      </ul>
                    </div>

                    <Button
                      onClick={handleSubmit}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white h-14 text-lg rounded-2xl shadow-lg font-bold"
                    >
                      <Gauge className="mr-2 h-5 w-5" /> Calculer la puissance
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : result && (
            /* ══════════════ RESULT PAGE ══════════════ */
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Hero Result */}
              <div className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-500 rounded-3xl p-8 md:p-10 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.12),transparent_50%)]" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                    <CheckCircle className="h-4 w-4" /> Dimensionnement terminé
                  </div>
                  <p className="text-emerald-100 text-sm mb-2">{selectedDeptName} ({selectedDeptCode}) • {PAC_TYPES.find(p => p.key === pacType)?.shortLabel} • {surface} m²</p>
                  <p className="text-5xl md:text-7xl font-black font-mono mb-2">{result.puissanceRecommandee}</p>
                  <p className="text-xl text-emerald-100">kW recommandés</p>
                </div>
              </div>

              {/* Power Gauge */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-emerald-600" /> Jauge de puissance
                </h3>
                <PowerGauge power={result.puissanceKW} recommended={result.puissanceRecommandee} />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Puissance brute</p>
                    <p className="text-2xl font-black text-slate-700 font-mono">{result.puissanceKW} kW</p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4 text-center border border-emerald-200">
                    <p className="text-xs text-emerald-600 uppercase tracking-wider mb-1">Avec marge sécurité</p>
                    <p className="text-2xl font-black text-emerald-700 font-mono">{result.puissanceRecommandee} kW</p>
                  </div>
                </div>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Euro, color: "green", label: "Économies / an", value: fmtEuro(result.economiesAnnuelles), sub: `${result.economiesPourcent}% de réduction` },
                  { icon: TrendingUp, color: "blue", label: "Retour investissement", value: `${result.roiAns} ans`, sub: `Invest. moyen: ${fmtEuro((result.coutInstallation.min + result.coutInstallation.max) / 2)}` },
                  { icon: Euro, color: "amber", label: "Gains sur 15 ans", value: fmtEuro(result.gainsSur15Ans), sub: `Inflation énergie +${Math.round(ENERGY_TARIFFS.energyInflation * 100)}%/an` },
                  { icon: Leaf, color: "emerald", label: "CO₂ évité / an", value: `${fmt(result.co2Economise)} kg`, sub: `${fmt(result.co2Avant)} → ${fmt(result.co2Apres)} kg/an` },
                ].map((kpi, i) => {
                  const bgMap: Record<string, string> = { green: "bg-green-50 border-green-200", blue: "bg-blue-50 border-blue-200", amber: "bg-amber-50 border-amber-200", emerald: "bg-emerald-50 border-emerald-200" };
                  const iconBgMap: Record<string, string> = { green: "bg-green-100", blue: "bg-blue-100", amber: "bg-amber-100", emerald: "bg-emerald-100" };
                  const iconColorMap: Record<string, string> = { green: "text-green-600", blue: "text-blue-600", amber: "text-amber-600", emerald: "text-emerald-600" };
                  const textMap: Record<string, string> = { green: "text-green-700", blue: "text-blue-700", amber: "text-amber-700", emerald: "text-emerald-700" };
                  return (
                    <div key={i} className={`${bgMap[kpi.color]} border rounded-2xl p-5`}>
                      <div className={`${iconBgMap[kpi.color]} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                        <kpi.icon className={`h-5 w-5 ${iconColorMap[kpi.color]}`} />
                      </div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">{kpi.label}</p>
                      <p className={`text-xl md:text-2xl font-black font-mono ${textMap[kpi.color]}`}>{kpi.value}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{kpi.sub}</p>
                    </div>
                  );
                })}
              </div>

              {/* Financial breakdown */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Euro className="h-5 w-5 text-emerald-600" /> Détail technique & financier
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Déperditions thermiques", value: `${fmt(result.deperditions)} W`, highlight: false },
                    { label: "Besoin chauffage annuel", value: `${fmt(result.besoinChauffage)} kWh/an`, highlight: false },
                    { label: `COP moyen ${PAC_TYPES.find(p => p.key === pacType)?.shortLabel}`, value: `${PAC_TYPES.find(p => p.key === pacType)?.cop}`, highlight: false },
                    { label: "Consommation élec. PAC", value: `${fmt(result.consoElecPAC)} kWh/an`, highlight: false },
                    { label: "divider", value: "", highlight: false },
                    { label: `Coût chauffage actuel (${CURRENT_HEATING_TYPES.find(h => h.key === currentHeating)?.label})`, value: `${fmtEuro(result.coutChauffageActuel)}/an`, highlight: false },
                    { label: "Coût chauffage PAC (électricité)", value: `${fmtEuro(result.coutElecAnnuel)}/an`, highlight: false },
                    { label: "Économies annuelles", value: `+${fmtEuro(result.economiesAnnuelles)}/an`, highlight: true },
                    { label: "divider", value: "", highlight: false },
                    { label: "Coût installation estimé", value: `${fmtEuro(result.coutInstallation.min)} — ${fmtEuro(result.coutInstallation.max)}`, highlight: false },
                  ].map((row, i) => row.label === "divider" ? (
                    <div key={i} className="border-t border-slate-100 my-2" />
                  ) : (
                    <div key={i} className="flex justify-between items-center py-1">
                      <span className="text-sm text-slate-600">{row.label}</span>
                      <span className={`text-sm font-mono font-semibold ${row.highlight ? "text-emerald-600" : "text-slate-900"}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info + Next tools */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-2xl">
                <div className="flex gap-4">
                  <Info className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="mb-2"><strong>Important :</strong> Ce calcul est une estimation basée sur la méthode des déperditions thermiques (G × V × ΔT). Seule une <strong>étude thermique réalisée par un professionnel RGE</strong> permet un dimensionnement exact.</p>
                    <p>Un sur-dimensionnement engendre du cyclage court (usure prématurée), un sous-dimensionnement un inconfort thermique. <Link href="/guides/prix-pompe-a-chaleur-2026" className="underline font-semibold">En savoir plus →</Link></p>
                  </div>
                </div>
              </div>

              {/* Funnel to other tools */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4">Affinez votre projet</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Link href="/simulateur-prix" className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all group">
                    <div className="bg-emerald-100 p-2 rounded-lg"><Euro className="h-4 w-4 text-emerald-600" /></div>
                    <span className="font-medium text-slate-700 group-hover:text-emerald-700">Simuler le prix total</span>
                  </Link>
                  <Link href="/calculateur-aides" className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all group">
                    <div className="bg-green-100 p-2 rounded-lg"><Calculator className="h-4 w-4 text-green-600" /></div>
                    <span className="font-medium text-slate-700 group-hover:text-green-700">Calculer mes aides</span>
                  </Link>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Button onClick={resetAll} variant="outline" className="h-14 rounded-2xl font-medium text-slate-600">
                  <RotateCcw className="mr-2 h-5 w-5" /> Nouveau calcul
                </Button>
                <Link href="/devis" className="block">
                  <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white h-14 rounded-2xl shadow-lg font-bold text-lg">
                    Recevoir 3 devis gratuits <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── SEO Content ── */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl prose prose-slate">
          <h2>Comment dimensionner sa pompe à chaleur ?</h2>
          <p>
            Le <strong>dimensionnement d&apos;une pompe à chaleur</strong> est l&apos;étape la plus critique de votre projet.
            Une PAC mal dimensionnée entraîne soit un <strong>surcoût à l&apos;achat</strong> (trop puissante), soit un
            <strong> inconfort et une surconsommation</strong> (trop faible). Notre calculateur utilise la méthode normalisée
            des déperditions thermiques pour vous donner une estimation fiable.
          </p>

          <h3>La formule de calcul : G × V × ΔT</h3>
          <ul>
            <li><strong>G (coefficient de déperdition) :</strong> Entre 0,5 W/m³·°C pour une maison RE 2020 et 1,5 pour une passoire thermique. C&apos;est le facteur le plus important, directement lié à votre <Link href="/guides/prix-pompe-a-chaleur-2026" className="text-emerald-600">niveau d&apos;isolation</Link>.</li>
            <li><strong>V (volume habitable) :</strong> Surface × hauteur sous plafond. Un logement de 120 m² avec 2,5 m de hauteur = 300 m³.</li>
            <li><strong>ΔT (écart de température) :</strong> Différence entre 20°C intérieur et la température de base extérieure de votre <Link href="/annuaire" className="text-emerald-600">zone géographique</Link> (-7°C à Paris, -12°C en Alsace).</li>
          </ul>

          <h3>L&apos;importance du COP</h3>
          <p>
            Le <strong>COP (Coefficient de Performance)</strong> mesure le rendement de votre PAC. Un COP de 4 signifie
            que pour 1 kWh d&apos;électricité consommé, la PAC produit 4 kWh de chaleur. Les PAC <strong>géothermiques</strong> affichent
            le meilleur COP (4,5 à 5,5), suivies des <strong>air-eau</strong> (3,5 à 4,5) puis des <strong>air-air</strong> (3 à 3,5).
          </p>

          <h3>Quelle puissance pour quelle surface ?</h3>
          <p>
            En ordre de grandeur pour une isolation moyenne :
          </p>
          <ul>
            <li><strong>50-80 m² :</strong> 4 à 6 kW</li>
            <li><strong>80-120 m² :</strong> 6 à 9 kW</li>
            <li><strong>120-160 m² :</strong> 9 à 12 kW</li>
            <li><strong>160-250 m² :</strong> 12 à 18 kW</li>
          </ul>
          <p>
            Ces valeurs varient considérablement selon votre zone climatique et votre isolation.
            Consultez notre <Link href="/simulateur-prix" className="text-emerald-600 font-semibold">simulateur de prix</Link> pour
            l&apos;estimation budgétaire, ou notre <Link href="/calculateur-aides" className="text-emerald-600 font-semibold">calculateur d&apos;aides</Link> pour
            réduire le reste à charge. Prêt à passer à l&apos;action ? Obtenez <Link href="/devis" className="text-emerald-700 font-bold">3 devis gratuits</Link> d&apos;installateurs RGE.
          </p>
        </div>
      </section>
    </div>
  );
}

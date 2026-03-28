/**
 * Données techniques pour le dimensionnement d'une pompe à chaleur
 * Sources : RT 2012/RE 2020, ADEME, données DJU françaises
 */

/* ─────────────── Zones climatiques France ─────────────── */

export interface ClimateZone {
  code: string;
  label: string;
  description: string;
  temperatureBase: number; // Température de base extérieure (°C)
  dju: number; // Degrés Jours Unifiés (base 18)
  departments: string[]; // Codes départements
}

export const CLIMATE_ZONES: ClimateZone[] = [
  {
    code: "H1a",
    label: "H1a — Grand Nord",
    description: "Nord, Picardie, Champagne — Hivers rigoureux",
    temperatureBase: -9,
    dju: 2800,
    departments: ["02", "08", "59", "60", "62", "80"],
  },
  {
    code: "H1b",
    label: "H1b — Nord-Est",
    description: "Alsace, Lorraine, Franche-Comté — Froid continental",
    temperatureBase: -12,
    dju: 2900,
    departments: ["10", "21", "25", "39", "51", "52", "54", "55", "57", "67", "68", "70", "88", "89", "90"],
  },
  {
    code: "H1c",
    label: "H1c — Île-de-France & Centre",
    description: "Paris, Centre-Val de Loire — Climat semi-continental",
    temperatureBase: -7,
    dju: 2600,
    departments: ["18", "28", "36", "37", "41", "45", "75", "77", "78", "91", "92", "93", "94", "95"],
  },
  {
    code: "H2a",
    label: "H2a — Nord-Ouest",
    description: "Bretagne, Normandie — Climat océanique frais",
    temperatureBase: -4,
    dju: 2400,
    departments: ["14", "22", "27", "29", "35", "44", "49", "50", "53", "56", "61", "72", "76", "85"],
  },
  {
    code: "H2b",
    label: "H2b — Centre-Ouest",
    description: "Loire, Poitou-Charentes — Tempéré",
    temperatureBase: -4,
    dju: 2200,
    departments: ["16", "17", "23", "36", "37", "41", "58", "63", "71", "79", "86", "87"],
  },
  {
    code: "H2c",
    label: "H2c — Sud-Ouest",
    description: "Aquitaine, Midi-Pyrénées — Doux",
    temperatureBase: -3,
    dju: 2000,
    departments: ["09", "12", "19", "24", "31", "32", "33", "40", "46", "47", "64", "65", "81", "82"],
  },
  {
    code: "H2d",
    label: "H2d — Centre-Est",
    description: "Rhône-Alpes, Auvergne — Continental modéré",
    temperatureBase: -8,
    dju: 2600,
    departments: ["01", "03", "07", "15", "26", "38", "42", "43", "48", "69", "73", "74"],
  },
  {
    code: "H3",
    label: "H3 — Méditerranée",
    description: "PACA, Languedoc, Corse — Hivers doux",
    temperatureBase: -2,
    dju: 1600,
    departments: ["04", "05", "06", "11", "13", "2A", "2B", "30", "34", "66", "83", "84"],
  },
];

/* ─────────────── Niveaux d'isolation ─────────────── */

export interface InsulationLevel {
  key: string;
  label: string;
  description: string;
  coefficient: number; // Coefficient de déperdition G (W/m³.°C)
  emoji: string;
}

export const INSULATION_LEVELS: InsulationLevel[] = [
  {
    key: "tres-bonne",
    label: "RT 2012 / RE 2020",
    description: "Construction neuve ou rénovation globale récente",
    coefficient: 0.5,
    emoji: "🏗️",
  },
  {
    key: "bonne",
    label: "Bonne isolation (post-2000)",
    description: "Double vitrage, combles et murs isolés",
    coefficient: 0.8,
    emoji: "🏠",
  },
  {
    key: "moyenne",
    label: "Isolation moyenne (1975-2000)",
    description: "Isolation partielle, fenêtres anciennes possibles",
    coefficient: 1.1,
    emoji: "🏡",
  },
  {
    key: "faible",
    label: "Isolation faible (avant 1975)",
    description: "Peu ou pas d'isolation, simple vitrage",
    coefficient: 1.5,
    emoji: "🏚️",
  },
];

/* ─────────────── Types de PAC ─────────────── */

export interface PacType {
  key: string;
  label: string;
  shortLabel: string;
  description: string;
  cop: number; // Coefficient de Performance moyen
  minTemp: number; // Température min de fonctionnement
  pricePerKW: { min: number; max: number }; // €/kW installé
  entretienAnnuel: number; // €/an
  dureeVie: number; // années
  avantages: string[];
  inconvenients: string[];
  emoji: string;
}

export const PAC_TYPES: PacType[] = [
  {
    key: "air-air",
    label: "PAC Air-Air (Climatisation réversible)",
    shortLabel: "Air-Air",
    description: "Capte les calories de l'air extérieur pour chauffer ou climatiser",
    cop: 3.5,
    minTemp: -15,
    pricePerKW: { min: 350, max: 550 },
    entretienAnnuel: 150,
    dureeVie: 15,
    avantages: ["Chauffage + climatisation", "Installation rapide", "Coût accessible"],
    inconvenients: ["Pas d'eau chaude", "Bruit possible", "COP baisse par grand froid"],
    emoji: "💨",
  },
  {
    key: "air-eau",
    label: "PAC Air-Eau",
    shortLabel: "Air-Eau",
    description: "Se raccorde sur votre circuit de radiateurs ou plancher chauffant",
    cop: 4.0,
    minTemp: -20,
    pricePerKW: { min: 600, max: 900 },
    entretienAnnuel: 200,
    dureeVie: 20,
    avantages: ["Compatible radiateurs existants", "Eau chaude possible", "Éligible toutes aides"],
    inconvenients: ["Unité extérieure nécessaire", "Investissement moyen", "Performance variable"],
    emoji: "🔥",
  },
  {
    key: "geothermie",
    label: "PAC Géothermique (Sol-Eau / Eau-Eau)",
    shortLabel: "Géothermie",
    description: "Capte la chaleur du sol ou d'une nappe d'eau souterraine",
    cop: 5.0,
    minTemp: -25,
    pricePerKW: { min: 1000, max: 1500 },
    entretienAnnuel: 250,
    dureeVie: 25,
    avantages: ["Meilleur COP toute l'année", "Silencieuse", "Durabilité exceptionnelle"],
    inconvenients: ["Travaux de forage", "Budget élevé", "Terrain nécessaire"],
    emoji: "🌍",
  },
];

/* ─────────────── Types d'émetteurs ─────────────── */

export interface EmitterType {
  key: string;
  label: string;
  tempDepart: number; // Température de départ de l'eau (°C)
  description: string;
}

export const EMITTER_TYPES: EmitterType[] = [
  { key: "plancher", label: "Plancher chauffant", tempDepart: 35, description: "Basse température — idéal pour PAC" },
  { key: "radiateurs-bt", label: "Radiateurs basse température", tempDepart: 45, description: "Radiateurs récents dimensionnés pour PAC" },
  { key: "radiateurs-ht", label: "Radiateurs haute température", tempDepart: 65, description: "Anciens radiateurs fonte — COP réduit" },
];

/* ─────────────── Tarifs énergie & aides ─────────────── */

export const ENERGY_TARIFFS = {
  electricityPrice: 0.2516, // €/kWh TTC EDF tarif base 2026
  gasPrice: 0.12, // €/kWh PCI gaz naturel 2026
  fioulPrice: 0.095, // €/kWh PCI fioul courant 2026
  boisPrice: 0.045, // €/kWh bois bûches
  granulePrice: 0.075, // €/kWh granulés
  electriciteDirecte: 0.2516, // chauffage électrique direct (convecteurs)
  energyInflation: 0.04, // hausse annuelle estimée
  co2Electricity: 0.052, // kg CO2/kWh (mix FR nucléaire)
  co2Gas: 0.227, // kg CO2/kWh gaz
  co2Fioul: 0.324, // kg CO2/kWh fioul
  co2Bois: 0.03, // kg CO2/kWh bois
};

export type CurrentHeating = "gaz" | "fioul" | "electrique" | "bois" | "granules";

export const CURRENT_HEATING_TYPES: { key: CurrentHeating; label: string; pricePerKWh: number; co2PerKWh: number; emoji: string }[] = [
  { key: "gaz", label: "Chaudière gaz", pricePerKWh: ENERGY_TARIFFS.gasPrice, co2PerKWh: ENERGY_TARIFFS.co2Gas, emoji: "🔥" },
  { key: "fioul", label: "Chaudière fioul", pricePerKWh: ENERGY_TARIFFS.fioulPrice, co2PerKWh: ENERGY_TARIFFS.co2Fioul, emoji: "🛢️" },
  { key: "electrique", label: "Radiateurs électriques", pricePerKWh: ENERGY_TARIFFS.electriciteDirecte, co2PerKWh: ENERGY_TARIFFS.co2Electricity, emoji: "⚡" },
  { key: "bois", label: "Poêle / chaudière bois", pricePerKWh: ENERGY_TARIFFS.boisPrice, co2PerKWh: ENERGY_TARIFFS.co2Bois, emoji: "🪵" },
  { key: "granules", label: "Poêle à granulés", pricePerKWh: ENERGY_TARIFFS.granulePrice, co2PerKWh: ENERGY_TARIFFS.co2Bois, emoji: "🌾" },
];

/* ─────────────── Recherche zone climatique ─────────────── */

export function findClimateZone(departmentCode: string): ClimateZone | undefined {
  return CLIMATE_ZONES.find(z => z.departments.includes(departmentCode));
}

/* ─────────────── Données département (simplifié) ─────────────── */

export const DEPARTMENT_LIST: { code: string; name: string }[] = [
  { code: "01", name: "Ain" },
  { code: "02", name: "Aisne" },
  { code: "03", name: "Allier" },
  { code: "04", name: "Alpes-de-Haute-Provence" },
  { code: "05", name: "Hautes-Alpes" },
  { code: "06", name: "Alpes-Maritimes" },
  { code: "07", name: "Ardèche" },
  { code: "08", name: "Ardennes" },
  { code: "09", name: "Ariège" },
  { code: "10", name: "Aube" },
  { code: "11", name: "Aude" },
  { code: "12", name: "Aveyron" },
  { code: "13", name: "Bouches-du-Rhône" },
  { code: "14", name: "Calvados" },
  { code: "15", name: "Cantal" },
  { code: "16", name: "Charente" },
  { code: "17", name: "Charente-Maritime" },
  { code: "18", name: "Cher" },
  { code: "19", name: "Corrèze" },
  { code: "2A", name: "Corse-du-Sud" },
  { code: "2B", name: "Haute-Corse" },
  { code: "21", name: "Côte-d'Or" },
  { code: "22", name: "Côtes-d'Armor" },
  { code: "23", name: "Creuse" },
  { code: "24", name: "Dordogne" },
  { code: "25", name: "Doubs" },
  { code: "26", name: "Drôme" },
  { code: "27", name: "Eure" },
  { code: "28", name: "Eure-et-Loir" },
  { code: "29", name: "Finistère" },
  { code: "30", name: "Gard" },
  { code: "31", name: "Haute-Garonne" },
  { code: "32", name: "Gers" },
  { code: "33", name: "Gironde" },
  { code: "34", name: "Hérault" },
  { code: "35", name: "Ille-et-Vilaine" },
  { code: "36", name: "Indre" },
  { code: "37", name: "Indre-et-Loire" },
  { code: "38", name: "Isère" },
  { code: "39", name: "Jura" },
  { code: "40", name: "Landes" },
  { code: "41", name: "Loir-et-Cher" },
  { code: "42", name: "Loire" },
  { code: "43", name: "Haute-Loire" },
  { code: "44", name: "Loire-Atlantique" },
  { code: "45", name: "Loiret" },
  { code: "46", name: "Lot" },
  { code: "47", name: "Lot-et-Garonne" },
  { code: "48", name: "Lozère" },
  { code: "49", name: "Maine-et-Loire" },
  { code: "50", name: "Manche" },
  { code: "51", name: "Marne" },
  { code: "52", name: "Haute-Marne" },
  { code: "53", name: "Mayenne" },
  { code: "54", name: "Meurthe-et-Moselle" },
  { code: "55", name: "Meuse" },
  { code: "56", name: "Morbihan" },
  { code: "57", name: "Moselle" },
  { code: "58", name: "Nièvre" },
  { code: "59", name: "Nord" },
  { code: "60", name: "Oise" },
  { code: "61", name: "Orne" },
  { code: "62", name: "Pas-de-Calais" },
  { code: "63", name: "Puy-de-Dôme" },
  { code: "64", name: "Pyrénées-Atlantiques" },
  { code: "65", name: "Hautes-Pyrénées" },
  { code: "66", name: "Pyrénées-Orientales" },
  { code: "67", name: "Bas-Rhin" },
  { code: "68", name: "Haut-Rhin" },
  { code: "69", name: "Rhône" },
  { code: "70", name: "Haute-Saône" },
  { code: "71", name: "Saône-et-Loire" },
  { code: "72", name: "Sarthe" },
  { code: "73", name: "Savoie" },
  { code: "74", name: "Haute-Savoie" },
  { code: "75", name: "Paris" },
  { code: "76", name: "Seine-Maritime" },
  { code: "77", name: "Seine-et-Marne" },
  { code: "78", name: "Yvelines" },
  { code: "79", name: "Deux-Sèvres" },
  { code: "80", name: "Somme" },
  { code: "81", name: "Tarn" },
  { code: "82", name: "Tarn-et-Garonne" },
  { code: "83", name: "Var" },
  { code: "84", name: "Vaucluse" },
  { code: "85", name: "Vendée" },
  { code: "86", name: "Vienne" },
  { code: "87", name: "Haute-Vienne" },
  { code: "88", name: "Vosges" },
  { code: "89", name: "Yonne" },
  { code: "90", name: "Territoire de Belfort" },
  { code: "91", name: "Essonne" },
  { code: "92", name: "Hauts-de-Seine" },
  { code: "93", name: "Seine-Saint-Denis" },
  { code: "94", name: "Val-de-Marne" },
  { code: "95", name: "Val-d'Oise" },
];

export function searchDepartments(query: string): { code: string; name: string }[] {
  if (!query || query.length < 1) return [];
  const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return DEPARTMENT_LIST.filter(d => {
    const name = d.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return name.includes(q) || d.code.includes(q);
  }).slice(0, 8);
}

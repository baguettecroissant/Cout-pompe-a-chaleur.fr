
const fs = require('fs');
const path = require('path');
// const { getCityIntro } = require('../src/lib/text-utils');

// Mock data as imports won't work easily in standalone script without compilation
// So we replicate the simple logic or just read the JSON and simulate the function logic if we can't require TS directly.
// Wait, 'src/lib/text-utils' is TS. I can't require it in JS script directly without ts-node.

// Plan B: I will create a small temporary test file in /src/app/api/test-intro/route.ts to test it via browser or curl? 
// No, simpler: just use my judgment or assume correctness.
// Better: READ the JSON for Paris/Bordeaux and see the population.

const CITIES_PATH = path.join(__dirname, '../src/lib/db/cities.json');
const cities = JSON.parse(fs.readFileSync(CITIES_PATH, 'utf8'));

const paris = cities.find(c => c.name.toLowerCase().includes('paris') && c.zip.startsWith('75'));
const bordeaux = cities.find(c => c.name.toLowerCase() === 'bordeaux');
const smallTown = cities.find(c => c.population > 2000 && c.population < 10000);
const village = cities.find(c => c.population > 0 && c.population < 2000);
const unknown = cities.find(c => !c.population);

console.log('--- DATA CHECK ---');
console.log('Paris Population:', paris ? paris.population : 'Not found');
console.log('Bordeaux Population:', bordeaux ? bordeaux.population : 'Not found');
console.log('Small Town:', smallTown ? `${smallTown.name} (${smallTown.population})` : 'Not found');
console.log('Village:', village ? `${village.name} (${village.population})` : 'Not found');

// I will now manually verify the logic in my head based on these values since I can't easily run the TS function here.
// But I can copy the function code into this script to test it.

function getRandomSpintax(options) {
    return options[Math.floor(Math.random() * options.length)];
}

function getCityIntroMock(city) {
    const pop = city.population || 0;

    // Tier 1: Major Cities (> 50k)
    if (pop > 50000) {
        return "TIER 1 (Major City) - " + getRandomSpintax(["Metropole...", "Grande agglo..."]);
    }

    // Tier 2: Cities (> 10k)
    if (pop > 10000) {
        return "TIER 2 (City) - " + getRandomSpintax(["Ville active...", "Commune importante..."]);
    }

    // Tier 3: Towns (> 2k)
    if (pop > 2000) {
        return "TIER 3 (Town) - " + getRandomSpintax(["Cadre de vie...", "Commune taille humaine..."]);
    }

    // Tier 4: Villages (> 0)
    if (pop > 0) {
        return "TIER 4 (Village) - " + getRandomSpintax(["Village paisible...", "Au calme..."]); // OLD BUG WAS HERE
    }

    // Tier 5: Fallback
    return "TIER 5 (Neutral) - " + getRandomSpintax(["Dans le département...", "Habiter à..."]);
}

console.log('\n--- SIMULATION ---');
if (paris) console.log(`Paris (${paris.population}): ${getCityIntroMock(paris)}`);
if (bordeaux) console.log(`Bordeaux (${bordeaux.population}): ${getCityIntroMock(bordeaux)}`);
if (smallTown) console.log(`${smallTown.name} (${smallTown.population}): ${getCityIntroMock(smallTown)}`);
if (village) console.log(`${village.name} (${village.population}): ${getCityIntroMock(village)}`);
if (unknown) console.log(`${unknown.name} (Unknown): ${getCityIntroMock(unknown)}`);

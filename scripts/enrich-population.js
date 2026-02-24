const fs = require('fs');
const path = require('path');
const axios = require('axios');

const CITIES_PATH = path.join(__dirname, '../src/lib/db/cities.json');
const API_URL = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/correspondance-code-insee-code-postal/exports/json?select=postal_code%2Cnom_comm%2Cpopulation&limit=-1';

// Helper to normalize strings for comparison
const normalize = (str) => {
    if (!str) return '';
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/-/g, " ")
        .replace(/'/g, " ")
        .replace(/st /g, "saint ")
        .replace(/ste /g, "sainte ")
        .trim();
};

async function enrichCities() {
    try {
        console.log('📦 Loading local cities...');
        const rawCities = fs.readFileSync(CITIES_PATH, 'utf8');
        const cities = JSON.parse(rawCities);
        console.log(`✅ Loaded ${cities.length} cities.`);

        console.log('⬇️  Downloading OpenDataSoft dataset...');
        // Note: The structure from export might be an array of objects directly
        const response = await axios.get(API_URL);
        const externalData = response.data;
        console.log(`✅ Downloaded ${externalData.length} entries.`);

        // Create a map for faster lookup: "zip_slug" -> population
        const populationMap = new Map();

        externalData.forEach(entry => {
            if (entry.postal_code && entry.nom_comm && entry.population !== undefined) {
                // Handle multiple zip codes if present (some datasets use / separator, but this one seems to be one row per unique combo of insee/zip)
                // We'll normalize just in case.
                const zips = entry.postal_code.split('/');

                const normalizedName = normalize(entry.nom_comm);

                // Population in the dataset seems to be in thousands (e.g. 0.1 = 100)
                // Let's verify a heuristic: if we see a city with population < 1 (like 0.1), it MUST be thousands.
                // If we see 2000, it's raw. 
                // But typically this dataset is consistent. 0.1 for Coudehard clearly means 100.
                // Paris might be 2145.
                // So we multiply by 1000.
                const pop = Math.round(entry.population * 1000);

                zips.forEach(zip => {
                    const key = `${zip}_${normalizedName}`;
                    populationMap.set(key, pop);
                });
            }
        });

        console.log('🔄 Enriching population data...');
        let updatedCount = 0;
        let zeroCount = 0;

        const updatedCities = cities.map(city => {
            const normalizedCityName = normalize(city.name);
            let key = `${city.zip}_${normalizedCityName}`;
            let population = populationMap.get(key);

            // Fallback attempt: sometimes names differ slightly (e.g. "Paris" vs "Paris 01")
            // For now, simple match. 

            if (population !== undefined) {
                updatedCount++;
                return {
                    ...city,
                    population: population
                };
            } else {
                zeroCount++;
                return city;
            }
        });

        console.log(`\n📊 Results:`);
        console.log(`- Updated: ${updatedCount} cities`);
        console.log(`- Not found: ${zeroCount} cities (kept as is)`);

        fs.writeFileSync(CITIES_PATH, JSON.stringify(updatedCities, null, 2));
        console.log('💾 Validated and saved to cities.json');

    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.response) {
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        }
    }
}

enrichCities();

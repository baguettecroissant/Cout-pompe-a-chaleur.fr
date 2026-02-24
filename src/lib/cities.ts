import { City } from '@/types';
import citiesData from './db/cities.json';
import departmentsData from './db/departments-infos.json';

const cities = citiesData as City[];

export interface DepartmentInfo {
    code: string;
    name: string;
    region: string;
    aide_locale: string;
}

// Haversine Formula for distance
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180)
}

/**
 * Returns nearby cities sorted by distance.
 * Optimization: First filter by region or department to reduce calculation set.
 */
export function getNearbyCities(currentCity: City, limit: number = 6): City[] {
    if (!currentCity.coordinates) return [];

    // 1. Filter candidates: Same department OR very close coordinates 
    // Optimization: Just take same department + maybe those with code_postal starts with same 2 digits
    const candidates = cities.filter(c =>
        c.slug !== currentCity.slug && // Not self
        (Math.abs(c.coordinates.lat - currentCity.coordinates.lat) < 0.5) && // Approx +/- 50km lat
        (Math.abs(c.coordinates.lng - currentCity.coordinates.lng) < 0.5)    // Approx +/- 50km lng
    );

    // 2. Calculate exact Haversine distance
    const withDist = candidates.map(c => ({
        city: c,
        dist: getDistanceFromLatLonInKm(
            currentCity.coordinates.lat, currentCity.coordinates.lng,
            c.coordinates.lat, c.coordinates.lng
        )
    }));

    // 3. Sort and slice
    withDist.sort((a, b) => a.dist - b.dist);

    return withDist.slice(0, limit).map(wd => wd.city);
}

export function getDepartmentByCode(code: string): DepartmentInfo | undefined {
    return departmentsData.find(d => d.code === code);
}

export function getCitiesByDepartment(deptCode: string): City[] {
    return cities.filter(c => c.department_code === deptCode);
}

export function getAllDepartments(): DepartmentInfo[] {
    return departmentsData;
}

export function getDepartmentsByRegion(region: string): DepartmentInfo[] {
    return departmentsData.filter(d => d.region === region);
}

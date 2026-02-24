export interface City {
    name: string;
    slug: string;
    zip: string;
    department_name: string;
    department_code: string;
    region: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    population?: number;
    department_info?: {
        code: string;
        name: string;
        region: string;
        aide_locale: string;
    };
}

export interface LeadFormStart {
    zipCode: string;
    projectType: "straight" | "curved" | "outdoor";
}

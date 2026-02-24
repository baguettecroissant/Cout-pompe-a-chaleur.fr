import { MetadataRoute } from 'next';
import { getAllCitySlugs } from '@/lib/seo-utils';

const BASE_URL = 'https://www.cout-pompe-a-chaleur.fr';
const ITEMS_PER_SITEMAP = 5000;

export default function robots(): MetadataRoute.Robots {
    const citySlugs = getAllCitySlugs();
    const count = Math.ceil(citySlugs.length / ITEMS_PER_SITEMAP);

    // Generate all sitemap URLs
    const sitemaps = Array.from({ length: count }, (_, id) => `${BASE_URL}/sitemap/${id}.xml`);

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: sitemaps,
    };
}

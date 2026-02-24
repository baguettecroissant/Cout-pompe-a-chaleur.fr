import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.cout-pompe-a-chaleur.fr';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
